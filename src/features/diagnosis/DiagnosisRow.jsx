
function DiagnosisRow({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-blue-400 mb-6 text-center">
          TB X-ray Analysis with AI
        </h1>
        {children}
      </div>
    </div>
  );
}

export default DiagnosisRow;
