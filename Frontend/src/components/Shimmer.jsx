function Shimmer() {
  return Array.from({ length: 5 }).map((item, index) => (
    <div
      key={index}
      className="border border-blue-300 shadow rounded-md p-4 w-[49%]"
    >
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-500 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-500 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-500 rounded col-span-2"></div>
              <div className="h-2 bg-slate-500 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-500 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ));
}

export default Shimmer;
