// Patient Info Section - styled like first component
export const PatientInfoBelowXRay = ({ 
  name, 
  jenisKelamin, 
  modelInfo, 
  gejala, 
  patientType, 
  analysisTime 
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="font-semibold text-gray-400 block">Name:</span>
          <span className="text-gray-200">{name}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Gender:</span>
          <span className="text-gray-200">{jenisKelamin}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Model:</span>
          <span className="text-gray-200">{modelInfo}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400 block">Symptoms:</span>
          <span className="text-gray-200">{gejala || 'N/A'}</span>
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