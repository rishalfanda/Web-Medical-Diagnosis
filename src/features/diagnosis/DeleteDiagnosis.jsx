import { Trash2 } from 'lucide-react';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteDiagnosis } from '../../hooks/diagnosis/useDeleteDiagnosis';

function DeleteDiagnosis({diagnosis}) {
    const{isDeleting, deleteDiagnosis} = useDeleteDiagnosis()
    return (
        <Modal>
            <Modal.Open opens="deleteDiagnosis">
                <button className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                </button>
            </Modal.Open>
            <Modal.Window name="deleteDiagnosis">
                <ConfirmDelete
                        resourceName="diagnosis"
                        disabled={isDeleting}
                        onConfirm={() => deleteDiagnosis(diagnosis.id)}
                />
            </Modal.Window>
        </Modal>
    )
}

export default DeleteDiagnosis
