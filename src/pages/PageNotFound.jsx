import { Link } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";
import { ArrowLeft, AlertTriangle } from "lucide-react";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-12 max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-amber-100 p-6 rounded-full">
            <AlertTriangle className="w-16 h-16 text-amber-500" />
          </div>
        </div>
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        
        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The page you are looking for could not be found 😢
        </p>
        
        {/* Additional message */}
        <p className="text-sm text-gray-500 mb-10">
          It seems like the page you're trying to access doesn't exist or has been moved.
        </p>
        
        {/* Go back button */}
        <button 
          onClick={moveBack}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
        
        {/* Alternative action */}
        <div className="mt-6">
          <Link 
            to= "/"
            className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
          >
            Or go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;