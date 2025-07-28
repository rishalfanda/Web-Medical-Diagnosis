import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetDiagnosisId } from "../../hooks/diagnosis/useGetDiagnosisId";
import { AIDiagnosisSection } from "../../components/AIDiagnosisSection";
import { DetailedIndicatorsSection } from "../../components/DetailedIndicatorsSection";
import { PatientInfoBelowXRay } from "../../components/PatientInfoBelowXRay";
import { XRayImageSection } from "../../components/XRayImageSection";
import useAuthStore from "../../store/authStore";
import PageNotFound from "../PageNotFound";

// Komponen Utama Hasil Diagnosis Dokter
function DoctorResult() {
  const { isGetting, diagnosisId, error } = useGetDiagnosisId();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const id = useAuthStore((state) => state.id);

  useEffect(() => {
    if (diagnosisId?.image) {
      const img = new Image();
      img.onload = () => setImageLoading(false);
      img.src = diagnosisId.image;
    }
  }, [diagnosisId?.image]);

  if (isGetting) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="mt-4 text-xl">Memuat hasil prediksi...</p>
      </div>
    );
  }

  if (error || !diagnosisId) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-400">Terjadi kesalahan saat memuat data diagnosis.</p>
      </div>
    );
  }

  const {
    ai_diagnosis,
    created_at,
    patients,
    gejala,
    image,
    model_type,
    model_id,
    user_id,
    Infiltrat,
    Konsolidasi,
    Kavitas,
    Efusi,
    Fibrotik,
    Kalsifikasi
  } = diagnosisId;

  if (user_id != id) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <PageNotFound />
      </div>
    );
  }

  const matchConfidence = ai_diagnosis.match(/\((\d+)%\)/);
  const confidence = matchConfidence ? parseInt(matchConfidence[1], 10) : 0;
  const diagnosis = ai_diagnosis.replace(/\s*\(\d+%\)/, "").trim();

  // Indikator detail mock berdasarkan confidence
  const mockDetailedIndicators = [
    {
      title: "Infiltrat",
      score: Infiltrat.toFixed(4),
      description: "Terdapat infiltrat difus di lobus atas",
    },
    {
      title: "Konsolidasi",
      score: Konsolidasi.toFixed(4),
      description: "Konsolidasi sedang di zona atas kanan",
    },
    {
      title: "Kavitas",
      score: Kavitas.toFixed(4),
      description: "Diduga terdapat kavitas kecil",
    },
    {
      title: "Efusi",
      score: Efusi.toFixed(4),
      description: "Tidak terdapat efusi pleura yang signifikan",
    },
    {
      title: "Fibrotik",
      score: Fibrotik.toFixed(4),
      description: "Perubahan fibrotik sedang teramati",
    },
    {
      title: "Kalsifikasi",
      score: Kalsifikasi.toFixed(4),
      description: "Terdapat kalsifikasi minimal",
    },
  ];

  const handleSaveChanges = () => {
    navigate('/user/patients');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link to="/user" className="text-blue-500 hover:text-blue-400 text-sm">
            <i className="fas fa-arrow-left mr-2"></i>&larr; Kembali ke Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <AIDiagnosisSection
              diagnosis={diagnosis}
              confidence={confidence}
            />
            <DetailedIndicatorsSection indicators={mockDetailedIndicators} />
          </div>

          {/* Kolom Kanan */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <XRayImageSection
              imageUrl={image}
              name={patients.fullName}
              patientType={model_type}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
            />
            <PatientInfoBelowXRay
              name={patients.fullName}
              jenisKelamin={patients.gender}
              modelInfo={model_id}
              gejala={gejala}
              patientType={model_type}
              analysisTime={format(new Date(created_at), "dd MMM yyyy, HH:mm")}
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleSaveChanges}
            className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center justify-center text-sm"
          >
            <i className="fas fa-check mr-2"></i>Konfirmasi & Kembali ke Dashboard
          </button>
          <button
            onClick={handlePrint}
            className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center justify-center text-sm"
          >
            <i className="fas fa-print mr-2"></i>Cetak Hasil
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorResult;
