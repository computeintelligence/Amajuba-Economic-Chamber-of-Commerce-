import { motion } from 'motion/react';
import { Target, Lightbulb, Users, ChartBar, Presentation, BookOpen, CircleAlert } from 'lucide-react';

export default function About() {
  const problemStatements = [
    "Limited understanding of government systems and funding mechanisms",
    "Inadequate knowledge of tendering and procurement processes",
    "Poor awareness of municipal structures, roles, and responsibilities",
    "Low levels of governance literacy and civic education",
    "Weak capacity to effectively manage and utilise funds when accessed",
    "Limited participation in economic development opportunities",
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-chamber-navy pt-20 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            About The Chamber
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300"
          >
            Driving sustainable local economic development and community capacity-building.
          </motion.p>
        </div>
      </section>

      {/* Rationale */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-chamber-blue font-bold tracking-widest text-sm uppercase mb-4">
                <CircleAlert className="w-5 h-5" /> Rationale
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-chamber-navy mb-6">
                Overcoming District Challenges
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                As a result of systemic gaps in knowledge and access, many community members, cooperatives, SMMEs, and community structures are unable to fully benefit from available public resources, economic opportunities, and development programmes in the Amajuba District.
              </p>
              <ul className="space-y-4">
                {problemStatements.map((statement, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-chamber-gold mt-2 shrink-0" />
                    <span className="text-slate-700">{statement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-chamber-blue relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200" 
                  alt="Team strategy meeting"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-chamber-gold rounded-full blur-3xl opacity-30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Implementation & Alignment */}
      <section className="bg-white py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* LED Alignment */}
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 text-chamber-blue rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-bold text-chamber-navy">Alignment with LED Mandates</h3>
              </div>
              <div className="prose prose-lg text-slate-600">
                <p>This programme directly supports Local Economic Development objectives through:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {['Local skills development', 'Community empowerment', 'Enterprise development', 'Employment creation', 'Inclusive economic participation', 'Sustainable development', 'Institutional strengthening', 'Resilience building'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-chamber-gold" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Implementation Approach */}
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 text-chamber-blue rounded-lg flex items-center justify-center">
                  <Presentation className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-bold text-chamber-navy">Implementation Approach</h3>
              </div>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-6">The structure of our programmes relies heavily on practical, community-based methods to ensure maximum impact and retention:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-chamber-gold" /> Structured training modules</li>
                  <li className="flex items-center gap-3"><Users className="w-5 h-5 text-chamber-gold" /> Accredited, local facilitation</li>
                  <li className="flex items-center gap-3"><Lightbulb className="w-5 h-5 text-chamber-gold" /> Participatory learning methods</li>
                  <li className="flex items-center gap-3"><ChartBar className="w-5 h-5 text-chamber-gold" /> Outcomes-based assessments</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
