import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Mocking an API call
    return new Promise(resolve => setTimeout(resolve, 1500)).then(() => reset());
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-chamber-navy pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-slate-300">
            Reach out to our leadership to explore partnership frameworks, pilot implementation opportunities, or any general queries.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Cards */}
          <div className="col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100 h-full">
              <h3 className="text-2xl font-display font-bold text-chamber-navy mb-8">Get In Touch</h3>
              
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-50 text-chamber-blue rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Head Office</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Madadeni Sec 6, Red Street<br />
                    Industrial Side, Unit 9<br />
                    KwaZulu-Natal, South Africa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-50 text-chamber-blue rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Phone Numbers</h4>
                  <p className="text-slate-600 text-sm">067 198 4100</p>
                  <p className="text-slate-600 text-sm">068 334 1826</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-50 text-chamber-blue rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Email Address</h4>
                  <a href="mailto:admin@amajubaeconomicchamber.org" className="text-chamber-blue hover:underline text-sm break-all">
                    admin@amajubaeconomicchamber.org
                  </a>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100">
                <p className="text-sm text-slate-500 italic">
                  "Establishing a sustainable rollout model across the district." <br />- T. Khanyile, Chairperson
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-md border border-slate-100">
              <h3 className="text-2xl font-display font-bold text-chamber-navy mb-2">Send a Message</h3>
              <p className="text-slate-500 mb-8">Fill out the form below and our team will get back to you shortly.</p>
              
              {isSubmitSuccessful && (
                <div className="mb-8 p-4 bg-green-50 text-green-800 rounded-md border border-green-200">
                  Thank you for reaching out. We have received your message.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full rounded-md border-slate-300 border px-4 py-3 focus:border-chamber-blue focus:ring-chamber-blue transition-colors"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
                      })}
                      className="w-full rounded-md border-slate-300 border px-4 py-3 focus:border-chamber-blue focus:ring-chamber-blue transition-colors"
                      placeholder="jane@example.com"
                    />
                    {errors.email && <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full rounded-md border-slate-300 border px-4 py-3 focus:border-chamber-blue focus:ring-chamber-blue transition-colors"
                    placeholder="Proposal for partnership"
                  />
                  {errors.subject && <span className="text-sm text-red-500 mt-1">{errors.subject.message}</span>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full rounded-md border-slate-300 border px-4 py-3 focus:border-chamber-blue focus:ring-chamber-blue transition-colors resize-none"
                    placeholder="Please detail your inquiry here..."
                  ></textarea>
                  {errors.message && <span className="text-sm text-red-500 mt-1">{errors.message.message}</span>}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-chamber-gold text-chamber-navy font-bold rounded-md hover:bg-yellow-400 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
