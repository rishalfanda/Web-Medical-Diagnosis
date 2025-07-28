import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AIDiagnosisSection } from "../../components/AIDiagnosisSection";
import { DetailedIndicatorsSection } from "../../components/DetailedIndicatorsSection";
import { XRayImageSection } from "../../components/XRayImageSection";
import { usePostDiagnosis } from "../../hooks/diagnosis/usePostDiagnosis";
import useGuestDiagnosisStore from "../../store/guestDiagnosisStore";

// Komponen Utama Hasil Diagnosis Guest
function GuestResult() {
  const { guestDiagnosisData } = useGuestDiagnosisStore();
  const { isPost, isError } = usePostDiagnosis();
  const [imageLoading, setImageLoading] = useState(true);

  const {
    areas_label,
    file,
    pred_result
  } = guestDiagnosisData;

  const percentage = pred_result[1].toFixed(2) * 100;

  useEffect(() => {
    if (guestDiagnosisData?.file) {
      const img = new Image();
      img.onload = () => setImageLoading(false);
      img.src = guestDiagnosisData.file;
    }
  }, [guestDiagnosisData?.file]);

  if (isPost) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="mt-4 text-xl">Memuat hasil prediksi...</p>
      </div>
    );
  }

  if (isError || !guestDiagnosisData) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-400">Terjadi kesalahan saat memuat data diagnosis.</p>
      </div>
    );
  }

  // Indikator detail mock berdasarkan confidence
  const mockDetailedIndicators = [
    {
      title: "Infiltrat",
      score: areas_label["luas purple"].toFixed(4),
      description: "Terdapat infiltrat difus di lobus atas",
    },
    {
      title: "Konsolidasi",
      score: areas_label["luas pengganti putih"].toFixed(4),
      description: "Konsolidasi sedang di zona atas kanan",
    },
    {
      title: "Kavitas",
      score: areas_label["luas yellow"].toFixed(4),
      description: "Diduga terdapat kavitas kecil",
    },
    {
      title: "Efusi",
      score: areas_label["luas brown"].toFixed(4),
      description: "Tidak terdapat efusi pleura yang signifikan",
    },
    {
      title: "Fibrotik",
      score: areas_label["luas blue"].toFixed(4),
      description: "Perubahan fibrotik sedang teramati",
    },
    {
      title: "Kalsifikasi",
      score: areas_label["luas darktail"].toFixed(4),
      description: "Terdapat kalsifikasi minimal",
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link to="/guest" className="text-blue-500 hover:text-blue-400 text-sm">
            <i className="fas fa-arrow-left mr-2"></i>&larr; Kembali ke Form Tamu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <AIDiagnosisSection 
              diagnosis={percentage > 50 ? "TBC" : "Bukan TBC"}
              confidence={percentage}
            />
            <DetailedIndicatorsSection indicators={mockDetailedIndicators} />
          </div>

          {/* Kolom Kanan */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <XRayImageSection 
              imageUrl={file}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
            />
          </div>
        </div>
        
        {/* Tombol Aksi */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
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

export default GuestResult;
