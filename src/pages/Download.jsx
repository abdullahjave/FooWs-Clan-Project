import { motion } from 'framer-motion';
import { Download as DownloadIcon, FolderOpen, Gamepad2, Settings, Map, HardDrive } from 'lucide-react';

const Download = () => {
  const downloads = [
    {
      title: 'Full Game & Modes',
      description: 'Complete Age of Kings game with all modes included',
      icon: FolderOpen,
      link: 'https://drive.google.com/drive/folders/1-ee6yxZkzAQf9bVynFB1N1b9UcIupwDd',
      color: 'from-blue-400 via-blue-500 to-blue-600',
    },
    {
      title: 'Version Controller',
      description: 'Essential version controller for game management',
      icon: Settings,
      link: 'https://drive.google.com/file/d/1iLtR1QY7_OQz3m0DDYYVqPY95mtsORaN/view?usp=drive_link',
      color: 'from-purple-400 via-purple-500 to-purple-600',
    },
    {
      title: 'Enhanced Mod (EM)',
      description: 'Amazing graphics and functionality enhancement',
      icon: HardDrive,
      link: 'https://drive.google.com/file/d/1wLrHdJRJIeJH6AUWh2R5acr8K8M5goV4/view?usp=drive_link',
      color: 'from-green-400 via-green-500 to-green-600',
    },
    {
      title: 'Game Files',
      description: 'Main game installation files',
      icon: Gamepad2,
      link: 'https://drive.google.com/file/d/1Z91bEtBodDB_KCKu33OHbOMD_LJSB8hV/view?usp=drive_link',
      color: 'from-yellow-400 via-yellow-500 to-yellow-600',
    },
    {
      title: 'Amazing Maps',
      description: 'Collection of custom maps for enhanced gameplay',
      icon: Map,
      link: 'https://drive.google.com/file/d/1CIGBevXTwuqDV1Wh9aX3poIUEdCESpPj/view?usp=drive_link',
      color: 'from-pink-400 via-pink-500 to-pink-600',
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
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: 'var(--color-accent-blue)' }}>
          Download AOK Game
        </h1>
        <p className="text-xl" style={{ color: 'white' }}>
          Get everything you need to play Age of Kings with FooW Clan
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {downloads.map((download, index) => (
          <motion.div
            key={download.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card p-6 hover:scale-105 transition-all duration-300 glow-border"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${download.color} flex items-center justify-center mb-4 shadow-2xl border-4 border-white/20`}>
                <download.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Cinzel, serif', color: 'var(--color-accent-gold)' }}>
                {download.title}
              </h3>
              
              <p className="text-base mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {download.description}
              </p>
              
              <a
                href={download.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r ${download.color}`}
              >
                <DownloadIcon className="w-5 h-5" />
                Download
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 glass-card p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: 'var(--color-accent-gold)' }}>
          Installation Instructions
        </h3>
        <div className="space-y-3 text-left max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <p>1. Download the Full Game & Modes folder first</p>
          <p>2. Install the Version Controller for proper game management</p>
          <p>3. Apply the Enhanced Mod (EM) for better graphics and features</p>
          <p>4. Download Amazing Maps to expand your gameplay options</p>
          <p className="mt-4 pt-4 border-t border-white/20" style={{ color: 'var(--color-accent-gold)' }}>
            Need help? Contact our leadership team for assistance.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Download;
