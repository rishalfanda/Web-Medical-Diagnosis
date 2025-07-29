import { Plus } from "lucide-react";
import ModalUser from "../../components/ui/ModalUser";
import CreateEditCitra from "./CreateEditCitra";
import useAuthStore from "../../store/authStore";
import Modal from "../../components/ui/Modal";

function AddCitra({ citra }) {
  const role = useAuthStore((state) => state.role)
  const isAdminOrSuperadmin = role === "admin" || role === "superadmin";
  return (
    <div>
      {
        isAdminOrSuperadmin? (
          <Modal>
            <Modal.Open opens="add-citra">
              <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Image</span>
              </button>
            </Modal.Open>
            <Modal.Window name="add-citra">
              <CreateEditCitra user={citra} />
            </Modal.Window>
        </Modal>
        ):(
          <ModalUser>
            <ModalUser.Open opens="add-citra">
              <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Image</span>
              </button>
            </ModalUser.Open>
            <ModalUser.Window name="add-citra">
              <CreateEditCitra user={citra} />
            </ModalUser.Window>
        </ModalUser>
        )
      }
    </div>
  );
}

export default AddCitra
