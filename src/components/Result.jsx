import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Clipboard,
  Download,
  LogOut,
  Printer,
  Save,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetDiagnosisId } from "../hooks/diagnosis/useGetDiagnosisId";
import { format } from "date-fns";

const ZoomableImage = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Gambar kecil */}
      <img
        src={imageUrl}
        alt="X-Ray Scan"
        className="w-full h-full object-cover rounded-lg shadow cursor-zoom-in"
        onClick={() => setIsOpen(true)}
      />

      {/* Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={imageUrl}
            alt="Zoomed X-Ray"
            className="max-w-4xl max-h-[90vh] rounded-lg shadow-lg object-contain"
          />
        </div>
      )}
    </>
  );
};

// Komponen untuk preview gambar X-ray dengan heatmap
const ImagePreview = ({
  imageUrl,
  heatmapUrl,
  name,
  jenisKelamin,
  modelInfo,
  patientType,
  analysisTime,
  gejala,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoading(false);
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-500">X-Ray Image</h2>
        <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
          {patientType}
        </span>
      </div>

      {/* X-Ray Image */}
      <div className="bg-gray-800 rounded-xl overflow-hidden flex justify-center items-center p-2 mb-4">
        <div className="relative w-full max-w-[700px] h-[520px]">
          <ZoomableImage imageUrl={imageUrl} />
          {heatmapUrl && (
            <img
              src={heatmapUrl}
              alt="AI Heatmap"
              className="absolute inset-0 w-full h-full object-contain opacity-50 pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 border-t border-gray-700 pt-4 mt-4">
        <div className="space-y-1">
          <p className="text-gray-400 font-medium">Nama:</p>
          <p className="text-white font-semibold">{name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-400 font-medium">Jenis Kelamin:</p>
          <p className="text-white font-semibold">{jenisKelamin}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-400 font-medium">Model:</p>
          <p className="text-white font-semibold">{modelInfo}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-400 font-medium">Gejala:</p>
          <p className="text-white font-semibold">{gejala}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-400 font-medium">Patient Type:</p>
          <p className="text-white font-semibold">{patientType}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-400 font-medium">Analysis Time:</p>
          <p className="text-white font-semibold">{analysisTime}</p>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk menampilkan skor indikasi medis
const VisualInterpretationCard = ({ title, score, description }) => {
  // Warna berdasarkan nilai skor
  const getColorClass = (score) => {
    if (score >= 0.75) return "bg-red-100 text-red-800";
    if (score >= 0.5) return "bg-orange-100 text-orange-800";
    if (score >= 0.25) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const animationDelay = Math.random() * 0.5;

  return (
    <div
      className="bg-gray-800 text-white rounded-lg shadow-sm p-4 border border-gray-100 transition-all hover:shadow-md"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-white">{title}</h3>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClass(
            score
          )}`}
        >
          {(score * 100).toFixed(1)}%
        </div>
      </div>

      <div className="mt-2 relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${score * 100}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
              score >= 0.75
                ? "bg-red-500"
                : score >= 0.5
                ? "bg-orange-500"
                : score >= 0.25
                ? "bg-yellow-500"
                : "bg-green-500"
            } transition-all duration-1000 ease-out`}
          ></div>
        </div>
      </div>

      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};

// Komponen untuk hasil diagnosis dalam bar
const DiagnosisProgressBar = ({ diagnosis, confidence }) => {
  const [animateBar, setAnimateBar] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimateBar(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Generate diagnosis description based on confidence
  const getDiagnosisDescription = (diagnosis, confidence) => {
    if (diagnosis === "TBC Abnormal") {
      if (confidence > 80)
        return "High probability of TBC. Immediate clinical correlation advised.";
      if (confidence > 60)
        return "Moderate indication of TBC abnormalities. Further evaluation recommended.";
      return "Low evidence of TBC abnormalities. Consider additional tests.";
    }
    return "No significant TBC abnormalities detected. Routine follow-up recommended.";
  };

  // Get color based on diagnosis and confidence
  const getConfidenceColor = (diagnosis, confidence) => {
    if (diagnosis === "TBC Abnormal") {
      return confidence > 70 ? "bg-red-600" : "bg-orange-500";
    }
    return "bg-green-500";
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg text-blue-500">AI Diagnosis</h2>
        <div className="text-white text-sm">Confidence Score</div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <AlertCircle
              className={`mr-2 ${
                diagnosis === "TBC Abnormal" ? "text-red-500" : "text-green-500"
              }`}
              size={20}
            />
            <h3 className="font-bold text-xl">{diagnosis}</h3>
          </div>
          <div className="text-2xl font-bold">{confidence}%</div>
        </div>

        <div className="relative h-5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getConfidenceColor(
              diagnosis,
              confidence
            )} transition-all duration-1000 ease-out`}
            style={{ width: animateBar ? `${confidence}%` : "0%" }}
          ></div>
        </div>

        <p className="mt-3 text-gray-600">
          {getDiagnosisDescription(diagnosis, confidence)}
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="text-sm text-white">
          <p>
            <strong>Note:</strong> This AI analysis is intended as a screening
            tool and should not replace professional medical evaluation. Please
            consult a healthcare provider for definitive diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
};

// Komponen utama halaman hasil analisis
function Result() {
  const {isGetting, diagnosisId, error} = useGetDiagnosisId()
  const navigate = useNavigate();
  if (isGetting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing analysis results...</p>
        </div>
      </div>
    );
  }

  if (error || !diagnosisId) {
    return (
      <div className="p-4 text-red-600">
        Terjadi kesalahan saat memuat data diagnosis.
      </div>
    );
  }

  const {
    id, 
    ai_diagnosis,
    created_at, 
    patients, 
    users, 
    gejala, 
    image, 
    model_type, 
    model_version
  } = diagnosisId

  const matchConfidence = ai_diagnosis.match(/\((\d+)%\)/)
  const confidence = matchConfidence ? parseInt(matchConfidence[1], 10) : 0;
  const diagnosis = matchConfidence ? parseInt(matchConfidence[1], 10) : 0;

  console.log(confidence)

  const analysisResult = {
    name: patients.fullName,
    gejala: gejala,
    jenisKelamin: patients.gender,
    imageUrl: image, // Tambahkan gambar sample di folder public
    heatmapUrl: image, // Tambahkan overlay heatmap di folder public
    modelInfo: model_version,
    patientType: model_type,
    analysisTime: created_at,
    diagnosis: diagnosis,
    confidence: confidence,
    indicators: [
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
    ],
  };


  // Handle back to upload
  const handleBack = () => {
    // In a real app, you would use navigation here
    console.log("Navigate back to upload page");
    navigate("/model");
  };



  return (
    <div className="min-h-screen bg-gray-900 p-6">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Upload
          </button>
        </div>

        {/* Layout 2 kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Diagnosis dan Indicators */}
          <div className="lg:col-span-1 space-y-6">
            {/* Diagnosis Result */}
            <DiagnosisProgressBar
              diagnosis={analysisResult.diagnosis}
              confidence={analysisResult.confidence}
            />

            {/* Visual Interpretation Cards */}
            <div>
              <h2 className="font-bold text-lg text-blue-500 mb-3">
                Detailed Indicators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {analysisResult.indicators.map((indicator, index) => (
                  <VisualInterpretationCard
                    key={index}
                    title={indicator.title}
                    score={indicator.score}
                    description={indicator.description}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Gambar Preview lebih besar */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden h-full">
              <ImagePreview
                name={analysisResult.name}
                jenisKelamin={analysisResult.jenisKelamin}
                gejala={analysisResult.gejala}
                imageUrl={analysisResult.imageUrl}
                modelInfo={analysisResult.modelInfo}
                patientType={analysisResult.patientType}
                analysisTime={format(new Date(analysisResult.analysisTime), "EEE, MMM dd yyyy, p")}
              />
            </div>

            <Link
              to={"/"}
              className="flex items-center justify-end text-sm text-gray-300 hover:text-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" /> Exit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
