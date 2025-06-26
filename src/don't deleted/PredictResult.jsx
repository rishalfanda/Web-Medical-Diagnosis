import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { ClinicalSymptoms } from '../types';
import Spinner from '../../ui/Spinner';


// Helper function to determine progress bar color based on score
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

const AIDiagnosisSection = ({ record }) => {
  const confidenceScore = record.predictionResult.probability ?? 0;
  const predictionStatusText = record.predictionResult.details || 
    (confidenceScore >= 50 ? "Significant TBC abnormalities detected." : "No significant TBC abnormalities detected. Routine follow-up recommended.");

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
          <span className={`text-3xl font-bold ${getScoreTextColor(confidenceScore)}`}>{record.predictionResult.status}</span>
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

const IndicatorCard = ({ indicator }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-md font-semibold text-gray-200">{indicator.name}</h4>
        <span className={`text-sm font-bold ${getScoreTextColor(indicator.score)}`}>{indicator.score}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
        <div 
          className={`${getScoreColor(indicator.score)} h-1.5 rounded-full`} 
          style={{ width: `${indicator.score}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400">{indicator.description}</p>
    </div>
  );
};

const DetailedIndicatorsSection = ({ indicators }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Detailed Indicators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {indicators.map(indicator => (
          <IndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </div>
  );
};

const XRayImageSection = ({ 
  record, 
  zoomLevel, 
  handleZoomIn, 
  handleZoomOut, 
  imageLoading, 
  setImageLoading 
}) => {
  return (
    <div className="bg-gray-800 p-4 pt-6 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">X-Ray Image</h2>
      {record.disabilityStatus && (
         <span className="absolute top-3 right-3 bg-brand-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {record.disabilityStatus}
        </span>
      )}
      {record.xrayImageBase64 ? (
        <div className="overflow-hidden flex flex-col items-center">
          {imageLoading && (
            <div className="my-10">
              <Spinner size="md" color="text-white"/> 
              <p className="text-center text-gray-400 mt-2 text-sm">Loading image...</p>
            </div>
          )}
          <img 
            src={record.xrayImageBase64} 
            alt={`Rontgen ${record.name}`}
            className="max-w-full max-h-[400px] object-contain rounded border border-gray-700 transition-transform duration-300 ease-in-out cursor-grab"
            style={{ transform: `scale(${zoomLevel})`, display: imageLoading ? 'none' : 'block' }}
            onLoad={() => setImageLoading(false)}
            onError={() => { setImageLoading(false); console.error("Failed to load image");}}
          />
          <div className="mt-3 flex items-center space-x-2">
            <button onClick={handleZoomOut} title="Zoom Out" className="bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-full shadow-md transition text-xs">
              <i className="fas fa-search-minus"></i>
            </button>
            <span className="text-gray-300 text-xs w-10 text-center">{(zoomLevel * 100).toFixed(0)}%</span>
            <button onClick={handleZoomIn} title="Zoom In" className="bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-full shadow-md transition text-xs">
              <i className="fas fa-search-plus"></i>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">X-ray image not available.</p>
      )}
    </div>
  );
};

const PatientInfoBelowXRay = ({ record }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="font-semibold text-gray-400 block">Nama:</span>
          <span className="text-gray-200">{record.name}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Jenis Kelamin:</span>
          <span className="text-gray-200">{record.gender}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Model:</span>
          <span className="text-gray-200">{record.aiModel.replace('model_v1_', 'Model Versi ')}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Gejala:</span>
          <span className="text-gray-200">{record.symptoms.length > 0 ? record.symptoms.join(', ') : 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Patient Type:</span>
          <span className="text-gray-200">{record.disabilityStatus}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Analysis Time:</span>
          <span className="text-gray-200">
            {new Date(record.predictionDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date(record.predictionDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
        </div>
      </div>
    </div>
  );
};

const PredictionResultPage = () => {
  const { recordId } = useParams();
  const { getPatientRecordById } = useAppContext();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  
  useEffect(() => {
    if (recordId) {
      const foundRecord = getPatientRecordById(recordId);
      if (foundRecord) {
        setRecord(foundRecord);
        setImageLoading(true); // Reset image loading state when record changes
      } else {
        navigate('/dashboard', { replace: true }); 
      }
    }

  }, [recordId, getPatientRecordById, navigate]);

  // Mock detailed indicators based on overall probability
  const mockDetailedIndicators = useMemo(() => {
    if (!record) return [];
    const baseScore = record.predictionResult.probability ?? 30; // Default to 30 if no probability

    const createIndicator = (name, baseMultiplier, randomness, positiveDesc, negativeDesc) => {
      let score = Math.floor(baseScore * baseMultiplier + (Math.random() * randomness - randomness / 2));
      score = Math.max(0, Math.min(100, score)); // Clamp 0-100
      return {
        id: name.toLowerCase(),
        name,
        score,
        description: score > 50 ? positiveDesc : negativeDesc,
      };
    };
    
    // Simulate more specific symptoms correlation
    const hasCough = record.symptoms.includes(ClinicalSymptoms.COUGH_MORE_THAN_2_WEEKS) || record.symptoms.includes(ClinicalSymptoms.COUGH_WITH_PHLEGM);
    const hasFever = record.symptoms.includes(ClinicalSymptoms.FEVER);
    const hasNightSweats = record.symptoms.includes(ClinicalSymptoms.NIGHT_SWEATS);

    let infiltrateScore = baseScore * (hasCough || hasNightSweats ? 1.2 : 0.9) + (Math.random() * 30 - 15);
    let consolidationScore = baseScore * (hasCough || hasFever ? 1.1 : 0.8) + (Math.random() * 30 - 15);
    let cavityScore = baseScore * (hasCough && baseScore > 50 ? 1.0 : 0.6) + (Math.random() * 20 - 10);
    let effusionScore = baseScore * 0.5 + (Math.random() * 20 - 10);
    let fibroticScore = baseScore * 0.7 + (Math.random() * 25 - 12);
    let calcificationScore = baseScore * 0.4 + (Math.random() * 20 - 10);

    return [
      { id: 'infiltrate', name: 'Infiltrate', score: Math.max(0, Math.min(100, Math.floor(infiltrateScore))), description: infiltrateScore > 50 ? 'Diffuse infiltrates present' : 'Minimal or no infiltrates' },
      { id: 'consolidation', name: 'Consolidation', score: Math.max(0, Math.min(100, Math.floor(consolidationScore))), description: consolidationScore > 50 ? 'Moderate consolidation observed' : 'No significant consolidation' },
      { id: 'cavity', name: 'Cavity', score: Math.max(0, Math.min(100, Math.floor(cavityScore))), description: cavityScore > 50 ? 'Small cavitation suspected' : 'No cavitation observed' },
      { id: 'effusion', name: 'Effusion', score: Math.max(0, Math.min(100, Math.floor(effusionScore))), description: effusionScore > 50 ? 'Pleural effusion noted' : 'No significant pleural effusion' },
      { id: 'fibrotic', name: 'Fibrotic', score: Math.max(0, Math.min(100, Math.floor(fibroticScore))), description: fibroticScore > 50 ? 'Moderate fibrotic changes' : 'Minimal fibrotic changes' },
      { id: 'calcification', name: 'Calcification', score: Math.max(0, Math.min(100, Math.floor(calcificationScore))), description: calcificationScore > 50 ? 'Calcification noted' : 'No significant calcification' },
    ].sort((a,b) => b.score - a.score); // Sort by score desc for visual interest
  }, [record]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.2, 0.5));

  if (!record) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <Spinner size="lg" color="text-white" />
        <p className="mt-4 text-xl">Loading prediction results...</p>
      </div>
    );
  }
  
  const handleSaveChanges = () => {
    alert("Results are already saved (simulation)."); // In this app, saving happens before navigating here.
    navigate('/dashboard');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link to="/upload" className="text-brand-blue hover:text-blue-400 text-sm">
            <i className="fas fa-arrow-left mr-2"></i>Back to Upload
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <AIDiagnosisSection record={record} />
            <DetailedIndicatorsSection indicators={mockDetailedIndicators} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <XRayImageSection 
                record={record} 
                zoomLevel={zoomLevel} 
                handleZoomIn={handleZoomIn} 
                handleZoomOut={handleZoomOut}
                imageLoading={imageLoading}
                setImageLoading={setImageLoading}
            />
            <PatientInfoBelowXRay record={record} />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button 
            onClick={handleSaveChanges}
            className="bg-brand-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center justify-center text-sm"
          >
            <i className="fas fa-check mr-2"></i>Confirm & Exit to Dashboard
          </button>
          <button 
            onClick={handlePrint}
            className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center justify-center text-sm"
          >
            <i className="fas fa-print mr-2"></i>Print Results
          </button>
          <Link 
            to="/upload"
            className="bg-brand-green hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 text-center flex items-center justify-center text-sm"
          >
            <i className="fas fa-redo mr-2"></i>New Analysis
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultPage;