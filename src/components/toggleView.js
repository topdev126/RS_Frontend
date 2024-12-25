import React from "react";

export const ToggleView = ({ isGridView, setIsGridView }) => {
  return (
    <div className="container mt-4">
      {/* Toggle Buttons */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setIsGridView(true)}
          className={`btn btn-lg rounded-3 px-4 py-2 me-2 ${
            isGridView
              ? "bg-primary text-white shadow-sm border-0"
              : "btn-outline-primary"
          } transition-all`}
        >
          Grid View
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`btn btn-lg rounded-3 px-4 py-2 ${
            !isGridView
              ? "bg-primary text-white shadow-sm border-0"
              : "btn-outline-primary"
          } transition-all`}
        >
          List View
        </button>
      </div>
    </div>
  );
};
