import { Edit, Home, LogOut, Search, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AddUser from "../../features/user/AddUser";
import { useGetUsers } from "../../hooks/user/useGetUsers";
import Spinner from "../../ui/Spinner";
import EditPengaduan from "../../features/user/EditUser";
import DeleteUser from "../../features/user/DeleteUser";
import EditUser from "../../features/user/EditUser";

function Admin() {
  const { isPending, users } = useGetUsers();

  const firstUser = users?.[0]; // optional chaining agar tidak error saat loading
  const avatarAdmin = firstUser?.avatar;
  const nameAdmin = firstUser?.name;

  if (isPending) return <Spinner />;
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-10">
            <img
              src={avatarAdmin}
              alt="Profile"
              className="rounded-full w-20 h-20"
            />
            <h3 className="font-semibold mt-3 text-gray-800">{nameAdmin}</h3>
            <span className="text-yellow-500 text-sm">Admin</span>
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  <Home className="mr-3 h-5 w-5" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 bg-yellow-500 text-white rounded"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Models
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <Link
            to={"/"}
            className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded transition"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Doctor List</h2>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="text-2xl">🔔</button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-600">
              Manage Doctors
            </h3>
            <div className="flex space-x-2">
              <AddUser users={users} />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                Add New Model
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>

                  <th className="px-4 py-3">Admission Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((users) => (
                  <tr key={users.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <img
                        src={users.avatar}
                        alt={users.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{users.name}</span>
                    </td>
                    <td className="px-4 py-3">{users.email}</td>
                    <td className="px-4 py-3">{users.phone}</td>
                    <td className="px-4 py-3">
                      {new Date(users.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <EditUser user={users} key={users.id} />
                        <DeleteUser user={users} key={users.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;
