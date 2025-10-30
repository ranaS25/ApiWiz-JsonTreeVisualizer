export default function ObjectNode({ data }) {
  return (
    <div className={`px-4 py-2 rounded-lg border-2 ${data.highlighted ? 'border-yellow-400 bg-yellow-100' : 'border-blue-500 bg-blue-100'} min-w-[80px] text-center cursor-pointer hover:shadow-lg transition-shadow`}>
      <div className="font-semibold text-blue-900">{data.label}</div>
      {data.path && <div className="text-xs text-gray-600 mt-1">{data.path}</div>}
    </div>
  );
}
