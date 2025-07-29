import { motion } from "framer-motion";
import {
    Brain,
    ChevronDown
} from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostDiagnosis } from "../../hooks/diagnosis/usePostDiagnosis";
import PostImage from "../diagnosis/PostImage";
import useGuestDiagnosisStore from "../../store/guestDiagnosisStore";

function CreateGuestAnalystForm({ setNotification}) {
    const {isPostData, isPost} = usePostDiagnosis()
    const {setGuestDiagnosisData} = useGuestDiagnosisStore()

    const defaultValues = {
        file: "",
        model_id: ""
    };

    const navigate = useNavigate()
    const methods = useForm({
        defaultValues,
    });

    const { handleSubmit, control, setValue } = methods;   

    async function onSubmit(data) {
    const formData = new FormData();
    formData.append("file", data.file); // pastikan field ini ada dan bukan kosong
    formData.append("model_id", String(data.model_id)); // backend butuh string

    isPostData(formData, {
        onSuccess: (response) => {
            if (setNotification) {
                setNotification({
                    type: "success",
                    message: "Analisis berhasil dibuat"
                });
            }
            setGuestDiagnosisData(response);
            navigate(`/guest-result`);
        },
        onError: (error) => {
            if (setNotification) {
                setNotification({
                    type: "error",
                    message: error.message || "Gagal membuat analisis"
                });
            }
        }
    });
}
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Grid Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kiri - Model Selection */}
                    <div className="space-y-6">
                        {/* Dropdown Versi Model */}
                        <div>
                            <label className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                                <Brain className="w-4 h-4 mr-1" />
                                    Model Version
                            </label>

                            <div className="relative">
                                <Controller
                                    name="model_id"
                                    control={control}
                                    rules={{ required: 'Versi model harus dipilih' }}
                                    render={({ field }) => (
                                    <select
                                        id="model_id"
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={isPost}
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                    >
                                        <option value="">Select Model Version</option>
                                        <option value="7">Model Version 1</option>
                                    </select>
                                    )}
                                />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                            
                        
                    </div>

                    {/* Kanan - Image Upload */}
                    <div>
                        <PostImage disabled={isPost} />
                    </div>
                </div>
                
                <motion.button 
                    type="submit"
                    disabled={isPost}
                    className="mt-6 w-full py-3 px-4 flex justify-center items-center rounded-md shadow-sm text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                >
                    {isPost ? "Processing...." : "Analyze"}
                </motion.button>
            </form>
        </FormProvider>
    );
}

export default CreateGuestAnalystForm;