import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <section className="bg-chamber-navy pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white/10 px-6 py-3 mb-6"
          >
            <ShieldCheck className="w-5 h-5 text-chamber-gold" />
            <span className="text-sm uppercase tracking-widest text-slate-200">Privacy Policy</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 mt-6"
          >
            Your privacy is important to us. This page explains how we collect, use, and protect your information.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-display font-bold text-chamber-navy mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect only the information required to provide you with services and to support membership registration, including your name, email, contact details, and uploaded documents.
            </p>
            <p>
              This information is collected when you register, sign in, or get in touch with us through the website.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-display font-bold text-chamber-navy mb-4">How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-3 text-slate-600">
              <li>To process your membership registration.</li>
              <li>To securely store supporting documents in Supabase storage.</li>
              <li>To communicate important updates about the chamber.</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-display font-bold text-chamber-navy mb-4">Data Security</h2>
            <p className="mb-4">
              We protect your personal information using industry-standard security practices and only retain it for as long as necessary to fulfill the purposes described in this policy.
            </p>
            <p className="text-sm text-slate-500">
              For questions about privacy or data access requests, please contact us at admin@amajubaeconomicchamber.org.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
