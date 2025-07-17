import { Home, Info, LogOut, Search, Activity, User, FileText, Calendar, TrendingUp, Eye, Brain, Users, Stethoscope, Heart, Plus, Filter } from 'lucide-react';
import { useState } from "react";
import { useGetDiagnosis } from '../hooks/diagnosis/useGetDiagnosis';
import { useGetUsers } from '../hooks/user/useGetUsers';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DeleteDiagnosis from '../features/diagnosis/DeleteDiagnosis';

function NewUserAppLayout() {
  // Replace these with your actual hooks
    const { isGetDiagnosis, diagnosis } = useGetDiagnosis();
    const { isPending, users } = useGetUsers();
    const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPatient = diagnosis?.filter(patients => 
    patients.patients.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patients.ai_diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const doctorUser = users?.[1];
  const avatarUser = doctorUser?.avatar;
  const nameDoctor = doctorUser?.name;

  if (isGetDiagnosis) return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 shadow-2xl z-10">
        <div className="p-6">
          {/* Doctor Profile */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={avatarUser}
                alt="Doctor Profile"
                className="w-20 h-20 rounded-full border-4 border-blue-500/30 shadow-lg mx-auto"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h3 className="font-bold text-lg text-white mt-3">{nameDoctor}</h3>
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full mt-1">
              Medical Doctor
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button className="flex items-center w-full p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
              <Home className="mr-3 h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button className="flex items-center w-full p-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 group">
              <Users className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Patients</span>
            </button>
            <button className="flex items-center w-full p-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 rounded-xl transition-all duration-300 group">
              <Activity className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Analytics</span>
            </button>
            <button className="flex items-center w-full p-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-500 rounded-xl transition-all duration-300 group">
              <Calendar className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Schedule</span>
            </button>
            <button className="flex items-center w-full p-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 rounded-xl transition-all duration-300 group">
              <FileText className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Reports</span>
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <Link
            to={"/"}
            className="flex items-center w-full p-3 text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-xl transition-all duration-300 group"
          >
            <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Patient Analysis TB Screen AI
            </h1>
            <p className="text-gray-400 mt-1">AI-powered medical diagnosis system</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Today's Date</p>
              <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Patients</p>
                <p className="text-2xl font-bold text-white">{diagnosis?.length || 0}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">AI Analyses</p>
                <p className="text-2xl font-bold text-white">{diagnosis?.length || 0}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Today's Cases</p>
                <p className="text-2xl font-bold text-white">{Math.floor((diagnosis?.length || 0) * 0.3)}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Accuracy Rate</p>
                <p className="text-2xl font-bold text-white">96.5%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patients or diagnoses..."
                className="pl-10 pr-4 py-2 w-80 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:bg-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none backdrop-blur-sm"
              />
            </div>
            <button className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm">
              <Filter className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <button
            onClick={() => navigate("/doctor-form")}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">Analyse New Image</span>
          </button>
        </div>

        {/* Patients Table */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Patient Analysis Records</h2>
                <p className="text-gray-400 text-sm mt-1">AI-powered medical diagnosis results</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Showing {filteredPatient?.length || 0} of {diagnosis?.length || 0} records</span>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Patient
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
                    Analysis Date
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
                        {record.model_type}
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
              <p>Total medical analyses: {diagnosis?.length || 0}</p>
              <div className="flex items-center space-x-2">
                <span>Rows per page:</span>
                <select className="bg-gray-800/50 border border-gray-700/50 rounded px-2 py-1 text-sm text-white">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewUserAppLayout;