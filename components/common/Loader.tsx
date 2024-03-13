const Loader = ({ positionStart }: any) => {
  return (
    <div
      className={`flex h-screen ${
        positionStart ? "items-start mt-30" : "items-center"
      } justify-center bg-white dark:bg-black`}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-yellow-300 border-t-admin-transparent"></div>
    </div>
  );
};

export default Loader;
