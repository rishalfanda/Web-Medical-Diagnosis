import { useState } from 'react';
import { Home, LogOut, Pencil, Trash2, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate()
  const [records, setRecords] = useState([
    {
      id: '0001',
      patientId: '00001',
      imageFile: '0001.jpg',
      aiDiagnosis: 'TBC (50%)',
      date: '21-April, 2025',
      imageUrl: 'diagnosis.jpg'
    }
  ]);

  return (
    <div className="flex h-screen text-white bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col justify-between p-4 shadow-md">
        <div>
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
              alt="profile"
              className="w-24 h-24 rounded-full mb-2"
            />
            <h2 className="font-semibold text-lg">dr. Fulan, Sp.P</h2>
            <span className="text-yellow-400 text-sm">User</span>
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
              className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition"
              onClick={() => navigate("/model")}
            >
              ANALYSE NEW IMAGE
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 shadow rounded-md">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Id</th>
                <th className="p-3">Patient Id</th>
                <th className="p-3">Image File</th>
                <th className="p-3">AI Diagnosis</th>
                <th className="p-3">Date of analysis</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-3">
                    <img
                      src={record.imageUrl}
                      alt="X-ray"
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{record.id}</td>
                  <td className="p-3">{record.patientId}</td>
                  <td className="p-3">{record.imageFile}</td>
                  <td className="p-3">{record.aiDiagnosis}</td>
                  <td className="p-3">{record.date}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-300 hover:text-white"
                        onClick={() => navigate("/result")}
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