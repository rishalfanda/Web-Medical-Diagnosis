import { Stethoscope, Shield, Brain, Users } from "lucide-react";
import { Link } from "react-router-dom";
/* import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/tailwind/Card";
 */import { Button } from "../components/ui/tailwind/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/tailwind/Card";

const Index = () => {
    console.log("page ini di render")
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-blue-400">TBC Screen With AI</h1>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-400 mb-6">
            Sistem Analisis Rontgen Paru-Paru
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Platform AI canggih untuk membantu dokter dalam mendeteksi dan menganalisis 
            kondisi paru-paru melalui gambar rontgen dengan akurasi tinggi.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4">
              Mulai Analisis
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">AI Canggih</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Teknologi machine learning terdepan untuk analisis gambar rontgen
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">Aman & Terpercaya</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Data pasien tersimpan dengan enkripsi tingkat medis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Stethoscope className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">Khusus Dokter</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Platform dirancang khusus untuk tenaga medis profesional
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-blue-300">Manajemen Pasien</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Kelola data dan riwayat prediksi pasien dengan mudah
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-blue-400 mb-4">
            Siap memulai diagnosis yang lebih akurat?
          </h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Bergabunglah dengan ribuan dokter yang telah mempercayai AI 
            untuk membantu diagnosis mereka.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-2">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2025 TBC Screen AI UGM. Platform analisis rontgen paru-paru berbasis AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
