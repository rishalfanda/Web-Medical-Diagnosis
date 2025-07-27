import { motion } from "framer-motion";
import {
    Badge,
    Brain,
    ChevronDown
} from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostDiagnosis } from "../../hooks/diagnosis/usePostDiagnosis";
import { useCreateDiagnosis } from "../../hooks/diagnosis/useCreateDiagnosis";
import useAuthStore from "../../store/authStore";
import UploadImage from "../diagnosis/UploadImage";

function CreateDoctorAnalystForm({ setNotification}) {
    const id = useAuthStore((state) => state.id);
    const {isPostData, isPost} = usePostDiagnosis()
    const {createDiagnosis, isCreating} = useCreateDiagnosis();

    const defaultValues = {
        fullName: '',
        gender: '',
        id: 2,
        ai_diagnosis: "Non-TBC (0%)",
        gejala: [],
        image: "", // Can be a string URL or empty
        model_type: "",
        model_version: "",
    };

    const navigate = useNavigate()
    
    const gejalaOptions = ["Demam", "Batuk", "Keringat Malam"];

    const methods = useForm({
        defaultValues,
    });

    const isWorking = isCreating || isPost

    const { register, handleSubmit, control, reset, watch, setValue } = methods;
    const selectedModelType = watch("model_type");      

    async function onSubmit(data) {
        // Format gejala array jadi string seperti: "Demam", "Batuk dan Keringat Malam"
        let gejalaFormatted = '';
        if (Array.isArray(data.gejala) && data.gejala.length > 0) {
            const length = data.gejala.length;
            if (length === 1) {
                gejalaFormatted = data.gejala[0];
            } else if (length === 2) {
                gejalaFormatted = `${data.gejala[0]} dan ${data.gejala[1]}`;
            } else if (length > 2) {
                gejalaFormatted = data.gejala.slice(0, -1).join(", ") + " dan " + data.gejala.slice(-1);
            }
        } else {
            gejalaFormatted = "Tidak Ada Gejala";
        }

        // Post to API
        const formData = new FormData();
        formData.append("file", data.image); // pastikan field ini ada dan bukan kosong
        formData.append("model_id", String(data.model_id)); // backend butuh string

        isPostData(formData, {
            onSuccess: (response) => {  
                console.log("sukses post")

                const {
                    areas_label,
                    file,
                    pred_result
                } = response;
                console.log("sukses destructure result")

                const percentage = pred_result[1].toFixed(2) * 100;
                console.log("sukses convert percentage")
                
                const payload = {
                    ...data,
                    id: id,
                    ai_diagnosis: `${percentage > 50 ? "TBC" : "Non-TBC"} (${percentage}%)`,
                    image: file,
                    gejala: gejalaFormatted,
                    Infiltrat: areas_label["luas purple"],
                    Konsolidasi: areas_label["luas pengganti putih"],
                    Kavitas: areas_label["luas yellow"],
                    Efusi: areas_label["luas brown"],
                    Fibrotik: areas_label["luas blue"],
                    Kalsifikasi: areas_label["luas darktail"]
                };
                console.log("sukses create payload")

                createDiagnosis(payload, {
                    onSuccess: (newDiagnosis) => {
                        
                        console.log("sukses post")
                        if (setNotification) {
                            setNotification({
                                type: "success",
                                message: "Analisis berhasil dibuat"
                            });
                        }
                        reset();
                        navigate(`/result/${newDiagnosis.id}`);
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
                <div className="mb-5">
                    <div className="flex flex-col md:flex-row gap-5">
                        {/* Nama Pasien */}
                        <div className="flex-1">
                            <label className="block text-sm text-gray-300">Nama</label>
                            <input
                                className="w-full px-4 py-2 mt-1 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                disabled={isWorking}
                                id="fullName"
                                {...register('fullName', {
                                    required: 'Nama harus diisi',
                                    min: {
                                        value: 1,
                                        message: 'Nama harus diisi',
                                    },
                                })}
                            />
                        </div>

                        {/* Jenis Kelamin */}
                        <div className="flex-1">
                            <label className="block text-sm text-gray-300">Jenis Kelamin</label>
                            <div className="relative mt-1">
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: 'Jenis kelamin harus dipilih' }}
                                    render={({ field }) => (
                                        <select
                                            id="gender"
                                            value={field.value}
                                            disabled={isWorking}
                                            onChange={field.onChange}
                                            className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                        >
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Pria">Pria</option>
                                            <option value="Wanita">Wanita</option>
                                        </select>
                                    )}
                                />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Checkbox Gejala */}
                    <div className="mt-3">
                        <label className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                            <Badge className="w-4 h-4 mr-1" />
                            Tipe Gejala
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 mt-2">
                            {gejalaOptions.map((label, i) => (
                                <label
                                    key={i}
                                    className="flex items-center space-x-2 text-gray-200"
                                >
                                    <input
                                        type="checkbox"
                                        value={label}
                                        {...register("gejala", {
                                        })}
                                        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600"
                                        disabled={isWorking}
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

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
                                            disabled={isWorking}
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
                                                <option value="">Pilih Versi Model</option>
                                                <option value="7">Model Versi 1</option>
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
                        <UploadImage disabled={isWorking} />
                    </div>
                </div>
                
                <motion.button 
                    type="submit"
                    disabled={isWorking}
                    className="cursor-pointer mt-6 w-full py-3 px-4 flex justify-center items-center rounded-md shadow-sm text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                >
                    {isWorking ? "Memproses..." : "Analisis"}
                </motion.button>
            </form>
        </FormProvider>
    );
}

export default CreateDoctorAnalystForm;