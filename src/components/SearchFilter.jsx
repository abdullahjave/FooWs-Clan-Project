import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

const filters = [
  { key: 'all', label: 'All Battles' },
  { key: 'victory', label: 'Victories' },
  { key: 'defeat', label: 'Defeats' },
  { key: 'draw', label: 'Draws' },
];

const SearchFilter = ({ activeFilter, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="glass-card p-5 md:p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-accent-silver/50 mr-1 hidden md:block" />
          {filters.map((f) => (
            <button
              key={f.key}
              id={`filter-${f.key}`}
              onClick={() => onFilterChange(f.key)}
              className={`filter-btn ${
                activeFilter === f.key ? 'filter-btn-active' : ''
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 md:max-w-sm md:ml-auto">
          <Search className="w-4 h-4 text-accent-silver/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="war-search"
            type="text"
            placeholder="Search opponent, map, or year..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SearchFilter;
