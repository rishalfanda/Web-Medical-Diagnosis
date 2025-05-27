import { motion } from "framer-motion";
import {
    Brain,
    ChevronDown
} from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateDiagnosis } from "../../hooks/diagnosis/useCreateDiagnosis";
import UploadImage from "../diagnosis/UploadImage";

function GuestForm({ setNotification}) {
    const {createDiagnosis, isCreating} = useCreateDiagnosis();

    const defaultValues = {
        fullName: '',
        gender: '',
        id: 2,
        ai_diagnosis: "TBC (50%)",
        gejala: [],
        image: "", // Can be a string URL or empty
        model_type: "",
        model_version: "",
    };

    const navigate = useNavigate()

    const methods = useForm({
        defaultValues,
    });

    const { handleSubmit, control, reset, watch, setValue } = methods;
    const selectedModelType = watch("model_type");      

    async function onSubmit(data) {
        // Format gejala array jadi string seperti: "Demam", "Batuk dan Keringat Malam"
        let gejalaFormatted = '';
        if (Array.isArray(data.gejala)) {
            const length = data.gejala.length;
            if (length === 1) {
                gejalaFormatted = data.gejala[0];
            } else if (length === 2) {
                gejalaFormatted = `${data.gejala[0]} dan ${data.gejala[1]}`;
            } else if (length > 2) {
                gejalaFormatted = data.gejala.slice(0, -1).join(", ") + " dan " + data.gejala.slice(-1);
            }
        } else {
            gejalaFormatted = data.gejala;
        }

        // Process the image - could be a File object or a string URL
        const image = data.image;
        
        const payload = {
            ...data,
            image: image,
            gejala: gejalaFormatted
        };

        createDiagnosis(payload, {
            onSuccess: (newDiagnosis) => {
                if (setNotification) {
                    setNotification({
                        type: "success",
                        message: "Analisis berhasil dibuat"
                    });
                }
                reset();
                navigate(`/guest-result/${newDiagnosis.id}`)
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
                {/* Input Nama dan Jenis Kelamin */}

                {/* Grid Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kiri - Model Selection */}
                    <div className="space-y-6">
                        {/* Dropdown Tipe Model */}
                        <div>
                            <label className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                                <Brain className="w-4 h-4 mr-1" />
                                Tipe Model
                            </label>

                            <div className="relative">
                                <Controller
                                    name="model_type"
                                    control={control}
                                    rules={{ required: 'Tipe model harus dipilih' }}
                                    render={({ field }) => (
                                        <select
                                            id="model_type"
                                            value={field.value}
                                            disabled={isCreating}
                                            onChange={field.onChange}
                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                        >
                                            <option value="">Pilih Tipe Model</option>
                                            <option value="Disabilitas">Disabilitas</option>
                                            <option value="Non-Disabilitas">Non-Disabilitas</option>
                                        </select>
                                    )}
                                />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Dropdown Versi Model */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: selectedModelType ? 1 : 0,
                                height: selectedModelType ? "auto" : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {selectedModelType && (
                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                                        <Brain className="w-4 h-4 mr-1" />
                                        Versi Model
                                    </label>

                                    <div className="relative">
                                        <Controller
                                            name="model_version"
                                            control={control}
                                            rules={{ required: 'Versi model harus dipilih' }}
                                            render={({ field }) => (
                                                <select
                                                    id="model_version"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    disabled={isCreating}
                                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                                >
                                                    <option value="">Pilih Versi Model</option>
                                                    <option value="Model Versi 1">Model Versi 1</option>
                                                </select>
                                            )}
                                        />
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Kanan - Image Upload */}
                    <div>
                        <UploadImage disabled={isCreating} />
                    </div>
                </div>
                
                <motion.button 
                    type="submit"
                    disabled={isCreating}
                    className="mt-6 w-full py-3 px-4 flex justify-center items-center rounded-md shadow-sm text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                >
                    {isCreating ? "Memproses..." : "Analisis"}
                </motion.button>
            </form>
        </FormProvider>
    );
}

export default GuestForm;