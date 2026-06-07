import { motion } from 'framer-motion';
import { Swords, Trophy, Users, Crown, Target, Globe, TrendingUp, Sparkles } from 'lucide-react';

const About = () => {
  const timeline = [
    { year: '1999', title: 'Clan Founded', icon: Crown, desc: 'FooW Clan established by >FooW<_BaD_Ass_™' },
    { year: '2000', title: 'First Clan Wars', icon: Swords, desc: 'Beginning of legendary battles' },
    { year: '2002', title: 'Expansion', icon: Globe, desc: 'International member recruitment' },
    { year: '2004', title: 'Peak Competitive Era', icon: Trophy, desc: 'Dominating custom map scenes' },
    { year: '2006', title: 'Legendary Bad Boys Wars', icon: Target, desc: 'Epic rivalry defining clan history' },
    { year: '2010', title: 'International Growth', icon: Users, desc: 'Members from 8+ countries' },
    { year: '2016', title: 'Clan Peak', icon: TrendingUp, desc: 'Strongest community presence' },
    { year: '2026', title: 'Modern Revival', icon: Sparkles, desc: 'New era of FooW dominance' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-medieval font-bold text-accent-blue mb-4">
          Our Legacy
        </h1>
        <p className="text-xl text-accent-silver/80 max-w-3xl mx-auto">
          A journey through time, from humble beginnings to legendary status
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-card p-8 mb-16"
      >
        <h2 className="text-3xl font-medieval font-bold text-accent-gold mb-6">The Story</h2>
        <div className="space-y-4 text-accent-silver/90 leading-relaxed">
          <p>
            FooW Clan was founded in 1999 by <span className="text-accent-blue font-semibold">&gt;FooW&lt;_BaD_Ass_™</span> from the United States. 
            What started as a small group of passionate Age of Kings players quickly evolved into one of the most 
            respected communities in the game.
          </p>
          <p>
            The clan became known for dominating custom maps, particularly <span className="text-accent-gold">Blood Maps</span>, 
            <span className="text-accent-gold"> Tower Defence</span>, <span className="text-accent-gold">Vampire Recursion</span>, 
            <span className="text-accent-gold"> CBA Heroes</span>, and <span className="text-accent-gold">CBA v21</span>.
          </p>
          <p>
            Between 2000 and 2006, FooW fought many memorable clan wars against <span className="text-accent-blue font-semibold">Bad Boys</span> and 
            other strong communities on GameRanger and Voobly. These battles became the stuff of legend, 
            defining an entire era of competitive Age of Empires II gameplay.
          </p>
          <p>
            The clan remained among the strongest communities until around 2016, maintaining a reputation 
            for excellence, innovation in map design, and fostering a welcoming environment for skilled players 
            from around the world.
          </p>
        </div>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent-blue via-accent-silver to-accent-gold hidden md:block" />
        
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1" />
              
              <div className="relative">
                <div className="w-16 h-16 glass-card glow-border rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-accent-blue" />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                  <div className="w-24 h-24 bg-accent-blue/20 rounded-full blur-xl" />
                </div>
              </div>

              <div className="flex-1">
                <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                  <div className="text-accent-gold font-bold text-2xl font-medieval mb-2">{item.year}</div>
                  <h3 className="text-xl font-semibold text-accent-blue mb-2">{item.title}</h3>
                  <p className="text-accent-silver/80">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
