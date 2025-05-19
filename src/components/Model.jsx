import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  AlertCircle,
  Badge,
  Brain,
  ChevronDown,
  Info,
  Loader,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Notification from "../features/form/Notification";
import DiagnosisRow from "../features/diagnosis/DiagnosisRow";
import CreateAnalystForm from "../features/form/CreateAnalystForm";
import { useGetDiagnosis } from "../hooks/diagnosis/useGetDiagnosis";

function Model() {
  const { isGetDiagnosis, diagnosis } = useGetDiagnosis();
  // State untuk form
  const [modelType, setModelType] = useState("");
  const [modelVersion, setModelVersion] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [dragActive, setDragActive] = useState(false);

  // Ref untuk file input
  const fileInputRef = useRef(null);

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
    <DiagnosisRow>
      <div className="bg-gray-800 rounded-xl shadow-md p-6">
        {/* Notification Toast */}
        <Notification notification={notification} />

        <div className="mb-5">
          <CreateAnalystForm diagnosis={diagnosis} />
        </div>
      </div>
    </DiagnosisRow>
  );
}

export default Model;