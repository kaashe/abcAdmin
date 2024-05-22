function SuspenseContent() {
    return (
      <div className="flex justify-center items-center w-full h-screen text-gray-300 dark:text-gray-200 bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  export default SuspenseContent;
  