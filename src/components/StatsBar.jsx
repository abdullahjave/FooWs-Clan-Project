import { motion } from 'framer-motion';
import { Trophy, Swords, X as XIcon, TrendingUp, BarChart3 } from 'lucide-react';

const StatsBar = ({ wars }) => {
  const total = wars.length;
  const victories = wars.filter((w) => w.result === 'victory').length;
  const defeats = wars.filter((w) => w.result === 'defeat').length;
  const draws = wars.filter((w) => w.result === 'draw').length;
  const winRate = total > 0 ? ((victories / total) * 100).toFixed(1) : 0;

  const stats = [
    {
      label: 'Total Battles',
      value: total,
      icon: BarChart3,
      color: 'text-accent-blue',
      iconColor: 'text-accent-blue',
    },
    {
      label: 'Victories',
      value: victories,
      icon: Trophy,
      color: 'text-green-400',
      iconColor: 'text-green-400',
    },
    {
      label: 'Defeats',
      value: defeats,
      icon: Swords,
      color: 'text-red-400',
      iconColor: 'text-red-400',
    },
    {
      label: 'Draws',
      value: draws,
      icon: XIcon,
      color: 'text-yellow-400',
      iconColor: 'text-yellow-400',
    },
    {
      label: 'Win Rate',
      value: `${winRate}%`,
      icon: TrendingUp,
      color: 'text-accent-gold',
      iconColor: 'text-accent-gold',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="glass-card p-6 md:p-8 mb-8"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.08, duration: 0.4 }}
              className="text-center"
            >
              <Icon
                className={`w-6 h-6 md:w-7 md:h-7 ${stat.iconColor} mx-auto mb-2`}
              />
              <motion.div
                className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.08, duration: 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-accent-silver/60">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StatsBar;
