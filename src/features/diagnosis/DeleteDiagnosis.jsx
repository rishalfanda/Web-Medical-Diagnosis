import { Trash2 } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import ConfirmDelete from '../../components/ui/ConfirmDelete';
import { useDeleteDiagnosis } from '../../hooks/diagnosis/useDeleteDiagnosis';
import ModalUser from '../../components/ui/ModalUser';


function DeleteDiagnosis({diagnosis}) {
    const{isDeleting, deleteDiagnosis} = useDeleteDiagnosis()
    return (
        <ModalUser>
            <ModalUser.Open opens="deleteDiagnosis">
                <button className="text-red-500 hover:text-red-600 cursor-pointer">
                    <Trash2 className="h-4 w-4" />
                </button>
            </ModalUser.Open>
            <ModalUser.Window name="deleteDiagnosis">
                <ConfirmDelete
                        resourceName="diagnosis"
                        disabled={isDeleting}
                        onConfirm={() => deleteDiagnosis(diagnosis.id)}
                />
            </ModalUser.Window>
        </ModalUser>
    )
}

export default DeleteDiagnosis
