function UserHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Analysis of TB Screen AI Patients
        </h1>
        <p className="text-gray-400 mt-1">AI-based medical diagnosis system</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-white">Welcome Back !</p>
          <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
