import { Trash2 } from 'lucide-react';
import ConfirmDelete from '../../components/ui/ConfirmDelete';
import ModalUser from '../../components/ui/ModalUser';
import { useDeleteDiagnosis } from '../../hooks/diagnosis/useDeleteDiagnosis';


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
                        resourceName={diagnosis.patients.fullName}
                        disabled={isDeleting}
                        onConfirm={() => deleteDiagnosis(diagnosis.id)}
                />
            </ModalUser.Window>
        </ModalUser>
    )
}

export default DeleteDiagnosis
