export default function PrimitiveNode({ data }) {
  return (
    <div className={`px-4 py-2 rounded-lg border-2 ${data.highlighted ? 'border-yellow-400 bg-yellow-100' : 'border-orange-500 bg-orange-100'} min-w-[100px] text-center cursor-pointer hover:shadow-lg transition-shadow`}>
      <div className="font-semibold text-orange-900">{data.label}</div>
      <div className="text-sm text-gray-700 mt-1">{String(data.value)}</div>
      {data.path && <div className="text-xs text-gray-600 mt-1">{data.path}</div>}
    </div>
  );
}
