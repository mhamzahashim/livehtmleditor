const Divider = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-2">
      <div className="flex items-center gap-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-amber-300/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
          <div className="h-1 w-1 rounded-full bg-amber-300/60" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
};

export default Divider;
