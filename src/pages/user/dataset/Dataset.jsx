import { format } from "date-fns";
import { Eye } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AddDataset from "../../../features/dataset/AddDataset";
import EditDataset from "../../../features/dataset/EditDataset";
import { useGetDataset } from "../../../hooks/dataset/useGetDataset";

function Dataset() {
    const {isGetDataset, dataset} = useGetDataset()
    const navigate = useNavigate()

    if(isGetDataset) return(
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
    )

    return (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Dataset Records</h2>
                <p className="text-gray-400 text-sm mt-1">AI-powered medical dataset results</p>
              </div>
            
          <div className="flex items-center space-x-4">
            <AddDataset dataset={dataset}/>
          </div>
          </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Nama Dataset
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {dataset.map((record, index) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-gray-700/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <p className="text-gray-300 text-sm">{record.nama_dataset}</p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 text-sm">{record.lokasi}</span>
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
                      <div className="flex items-center space-x-2">
                         <EditDataset dataset={record}/>
                        <button
                          onClick={() => navigate(`citra/${record.id}`)}
                          className="p-2 text-blue-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-300 group cursor-pointer"
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
              <p>Total dataset: {dataset?.length || 0}</p>
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
    )
}

export default Dataset
