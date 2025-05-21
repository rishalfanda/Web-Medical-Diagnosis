import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Info,
  Loader,
  Upload
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

function UploadImage({ setNotification, image, register}) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
      // Jika image berupa string URL, langsung set preview
      if (typeof image === 'string' && image.startsWith('http')) {
        setPreviewUrl(image);
        setFile(null); // Kosongkan file agar tidak bentrok
      }
    }, [image]);

  // Ref untuk file input
  const fileInputRef = useRef(null);

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
    return (
    <div className="mt-3">
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
          <label
              htmlFor="file-upload"
              className="relative font-medium text-blue-400 hover:text-blue-300"
          >
              <span>Upload file</span>
              <input
                  id="image"
                  type="file"
                  className="sr-only"
                  /* ref={fileInputRef} */
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.dcm"
                  ref={(e) => {
                    register('image', { required: 'File is required' }).ref(e);
                    fileInputRef.current = e; // gabungkan dua ref dengan aman
                  }}
                  
              />
            </label>
            <p className="pl-1">atau drag & drop</p>
          </div>
          <p className="text-xs text-gray-400">
            JPG, PNG, JPEG, DCM hingga 10MB
          </p>
    </div>
  

  {/* Bagian Kanan */}
  {/* Kanan */}
  <div className="space-y-6">
    {/* Preview Gambar */}

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
        className="max-h-full max-w-full object-contain"
        /* className="h-full w-full object-contain" */
      />
    ) : (
      <div className="text-gray-400 text-center p-4">
        <AlertCircle className="mx-auto h-12 w-12 mb-2" />
        <p>Belum ada gambar untuk ditampilkan</p>
      </div>
    )}
  </motion.div>

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
  </div>
</div>
    );
}

const UploadWithReview =  ()=>{
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
        className="max-h-full max-w-full object-contain"
        /* className="h-full w-full object-contain" */
      />
    ) : (
      <div className="text-gray-400 text-center p-4">
        <AlertCircle className="mx-auto h-12 w-12 mb-2" />
        <p>Belum ada gambar untuk ditampilkan</p>
      </div>
    )}
  </motion.div>
</div>
}

export default UploadImage
