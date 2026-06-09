import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords,
  Calendar,
  Clock,
  Map,
  Trophy,
  Users,
  ChevronDown,
  ChevronUp,
  Play,
  Image,
  FileText,
  Timer,
  Gamepad2,
  StickyNote,
} from 'lucide-react';
import ScreenshotModal from './ScreenshotModal';

const resultConfig = {
  victory: {
    label: 'Victory',
    glowClass: 'glow-victory',
    badgeClass: 'badge-victory',
    icon: '🏆',
  },
  defeat: {
    label: 'Defeat',
    glowClass: 'glow-defeat',
    badgeClass: 'badge-defeat',
    icon: '💀',
  },
  draw: {
    label: 'Draw',
    glowClass: 'glow-draw',
    badgeClass: 'badge-draw',
    icon: '🤝',
  },
};

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
};

const WarCard = ({ war, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const config = resultConfig[war.result] || resultConfig.draw;
  const youtubeId = getYouTubeId(war.videoUrl);
  const isLocalVideo =
    war.videoUrl && !youtubeId && war.videoUrl.endsWith('.mp4');
  const hasVideo = youtubeId || isLocalVideo;
  const hasScreenshots = war.screenshots && war.screenshots.length > 0;

  // Format date for display
  const formattedDate = new Date(war.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <motion.div
        id={`war-card-${war.id}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        layout
        className={`glass-card overflow-hidden transition-all duration-300 ${config.glowClass}`}
      >
        {/* ── Collapsed Header ── */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Clan info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <img
                  src="/foow-logo.png"
                  alt="FooW Clan"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="flex items-center gap-2 text-accent-silver/40">
                <Swords className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-accent-silver/60">
                  {war.opponentClan.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-medieval">
                  vs {war.opponentClan}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-accent-silver/60 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {war.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Map className="w-3.5 h-3.5" />
                    {war.map}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Result + Toggle */}
            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold ${config.badgeClass}`}
              >
                {config.icon} {config.label}
              </span>
              <button
                id={`war-toggle-${war.id}`}
                onClick={() => setIsExpanded(!isExpanded)}
                className="view-more-btn"
              >
                {isExpanded ? (
                  <>
                    View Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    View More <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Expanded Details ── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 border-t border-white/10">
                {/* Battle Summary */}
                <div className="mt-6 mb-6">
                  <h4 className="text-sm font-semibold text-accent-gold mb-2 flex items-center gap-2 uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    Battle Summary
                  </h4>
                  <p className="text-accent-silver/85 leading-relaxed">
                    {war.description}
                  </p>
                </div>

                {/* Players Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* FooW Players */}
                  <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                    <h4 className="text-sm font-semibold text-accent-blue mb-3 flex items-center gap-2 uppercase tracking-wider">
                      <Users className="w-4 h-4" />
                      FooW Players
                    </h4>
                    <ul className="space-y-2">
                      {war.foowPlayers.map((player, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-accent-silver/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                          <span className="font-medieval text-sm">
                            {player}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opponent Players */}
                  <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                    <h4 className="text-sm font-semibold text-red-400/80 mb-3 flex items-center gap-2 uppercase tracking-wider">
                      <Users className="w-4 h-4" />
                      {war.opponentClan} Players
                    </h4>
                    <ul className="space-y-2">
                      {war.opponentPlayers.map((player, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-accent-silver/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                          <span className="text-sm">{player}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Match Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                    <Map className="w-4 h-4 text-accent-gold mx-auto mb-1" />
                    <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">
                      Map
                    </div>
                    <div className="text-sm text-accent-silver/90 font-medium">
                      {war.map}
                    </div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                    <Gamepad2 className="w-4 h-4 text-accent-gold mx-auto mb-1" />
                    <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">
                      Game Mode
                    </div>
                    <div className="text-sm text-accent-silver/90 font-medium">
                      {war.gameMode}
                    </div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                    <Timer className="w-4 h-4 text-accent-gold mx-auto mb-1" />
                    <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">
                      Duration
                    </div>
                    <div className="text-sm text-accent-silver/90 font-medium">
                      {war.duration}
                    </div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                    <Trophy className="w-4 h-4 text-accent-gold mx-auto mb-1" />
                    <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">
                      Result
                    </div>
                    <div
                      className={`text-sm font-bold ${
                        war.result === 'victory'
                          ? 'text-green-400'
                          : war.result === 'defeat'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {config.label}
                    </div>
                  </div>
                </div>

                {/* Battle Notes */}
                {war.battleNotes && (
                  <div className="mb-6 bg-white/[0.03] rounded-lg p-4 border border-white/5">
                    <h4 className="text-sm font-semibold text-accent-gold mb-2 flex items-center gap-2 uppercase tracking-wider">
                      <StickyNote className="w-4 h-4" />
                      Additional Notes
                    </h4>
                    <p className="text-accent-silver/75 text-sm leading-relaxed italic">
                      "{war.battleNotes}"
                    </p>
                  </div>
                )}

                {/* Video Replay */}
                {hasVideo && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-accent-gold mb-3 flex items-center gap-2 uppercase tracking-wider">
                      <Play className="w-4 h-4" />
                      Watch Replay
                    </h4>
                    <div className="rounded-lg overflow-hidden border border-white/10">
                      {youtubeId ? (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="Battle Replay"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <video
                          controls
                          className="w-full"
                          src={war.videoUrl}
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                )}

                {/* Screenshot Gallery */}
                {hasScreenshots && (
                  <div>
                    <h4 className="text-sm font-semibold text-accent-gold mb-3 flex items-center gap-2 uppercase tracking-wider">
                      <Image className="w-4 h-4" />
                      Battle Screenshots
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {war.screenshots.map((src, idx) => (
                        <div
                          key={idx}
                          className="screenshot-thumbnail aspect-video"
                          onClick={() => {
                            setModalIndex(idx);
                            setModalOpen(true);
                          }}
                        >
                          <img
                            src={src}
                            alt={`Screenshot ${idx + 1}`}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Screenshot Fullscreen Modal */}
      {modalOpen && hasScreenshots && (
        <ScreenshotModal
          screenshots={war.screenshots}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default WarCard;
