import { Edit } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import CreateEditInstansi from './CreateEditInstansi';

function EditInstansi({instansi}) {
    return (
        <div className="h-4 w-4">
            <Modal>
                <Modal.Open opens="edit-instansi">
                <button className="text-blue-500 hover:text-blue-600 cursor-pointer">
                    <Edit className="h-4 w-4" />
                </button>
                </Modal.Open>
                <Modal.Window name="edit-instansi">
                <CreateEditInstansi instansiToEdit={instansi} />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default EditInstansi
