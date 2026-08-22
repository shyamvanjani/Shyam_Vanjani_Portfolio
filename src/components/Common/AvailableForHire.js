function AvailableForHire() {
  return (
    <div className="flex items-center justify-center button button--ghost text-amber-400 pointer-events-none gap-2.5 px-2.5 md:button--big md:px-2.5 dark:text-amber-400 text-sm md:text-xl font-bold">
      <span className="relative flex h-2 w-2">
        <span className="bg-amber-400 absolute -top-1 -left-1 inline-flex h-4 w-4 animate-ping rounded-full opacity-75 dark:bg-amber-400" />
        <span className="bg-amber-400 relative inline-flex h-2 w-2 rounded-full dark:bg-amber-400" />
      </span>
      Available For Hire
    </div>
  );
}

export default AvailableForHire;
