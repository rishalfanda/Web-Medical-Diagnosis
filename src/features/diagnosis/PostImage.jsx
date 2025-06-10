import { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ImagePlus, X, Upload } from "lucide-react";

function PostImage({ disabled = false }) {
  const [preview, setPreview] = useState(null);
  const { control, watch, setValue } = useFormContext();
  const currentImage = watch("file");

  // Handle the initial image if it exists (for editing scenarios)
  useEffect(() => {
    if (typeof currentImage === "string" && currentImage) {
      setPreview(currentImage);
    } else {
      setPreview(null);
    }
  }, [currentImage]);

  // Handle file selection
  const handleImageChange = (e, onChange) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update form value
    onChange(file);

    // Create and set preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle removing the image
  const handleRemoveImage = () => {
    setValue("file", "");
    setPreview(null);
  };

  return (
    <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-300">
    Upload Gambar X-Ray
  </label>

  <Controller
    name="file"
    control={control}
    render={({ field: { onChange, value, ...field } }) => (
      <div className="space-y-3">
        {preview ? (
          <div className="relative w-full aspect-[4/3] bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain bg-black"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-black/90 rounded-full text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full aspect-[4/3] border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col items-center justify-center text-center px-4">
              <ImagePlus className="w-10 h-10 text-gray-400 mb-3" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Klik untuk upload</span> atau drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              disabled={disabled}
              className="hidden"
              onChange={(e) => handleImageChange(e, onChange)}
              {...field}
            />
          </label>
        )}

        {preview && !disabled && (
          <div className="flex justify-center">
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-white cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Ganti Gambar
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => handleImageChange(e, onChange)}
                {...field}
              />
            </label>
          </div>
        )}
      </div>
    )}
  />
</div>

  );
}

export default PostImage;