import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch, searchMessage, darkMode }) {
  return (
    <>
      <div className="flex gap-2 max-w-2xl">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="$.user.address.city"
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <Search className={`absolute left-3 top-2.5 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">Search</button>
      </div>
      {searchMessage && <div className={`mt-2 text-sm ${searchMessage.includes('No match') ? 'text-red-600' : 'text-green-600'}`}>{searchMessage}</div>}
    </>
  );
}
