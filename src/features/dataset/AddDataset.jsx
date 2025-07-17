import { Plus } from "lucide-react";
import ModalUser from "../../components/ui/ModalUser";
import CreateEditDataset from "./CreateEditDataset";

function AddDataset({ dataset }) {
  return (
    <div>
      <ModalUser>
        <ModalUser.Open opens="add-dataset">
          <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Dataset</span>
          </button>
        </ModalUser.Open>
        <ModalUser.Window name="add-dataset">
          <CreateEditDataset user={dataset} />
        </ModalUser.Window>
      </ModalUser>
    </div>
  );
}

export default AddDataset
