import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import AddCitra from "../../../features/citra/AddCitra";
import DeleteCitra from "../../../features/citra/DeleteCitra";
import EditCitra from "../../../features/citra/EditCitra";
import { useGetCitra } from "../../../hooks/citra/useGetCitra";
import useAuthStore from "../../../store/authStore";

function Citra() {
    const {isGetCitra, citra} = useGetCitra()
    const navigate = useNavigate()
    const role = useAuthStore((state) => state.role)

    if(isGetCitra) return(
      <div
        className={`${
          role === "admin" ? "bg-white/80" : "bg-gray-900"
        } flex items-center justify-center h-screen`}
      >
        <div
          className={`${
            role === "admin"
              ? "border-gray-600 animate-spin"
              : "border-blue-500 animate-spin"
          } rounded-full h-12 w-12 border-b-2`}
        ></div>
      </div>
    )

    return (
        <div className={`${role === "admin" ? "bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden" : "bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden"}`}>
  {/* Table Header */}
  <div className={`${role === "admin" ? "p-6 border-b border-gray-200/50" : "p-6 border-b border-gray-700/50"}`}>
    <div className="flex justify-between items-center">
      <div>
        {citra.length > 0 && (
          <h2 className={`${role === "admin" ? "text-xl font-bold text-gray-800" : "text-xl font-bold text-white"}`}>
            Citra record at {citra[0].dataset?.nama_dataset}
          </h2>
        )}
        <p className={`${role === "admin" ? "text-gray-600 text-sm mt-1" : "text-gray-400 text-sm mt-1"}`}>AI-powered medical citra results</p>
      </div>
      <div className="flex items-center space-x-4">
        <AddCitra citra={citra} />
      </div>
    </div>
  </div>

  {/* Table Content */}
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className={`${role === "admin" ? "bg-gray-50/50" : "bg-gray-700/30"}`}>
        <tr>
          <th className={`${role === "admin" ? "text-gray-600" : "text-gray-300"} px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider`}>Image</th>
          <th className={`${role === "admin" ? "text-gray-600" : "text-gray-300"} px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider`}>Kode Citra</th>
          <th className={`${role === "admin" ? "text-gray-600" : "text-gray-300"} px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider`}>Diagnosis</th>
          <th className={`${role === "admin" ? "text-gray-600" : "text-gray-300"} px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider`}>Upload Date</th>
          <th className={`${role === "admin" ? "text-gray-600" : "text-gray-300"} px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider`}>Actions</th>
        </tr>
      </thead>
      <tbody className={`divide-y ${role === "admin" ? "divide-gray-200/50" : "divide-gray-700/50"}`}>
        {citra.map((record, index) => (
          <tr
            key={record.id}
            className={`${role === "admin" ? "hover:bg-blue-50/50" : "hover:bg-gray-700/30"} transition-all duration-300 group`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <td className="px-6 py-4">
              <div className="relative">
                <img
                  src={record.image_citra}
                  alt="Citra"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-gray-600/50 shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className={`${role === "admin" ? "text-gray-900" : "text-gray-300"} text-sm`}>{record.kode_citra}</span>
            </td>
            <td className="px-6 py-4">
              <span className={`${role === "admin" ? "text-gray-900" : "text-gray-300"} text-sm`}>{record.diagnosis}</span>
            </td>
            <td className="px-6 py-4">
              <p className={`${role === "admin" ? "text-gray-900" : "text-gray-300"} text-sm`}>
                {format(new Date(record.created_at), "EEE, MMM dd yyyy")}
              </p>
              <p className="text-gray-500 text-xs">
                {format(new Date(record.created_at), "p")}
              </p>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <EditCitra citra={record} />
                <DeleteCitra citra={record} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Table Footer */}
  <div className={`${role === "admin" ? "bg-gray-50/30 border-t border-gray-200/50" : "bg-gray-700/20 border-t border-gray-700/50"} px-6 py-4`}>
    <div className={`${role === "admin" ? "text-gray-600" : "text-gray-400"} flex justify-between items-center text-sm`}>
      <p>Total citra: {citra?.length || 0}</p>
      <div className="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select className={`${role === "admin" ? "border border-gray-200 text-gray-600" : "bg-gray-800/50 border border-gray-700/50 text-white"} rounded px-2 py-1 text-sm`}>
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

export default Citra
