import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  AlertCircle,
  Badge,
  Brain,
  CheckCircle,
  ChevronDown,
  Info,
  Loader,
  Upload,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Model() {
  // State untuk form
  const [patientName, setPatientName] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [modelType, setModelType] = useState("");
  const [checkbox1, setCheckbox1] = useState("");
  const [checkbox2, setCheckbox2] = useState("");
  const [checkbox3, setCheckbox3] = useState("");
  const [gejalaType, setGejalaType] = useState("");
  const [modelVersion, setModelVersion] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [dragActive, setDragActive] = useState(false);

  // Ref untuk file input
  const fileInputRef = useRef(null);

  // Versions available for each model type
  const modelVersions = {
    disabilitas: ["Model Versi 1", "Model Versi 2"],
    "non-disabilitas": ["Model Versi 1", "Model Versi 2", "Model Versi 3"],
  };

  // Reset model version when model type changes
  useEffect(() => {
    setModelVersion("");
  }, [modelType]);

  // Validate if form is complete
  const isFormValid = modelType && modelVersion && file;

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  // Process the selected file
  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    // Check file extension
    const validExtensions = [".jpg", ".jpeg", ".png", ".dcm"];
    const fileExtension =
      "." + selectedFile.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      showNotification(
        "error",
        `Format file tidak valid. Gunakan ${validExtensions.join(", ")}`
      );
      return;
    }

    // If valid, set the file
    setFile(selectedFile);

    // Create preview URL if not a DICOM file
    if (fileExtension !== ".dcm") {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      // For DICOM files, you would need a DICOM viewer library
      // For now, just show a placeholder
      setPreviewUrl("/api/placeholder/300/300");
    }

    showNotification("success", "File berhasil diunggah");
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 3000);
  };
  const navigate = useNavigate();

  // Handle analyze button click
  const handleAnalyze = async () => {
    if (!isFormValid) return;

    setIsAnalyzing(true);

    // Simulate API call to backend
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showNotification("success", "Analisis berhasil! Hasil akan ditampilkan.");
      navigate("/result"); // ⬅️ redirect ke halaman hasil
      // Here you would typically navigate to results page or show results
    } catch (error) {
      showNotification(
        "error",
        "Gagal menganalisis gambar. Silakan coba lagi."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-400 mb-6">
          Analisis X-Ray TBC dengan AI
        </h1>

        <div className="bg-gray-800 rounded-xl shadow-md p-6">
          {/* Notification Toast */}
          <AnimatePresence>
            {notification.show && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center space-x-2 ${
                  notification.type === "success"
                    ? "bg-green-700 text-green-100"
                    : "bg-red-700 text-red-100"
                }`}
              >
                {notification.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span>{notification.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Nama dan Jenis Kelamin */}
          <div className="mb-5">
            <div className="flex gap-5">
              {/* Nama Pasien */}
              <div className="flex-1">
                <label className="block text-sm text-gray-300">Nama</label>
                <input
                  className="w-full px-4 py-2 mt-1 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              {/* Jenis Kelamin */}
              <div className="flex-1">
                <label className="block text-sm text-gray-300">
                  Jenis Kelamin
                </label>
                <div className="relative mt-1">
                  <select
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="pria">Pria</option>
                    <option value="wanita">Wanita</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Checkbox Gejala */}
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <Badge className="w-4 h-4 mr-1" />
                Tipe Gejala
                <div className="relative inline-block ml-1 group">
                  <Info className="w-4 h-4 text-blue-400" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-blue-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    Pilih Gejala Awal
                  </div>
                </div>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 mt-2">
                {[
                  { label: "Demam", checked: checkbox1, setter: setCheckbox1 },
                  { label: "Batuk", checked: checkbox2, setter: setCheckbox2 },
                  {
                    label: "Keringat Malam",
                    checked: checkbox3,
                    setter: setCheckbox3,
                  },
                ].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-2 text-gray-200"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600"
                      checked={item.checked}
                      onChange={(e) => item.setter(e.target.checked)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Utama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kiri */}
            <div className="space-y-6">
              {/* Dropdown Tipe Model */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <Brain className="w-4 h-4 mr-1" />
                  Tipe Model
                  <div className="relative inline-block ml-1 group">
                    <Info className="w-4 h-4 text-blue-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-blue-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      Pilih tipe model sesuai dengan kebutuhan analisis Anda
                    </div>
                  </div>
                </label>

                <div className="relative">
                  <select
                    value={modelType}
                    onChange={(e) => setModelType(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                  >
                    <option value="">Pilih Tipe Model</option>
                    <option value="disabilitas">Disabilitas</option>
                    <option value="non-disabilitas">Non-Disabilitas</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Dropdown Versi Model */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: modelType ? 1 : 0,
                  height: modelType ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {modelType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                      <Brain className="w-4 h-4 mr-1" />
                      Versi Model
                      <div className="relative inline-block ml-1 group">
                        <Info className="w-4 h-4 text-blue-400" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-blue-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          Versi terbaru memiliki akurasi lebih tinggi
                        </div>
                      </div>
                    </label>

                    <div className="relative">
                      <select
                        value={modelVersion}
                        onChange={(e) => setModelVersion(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                      >
                        <option value="">Pilih Versi Model</option>
                        {modelVersions[modelType]?.map((version, index) => (
                          <option key={index} value={version}>
                            {version}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Upload File */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload X-Ray
                  <div className="relative inline-block ml-1 group">
                    <Info className="w-4 h-4 text-blue-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-blue-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      Format yang didukung: JPG, PNG, JPEG, DCM
                    </div>
                  </div>
                </label>

                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                    dragActive
                      ? "border-blue-500 bg-blue-900"
                      : "border-gray-600 border-dashed bg-gray-900"
                  } rounded-md cursor-pointer hover:bg-gray-700 transition-colors`}
                  onClick={handleUploadClick}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-1 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    </motion.div>
                    <div className="flex text-sm text-gray-300">
                      <label
                        htmlFor="file-upload"
                        className="relative font-medium text-blue-400 hover:text-blue-300"
                      >
                        <span>Upload file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png,.dcm"
                        />
                      </label>
                      <p className="pl-1">atau drag & drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      JPG, PNG, JPEG, DCM hingga 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan */}
            <div className="space-y-6">
              {/* Preview Gambar */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preview Gambar
                </label>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: previewUrl ? 1 : 0 }}
                  className="border border-gray-600 rounded-md overflow-hidden flex items-center justify-center bg-gray-700 h-64"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="X-Ray Preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <AlertCircle className="mx-auto h-12 w-12 mb-2" />
                      <p>Belum ada gambar untuk ditampilkan</p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Info File */}
              <AnimatePresence>
                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="text-sm text-gray-400"
                  >
                    <p>
                      <strong>Nama File:</strong> {file.name}
                    </p>
                    <p>
                      <strong>Ukuran:</strong>{" "}
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p>
                      <strong>Tipe:</strong> {file.type || "DICOM image"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tombol Analisis */}
              <motion.button
                type="button"
                onClick={handleAnalyze}
                disabled={!isFormValid || isAnalyzing}
                className={`w-full py-3 px-4 flex justify-center items-center rounded-md shadow-sm text-white font-medium ${
                  isFormValid && !isAnalyzing
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-600 cursor-not-allowed"
                } transition-colors`}
                whileHover={isFormValid && !isAnalyzing ? { scale: 1.02 } : {}}
                whileTap={isFormValid && !isAnalyzing ? { scale: 0.98 } : {}}
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Menganalisis...
                  </>
                ) : (
                  "Analisis Gambar"
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;