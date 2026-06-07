import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, Sword, MapPin, Award, Volume2, VolumeX, Play } from 'lucide-react';

const Leadership = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/theme-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Try auto-play
    const tryAutoPlay = async () => {
      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
        setShowMusicPrompt(false);
      } catch (error) {
        console.log('Autoplay prevented by browser. User interaction required.');
        setShowMusicPrompt(true);
      }
    };

    tryAutoPlay();

    // Error handling
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setShowMusicPrompt(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isMusicPlaying) {
          audioRef.current.pause();
          setIsMusicPlaying(false);
        } else {
          await audioRef.current.play();
          setIsMusicPlaying(true);
          setShowMusicPrompt(false);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        alert('Unable to play music. Please check if the theme-music.mp3 file exists in the public folder.');
      }
    }
  };

  const leaders = [
    {
      name: '>FooW<_BaD_Ass_™',
      country: 'United States',
      countryCode: 'US',
      role: 'Leader',
      gameRangerId: '611000',
      identity: 'Male',
      specialties: ["AOK DOTA",'Blood Maps', 'Tower Defence', 'Vampire Recursion'],
      description: 'Founder of FooW Clan and one of the original veterans of Age of Kings clan warfare.',
      icon: Crown,
      badge: 'founder',
    },
    {
      name: '>FooW<_Diblo',
      country: 'United States',
      countryCode: 'US',
      role: 'Sub Leader',
      gameRangerId: '397841',
      identity: 'Male',
      specialties: ['CBA Heroes Turbo', 'Blood Maps', 'Vampire Recursion', 'Tower Defence'],
      description: 'Legendary map designer known for creating multiple versions of Vampire Recursion and several famous custom maps.',
      icon: Shield,
      badge: 'subleader',
    },
    {
      name: '>FooW<_I\'m Diana',
      country: 'Russia',
      countryCode: 'RU',
      role: 'Commander',
      gameRangerId: '7991917',
      identity: 'Female',
      specialties: ['CBA v21', 'RPG', 'Tower Defence' , "AOK DOTA"],
      description: 'Strategic commander and active competitive player.',
      icon: Sword,
      badge: 'commander',
    },
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'founder': return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 'subleader': return 'from-blue-400 via-blue-500 to-blue-600';
      case 'commander': return 'from-purple-400 via-purple-500 to-purple-600';
      default: return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  const getBadgeImage = (role) => {
    switch (role) {
      case 'Leader': return '/badge-leader.svg';
      case 'Sub Leader': return '/badge-subleader.png';
      case 'Commander': return '/badge-commander.png';
      default: return '/FooWs-clans.png';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {showMusicPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 glass-card glow-border px-6 py-3 flex items-center gap-3 shadow-2xl"
          style={{ backgroundColor: 'rgba(74, 158, 255, 0.3)' }}
        >
          <Play className="w-5 h-5" style={{ color: 'var(--color-accent-gold)' }} />
          <span style={{ color: 'white', fontWeight: '500' }}>Click the music button to play theme</span>
          <button
            onClick={() => setShowMusicPrompt(false)}
            className="ml-2 text-white/70 hover:text-white"
          >
            ✕
          </button>
        </motion.div>
      )}

      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 glass-card rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 glow-border shadow-2xl"
        style={{ backgroundColor: isMusicPlaying ? 'rgba(74, 158, 255, 0.4)' : 'rgba(74, 158, 255, 0.2)' }}
        aria-label="Toggle music"
        title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isMusicPlaying ? (
          <Volume2 className="w-7 h-7" style={{ color: 'var(--color-accent-blue)' }} />
        ) : (
          <VolumeX className="w-7 h-7" style={{ color: 'var(--color-accent-silver)' }} />
        )}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif', color: 'var(--color-accent-blue)' }}>
          Leadership
        </h1>
        <p className="text-xl" style={{ color: 'white' }}>
          The minds behind FooW Clan's legendary success
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, index) => (
          <motion.div
            key={leader.gameRangerId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-card p-6 hover:scale-105 transition-all duration-300 glow-border"
          >
            <div className="relative mb-6">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
                <div className={`text-xs font-bold px-4 py-1.5 rounded-full shadow-xl border-2 border-white/30 bg-gradient-to-r ${getBadgeColor(leader.badge)} text-white`}>
                  {leader.role}
                </div>
              </div>
              <div className="mt-4 text-center">
                <img
                  src={getBadgeImage(leader.role)}
                  alt={`${leader.role} badge`}
                  className="w-32 h-32 object-contain drop-shadow-2xl mx-auto"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-center mb-3 break-words" style={{ fontFamily: 'Cinzel, serif', color: 'var(--color-accent-gold)' }}>
              {leader.name}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src={`https://flagcdn.com/w160/${leader.countryCode.toLowerCase()}.png`}
                alt={leader.country}
                className="w-16 h-12 object-cover rounded shadow-lg border-2 border-white/20"
              />
              <span className="text-base font-semibold" style={{ color: 'white' }}>{leader.country}</span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Award className="w-5 h-5" style={{ color: 'var(--color-accent-gold)' }} />
                <span style={{ color: 'white' }}>GameRanger ID: {leader.gameRangerId}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2 text-center" style={{ color: 'var(--color-accent-gold)' }}>Identity:</h4>
              <p className="text-sm font-bold text-center" style={{ color: 'white' }}>
                {leader.identity}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2 text-center" style={{ color: 'var(--color-accent-gold)' }}>Specialties:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {leader.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full border border-white/20"
                    style={{ backgroundColor: 'rgba(74, 158, 255, 0.2)', color: 'white' }}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-center" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {leader.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
