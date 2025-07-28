import { UserPlus } from "lucide-react";
import Button from "../../components/ui/ButtonStyledComponents";
import Modal from "../../components/ui/Modal";
import CreateUserForm from "./CreateUserForm";

function AddUser({ users }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Tambah Tenaga Medis</span>
          </button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateUserForm user={users} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser
