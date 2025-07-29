import { Brain, Eye, Plus, Search, User } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteDiagnosis from '../../features/diagnosis/DeleteDiagnosis';
import { useGetDiagnosisUserUuid } from '../../hooks/diagnosis/useGetDiagnosisUserUuid';
import useAuthStore from '../../store/authStore';

function  PatienList() {
  
    const currentUser = useAuthStore((state) => state.currentUser);
    const { isGetting, diagnosisUserUuid, error } = useGetDiagnosisUserUuid(currentUser?.id);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()

    const filteredPatient = diagnosisUserUuid?.filter(patients => 
    patients.patients.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patients.ai_diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );



    if (isGetting) return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

    return (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Patient Analysis Data</h2>
                <p className="text-gray-400 text-sm mt-1">AI-based medical diagnosis results</p>
              </div>
            
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient..."
                className="pl-10 pr-4 py-2 w-80 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:bg-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none backdrop-blur-sm"
              />
            </div>

            <button
            onClick={() => navigate("/doctor-form")}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">New Image Analysis</span>
          </button>
          </div>
          </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Symptoms
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Model Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    AI Diagnosis
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Date of Analysis
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredPatient?.map((record, index) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-gray-700/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="relative">
                        <img
                          src={record.image}
                          alt="Medical scan"
                          className="w-12 h-12 rounded-xl object-cover border-2 border-gray-600/50 shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {record.patients.gender === "Pria" ?
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>:
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        }

                        <div>
                          <p className="font-semibold text-white">{record.patients.fullName}</p>
                          <p className="text-sm text-gray-400">{record.patients.gender}</p>
                        </div>

                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300 text-sm">{record.gejala}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                        <Brain className="h-3 w-3 mr-1" />
                        {record.model_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{record.ai_diagnosis}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300 text-sm">
                        {format(new Date(record.created_at), "EEE, MMM dd yyyy")}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {format(new Date(record.created_at), "p")}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                         <DeleteDiagnosis diagnosis={record} key={record.id} />
                        <button
                          onClick={() => navigate(`/result/${record.id}`)}
                          className="p-2 text-blue-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-300 group"
                        >
                          <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-700/20 border-t border-gray-700/50">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <p>Total analisis medis: {diagnosisUserUuid?.length || 0}</p>
              <div className="flex items-center space-x-2">
                <span>Baris per halaman:</span>
                <select className="bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-sm text-white">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
    )
}

export default PatienList
