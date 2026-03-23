const MainLoading = () => {
  return (
    <div className="flex flex-col gap-4 p-4 animate-pulse" aria-busy="true">
      <div className="h-8 w-48 rounded bg-alice-blue" />
      <div className="h-64 rounded-xl bg-ghost-grey" />
    </div>
  );
};

export default MainLoading;
