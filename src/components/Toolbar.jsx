import { Moon, Sun, Bug } from 'lucide-react';

export default function Toolbar({ darkMode, setDarkMode, createTestGraph }) {
  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>JSON Tree Visualizer</h1>
        <div className="flex items-center gap-2">
          <button onClick={createTestGraph} title="Create test graph" className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            <Bug className="w-4 h-4" />
          </button>
          <button onClick={() => setDarkMode((v) => !v)} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>
    </header>
  );
}
