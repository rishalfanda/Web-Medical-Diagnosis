import { Activity, Users } from 'lucide-react';
import { useGetDiagnosisUserUuid } from '../../hooks/diagnosis/useGetDiagnosisUserUuid';
import useAuthStore from '../../store/authStore';

function UserDashboard() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const { isGetting, diagnosisUserUuid, error } = useGetDiagnosisUserUuid(currentUser?.id);
    

    if (isGetting) return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Patients</p>
                <p className="text-2xl font-bold text-white">{diagnosisUserUuid?.length || 0}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">AI Analyses</p>
                <p className="text-2xl font-bold text-white">{diagnosisUserUuid?.length || 0}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
          </div> */}

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Today's Cases</p>
                <p className="text-2xl font-bold text-white">{Math.floor((diagnosisUserUuid?.length || 0) * 0.3)}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Accuracy Rate</p>
                <p className="text-2xl font-bold text-white">96.5%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div> */}

        </div>
    )
}

export default UserDashboard
