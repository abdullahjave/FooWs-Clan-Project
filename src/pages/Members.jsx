import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Volume2, VolumeX, Play } from 'lucide-react';
import membersData from '../data/members.json';

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/theme-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const tryAutoPlay = async () => {
      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
        setShowMusicPrompt(false);
      } catch (error) {
        console.log('Autoplay prevented');
        setShowMusicPrompt(true);
      }
    };

    tryAutoPlay();

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
      }
    }
  };

  const DEFAULT_CLAN_BADGE = '/FooWs-clans.png';

  const getRoleBadgeImage = (member) => {
    if (member.badge) return `/${member.badge}`;
    if ((member.displayOrder ?? 99) > 8) return DEFAULT_CLAN_BADGE;

    switch (member.role) {
      case 'Leader': return '/badge-leader.svg';
      case 'Sub Leader': return '/badge-subleader.png';
      case 'Commander': return '/badge-commander.png';
      case 'Elite Member': return '/badge-elite.png';
      case 'Veteran': return '/badge-veteran.png';
      default: return DEFAULT_CLAN_BADGE;
    }
  };

  const getRoleLabel = (role) => {
    if (role === 'Leader') return 'FOUNDER / LEADER';
    return role.toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Leader': return '#FFD700';
      case 'Sub Leader': return '#4A9EFF';
      case 'Commander': return '#A855F7';
      case 'Elite Member': return '#10B981';
      case 'Veteran': return '#F97316';
      default: return '#C0C7D4';
    }
  };

  const countries = ['All', ...new Set(membersData.map(m => m.country))];
  const totalCountries = new Set(membersData.map(m => m.country)).size;

  const filteredMembers = membersData
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'All' || member.country === selectedCountry;
      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => {
      const orderDiff = (a.displayOrder ?? 99) - (b.displayOrder ?? 99);
      return orderDiff !== 0 ? orderDiff : a.id - b.id;
    });

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
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-2" style={{ fontFamily: 'Cinzel, serif', color: 'white' }}>
          Clan Members ({filteredMembers.length})
        </h1>
        <p className="text-2xl" style={{ color: 'white' }}>
          From {totalCountries} Countries
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-card p-6 mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 placeholder-white/50 focus:outline-none focus:border-accent-blue transition-colors"
              style={{ color: 'white' }}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-accent-blue transition-colors"
              style={{ color: 'white' }}
            >
              {countries.map(country => (
                <option key={country} value={country} className="bg-primary-800">
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {filteredMembers.map((member, index) => {
          const roleColor = getRoleColor(member.role);
          const badgeImage = getRoleBadgeImage(member);
          
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card hover:glow-border transition-all duration-300"
            >
              <div className="flex items-center gap-8 p-6 flex-wrap lg:flex-nowrap">
                {/* Left Section - Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>NAME:</p>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif', color: 'var(--color-accent-gold)' }}>
                      {member.name}
                    </h3>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>GAME RANGER ID:</p>
                    <p className="text-xl font-bold" style={{ color: 'var(--color-accent-gold)' }}>{member.gameRangerId}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>MEMBERS:</p>
                    <p className="text-xl font-bold" style={{ color: roleColor }}>
                      {getRoleLabel(member.role)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>SPECIALTIES:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-sm px-3 py-1 rounded border border-white/20 font-medium"
                          style={{ backgroundColor: 'rgba(74, 158, 255, 0.2)', color: 'white' }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Middle Section - Role Badge (between details and flag) */}
                <div className="flex items-center justify-center flex-shrink-0 px-4">
                  <img
                    src={badgeImage}
                    alt={`${member.role} badge`}
                    className="w-33 h-33 object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Right Section - Country Flag */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold mb-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>FROM:</p>
                  <img
                    src={`https://flagcdn.com/w320/${member.countryCode.toLowerCase()}.png`}
                    alt={member.country}
                    className="w-40 h-28 object-cover rounded-lg shadow-2xl border-4 border-white/20 ml-auto"
                  />
                  <p className="text-xl font-bold mt-3" style={{ color: 'white' }}>{member.country.toUpperCase()}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No members found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Members;
