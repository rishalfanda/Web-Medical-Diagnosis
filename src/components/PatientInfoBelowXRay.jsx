export const PatientInfoBelowXRay = ({ 
  name, 
  jenisKelamin, 
  modelInfo, 
  gejala, 
  patientType, 
  analysisTime,
  examination,
  historyTB,
  tbStatus
}) => {
  const labelMapping = {
  "xpert_mtb_rif_atau_naat": "Xpert MTB/RIF or NAAT",
  "apus_dahak": "Expel Sputum",
  "kultur": "Culture",
  "igra": "IGRA",
  // tambah label lain kalau butuh
};

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

        {/* Dynamically render examination per category */}
        {Object.entries(examination || {}).map(([category, entries]) => (
          entries.map((entry, idx) => {
            const [label, value] = Object.entries(entry)[0];

            const displayLabel =
              labelMapping[label] || label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
            return (
              <div key={`${category}-${idx}`}>
                <span className="font-semibold text-gray-400 block capitalize">
                  {displayLabel}:
                </span>
                <span className="text-gray-200">{value || 'N/A'}</span>
              </div>
            );
          })
        ))}

        <div>
          <span className="font-semibold text-gray-400 block">History of Tb</span>
          <span className="text-gray-200">{historyTB}</span>
        </div>

        <div>
          <span className="font-semibold text-gray-400 block">TB Status</span>
          <span className="text-gray-200">{tbStatus}</span>
        </div>
      </div>
    </div>
  );
};
