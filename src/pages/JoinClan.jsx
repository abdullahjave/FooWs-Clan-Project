import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Globe, Award, Map, MessageSquare, TrendingUp } from 'lucide-react';
import { useMembers } from '../context/MembersContext';

const JoinClan = () => {
  const { addMember } = useMembers();
  const [formData, setFormData] = useState({
    playerName: '',
    country: '',
    gameRangerId: '',
    gender: '',
    favoriteMaps: '',
    experienceLevel: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    // Validate and create join request via context
    const result = addMember(formData);
    if (!result?.success) {
      setSubmitError(result?.error || 'Application could not be submitted.');
      return;
    }

    console.log('Application submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        playerName: '',
        country: '',
        gameRangerId: '',
        gender: '',
        favoriteMaps: '',
        experienceLevel: '',
        message: '',
      });
    }, 3000);
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
          Join FooW Clan
        </h1>
        <p className="text-xl text-accent-silver/80 max-w-2xl mx-auto">
          Become part of a legendary Age of Empires II community with over 25 years of history
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="glass-card p-6">
            <h2 className="text-2xl font-medieval font-bold text-accent-gold mb-4">
              What We're Looking For
            </h2>
            <ul className="space-y-3 text-accent-silver/80">
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                <span>Skilled players passionate about Age of Empires II</span>
              </li>
              <li className="flex items-start gap-3">
                <Map className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                <span>Experience with custom maps and scenarios</span>
              </li>
              <li className="flex items-start gap-3">
                <User className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                <span>Team players who value community and respect</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                <span>Active participation in clan events and wars</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-medieval font-bold text-accent-gold mb-4">
              Member Benefits
            </h2>
            <ul className="space-y-3 text-accent-silver/80">
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold">•</span>
                <span>Access to exclusive custom maps and scenarios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold">•</span>
                <span>Participate in organized clan wars</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold">•</span>
                <span>Connect with players worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold">•</span>
                <span>Training sessions with veteran members</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold">•</span>
                <span>Be part of a legendary gaming community</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="glass-card p-8">
            <h2 className="text-2xl font-medieval font-bold text-accent-gold mb-6">
              Application Form
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-accent-gold mb-2">Application Submitted!</h3>
                <p className="text-accent-silver/80">We'll review your application and get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                    {submitError} Warning: Applicant must be a {`>FooW<_`} member.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    Player Name *
                  </label>
                  <input
                    type="text"
                    name="playerName"
                    value={formData.playerName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors"
                    placeholder="Enter your player name (must include >FooW<_)"
                  />
                  <p className="text-xs text-accent-silver/60 mt-2">
                    Required: player name must contain {`>FooW<_`} clan title.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors"
                  >
                    <option value="" className="bg-primary-800">Select your gender</option>
                    <option value="Male" className="bg-primary-800">Male</option>
                    <option value="Female" className="bg-primary-800">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                    <Globe className="inline-block w-4 h-4 mr-2" />
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors"
                    placeholder="Your country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                    <Award className="inline-block w-4 h-4 mr-2" />
                    GameRanger ID *
                  </label>
                  <input
                    type="text"
                    name="gameRangerId"
                    value={formData.gameRangerId}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors"
                    placeholder="Your GameRanger ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                    <Map className="inline-block w-4 h-4 mr-2" />
                    Favorite Maps
                  </label>
                  <input
                    type="text"
                    name="favoriteMaps"
                    value={formData.favoriteMaps}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors"
                    placeholder="e.g., CBA v21, Vampire Recursion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                    <MessageSquare className="inline-block w-4 h-4 mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors resize-none"
                    placeholder="Tell us about yourself and why you want to join FooW Clan..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Send className="inline-block w-5 h-5 mr-2" />
                  Apply To FooW Clan
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinClan;
