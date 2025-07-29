import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AIDiagnosisSection } from "../../components/AIDiagnosisSection";
import { DetailedIndicatorsSection } from "../../components/DetailedIndicatorsSection";
import { XRayImageSection } from "../../components/XRayImageSection";
import { usePostDiagnosis } from "../../hooks/diagnosis/usePostDiagnosis";
import useGuestDiagnosisStore from "../../store/guestDiagnosisStore";


// Main Result Component
function GuestResult() {
  const {guestDiagnosisData} = useGuestDiagnosisStore()
  const {isPost, isError} = usePostDiagnosis()
  const [imageLoading, setImageLoading] = useState(true);

  const {
    areas_label,
    file,
    pred_result
  } = guestDiagnosisData;

  const percentage = pred_result[1].toFixed(2) * 100;

  useEffect(() => {
    if (guestDiagnosisData?.file) {
      const img = new Image();
      img.onload = () => setImageLoading(false);
      img.src = guestDiagnosisData.file;
    }
  }, [guestDiagnosisData?.file]);

  if (isPost) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="mt-4 text-xl">Loading prediction results...</p>
      </div>
    );
  }

  if (isError || !guestDiagnosisData) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-400">An error occurred while loading the diagnosis data..</p>
      </div>
    );
  }

  // Mock detailed indicators based on overall confidence dummy data
  const mockDetailedIndicators = [
    {
      title: "Infiltrate",
      score: areas_label["luas purple"],
      description: areas_label["luas purple"] > 0
        ? "Diffuse infiltrates present in upper lobe"
        : "No significant infiltrate"
    },
    {
      title: "Consolidation",
      score: areas_label["luas pengganti putih"],
      description: areas_label["luas pengganti putih"] > 0
        ? "Moderate consolidation in right upper zone"
        : "No significant consolidation"
    },
    {
      title: "Cavity",
      score: areas_label["luas yellow"],
      description: areas_label["luas yellow"] > 0
        ? "Small cavitation suspected"
        : "No significant cavitation"
    },
    {
      title: "Effusion",
      score: areas_label["luas brown"],
      description: areas_label["luas brown"] > 0
        ? "There is pleural effusion"
        : "No significant pleural effusion"
    },
    {
      title: "Fibrotic",
      score: areas_label["luas blue"],
      description: areas_label["luas blue"] > 0
        ? "Moderate fibrotic changes observed"
        : "No significant fibrotic"
    },
    {
      title: "Calcification",
      score: areas_label["luas darktail"],
      description: areas_label["luas darktail"] > 0
        ? "Minimal calcification noted"
        : "No significant calcification"
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link to="/" className="text-blue-500 hover:text-blue-400 text-sm">
            <i className="fas fa-arrow-left mr-2"></i>&larr; Exit
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <AIDiagnosisSection 
              diagnosis={percentage > 50 ? "TBC" : "Non-TBC"}
              confidence={percentage}
            />
            <DetailedIndicatorsSection indicators={mockDetailedIndicators} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <XRayImageSection 
              imageUrl={file}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button 
            onClick={handlePrint}
            className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center justify-center text-sm"
          >
            <i className="fas fa-print mr-2"></i>Print Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuestResult;