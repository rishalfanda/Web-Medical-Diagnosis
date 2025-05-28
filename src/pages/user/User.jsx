import { format } from "date-fns";
import { Home, Info, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteDiagnosis from "../../features/diagnosis/DeleteDiagnosis";
import { useGetDiagnosis } from "../../hooks/diagnosis/useGetDiagnosis";
import { useGetUsers } from "../../hooks/user/useGetUsers";
import Spinner from "../../components/ui/Spinner";


function User() {
  const { isGetDiagnosis, diagnosis } = useGetDiagnosis();
  const { isPending, users } = useGetUsers();

  const doctorUser = users?.[1];
  const avatarUser = doctorUser?.avatar;
  const nameDoctor = doctorUser?.name;

  const navigate = useNavigate();
  if (isGetDiagnosis) return <Spinner />;

  return (
    <div className="flex h-screen text-white bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col justify-between p-4 shadow-md">
        <div>
          <div className="flex flex-col items-center mb-6">
            <img
              src={avatarUser}
              alt="profile"
              className="w-24 h-24 rounded-full mb-2"
            />
            <h2 className="font-semibold text-lg">{nameDoctor}</h2>
          </div>
          <nav>
            <button className="flex items-center w-full p-2 bg-yellow-500 text-black rounded-md mb-2 hover:bg-yellow-400 transition">
              <Home className="w-5 h-5 mr-2" /> Home
            </button>
          </nav>
        </div>
        <Link
          to={"/"}
          className="flex items-center text-sm text-gray-300 hover:text-red-500"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 p-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
            />
            <button
              className="bg-yellow-500 text-gray-700 px-4 py-2 rounded-md hover:bg-yellow-400 transition font-medium cursor-pointer"
              onClick={() => navigate("/model")}
            >
              Analyse New Image
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 shadow rounded-md">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Gejala</th>
                <th className="p-3">Model Type</th>
                <th className="p-3">AI Diagnosis</th>
                <th className="p-3">Date of analysis</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {diagnosis.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-3">
                    <img
                      src={record.image}
                      alt="X-ray"
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{record.patients.fullName}</td>
                  <td className="p-3">{record.patients.gender}</td>
                  <td className="p-3">{record.gejala}</td>
                  <td className="p-3">{record.model_type}</td>
                  <td className="p-3">{record.ai_diagnosis}</td>
                  <td className="p-3">
                    {format(new Date(record.created_at), "EEE, MMM dd yyyy, p")}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center space-x-2">
                      <DeleteDiagnosis diagnosis={record} key={record.id} />
                      <button
                        className="text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate(`/result/${record.id}`)}
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default User;