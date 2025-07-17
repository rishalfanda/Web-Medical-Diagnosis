import { Edit } from "lucide-react";
import ModalUser from "../../components/ui/ModalUser";
import CreateEditCitra from "./CreateEditCitra";

function EditCitra({ citra }) {
  return (
    <div>
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
    </div>
  );
}

export default EditCitra
