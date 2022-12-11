import React from "react";

const ProgressBar: React.FC<{
  progress: number;
}> = ({ progress }) => {
  return (
    <div className="w-full bg-light-gray rounded-full h-2.5 absolute top-0">
      <div
        className="bg-blue-400 h-2.5 rounded-full transition-all ease-out duration-1000"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
