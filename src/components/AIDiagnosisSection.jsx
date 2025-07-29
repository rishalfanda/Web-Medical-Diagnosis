import { getScoreTextColor } from "../utils/helpers";

// Bagian Diagnosis AI - tampil seperti komponen pertama
export const AIDiagnosisSection = ({ diagnosis, confidence }) => {
  const confidenceScore = confidence ?? 0;
  const predictionStatusText = confidenceScore >= 50 
    ? "A significant TB abnormality was detected." 
    : "No significant tuberculosis abnormalities were found. Regular follow-up is recommended.";

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
        <span className="text-sm text-gray-400">TB Confidence Score</span>
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
       Note: This AI analysis is used as an initial screening tool and does not replace professional medical evaluation. Please consult a healthcare professional for a definitive diagnosis.
      </p>
    </div>
  );
};
