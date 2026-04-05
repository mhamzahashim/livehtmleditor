const Divider = () => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
};

export default Divider;
