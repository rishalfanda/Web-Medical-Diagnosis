
import {  motion } from "framer-motion";
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
import { Controller, useForm } from "react-hook-form";
import { useCreateDiagnosis } from "../../hooks/diagnosis/useCreateDiagnosis";
import Button from "../../ui/Button";


function CreateAnalystForm({diagnosis}) {
    const {createDiagnosis, isCreating} = useCreateDiagnosis()

    const defaultValues = {
        fullName: diagnosis?.patients?.fullName || '',
        gender: diagnosis?.patients?.gender || '',
        id: 2,
        ai_diagnosis: "TBC (50%)",
        gejala: diagnosis?.gejala || [],
        image: "https://mrniqahwkvvomtiacjkl.supabase.co/storage/v1/object/public/diagnosis-image//diagnosis.jpg", // Kosongkan
        model_type: diagnosis?.model_type || "",
        model_version: diagnosis?.model_version || "",
    };
    

    const gejalaOptions = ["Demam", "Batuk", "Keringat Malam"];

    const { register, handleSubmit, control, reset, watch, setValue } = useForm({
        defaultValues,
    });

    const selectedModelType = watch("model_type");      

    function onSubmit(data){
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

        const image = 
            typeof data.image === 'string'
            ? data.image
            : data.image[0]

        const payload = {
            ...data,
            image: image,
            gejala: gejalaFormatted
        }

        createDiagnosis(payload,{
            onSuccess:()=>{
                reset()
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
                {/* Input Nama dan Jenis Kelamin */}
                <div className="mb-5">
                <div className="flex gap-5">
                    {/* Nama Pasien */}
                    <div className="flex-1">
                    <label className="block text-sm text-gray-300">Nama</label>
                    <input
                        className="w-full px-4 py-2 mt-1 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        disabled={isCreating}
                        id="fullName"
                        {...register('fullName', {
                        required: 'this field is required',
                        min: {
                            value: 1,
                            message: 'Fullname should be atleast one',
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
                        render={({ field }) => (
                            <select
                            id="gender"
                            value={field.value}
                            disabled={isCreating}
                            onChange={field.onChange}
                            className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Pria">Pria</option>
                            <option value="wanita">Wanita</option>
                            </select>
                        )}
                        />
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    </div>
                </div>

                {/* Checkbox Gejala */}
                <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
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
                            required: "Gejala harus dipilih",
                            })}
                            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600"
                            disabled={isCreating}
                        />
                        <span>{label}</span>
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
                    </label>

                    <div className="relative">
                        <Controller
                        name="model_type"
                        control={control}
                        render={({ field }) => (
                            <select
                            id="model_type"
                            value={field.value}
                            disabled={isCreating}
                            onChange={field.onChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            >
                            <option value="">Pilih Tipe Model</option>
                            <option value="disabilitas">Disabilitas</option>
                            <option value="non-disabilitas">Non-Disabilitas</option>
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
                        <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                            <Brain className="w-4 h-4 mr-1" />
                            Versi Model
                        </label>

                        <div className="relative">
                            <Controller
                            name="model_version"
                            control={control}
                            render={({ field }) => (
                                <select
                                id="model_version"
                                value={field.value}
                                onChange={field.onChange}
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
                </div> {/* <-- Penutup div grid utama */}
                <Button $variation="yellow" $size="customYellow">
                    Submit
                </Button>
        </form>
    )
}

export default CreateAnalystForm
