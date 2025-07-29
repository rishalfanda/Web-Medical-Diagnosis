import { Bell } from "lucide-react"

function AdminHeader() {
    return (
            /* Header */
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        TB Screen AI
                    </h1>
                    <p className="text-gray-600 mt-1">Kelola dokter dan tenaga medis</p>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
                        <Bell className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="w-px h-8 bg-gray-300"></div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">Selamat datang kembali!</p>
                            <p className="text-xs text-gray-600">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
            </div>
    )
}

export default AdminHeader
