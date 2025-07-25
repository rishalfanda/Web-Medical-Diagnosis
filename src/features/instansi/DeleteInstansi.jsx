import { Trash2 } from 'lucide-react';
import ConfirmDelete from '../../components/ui/ConfirmDelete';
import Modal from '../../components/ui/Modal';
import { useDeleteInstansi } from '../../hooks/instansi/useDeleteInstansi';

function DeleteInstansi({instansi}) {
    const {deleteInstansi, isDeleteInstansi} = useDeleteInstansi()
    return (
        <div className='h-4 w-4'>
            <Modal>
                <Modal.Open opens="delete-instansi">
                    <button className="text-red-500 hover:text-red-600 cursor-pointer">
                    <Trash2 className="h-4 w-4" />
                    </button>
                </Modal.Open>
                <Modal.Window name="delete-instansi">
                    <ConfirmDelete
                        resourceName={instansi.name}
                        disabled={isDeleteInstansi}
                        onConfirm={() => deleteInstansi(instansi.id)}
                    />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default DeleteInstansi
