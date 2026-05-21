import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <section className="bg-chamber-navy pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white/10 px-6 py-3 mb-6"
          >
            <BookOpen className="w-5 h-5 text-chamber-gold" />
            <span className="text-sm uppercase tracking-widest text-slate-200">Terms of Service</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 mt-6"
          >
            These terms govern your use of the Amajuba Economic Chamber website and services.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-display font-bold text-chamber-navy mb-4">Use of the Website</h2>
            <p className="mb-4">
              By using our website, you agree to provide accurate information and to comply with the registration process.
            </p>
            <p>
              We may update these terms from time to time, and continued use of the site constitutes acceptance of any changes.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-display font-bold text-chamber-navy mb-4">Membership Submission</h2>
            <ul className="list-disc list-inside space-y-3 text-slate-600">
              <li>Your registration information must be complete and truthful.</li>
              <li>Uploaded documents should be valid, current, and relevant to your membership application.</li>
              <li>The chamber reserves the right to review and approve applications before granting membership.</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-3xl font-display font-bold text-chamber-navy mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              The Amajuba Economic Chamber is not liable for any damages arising from the use of the website or the content provided on it.
            </p>
            <p className="text-sm text-slate-500">
              If you have questions about these terms, please contact us at admin@amajubaeconomicchamber.org.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
