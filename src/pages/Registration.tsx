import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CloudUpload, CircleCheck, ChevronRight, ChevronLeft, User, Briefcase, Tags, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../components/Logo';
import { bucketName, getSession, onAuthStateChange, signIn, signUp, signOut, supabase } from '../supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

type RegistrationData = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  altPhone?: string;
  
  businessName?: string;
  registrationNumber?: string;
  typeOfBusiness?: string;
  industry?: string;
  businessAddress?: string;
  employees?: string;
  
  membershipCategory: string;
  motivation: string;
  
  docs_id: boolean;
  docs_registration: boolean;
  docs_residence: boolean;
  docs_profile: boolean;
  documents: FileList;
  
  signature: string;
  signatureDate: string;
};

export default function Registration() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  
  const totalSteps = 4;

  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } | null = null;

    const init = async () => {
      const { data } = await getSession();
      const currentUser = data.session?.user ?? null;
      if (currentUser) {
        setUser(currentUser);
        setNeedsAuth(false);
      } else {
        setUser(null);
        setNeedsAuth(true);
      }

      const { data: listener } = onAuthStateChange((_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setNeedsAuth(!currentUser);
      });

      authSubscription = listener.subscription;
    };

    init();
    return () => authSubscription?.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const result = authMode === 'register'
        ? await signUp(authEmail, authPassword)
        : await signIn(authEmail, authPassword);

      if (result.error) throw result.error;

      const sessionUser = result.data.session?.user ?? result.data.user ?? null;
      if (!sessionUser) {
        throw new Error('Unable to authenticate. Please try again.');
      }

      setUser(sessionUser);
      setNeedsAuth(false);
    } catch (err: any) {
      console.error('Auth failed:', err);
      setLoginError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onSubmit = async (data: RegistrationData) => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (!user) {
         alert("Authentication error. Please sign in again.");
         return;
      }
      
      const confirmed = window.confirm(
        "You are about to submit your registration securely. Do you wish to proceed?"
      );
      if (!confirmed) return;

      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        const registrationId = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const attachmentUrls: string[] = [];

        if (data.documents && data.documents.length > 0) {
          for (let i = 0; i < data.documents.length; i++) {
            const file = data.documents[i];
            const filePath = `${registrationId}/${file.name}`;
            const { error: uploadError } = await supabase.storage
              .from(bucketName)
              .upload(filePath, file, { upsert: false });

            if (uploadError) {
              throw uploadError;
            }

            const { data: signedData, error: signedError } = await supabase.storage
              .from(bucketName)
              .createSignedUrl(filePath, 60 * 60 * 24);

            if (signedError || !signedData.signedUrl) {
              throw signedError ?? new Error('Unable to create secure file URL.');
            }

            attachmentUrls.push(signedData.signedUrl);
          }
        }

        const docData = {
          ...data,
          documents: undefined,
          attachments: attachmentUrls,
          user_id: user.id,
          created_at: new Date().toISOString(),
        };

        const { error: insertError } = await supabase.from('registrations').insert([docData]);
        if (insertError) {
          throw insertError;
        }

        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err: any) {
        console.error(err);
        setSubmitError(err.message || 'An error occurred during submission.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-slate-50 min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-2xl shadow-xl max-w-2xl w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CircleCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-chamber-navy mb-4">Application Received!</h2>
          <p className="text-slate-600 text-lg mb-8">
            Thank you for registering with the Amajuba Economic Chamber. Your application and supporting documents have been securely uploaded. Our team will review your submission and contact you shortly.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-8 py-3 bg-chamber-navy text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            Return to Homepage
          </button>
        </motion.div>
      </div>
    );
  }

  const SectionHeader = ({ title, number }: { title: string, number: string }) => (
    <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-lg border-l-4 border-chamber-gold mb-8 mt-4">
      <span className="font-bold text-chamber-blue uppercase text-sm tracking-wider">Section {number}</span>
      <h3 className="font-display font-bold text-xl text-chamber-navy">{title}</h3>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-chamber-navy p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-chamber-blue rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            </div>
            
            {!needsAuth && user && (
              <button 
                onClick={async () => {
                  await signOut();
                }}
                className="absolute top-4 right-4 z-20 text-slate-300 hover:text-white text-sm font-medium transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md"
              >
                Sign Out
              </button>
            )}

            <Logo className="w-20 h-20 mx-auto mb-4 relative z-10" />
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 relative z-10">
              Membership Registration
            </h1>
            <p className="text-slate-300 relative z-10 text-lg">
              Amajuba Economic Chamber - Promoting Growth & Prosperity
            </p>
          </div>

          <div className="p-8 md:p-12">
            
            {needsAuth ? (
              <div className="text-center py-12 max-w-md mx-auto">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-chamber-blue/10 text-chamber-blue rounded-full flex items-center justify-center">
                    <User className="w-10 h-10" />
                  </div>
                </div>
                <h2 className="text-2xl font-display font-bold text-chamber-navy mb-4">
                  {authMode === 'login' ? 'Sign in to Register' : 'Create an Account'}
                </h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  To securely upload your documents and process your registration, please {authMode === 'login' ? 'sign in' : 'create an account'}.
                </p>
                {loginError && (
                  <div className="text-red-500 bg-red-50 p-3 rounded-md mb-6 max-w-md mx-auto border border-red-200">
                    {loginError}
                  </div>
                )}
                
                <form onSubmit={handleAuth} className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-chamber-blue focus:border-chamber-blue"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-chamber-blue focus:border-chamber-blue"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-chamber-blue text-white font-bold py-3 px-4 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {isLoggingIn && <Loader2 className="w-5 h-5 animate-spin" />}
                    {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>
                
                <div className="mt-6 text-slate-600">
                  {authMode === 'login' ? (
                    <p>Don't have an account? <button type="button" onClick={() => setAuthMode('register')} className="text-chamber-blue font-bold hover:underline">Sign up</button></p>
                  ) : (
                    <p>Already have an account? <button type="button" onClick={() => setAuthMode('login')} className="text-chamber-blue font-bold hover:underline">Sign in</button></p>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Step Progress */}
            <div className="mb-10 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-chamber-gold -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
              <div className="relative flex justify-between">
                {[
                  { icon: <User className="w-5 h-5" />, label: 'Applicant' },
                  { icon: <Briefcase className="w-5 h-5" />, label: 'Business' },
                  { icon: <Tags className="w-5 h-5" />, label: 'Motivation' },
                  { icon: <FileText className="w-5 h-5" />, label: 'Documents' },
                ].map((step, idx) => {
                  const stepNumber = idx + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${
                          isActive 
                            ? 'bg-chamber-gold border-white text-chamber-navy shadow-md' 
                            : isCompleted
                              ? 'bg-chamber-blue border-white text-white'
                              : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        {isCompleted ? <CircleCheck className="w-6 h-6" /> : step.icon}
                      </div>
                      <span className={`text-xs mt-2 font-medium hidden sm:block ${isActive ? 'text-chamber-navy font-bold' : isCompleted ? 'text-chamber-blue' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="popLayout">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <SectionHeader number="1" title="Applicant Information" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
                        <input type="text" {...register("firstName", { required: true })} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                        {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" {...register("lastName", { required: true })} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                        {errors.lastName && <span className="text-red-500 text-xs">Required</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                        <input type="date" {...register("dob", { required: true })} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                        {errors.dob && <span className="text-red-500 text-xs">Required</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Gender <span className="text-red-500">*</span></label>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" value="Male" {...register("gender", { required: true })} className="text-chamber-blue focus:ring-chamber-blue" />
                            <span>Male</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" value="Female" {...register("gender")} className="text-chamber-blue focus:ring-chamber-blue" />
                            <span>Female</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" value="Other" {...register("gender")} className="text-chamber-blue focus:ring-chamber-blue" />
                            <span>Other</span>
                          </label>
                        </div>
                        {errors.gender && <span className="text-red-500 text-xs block mt-1">Required</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" {...register("email", { required: true })} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                        {errors.email && <span className="text-red-500 text-xs">Required</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input type="tel" placeholder="(000) 000-0000" {...register("phone", { required: true })} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                        {errors.phone && <span className="text-red-500 text-xs">Required</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Alternative Phone Number</label>
                        <input type="tel" placeholder="(000) 000-0000" {...register("altPhone")} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <SectionHeader number="2" title="Business Information (If Applicable)" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                        <input type="text" {...register("businessName")} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number</label>
                        <input type="text" {...register("registrationNumber")} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Type of Business</label>
                        <input type="text" {...register("typeOfBusiness")} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Industry/Sector</label>
                        <input type="text" {...register("industry")} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Business Address</label>
                        <input type="text" {...register("businessAddress")} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                      </div>
                      <div className="md:w-1/2 md:pr-3">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Number of Employees</label>
                        <input type="number" placeholder="e.g. 23" {...register("employees")} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <SectionHeader number="3" title="Membership Category" />

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Membership Category <span className="text-red-500">*</span></label>
                      <div className="space-y-3">
                        {['Individual Member', 'Small Business Member', 'Corporate Member', 'Youth/Student Member', 'Non-Profit Organization'].map((cat) => (
                          <label key={cat} className="flex items-center gap-3 cursor-pointer">
                            <input type="radio" value={cat} {...register("membershipCategory", { required: true })} className="text-chamber-blue focus:ring-chamber-blue w-4 h-4" />
                            <span className="text-slate-700">{cat}</span>
                          </label>
                        ))}
                      </div>
                      {errors.membershipCategory && <span className="text-red-500 text-xs block mt-2">Please select a category</span>}
                    </div>

                    <SectionHeader number="4" title="Motivation for Joining" />

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Please tell us why you want to join Amajuba Economic Chamber <span className="text-red-500">*</span></label>
                      <textarea 
                        rows={4} 
                        {...register("motivation", { required: true })} 
                        className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue resize-none" 
                      />
                      {errors.motivation && <span className="text-red-500 text-xs">Required</span>}
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <SectionHeader number="5" title="Required Supporting Documents" />

                    <div>
                      <p className="text-sm text-slate-600 mb-4">Please prepare and select the documents you will be uploading.</p>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Supporting Documents Included <span className="text-red-500">*</span></label>
                      <div className="space-y-3 mb-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" {...register("docs_id")} className="text-chamber-blue rounded w-4 h-4" />
                          <span className="text-slate-700">Copy of Valid ID or Passport</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" {...register("docs_registration")} className="text-chamber-blue rounded w-4 h-4" />
                          <span className="text-slate-700">Business Registration Documents (if applicable)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" {...register("docs_residence")} className="text-chamber-blue rounded w-4 h-4" />
                          <span className="text-slate-700">Proof of Residence</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" {...register("docs_profile")} className="text-chamber-blue rounded w-4 h-4" />
                          <span className="text-slate-700">Company Profile (optional)</span>
                        </label>
                      </div>

                      <label className="block text-sm font-medium text-slate-700 mb-2">Upload Supporting Documents <span className="text-red-500">*</span></label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center hover:bg-slate-50 transition-colors relative">
                        <input 
                          type="file" 
                          multiple 
                          {...register("documents", { required: true })} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <CloudUpload className="w-10 h-10 text-chamber-blue mx-auto mb-3" />
                        <p className="text-sm font-semibold text-chamber-navy mb-1">Click to Upload or Drag and Drop files here</p>
                        <p className="text-xs text-slate-500">PDF, JPG, PNG (Max 10MB per file)</p>
                      </div>
                      {errors.documents && <span className="text-red-500 text-xs mt-1 block">Please upload your documents</span>}
                    </div>

                    <SectionHeader number="6" title="Declaration & Signature" />

                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
                      <p className="text-sm text-chamber-navy leading-relaxed italic">
                        "I hereby declare that the information provided above is true and correct to the best of my knowledge. I agree to abide by the constitution, rules, and regulations of the Amajuba Economic Chamber and commit to supporting its mission of promoting growth and prosperity in the region."
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Applicant Signature <span className="text-red-500">*</span></label>
                        <div className="bg-slate-50 border border-slate-300 rounded-md p-4 pb-2 relative">
                          <input 
                            type="text" 
                            placeholder="Type your full name to sign" 
                            {...register("signature", { required: true })} 
                            className="w-full bg-transparent border-b-2 border-slate-300 focus:outline-none focus:border-chamber-blue text-center font-display text-xl italic py-4"
                          />
                          <div className="text-[10px] text-slate-400 mt-2 text-right">Digital Signature</div>
                        </div>
                        {errors.signature && <span className="text-red-500 text-xs mt-1 block">Signature required</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Date <span className="text-red-500">*</span></label>
                        <input type="date" {...register("signatureDate", { required: true })} className="w-full rounded-md border-slate-300 border px-4 py-3 focus:outline-none focus:border-chamber-blue focus:ring-1 focus:ring-chamber-blue" />
                        {errors.signatureDate && <span className="text-red-500 text-xs">Required</span>}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-10 border-t border-slate-200 mt-10 flex justify-between">
                {currentStep > 1 && (
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                )}
                <div className={currentStep === 1 ? 'ml-auto' : ''}>
                  {submitError && (
                    <div className="text-red-500 text-sm mb-4 text-right">
                      {submitError}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-chamber-gold text-chamber-navy font-bold rounded-md hover:bg-yellow-400 transition-colors shadow-md flex items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : currentStep < totalSteps ? (
                      <>Next Step <ChevronRight className="w-5 h-5" /></>
                    ) : (
                      'Submit Securely'
                    )}
                  </button>
                </div>
              </div>
            </form>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
