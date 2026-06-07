import { motion } from 'framer-motion';
import { Map, User, Award, TrendingUp, Star } from 'lucide-react';
import mapsData from '../data/maps.json';

const CustomMaps = () => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Expert': return 'text-red-500 border-red-500/30 bg-red-500/10';
      case 'Hard': return 'text-orange-500 border-orange-500/30 bg-orange-500/10';
      case 'Medium': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-green-500 border-green-500/30 bg-green-500/10';
    }
  };

  const getPopularityStars = (popularity) => {
    switch (popularity) {
      case 'Legendary': return 5;
      case 'Very High': return 4;
      case 'High': return 3;
      default: return 2;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-medieval font-bold text-accent-blue mb-4">
          Custom Maps
        </h1>
        <p className="text-xl text-accent-silver/80">
          Innovative creations that defined an era of gameplay
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-card p-8 mb-12"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Map className="w-10 h-10 text-accent-blue mx-auto mb-3" />
            <div className="text-3xl font-bold text-accent-gold mb-2">20+</div>
            <div className="text-accent-silver/70">Custom Maps</div>
          </div>
          <div>
            <TrendingUp className="w-10 h-10 text-accent-gold mx-auto mb-3" />
            <div className="text-3xl font-bold text-accent-gold mb-2">10K+</div>
            <div className="text-accent-silver/70">Downloads</div>
          </div>
          <div>
            <Award className="w-10 h-10 text-accent-blue mx-auto mb-3" />
            <div className="text-3xl font-bold text-accent-gold mb-2">5</div>
            <div className="text-accent-silver/70">Featured Maps</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mapsData.map((map, index) => (
          <motion.div
            key={map.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card overflow-hidden hover:scale-105 hover:glow-border transition-all duration-300"
          >
            <div className="h-48 bg-gradient-to-br from-primary-700 to-primary-900 relative overflow-hidden">
              {map.image ? (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${map.image})` }} />
              ) : (
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80')] bg-cover bg-center opacity-30" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-medieval font-bold text-accent-gold mb-1">
                  {map.name}
                </h3>
                <p className="text-sm text-accent-silver/70">{map.versions}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-accent-silver/80 text-sm leading-relaxed min-h-[60px]">
                {map.description}
              </p>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent-blue" />
                <span className="text-sm text-accent-silver/70">
                  Creator: <span className="text-accent-blue font-semibold">{map.creator}</span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-gold" />
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getDifficultyColor(map.difficulty)}`}>
                    {map.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(getPopularityStars(map.popularity))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-accent-silver/60">Popularity</span>
                  <span className="text-xs font-semibold text-accent-gold">{map.popularity}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 glass-card p-8 text-center"
      >
        <h2 className="text-3xl font-medieval font-bold text-accent-blue mb-4">
          Legacy of Innovation
        </h2>
        <p className="text-accent-silver/80 max-w-3xl mx-auto leading-relaxed">
          FooW Clan's custom maps revolutionized Age of Empires II gameplay. From the legendary 
          Vampire Recursion series to innovative defense scenarios, our maps have been played by 
          thousands of players worldwide and continue to inspire new generations of map creators.
        </p>
      </motion.div>
    </div>
  );
};

export default CustomMaps;
