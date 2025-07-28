import { useState } from "react";

export const ZoomableImage = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Gambar kecil */}
      <img
        src={imageUrl}
        alt="X-Ray Scan"
        className="max-w-full max-h-[400px] object-contain transition-transform duration-300 ease-in-out cursor-zoom-in hover:scale-105"
        onClick={() => setIsOpen(true)}
      />

      {/* Popup Modal */}
      {isOpen && (
        <div
          className="overflow-auto fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[95vh] rounded-2xl p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl z-10"
            >
              ×
            </button>
            <img
              src={imageUrl}
              alt="Zoomed X-Ray"
              className="max-w-full max-h-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};