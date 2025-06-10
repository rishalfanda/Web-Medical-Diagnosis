import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetDiagnosisId } from "../../hooks/diagnosis/useGetDiagnosisId";
import useGuestDiagnosisStore from "../../store/guestDiagnosisStore";
import { usePostDiagnosis } from "../../hooks/diagnosis/usePostDiagnosis";


// Helper functions from first component
const getScoreColor = (score) => {
  if (score > 70) return 'bg-red-500';
  if (score > 40) return 'bg-orange-500';
  if (score > 20) return 'bg-yellow-500';
  return 'bg-green-500';
};

const getScoreTextColor = (score) => {
  if (score > 70) return 'text-red-400';
  if (score > 40) return 'text-orange-400';
  if (score > 20) return 'text-yellow-400';
  return 'text-green-400';
};

const ZoomableImage = ({ imageUrl }) => {
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
          <div className="relative max-w-6xl max-h-[95vh] bg-gray-800 rounded-2xl p-4">
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

// AI Diagnosis Section - styled like first component
const AIDiagnosisSection = ({ diagnosis, confidence }) => {
  const confidenceScore = confidence ?? 0;
  const predictionStatusText = confidenceScore >= 50 
    ? "Significant TBC abnormalities detected." 
    : "No significant TBC abnormalities detected. Routine follow-up recommended.";

  const getConfidenceColor = (score) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 50) return 'bg-orange-500';
    if (score >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getConfidenceIcon = (score) => {
    if (score >= 70) return 'fas fa-exclamation-triangle text-red-400';
    if (score >= 50) return 'fas fa-exclamation-circle text-orange-400';
    if (score >= 30) return 'fas fa-info-circle text-yellow-400';
    return 'fas fa-check-circle text-green-400';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-white">AI Diagnosis</h2>
        <span className="text-sm text-gray-400">Confidence Score</span>
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <i className={`${getConfidenceIcon(confidenceScore)} fa-2x mr-3`}></i>
          <span className={`text-3xl font-bold ${getScoreTextColor(confidenceScore)}`}>{diagnosis}</span>
        </div>
        <span className={`text-3xl font-bold ${getScoreTextColor(confidenceScore)}`}>{confidenceScore}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-3">
        <div 
          className={`${getConfidenceColor(confidenceScore)} h-2.5 rounded-full`} 
          style={{ width: `${confidenceScore}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-300 mb-3">{predictionStatusText}</p>
      <p className="text-xs text-gray-500 italic">
        Note: This AI analysis is intended as a screening tool and should not replace professional medical evaluation. Please consult a healthcare provider for definitive diagnosis.
      </p>
    </div>
  );
};

// Indicator Card Component - styled like first component
const IndicatorCard = ({ indicator }) => {
  const score = Math.round(indicator.score * 100); // Convert decimal to percentage
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-md font-semibold text-gray-200">{indicator.title}</h4>
        <span className={`text-sm font-bold ${getScoreTextColor(score)}`}>{score}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
        <div 
          className={`${getScoreColor(score)} h-1.5 rounded-full`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400">{indicator.description}</p>
    </div>
  );
};

// Detailed Indicators Section - styled like first component
const DetailedIndicatorsSection = ({ indicators }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Detailed Indicators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {indicators.map((indicator, index) => (
          <IndicatorCard key={index} indicator={indicator} />
        ))}
      </div>
    </div>
  );
};

// X-Ray Image Section - styled like first component
const XRayImageSection = ({ 
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

// Patient Info Section - styled like first component
const PatientInfoBelowXRay = ({ 
  modelInfo, 
  patientType, 
  analysisTime 
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="font-semibold text-gray-400 block">Model:</span>
          <span className="text-gray-200">{modelInfo}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Patient Type:</span>
          <span className="text-gray-200">{patientType}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Analysis Time:</span>
          <span className="text-gray-200">{analysisTime}</span>
        </div>
      </div>
    </div>
  );
};

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

  console.log(areas_label, pred_result)

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
        <p className="text-red-400">Terjadi kesalahan saat memuat data diagnosis.</p>
      </div>
    );
  }

  // Mock detailed indicators based on overall confidence
  const mockDetailedIndicators = [
    {
      title: "Infiltrate",
      score: 0.82,
      description: "Diffuse infiltrates present in upper lobe",
    },
    {
      title: "Consolidation",
      score: 0.65,
      description: "Moderate consolidation in right upper zone",
    },
    {
      title: "Cavity",
      score: 0.37,
      description: "Small cavitation suspected",
    },
    {
      title: "Effusion",
      score: 0.12,
      description: "No significant pleural effusion",
    },
    {
      title: "Fibrotic",
      score: 0.58,
      description: "Moderate fibrotic changes observed",
    },
    {
      title: "Calcification",
      score: 0.21,
      description: "Minimal calcification noted",
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link to="/guest" className="text-blue-500 hover:text-blue-400 text-sm">
            <i className="fas fa-arrow-left mr-2"></i>&larr; Back to Guest Form
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <AIDiagnosisSection 
              diagnosis={percentage}
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
            {/*<PatientInfoBelowXRay 
              name={patients.fullName}
              jenisKelamin={patients.gender}
              modelInfo={model_version}
              gejala={gejala}
              patientType={model_type}
              analysisTime={format(new Date(created_at), "dd MMM yyyy, HH:mm")}
            />*/}
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