import { ArrowRight, BookOpen, Building, Handshake, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  const pillars = [
    {
      title: "Tendering & Procurement",
      description: "Understanding municipal processes, compliance, and ethical participation.",
      icon: <Building className="w-8 h-8 text-chamber-gold" />
    },
    {
      title: "Funding Utilisation",
      description: "Financial literacy, responsible fund management, and sustainability planning.",
      icon: <TrendingUp className="w-8 h-8 text-chamber-gold" />
    },
    {
      title: "Governance Education",
      description: "Civic rights, accountability mechanisms, and community participation structures.",
      icon: <BookOpen className="w-8 h-8 text-chamber-gold" />
    },
    {
      title: "Community Leadership",
      description: "Participatory governance, organizing, and conflict resolution frameworks.",
      icon: <Users className="w-8 h-8 text-chamber-gold" />
    },
    {
      title: "Economic Participation",
      description: "Enterprise development models for cooperatives, youth, and informal traders.",
      icon: <Handshake className="w-8 h-8 text-chamber-gold" />
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-chamber-navy pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579389083046-d3ce177901cb?auto=format&fit=crop&q=80&w=2000" 
            alt="Business collaboration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
            >
              Promoting <span className="text-chamber-gold">Growth</span> & <span className="text-chamber-gold">Prosperity</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed"
            >
              Building practical knowledge, competence, and community-level capacity 
              enabling populations to engage meaningfully with government systems and participate 
              sustainably in Amajuba's local economic development.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/registration" 
                className="px-8 py-4 bg-chamber-gold text-chamber-navy font-bold rounded-md hover:bg-yellow-400 transition-colors shadow-lg text-center"
              >
                Become a Member
              </Link>
              <Link 
                to="/about" 
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-md border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm text-center"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Mandates / Pillars */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-sans font-bold text-chamber-blue uppercase tracking-widest mb-3">Our Core Mandates</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-chamber-navy">
              Empowering the Amajuba District
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-100 p-8 rounded-xl hover:shadow-xl transition-shadow group"
              >
                <div className="bg-white w-16 h-16 rounded-lg shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-display font-bold text-chamber-navy mb-3">
                  {pillar.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Opportunity CTA */}
      <section className="bg-chamber-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">A Strategic Opportunity for Growth</h2>
          <p className="text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed mb-10">
            This initiative presents a strategic opportunity to build informed, empowered, economically active communities that are capable of responsibly accessing, managing, and growing development resources for long-term impact.
          </p>
          <Link 
            to="/registration" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-chamber-navy text-white font-semibold rounded-md hover:bg-slate-800 transition-colors shadow-lg"
          >
            Register Your Interest <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
