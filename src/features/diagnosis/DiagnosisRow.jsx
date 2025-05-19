import CreateAnalystForm from "../form/CreateAnalystForm";

function DiagnosisRow({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-400 mb-6">
          Analisis X-Ray TBC dengan AI
        </h1>
        {children}
      </div>
    </div>
  );
}

export default DiagnosisRow;
