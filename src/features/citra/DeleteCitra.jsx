import { Edit, Trash2 } from "lucide-react";
import ModalUser from "../../components/ui/ModalUser";
import CreateEditCitra from "./CreateEditCitra";
import { useDeleteCitra } from "../../hooks/citra/useDeleteCitra";
import ConfirmDelete from "../../components/ui/ConfirmDelete";

function DeleteCitra({ citra }) {
    const {deleteCitra, isDeleteCitra} = useDeleteCitra()
  return (
    <div>
      <ModalUser>
        <ModalUser.Open opens="delete-citra">
          <button className="text-red-500 hover:text-red-600 cursor-pointer">
                <Trash2 className="h-4 w-4" />
            </button>
        </ModalUser.Open>
        <ModalUser.Window name="delete-citra">
          <ConfirmDelete
            resourceName="Citra"
            disabled={isDeleteCitra}
            onConfirm={() => deleteCitra(citra.id)}
          />
        </ModalUser.Window>
      </ModalUser>
    </div>
  );
}

export default DeleteCitra
