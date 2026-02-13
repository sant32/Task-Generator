export default function Sidebar({ recentSpecs, onSelect, loading }) {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="font-semibold mb-4">Recent Specs</h2>

      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
        </div>
      ) : recentSpecs.length === 0 ? (
        <p className="text-sm text-gray-500">
          No specs yet
        </p>
      ) : (
        recentSpecs.map((spec) => (
          <div
            key={spec.id}
            onClick={() => onSelect(spec.id)}
            className="cursor-pointer text-sm hover:underline mb-2"
          >
            {spec.title || "Untitled"}
          </div>
        ))
      )}
    </div>
  )
}
