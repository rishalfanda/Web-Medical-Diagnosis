import { Edit, Plus } from "lucide-react";
import ModalUser from "../../components/ui/ModalUser";
import CreateEditDataset from "./CreateEditDataset";
import Modal from "../../components/ui/Modal";
import useAuthStore from "../../store/authStore";

function EditDataset({ dataset }) {
  const role = useAuthStore((state) => state.role)
  const isAdminOrSuperadmin = role === "admin" || role === "superadmin";

  return (
    <div>
      {
        isAdminOrSuperadmin ? (
          <Modal>
            <Modal.Open opens="edit-dataset">
              <button className="text-green-400 hover:text-green-500 cursor-pointer">
                <Edit className="h-4 w-4" />
            </button>
            </Modal.Open>
            <Modal.Window name="edit-dataset">
              <CreateEditDataset datasetToEdit={dataset}/>
            </Modal.Window>
          </Modal>
        ): (
          <ModalUser>
            <ModalUser.Open opens="edit-dataset">
              <button className="text-green-400 hover:text-green-500 cursor-pointer">
                <Edit className="h-4 w-4" />
            </button>
            </ModalUser.Open>
            <ModalUser.Window name="edit-dataset">
              <CreateEditDataset datasetToEdit={dataset}/>
            </ModalUser.Window>
          </ModalUser>
        )
      }
    </div>
  );
}

export default EditDataset
