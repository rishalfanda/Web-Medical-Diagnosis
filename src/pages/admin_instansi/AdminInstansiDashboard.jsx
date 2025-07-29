import { Activity, BrainCog, Map, Stethoscope, UserPlus } from "lucide-react";
import { useGetUsersInstanceId } from "../../hooks/user/useGetUsersInstanceId";
import useAuthStore from "../../store/authStore";
import { useGetDatasetsInstanceId } from "../../hooks/dataset/useGetDatasetInstanceId";
import { useGetInstansiById } from "../../hooks/instansi/useGetInstansiById";
function AdminInstansiDashboard() {
    const instance_id = useAuthStore((state) => state.instance_id);
    const { isGetting, usersInstanceId } = useGetUsersInstanceId(instance_id);
    const {isGetting: isGettingDataset, datasetsInstanceId} = useGetDatasetsInstanceId(instance_id)
    const {isGettingInstansiById, instansiById} = useGetInstansiById(instance_id)

    console.log(instansiById)

    console.log(instance_id)
    if (isGetting || isGettingDataset || isGettingInstansiById) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Tenaga Kesehatan</p>
                        <p className="text-2xl font-bold text-gray-900">{usersInstanceId?.length || 0}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                        <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Dataset</p>
                        <p className="text-2xl font-bold text-gray-900">{datasetsInstanceId.length}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                        <BrainCog className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Instansi </p>
                        <p className="text-2xl font-bold text-gray-900">{instansiById[0]?.name}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                        <Map className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminInstansiDashboard
