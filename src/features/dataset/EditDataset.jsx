import { Edit, Plus } from "lucide-react";
import ModalUser from "../../components/ui/ModalUser";
import CreateEditDataset from "./CreateEditDataset";

function EditDataset({ dataset }) {
  return (
    <div>
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
    </div>
  );
}

export default EditDataset
