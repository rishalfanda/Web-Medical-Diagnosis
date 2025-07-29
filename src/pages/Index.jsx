import { Stethoscope, Shield, Brain, Users } from "lucide-react";
import { Link } from "react-router-dom";
/* import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/tailwind/Card";
 */import { Button } from "../components/ui/tailwind/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/tailwind/Card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-blue-400">Tuberculosis Screening with Artificial Intelligence</h1>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-400 mb-6">
            Lung X-ray Analysis System
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            An advanced AI platform to assist doctors in detecting and analyzing lung conditions through X-ray images with high accuracy.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4">
              Start Screening
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">Advanced AI</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Leading machine learning technology for X-ray image analysis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">Safe & Trusted</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Patient data is stored with medical-grade encryption
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Stethoscope className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">For Doctors Only</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                The platform is specifically designed for medical professionals.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">Patient Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Easily manage patient data and prediction history
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-blue-400 mb-4">
            Ready to start a more accurate diagnosis?
          </h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join thousands of doctors who have trusted AI to assist with their diagnoses.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-2">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2025 TBC Screen AI UGM. AI-based lung X-ray analysis platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
