import { Search } from "lucide-react";
import { useState } from "react";
import { useGetInstansi } from "../../hooks/instansi/useGetInstansi";
import AddInstansi from "./AddInstansi";
import DeleteInstansi from "./DeleteInstansi";
import EditInstansi from "./EditInstansi";

function InstansiTable() {
    const {instansi, isGetInstansi} = useGetInstansi()
    const [searchTerm, setSearchTerm] = useState("");

    if (isGetInstansi) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

    const filteredInstansi = instansi?.filter(instansi => 
        instansi.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Instansi Directory</h2>
                <p className="text-gray-600 text-sm mt-1">Manage Instansi</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search instansi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                  />
                </div>
                <AddInstansi/>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Instansi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {filteredInstansi?.map((instansi, index) => (
                  <tr 
                    key={instansi.id} 
                    className="hover:bg-blue-50/50 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-gray-900 text-sm">{instansi.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 text-sm">
                        {new Date(instansi.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <EditInstansi instansi={instansi} />
                        <DeleteInstansi instansi={instansi}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-200/50">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>Showing {filteredInstansi?.length || 0} of {instansi?.length || 0} instansi</p>
              <div className="flex items-center space-x-2">
                <span>Rows per page: 10</span>
                <select className="border border-gray-200 rounded px-2 py-1 text-sm">
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

export default InstansiTable
