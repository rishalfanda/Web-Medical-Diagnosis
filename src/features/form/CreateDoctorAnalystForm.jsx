import { motion } from "framer-motion";
import {
    Badge,
    Brain,
    ChevronDown
} from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "../../components/RadioGroup";
import { useCreateDiagnosis } from "../../hooks/diagnosis/useCreateDiagnosis";
import { usePostDiagnosis } from "../../hooks/diagnosis/usePostDiagnosis";
import useAuthStore from "../../store/authStore";
import UploadImage from "../diagnosis/UploadImage";
import { useState } from "react";

function CreateDoctorAnalystForm({ setNotification}) {
    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [otherValue, setOtherValue] = useState("");

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
        examination: {}
    };

    const navigate = useNavigate()
    
    const gejalaOptions = ["Fever", "Cough", "Night Sweats", "Weight Loss", "Shortness of Breath", "Fatigue", "Loss of Appetite", "Chest Pain"];

    const methods = useForm({
        defaultValues,
    });

    const isWorking = isCreating || isPost

    const { register, handleSubmit, control, reset, watch, setValue, getValues } = methods;
    const selectedModelType = watch("model_type");      

    async function onSubmit(data) {
        // Format gejala array jadi string seperti: "Demam", "Batuk dan Keringat Malam"
        let gejalaFormatted = '';
        if (Array.isArray(data.gejala) && data.gejala.length > 0) {
            const length = data.gejala.length;
            if (length === 1) {
                gejalaFormatted = data.gejala[0];
            } else if (length === 2) {
                gejalaFormatted = `${data.gejala[0]} and ${data.gejala[1]}`;
            } else if (length > 2) {
                gejalaFormatted = data.gejala.slice(0, -1).join(", ") + " and " + data.gejala.slice(-1);
            }
        } else {
            gejalaFormatted = "No Symptoms";
        }

        //examination
        const examinationFormated = {
            bakteriologi: [
                { apus_dahak: data.apusDahak },
                { kultur: data.kultur },
                { xpert_mtb_rif_atau_naat: data.xpert },
            ],
            others: [
                { igra: data.igra }
            ]
        }


        // Post to API
        const formData = new FormData();
        formData.append("file", data.image); // pastikan field ini ada dan bukan kosong
        formData.append("model_id", String(data.model_id)); // backend butuh string

        isPostData(formData, {
            onSuccess: (response) => {  

                const {
                    areas_label,
                    file,
                    pred_result
                } = response;
                
                const percentage = pred_result[1].toFixed(2) * 100;
                
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
                    Kalsifikasi: areas_label["luas darktail"],
                    examination: examinationFormated
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
                <div className="mb-5 space-y-3">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Nama Pasien */}
                    <div className="flex-1">
                    <label className="block text-sm text-gray-300">Name</label>
                    <input
                        id="fullName"
                        type="text"
                        disabled={isWorking}
                        {...register("fullName", {
                        required: "Name must be filled in",
                        min: { value: 1, message: "Name must be filled in" },
                        })}
                        className="w-full px-4 py-2 mt-1 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="flex-1">
                        <label className="block text-sm text-gray-300">Gender</label>
                        <div className="relative mt-1">
                            <Controller
                            name="gender"
                            control={control}
                            rules={{ required: "Gender must be selected" }}
                            render={({ field }) => (
                                <select
                                id="gender"
                                value={field.value}
                                disabled={isWorking}
                                onChange={field.onChange}
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                            )}
                            />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Gejala */}
                <div>
                    <label className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                        <Badge className="w-4 h-4 mr-1" />
                        Symptom Type
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 mt-2">
                        {gejalaOptions.map((label, i) => (
                        <label key={i} className="flex items-center space-x-2 text-gray-200">
                            <input
                            type="checkbox"
                            value={label}
                            disabled={isWorking}
                            {...register("gejala")}
                            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600"
                            />
                            <span>{label}</span>
                        </label>
                        ))}

                        {/* Checkbox "Lainnya" */}
                        <label className="flex items-center space-x-2 text-gray-200 col-span-1 sm:col-span-3">
                        <input
                            type="checkbox"
                            checked={isOtherChecked}
                            disabled={isWorking}
                            onChange={(e) => {
                            const checked = e.target.checked;
                            setIsOtherChecked(checked);

                            if (!checked) {
                                setOtherValue("");
                                // Hapus dari form
                                const current = getValues("gejala") || [];
                                const filtered = current.filter((val) => !val.startsWith("Other:"));
                                setValue("gejala", filtered);
                            }
                            }}
                            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600"
                        />
                        <span>Other</span>
                        </label>

                        {/* Input jika checkbox Other aktif */}
                        {isOtherChecked && (
                        <input
                            type="text"
                            value={otherValue}
                            disabled={isWorking}
                            onChange={(e) => {
                                const rawValue = e.target.value;
                                setOtherValue(rawValue); // simpan apa adanya dulu

                                const current = getValues("gejala") || [];

                                // Hapus nilai sebelumnya dari "gejala"
                                const filtered = current.filter((val) => val !== otherValue.trim());

                                if (rawValue.trim()) {
                                setValue("gejala", [...filtered, rawValue.trim()]);
                                } else {
                                setValue("gejala", filtered);
                                }
                            }}
                            placeholder="Enter other symptom"
                            className="col-span-1 sm:col-span-3 px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        )}
                    </div>
                </div>
                </div>

                {/* Grid Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kiri - Pemeriksaan & Model */}
                <div className="space-y-6">
                    {/* A. Bakteriologi */}
                    <div>
                        <h3 className="text-white font-semibold flex items-center">
                            A. Bakteriologi
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-white mt-2">
                            {/* Apus Dahak */}
                            <RadioGroup disabled={isWorking} register={register} label="Apus Dahak" name="apusDahak" options={["BTA Positif", "BTA Negatif"]} />

                            {/* Kultur */}
                            <RadioGroup disabled={isWorking} register={register} label="Kultur" name="kultur" options={["Positif", "Negatif"]} />

                            {/* Xpert */}
                            <RadioGroup disabled={isWorking} register={register} label="Xpert MTB/Rif atau NAAT" name="xpert" options={["Positif", "Negatif"]} />
                        </div>
                    </div>

                    {/* B. Others */}
                    <div>
                    <h3 className="text-white font-semibold flex items-center">
                        B. Others
                    </h3>
                    <div className="mt-2 text-white">
                        <RadioGroup disabled={isWorking} register={register} label="IGRA" name="igra" options={["Positif", "Negatif", "Lainnya"]} />
                    </div>
                    </div>
                    
                    {/* TB Status */}
                    <div className="flex-1">
                        <label className="block text-sm text-gray-300">History of TB</label>
                        <div className="relative mt-1">
                            <Controller
                            name="history_of_tb"
                            control={control}
                            rules={{ required: "History of TB must be selected" }}
                            render={({ field }) => (
                                <select
                                id="history_of_tb"
                                value={field.value}
                                disabled={isWorking}
                                onChange={field.onChange}
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                >
                                <option value="N/A">Select Tb History</option>
                                <option value="Ever Had TB">Ever Had TB</option>
                                <option value="Never Had TB">Never Had TB</option>
                                </select>
                            )}
                            />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* TB Status */}
                    <div className="flex-1">
                        <label className="block text-sm text-gray-300">TB Status</label>
                        <div className="relative mt-1">
                            <Controller
                            name="tb_status"
                            control={control}
                            rules={{ required: "TB Status must be selected" }}
                            render={({ field }) => (
                                <select
                                id="tb_status"
                                value={field.value}
                                disabled={isWorking}
                                onChange={field.onChange}
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                >
                                <option value="">Select Tb Status</option>
                                <option value="New Diagnosis">New Diagnosis</option>
                                <option value="Relapse / Reinfection">Relapse / Reinfection</option>
                                <option value="Treatment Failure">Treatment Failure </option>
                                <option value="Other">Other </option>
                                </select>
                            )}
                            />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Model Type */}
                    <div>
                    <label className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                        <Brain className="w-4 h-4 mr-1" />
                        Model Type
                    </label>
                    <div className="relative">
                        <Controller
                        name="model_type"
                        control={control}
                        rules={{ required: "The model type must be selected" }}
                        render={({ field }) => (
                            <select
                            id="model_type"
                            value={field.value}
                            disabled={isWorking}
                            onChange={field.onChange}
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            >
                            <option value="">Select Model Type</option>
                            <option value="Disabilitas">Disability</option>
                            <option value="Non-Disability">Non-Disability</option>
                            </select>
                        )}
                        />
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    </div>

                    {/* Model Version */}
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
                            Model Version
                        </label>
                        <div className="relative">
                            <Controller
                            name="model_id"
                            control={control}
                            rules={{ required: "Version model must be selected" }}
                            render={({ field }) => (
                                <select
                                id="model_id"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isPost}
                                className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                >
                                <option value="">Select Model Version</option>
                                <option value="7">Model Version 1</option>
                                </select>
                            )}
                            />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        </div>
                    )}
                    </motion.div>
                </div>

                {/* Kanan - Upload Image */}
                <div>
                    <UploadImage disabled={isWorking} />
                </div>
                </div>

                {/* Submit Button */}
                <motion.button
                type="submit"
                disabled={isWorking}
                className="cursor-pointer mt-6 w-full py-3 px-4 flex justify-center items-center rounded-md shadow-sm text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.98 }}
                >
                {isWorking ? "Processing..." : "Analyze"}
                </motion.button>
            </form>
            </FormProvider>

    );
}

export default CreateDoctorAnalystForm;