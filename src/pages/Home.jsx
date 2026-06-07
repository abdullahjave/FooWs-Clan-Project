import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Map, Globe, Calendar, Swords } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Calendar, label: 'Founded', value: '1999' },
    { icon: Globe, label: 'Countries', value: '8+' },
    { icon: Users, label: 'Members', value: '25+' },
    { icon: Swords, label: 'Clan Wars', value: '100+' },
    { icon: Map, label: 'Maps Created', value: '20+' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-primary-900 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Banner.jpg')",
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-medieval font-bold mb-4 bg-gradient-to-r from-accent-blue via-accent-silver to-accent-gold bg-clip-text text-transparent"
          >
            FooW Clan
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-accent-gold mb-4 font-medieval"
          >
            Since 1999 - Conquering Kingdoms, Building Legends
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-accent-silver/90 max-w-2xl mx-auto mb-8"
          >
            One of the legendary Age of Kings: The Conquerors communities, bringing together skilled warriors from around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => navigate('/members')} className="btn-primary">
              <Users className="inline-block w-5 h-5 mr-2" />
              View Members
            </button>
            <button onClick={() => navigate('/join')} className="btn-secondary">
              <Trophy className="inline-block w-5 h-5 mr-2" />
              Join Clan
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 -mt-16 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="glass-card glow-border p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <stat.icon className="w-8 h-8 text-accent-blue mx-auto mb-2" />
              <div className="text-3xl font-bold text-accent-gold mb-1">{stat.value}</div>
              <div className="text-sm text-accent-silver/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <h2 className="text-4xl font-medieval font-bold text-accent-blue mb-6">Welcome Warriors</h2>
          <p className="text-lg text-accent-silver/90 max-w-3xl mx-auto leading-relaxed">
            FooW Clan has been a cornerstone of the Age of Empires II community since 1999. 
            Known for our dominance in custom maps, legendary clan wars, and innovative map designs, 
            we continue to honor our legacy while welcoming new warriors to join our ranks.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
