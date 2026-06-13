import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LogIn,
  LogOut,
  Edit3,
  UserCheck,
  UserX,
  Clock,
  Trash2,
  RotateCcw,
  Eye,
  ChevronDown,
  ChevronUp,
  Globe,
  Map,
  Award,
  MessageSquare,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { useMembers } from '../context/MembersContext';

const LeadersPanel = () => {
  const {
    leaderAuth,
    loginLeader,
    logoutLeader,
    allMembers,
    pendingRequests,
    rejectedRequests,
    approveRequest,
    rejectRequest,
    removeRejected,
    reApproveRejected,
    updateMember,
    deleteMember,
  } = useMembers();

  const [loginForm, setLoginForm] = useState({ gameRangerId: '', secretCode: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    country: '',
    gameRangerId: '',
    role: '',
    gender: '',
    specialties: '',
    about: '',
  });

  // ── Login handler ──
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const result = loginLeader(loginForm.gameRangerId, loginForm.secretCode);
    if (!result.success) {
      setLoginError(result.error);
    }
  };

  // ── Toggle card expansion ──
  const toggleCard = (id) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const startEditMember = (member) => {
    setEditingMemberId(member.id);
    setEditForm({
      name: member.name || '',
      country: member.country || '',
      gameRangerId: member.gameRangerId || '',
      role: member.role || '',
      gender: member.gender || '',
      specialties: Array.isArray(member.specialties) ? member.specialties.join(', ') : '',
      about: member.about || '',
    });
  };

  const cancelEditMember = () => {
    setEditingMemberId(null);
  };

  const saveMemberUpdate = (memberId) => {
    const nextSpecialties = editForm.specialties
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateMember(memberId, {
      name: editForm.name.trim(),
      country: editForm.country.trim(),
      gameRangerId: editForm.gameRangerId.trim(),
      role: editForm.role.trim() || 'Recruit',
      gender: editForm.gender.trim() || 'Unknown',
      specialties: nextSpecialties.length > 0 ? nextSpecialties : ['New Recruit'],
      about: editForm.about.trim(),
    });

    setEditingMemberId(null);
  };

  const handleDeleteMember = (member) => {
    const confirmed = window.confirm(`Delete member ${member.name}? This action cannot be undone.`);
    if (!confirmed) return;
    deleteMember(member.id);
    if (editingMemberId === member.id) {
      setEditingMemberId(null);
    }
  };

  // ── If not logged in, show login form ──
  if (!leaderAuth) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-medieval font-bold text-accent-blue mb-4">
            Leaders Panel
          </h1>
          <p className="text-xl text-accent-silver/80">
            Authorized access for FooW Clan leadership only
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent-blue/10 border-2 border-accent-blue/30 flex items-center justify-center">
                <Shield className="w-10 h-10 text-accent-blue" />
              </div>
              <h2 className="text-2xl font-medieval font-bold text-accent-gold">
                Leader Authentication
              </h2>
              <p className="text-sm text-accent-silver/60 mt-2">
                Enter your GameRanger ID and secret code
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                  <Award className="inline-block w-4 h-4 mr-2" />
                  GameRanger ID
                </label>
                <input
                  type="text"
                  value={loginForm.gameRangerId}
                  onChange={(e) => setLoginForm({ ...loginForm, gameRangerId: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors"
                  placeholder="Enter your GameRanger ID"
                  id="leader-gameranger-id"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-accent-silver/80 mb-2">
                  <Shield className="inline-block w-4 h-4 mr-2" />
                  Secret Code
                </label>
                <input
                  type="password"
                  value={loginForm.secretCode}
                  onChange={(e) => setLoginForm({ ...loginForm, secretCode: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-accent-silver focus:outline-none focus:border-accent-blue transition-colors"
                  placeholder="Enter secret code"
                  id="leader-secret-code"
                />
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                >
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {loginError}
                </motion.div>
              )}

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" id="leader-login-btn">
                <LogIn className="w-5 h-5" />
                Login to Panel
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Logged in — show dashboard ──
  const requests = activeTab === 'pending' ? pendingRequests : rejectedRequests;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-medieval font-bold text-accent-blue mb-4">
          Leaders Panel
        </h1>
        <p className="text-xl text-accent-silver/80">
          Manage clan join requests
        </p>
      </motion.div>

      {/* Leader info bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="glass-card p-4 md:p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-gold/10 border-2 border-accent-gold/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-accent-silver/60">Logged in as</p>
              <p className="text-lg font-bold text-accent-gold font-medieval">{leaderAuth.name}</p>
              <p className="text-xs text-accent-blue">{leaderAuth.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{pendingRequests.length}</div>
              <div className="text-xs text-accent-silver/60">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{rejectedRequests.length}</div>
              <div className="text-xs text-accent-silver/60">Rejected</div>
            </div>
            <button
              onClick={logoutLeader}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer text-sm font-medium"
              id="leader-logout-btn"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="flex gap-2 mb-8"
      >
        <button
          onClick={() => setActiveTab('pending')}
          className={`filter-btn flex items-center gap-2 ${activeTab === 'pending' ? 'filter-btn-active' : ''}`}
          id="tab-pending"
        >
          <Clock className="w-4 h-4" />
          Pending Requests ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`filter-btn flex items-center gap-2 ${activeTab === 'rejected' ? 'filter-btn-active' : ''}`}
          id="tab-rejected"
        >
          <UserX className="w-4 h-4" />
          Rejected ({rejectedRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`filter-btn flex items-center gap-2 ${activeTab === 'members' ? 'filter-btn-active' : ''}`}
          id="tab-members"
        >
          <Edit3 className="w-4 h-4" />
          Members ({allMembers.length})
        </button>
      </motion.div>

      {/* Requests list */}
      <div className="space-y-4">
        {activeTab === 'members' && (
          <AnimatePresence mode="popLayout">
            {allMembers.length === 0 ? (
              <motion.div
                key="empty-members"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-12 text-center"
              >
                <p className="text-lg text-accent-silver/50">No members available to manage.</p>
              </motion.div>
            ) : (
              allMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="glass-card p-5 md:p-6"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white font-medieval">{member.name}</h3>
                        <p className="text-sm text-accent-silver/60 mt-1">
                          {member.country} | GR: {member.gameRangerId} | {member.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditMember(member)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500/15 border border-blue-500/25 text-blue-300 hover:bg-blue-500/25 transition-all cursor-pointer text-sm font-medium"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all cursor-pointer text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>

                    {editingMemberId === member.id && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/10 pt-4">
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-accent-silver"
                          placeholder="Name"
                        />
                        <input
                          value={editForm.country}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, country: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-accent-silver"
                          placeholder="Country"
                        />
                        <input
                          value={editForm.gameRangerId}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, gameRangerId: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-accent-silver"
                          placeholder="GameRanger ID"
                        />
                        <input
                          value={editForm.role}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-accent-silver"
                          placeholder="Role"
                        />
                        <input
                          value={editForm.gender}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, gender: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-accent-silver"
                          placeholder="Gender"
                        />
                        <input
                          value={editForm.specialties}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, specialties: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-accent-silver"
                          placeholder="Specialties (comma separated)"
                        />
                        <textarea
                          value={editForm.about}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, about: e.target.value }))}
                          className="md:col-span-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-accent-silver"
                          rows={3}
                          placeholder="About"
                        />

                        <div className="md:col-span-2 flex items-center gap-2 justify-end">
                          <button
                            onClick={cancelEditMember}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-accent-silver hover:bg-white/10 transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => saveMemberUpdate(member.id)}
                            className="px-4 py-2 rounded-lg bg-green-500/15 border border-green-500/25 text-green-300 hover:bg-green-500/25 transition-all"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        )}

        {activeTab !== 'members' && (
        <AnimatePresence mode="popLayout">
          {requests.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card p-12 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                {activeTab === 'pending' ? (
                  <UserCheck className="w-8 h-8 text-accent-silver/30" />
                ) : (
                  <UserX className="w-8 h-8 text-accent-silver/30" />
                )}
              </div>
              <p className="text-lg text-accent-silver/50">
                {activeTab === 'pending'
                  ? 'No pending join requests'
                  : 'No rejected requests'}
              </p>
              <p className="text-sm text-accent-silver/30 mt-2">
                {activeTab === 'pending'
                  ? 'New applications will appear here when players submit the Join Clan form.'
                  : 'Rejected applications will appear here.'}
              </p>
            </motion.div>
          ) : (
            requests.map((request, index) => {
              const isExpanded = expandedCards.has(request.id);
              return (
                <motion.div
                  key={request.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`glass-card overflow-hidden transition-all duration-300 ${
                    activeTab === 'pending'
                      ? 'border-l-4 border-l-yellow-400/50'
                      : 'border-l-4 border-l-red-400/50'
                  }`}
                >
                  {/* Card header */}
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left: applicant info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <img
                            src={`https://flagcdn.com/w80/${request.countryCode.toLowerCase()}.png`}
                            alt={request.country}
                            className="w-8 h-6 object-cover rounded"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white font-medieval">
                            {request.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-accent-silver/60 mt-1">
                            <span className="flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5" />
                              {request.country}
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="w-3.5 h-3.5" />
                              GR: {request.gameRangerId}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {request.joinDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: status + actions */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            activeTab === 'pending'
                              ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25'
                              : 'bg-red-500/15 text-red-400 border border-red-500/25'
                          }`}
                        >
                          {activeTab === 'pending' ? '⏳ Pending' : '✗ Rejected'}
                        </span>

                        {/* Action buttons */}
                        {activeTab === 'pending' ? (
                          <>
                            <button
                              onClick={() => approveRequest(request.id)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/15 border border-green-500/25 text-green-400 hover:bg-green-500/25 transition-all cursor-pointer text-sm font-medium"
                              id={`approve-${request.id}`}
                            >
                              <UserCheck className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => rejectRequest(request.id)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all cursor-pointer text-sm font-medium"
                              id={`reject-${request.id}`}
                            >
                              <UserX className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => reApproveRejected(request.id)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/15 border border-green-500/25 text-green-400 hover:bg-green-500/25 transition-all cursor-pointer text-sm font-medium"
                              id={`reapprove-${request.id}`}
                            >
                              <RotateCcw className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => removeRejected(request.id)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all cursor-pointer text-sm font-medium"
                              id={`remove-${request.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => toggleCard(request.id)}
                          className="view-more-btn"
                          id={`toggle-${request.id}`}
                        >
                          <Eye className="w-4 h-4" />
                          {isExpanded ? 'Less' : 'Details'}
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 border-t border-white/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                            {/* Specialties */}
                            <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                              <h4 className="text-xs font-semibold text-accent-gold mb-2 flex items-center gap-2 uppercase tracking-wider">
                                <Map className="w-3.5 h-3.5" />
                                Favorite Maps / Specialties
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {request.specialties.map((spec, idx) => (
                                  <span
                                    key={idx}
                                    className="text-sm bg-accent-blue/15 px-3 py-1 rounded-full text-accent-blue/80 border border-accent-blue/20"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* About / Message */}
                            <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                              <h4 className="text-xs font-semibold text-accent-gold mb-2 flex items-center gap-2 uppercase tracking-wider">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Applicant Message
                              </h4>
                              <p className="text-sm text-accent-silver/75 italic leading-relaxed">
                                {request.about ? `"${request.about}"` : 'No message provided.'}
                              </p>
                            </div>
                          </div>

                          {/* Meta info */}
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                              <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">Country</div>
                              <div className="text-sm text-accent-silver/90 font-medium">{request.country}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                              <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">GR ID</div>
                              <div className="text-sm text-accent-gold font-bold">{request.gameRangerId}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                              <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">Applied</div>
                              <div className="text-sm text-accent-silver/90 font-medium">{request.joinDate}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5 text-center">
                              <div className="text-xs text-accent-silver/50 uppercase tracking-wider mb-1">Status</div>
                              <div className={`text-sm font-bold ${
                                request.status === 'Pending Review' ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {request.status}
                              </div>
                            </div>
                          </div>

                          {/* Rejection info */}
                          {activeTab === 'rejected' && request.rejectedBy && (
                            <div className="mt-4 bg-red-500/5 rounded-lg p-3 border border-red-500/10 text-sm text-red-400/80">
                              Rejected by <span className="font-bold text-red-400">{request.rejectedBy}</span>
                              {request.rejectedAt && (
                                <span> on {new Date(request.rejectedAt).toLocaleDateString('en-GB', {
                                  day: '2-digit', month: 'long', year: 'numeric',
                                })}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default LeadersPanel;
