import { Trash2, Download } from 'lucide-react';

export default function LeftPanel({
  jsonInput,
  setJsonInput,
  generateTree,
  handleClear,
  handleDownload,
  error,
  darkMode,
}) {
  return (
    <div className={`w-96 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
      <div className="p-4 flex-1 flex flex-col">
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Paste or type JSON data</label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className={`flex-1 w-full p-3 rounded-lg font-mono text-sm resize-none ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter JSON here..."
        />
        {error && <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">{error}</div>}

        <div className="mt-4 flex gap-2">
          <button onClick={generateTree} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Generate Tree</button>
          <button onClick={handleClear} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`} title="Clear"><Trash2 className="w-5 h-5" /></button>
          <button onClick={handleDownload} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`} title="Download"><Download className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
