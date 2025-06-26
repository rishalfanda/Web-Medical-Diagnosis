import { ZoomableImage } from "./ZoomableImage";

// X-Ray Image Section - styled like first component
export const XRayImageSection = ({ 
  imageUrl, 
  patientType,
  imageLoading, 
}) => {
  return (
    <div className="bg-gray-800 p-4 pt-6 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">X-Ray Image</h2>
      {patientType && (
         <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {patientType}
        </span>
      )}
      {imageUrl ? (
        <div className="overflow-hidden flex flex-col items-center">
          {imageLoading && (
            <div className="my-10">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-center text-gray-400 mt-2 text-sm">Loading image...</p>
            </div>
          )}
          <div 
            className="inline-block border border-gray-700 rounded-lg overflow-hidden"
            style={{ display: imageLoading ? 'none' : 'inline-block' }}
          >
            <ZoomableImage imageUrl={imageUrl} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">X-ray image not available.</p>
      )}
    </div>
  );
};