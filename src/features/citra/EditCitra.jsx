import { Edit } from "lucide-react";
import ModalUser from "../../components/ui/ModalUser";
import CreateEditCitra from "./CreateEditCitra";
import useAuthStore from "../../store/authStore";
import Modal from "../../components/ui/Modal";

function EditCitra({ citra }) {
  const role = useAuthStore((state) => state.role)
  const isAdminOrNull = role === "admin" || role === null;
  return (
    <div>
      {
        isAdminOrNull ? (
          <Modal>
            <Modal.Open opens="edit-citra">
              <button className="text-green-400 hover:text-green-500 cursor-pointer">
                <Edit className="h-4 w-4" />
            </button>
            </Modal.Open>
            <Modal.Window name="edit-citra">
              <CreateEditCitra citraToEdit={citra}/>
            </Modal.Window>
          </Modal>
        ):(
          <ModalUser>
            <ModalUser.Open opens="edit-citra">
              <button className="text-green-400 hover:text-green-500 cursor-pointer">
                <Edit className="h-4 w-4" />
            </button>
            </ModalUser.Open>
            <ModalUser.Window name="edit-citra">
              <CreateEditCitra citraToEdit={citra}/>
            </ModalUser.Window>
          </ModalUser>
        )
      }
    </div>
  );
}

export default EditCitra
