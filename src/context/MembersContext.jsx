import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import hardcodedMembers from '../data/members.json';

// ── Country name → ISO 3166-1 alpha-2 code mapping ──
const COUNTRY_CODE_MAP = {
  'afghanistan': 'AF', 'albania': 'AL', 'algeria': 'DZ', 'argentina': 'AR',
  'armenia': 'AM', 'australia': 'AU', 'austria': 'AT', 'azerbaijan': 'AZ',
  'bahrain': 'BH', 'bangladesh': 'BD', 'belarus': 'BY', 'belgium': 'BE',
  'bolivia': 'BO', 'bosnia': 'BA', 'bosnia and herzegovina': 'BA',
  'brazil': 'BR', 'brunei': 'BN', 'bulgaria': 'BG', 'cambodia': 'KH',
  'cameroon': 'CM', 'canada': 'CA', 'chile': 'CL', 'china': 'CN',
  'colombia': 'CO', 'costa rica': 'CR', 'croatia': 'HR', 'cuba': 'CU',
  'cyprus': 'CY', 'czech republic': 'CZ', 'czechia': 'CZ',
  'denmark': 'DK', 'dominican republic': 'DO',
  'ecuador': 'EC', 'egypt': 'EG', 'el salvador': 'SV', 'estonia': 'EE',
  'ethiopia': 'ET', 'finland': 'FI', 'france': 'FR',
  'georgia': 'GE', 'germany': 'DE', 'ghana': 'GH', 'greece': 'GR',
  'guatemala': 'GT', 'holland': 'NL', 'honduras': 'HN', 'hong kong': 'HK',
  'hungary': 'HU', 'iceland': 'IS', 'india': 'IN', 'indonesia': 'ID',
  'iran': 'IR', 'iraq': 'IQ', 'ireland': 'IE', 'israel': 'IL',
  'italy': 'IT', 'jamaica': 'JM', 'japan': 'JP', 'jordan': 'JO',
  'kazakhstan': 'KZ', 'kenya': 'KE', 'kuwait': 'KW', 'kyrgyzstan': 'KG',
  'latvia': 'LV', 'lebanon': 'LB', 'libya': 'LY', 'lithuania': 'LT',
  'luxembourg': 'LU', 'malaysia': 'MY', 'mali': 'ML', 'malta': 'MT',
  'mexico': 'MX', 'moldova': 'MD', 'mongolia': 'MN', 'montenegro': 'ME',
  'morocco': 'MA', 'mozambique': 'MZ', 'myanmar': 'MM',
  'nepal': 'NP', 'netherlands': 'NL', 'new zealand': 'NZ',
  'nicaragua': 'NI', 'nigeria': 'NG', 'north korea': 'KP',
  'north macedonia': 'MK', 'norway': 'NO',
  'oman': 'OM', 'pakistan': 'PK', 'palestine': 'PS', 'panama': 'PA',
  'paraguay': 'PY', 'peru': 'PE', 'philippines': 'PH', 'poland': 'PL',
  'portugal': 'PT', 'qatar': 'QA', 'romania': 'RO', 'russia': 'RU',
  'saudi arabia': 'SA', 'senegal': 'SN', 'serbia': 'RS',
  'singapore': 'SG', 'slovakia': 'SK', 'slovenia': 'SI',
  'south africa': 'ZA', 'south korea': 'KR', 'spain': 'ES',
  'sri lanka': 'LK', 'sudan': 'SD', 'sweden': 'SE', 'switzerland': 'CH',
  'syria': 'SY', 'taiwan': 'TW', 'tajikistan': 'TJ', 'tanzania': 'TZ',
  'thailand': 'TH', 'tunisia': 'TN', 'turkey': 'TR', 'turkmenistan': 'TM',
  'uganda': 'UG', 'ukraine': 'UA', 'united arab emirates': 'AE',
  'uae': 'AE', 'united kingdom': 'GB', 'uk': 'GB', 'england': 'GB',
  'united states': 'US', 'usa': 'US', 'us': 'US', 'america': 'US',
  'united states of america': 'US',
  'uruguay': 'UY', 'uzbekistan': 'UZ', 'venezuela': 'VE',
  'vietnam': 'VN', 'yemen': 'YE', 'zambia': 'ZM', 'zimbabwe': 'ZW',
};

const getCountryCode = (countryName) => {
  if (!countryName) return 'UN';
  const normalized = countryName.trim().toLowerCase();
  return COUNTRY_CODE_MAP[normalized] || 'UN';
};

// ── localStorage keys ──
const PENDING_KEY = 'foow_clan_pending_requests';
const APPROVED_KEY = 'foow_clan_approved_members';
const REJECTED_KEY = 'foow_clan_rejected_requests';
const MEMBERS_KEY = 'foow_clan_members';

const loadFromStorage = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save to localStorage (${key}):`, e);
  }
};

const REQUIRED_CLAN_TAG = '>FooW<_';

const normalizeText = (value) => (value || '').toString().trim().toLowerCase();

const getEntryKey = (entry) => {
  const gameRangerId = normalizeText(entry?.gameRangerId);
  if (gameRangerId) return `gr:${gameRangerId}`;

  const name = normalizeText(entry?.name);
  const country = normalizeText(entry?.country);
  return `fallback:${name}|${country}`;
};

const dedupeByEntryKey = (list) => {
  const seen = new Set();
  const deduped = [];

  for (let i = list.length - 1; i >= 0; i -= 1) {
    const item = list[i];
    const key = getEntryKey(item);
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }

  return deduped.reverse();
};

// ── Leader credentials (GameRanger IDs of leaders/sub-leaders + secret codes) ──
const LEADER_CREDENTIALS = [
  { gameRangerId: '611000', secretCode: 'foow2000', name: '>FooW<_BaD_Ass_™', role: 'Leader' },
  { gameRangerId: '7991917', secretCode: 'foow2000', name: '>FooW<_I\'m_Diana', role: 'Commander' },
];

const MembersContext = createContext(null);

export const MembersProvider = ({ children }) => {
  const [pendingRequests, setPendingRequests] = useState(() => dedupeByEntryKey(loadFromStorage(PENDING_KEY)));
  const [rejectedRequests, setRejectedRequests] = useState(() => dedupeByEntryKey(loadFromStorage(REJECTED_KEY)));
  const [members, setMembers] = useState(() => {
    const storedMembers = dedupeByEntryKey(loadFromStorage(MEMBERS_KEY));
    if (storedMembers.length > 0) return storedMembers;

    // Backward compatibility: merge legacy approved members into base member list.
    const legacyApproved = dedupeByEntryKey(loadFromStorage(APPROVED_KEY));
    return dedupeByEntryKey([...hardcodedMembers, ...legacyApproved]);
  });
  const [leaderAuth, setLeaderAuth] = useState(null); // { name, role, gameRangerId }

  // Persist to localStorage on change
  useEffect(() => { saveToStorage(PENDING_KEY, pendingRequests); }, [pendingRequests]);
  useEffect(() => { saveToStorage(REJECTED_KEY, rejectedRequests); }, [rejectedRequests]);
  useEffect(() => { saveToStorage(MEMBERS_KEY, members); }, [members]);

  // All displayable members = hardcoded + approved
  const allMembers = dedupeByEntryKey(members);

  // ── Submit a join request (from Join Clan form) ──
  const submitJoinRequest = useCallback((formData) => {
    const playerName = (formData.playerName || '').trim();
    if (!playerName.includes(REQUIRED_CLAN_TAG)) {
      return {
        success: false,
        error: `Name must include ${REQUIRED_CLAN_TAG} clan title.`,
      };
    }

    const gender = (formData.gender || '').trim();
    if (!gender) {
      return {
        success: false,
        error: 'Gender is required.',
      };
    }

    const allExisting = [...members, ...pendingRequests, ...rejectedRequests];
    const maxId = allExisting.length > 0 ? Math.max(...allExisting.map((m) => m.id || 0)) : 0;

    const incomingKey = getEntryKey({
      name: playerName,
      country: formData.country,
      gameRangerId: formData.gameRangerId,
    });

    const alreadyExists = allExisting.some((entry) => getEntryKey(entry) === incomingKey);
    if (alreadyExists) {
      return {
        success: false,
        error: 'Application already exists for this GameRanger ID.',
      };
    }

    const countryCode = getCountryCode(formData.country);
    const specialties = formData.favoriteMaps
      ? formData.favoriteMaps.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const today = new Date();
    const joinDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const request = {
      id: maxId + 1,
      name: playerName,
      country: formData.country,
      countryCode: countryCode,
      gameRangerId: formData.gameRangerId,
      role: 'Recruit',
      badge: 'FooWs-clans.png',
      specialties: specialties.length > 0 ? specialties : ['New Recruit'],
      status: 'Pending Review',
      gender,
      joinDate: joinDate,
      about: formData.message || '',
      submittedAt: today.toISOString(),
    };

    setPendingRequests((prev) => dedupeByEntryKey([...prev, request]));
    return { success: true, request };
  }, [members, pendingRequests, rejectedRequests]);

  // ── Leader approves a request ──
  const approveRequest = useCallback((requestId) => {
    setPendingRequests((prev) => {
      const request = prev.find((r) => r.id === requestId);
      if (!request) return prev;

      // Calculate displayOrder for approved list
      const maxOrder = members.length > 0
        ? Math.max(...members.map((m) => m.displayOrder ?? 0))
        : 0;

      const approvedMember = {
        ...request,
        status: 'Active',
        role: 'Recruit',
        displayOrder: maxOrder + 1,
        approvedAt: new Date().toISOString(),
        approvedBy: leaderAuth?.name || 'Leader',
      };

      setMembers((prevMembers) => dedupeByEntryKey([...prevMembers, approvedMember]));
      return prev.filter((r) => r.id !== requestId);
    });
  }, [leaderAuth, members]);

  // ── Leader rejects a request ──
  const rejectRequest = useCallback((requestId) => {
    setPendingRequests((prev) => {
      const request = prev.find((r) => r.id === requestId);
      if (!request) return prev;

      const rejectedReq = {
        ...request,
        status: 'Rejected',
        rejectedAt: new Date().toISOString(),
        rejectedBy: leaderAuth?.name || 'Leader',
      };

      setRejectedRequests((prevRejected) => dedupeByEntryKey([...prevRejected, rejectedReq]));
      return prev.filter((r) => r.id !== requestId);
    });
  }, [leaderAuth]);

  // ── Remove a rejected request permanently ──
  const removeRejected = useCallback((requestId) => {
    setRejectedRequests((prev) => prev.filter((r) => r.id !== requestId));
  }, []);

  // ── Re-approve a rejected request ──
  const reApproveRejected = useCallback((requestId) => {
    setRejectedRequests((prev) => {
      const request = prev.find((r) => r.id === requestId);
      if (!request) return prev;

      const maxOrder = members.length > 0
        ? Math.max(...members.map((m) => m.displayOrder ?? 0))
        : 0;

      const approvedMember = {
        ...request,
        status: 'Active',
        role: 'Recruit',
        displayOrder: maxOrder + 1,
        approvedAt: new Date().toISOString(),
        approvedBy: leaderAuth?.name || 'Leader',
      };

      setMembers((prevMembers) => dedupeByEntryKey([...prevMembers, approvedMember]));
      return prev.filter((r) => r.id !== requestId);
    });
  }, [leaderAuth, members]);

  // ── Leader updates a member profile ──
  const updateMember = useCallback((memberId, updates) => {
    setMembers((prevMembers) => {
      const idx = prevMembers.findIndex((m) => m.id === memberId);
      if (idx === -1) return prevMembers;

      const current = prevMembers[idx];
      const next = [...prevMembers];
      next[idx] = {
        ...current,
        ...updates,
        name: updates.name !== undefined ? updates.name : current.name,
        country: updates.country !== undefined ? updates.country : current.country,
        gameRangerId: updates.gameRangerId !== undefined ? updates.gameRangerId : current.gameRangerId,
        countryCode: updates.country !== undefined ? getCountryCode(updates.country) : current.countryCode,
        specialties: Array.isArray(updates.specialties) ? updates.specialties : current.specialties,
      };

      return dedupeByEntryKey(next);
    });
  }, []);

  // ── Leader deletes a member ──
  const deleteMember = useCallback((memberId) => {
    setMembers((prevMembers) => prevMembers.filter((m) => m.id !== memberId));
  }, []);

  // ── Leader authentication ──
  const loginLeader = useCallback((gameRangerId, secretCode) => {
    const leader = LEADER_CREDENTIALS.find(
      (l) => l.gameRangerId === gameRangerId && l.secretCode === secretCode
    );
    if (leader) {
      setLeaderAuth({ name: leader.name, role: leader.role, gameRangerId: leader.gameRangerId });
      return { success: true, leader };
    }
    return { success: false, error: 'Invalid GameRanger ID or Secret Code' };
  }, []);

  const logoutLeader = useCallback(() => {
    setLeaderAuth(null);
  }, []);

  return (
    <MembersContext.Provider
      value={{
        // Members data
        allMembers,
        // Join request flow
        submitJoinRequest,
        // Kept for backward compat (alias)
        addMember: submitJoinRequest,
        // Leader panel
        pendingRequests,
        rejectedRequests,
        approveRequest,
        rejectRequest,
        removeRejected,
        reApproveRejected,
        // Member management
        updateMember,
        deleteMember,
        // Auth
        leaderAuth,
        loginLeader,
        logoutLeader,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export const useMembers = () => {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error('useMembers must be used within a MembersProvider');
  }
  return context;
};
