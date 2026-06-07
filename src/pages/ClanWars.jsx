import { motion } from 'framer-motion';
import { Swords, Trophy, Users, Calendar, Map } from 'lucide-react';

const ClanWars = () => {
  const wars = [
    {
      rival: 'Bad Boys Clan',
      period: '2000-2006',
      status: 'Legendary Rivalry',
      maps: ['Arabia', 'CBA Heroes', 'Hitler Maps', 'Blood Maps'],
      players: ['>FooW<_BaD_Ass_™', '>FooW<_Diblo™', '}-Hurricane !!! ™'],
      description: 'Legendary competitive period that defined the early history of FooW Clan. These epic battles on GameRanger became the stuff of legend, with both clans pushing each other to new heights of strategic gameplay.',
      victories: '45+',
      memorable: true,
    },
    {
      rival: 'Various Clans',
      period: '2002-2004',
      status: 'Expansion Era',
      maps: ['Vampire Recursion', 'Tower Defence', 'CBA v21'],
      players: ['>FooW<_BaD_Ass_™', '>FooW<_Diblo™', '>FooW<_NØ_ØNE™'],
      description: 'Period of rapid growth and dominance in custom map competitions. FooW established itself as the premier clan for innovative gameplay.',
      victories: '30+',
      memorable: false,
    },
    {
      rival: 'Elite Gaming Communities',
      period: '2010-2016',
      status: 'Golden Age',
      maps: ['CBA Heroes Turbo', 'RPG Kingdoms', 'Hitler 1000 Pop'],
      players: ['>FooW<_Diblo™', '>FooW<_NØ_ØNE™', ">FooW<_I'm Diana™"],
      description: 'Peak competitive years with international members competing on Voobly. Multiple tournament victories and community recognition.',
      victories: '25+',
      memorable: false,
    },
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
          Clan Wars
        </h1>
        <p className="text-xl text-accent-silver/80">
          Legendary battles that forged our reputation
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-card p-8 mb-12 text-center"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <Trophy className="w-8 h-8 text-accent-gold mx-auto mb-2" />
            <div className="text-3xl font-bold text-accent-gold mb-1">100+</div>
            <div className="text-sm text-accent-silver/70">Total Wars</div>
          </div>
          <div>
            <Swords className="w-8 h-8 text-accent-blue mx-auto mb-2" />
            <div className="text-3xl font-bold text-accent-gold mb-1">6</div>
            <div className="text-sm text-accent-silver/70">Major Rivals</div>
          </div>
          <div>
            <Calendar className="w-8 h-8 text-accent-blue mx-auto mb-2" />
            <div className="text-3xl font-bold text-accent-gold mb-1">25+</div>
            <div className="text-sm text-accent-silver/70">Years Active</div>
          </div>
          <div>
            <Map className="w-8 h-8 text-accent-gold mx-auto mb-2" />
            <div className="text-3xl font-bold text-accent-gold mb-1">15+</div>
            <div className="text-sm text-accent-silver/70">Battle Maps</div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {wars.map((war, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`glass-card p-8 hover:scale-[1.02] transition-all duration-300 ${
              war.memorable ? 'glow-border' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="flex items-center gap-3 mb-4">
                  <Swords className="w-8 h-8 text-accent-blue" />
                  <div>
                    <h2 className="text-2xl font-medieval font-bold text-accent-gold">
                      {war.rival}
                    </h2>
                    <p className="text-sm text-accent-silver/70">{war.period}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent-gold" />
                    <span className="text-accent-silver/80">{war.victories} Victories</span>
                  </div>
                  <div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      war.memorable 
                        ? 'bg-gradient-to-r from-accent-gold to-yellow-600 text-white'
                        : 'bg-accent-blue/20 text-accent-blue'
                    }`}>
                      {war.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 space-y-4">
                <p className="text-accent-silver/90 leading-relaxed">
                  {war.description}
                </p>

                <div>
                  <h3 className="text-sm font-semibold text-accent-gold mb-2 flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    Battle Maps:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {war.maps.map((map, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-white/5 px-3 py-1 rounded-full text-accent-silver/80 border border-white/10"
                      >
                        {map}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-accent-gold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Key Warriors:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {war.players.map((player, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-accent-blue/20 px-3 py-1 rounded-full text-accent-blue border border-accent-blue/30 font-medieval"
                      >
                        {player}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClanWars;
