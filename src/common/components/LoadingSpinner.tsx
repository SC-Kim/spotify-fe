import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BeatLoader color="#1DB954" size={15} />
    </div>
  );
};

export default LoadingSpinner;
