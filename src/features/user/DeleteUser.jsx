import { Trash2 } from 'lucide-react';
import { useDeleteUser } from '../../hooks/user/useDeleteUser';
import Modal from '../../components/ui/Modal';
import ConfirmDelete from '../../components/ui/ConfirmDelete';

function DeleteUser({user}) {
    const {isDeleting, deleteUser} = useDeleteUser()
    return (
        <div className='h-4 w-4'>
            <Modal>
                <Modal.Open opens="delete">
                    <button className="text-red-500 hover:text-red-600 cursor-pointer">
                    <Trash2 className="h-4 w-4" />
                    </button>
                </Modal.Open>
                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName="user"
                        disabled={isDeleting}
                        onConfirm={() => deleteUser(user.id)}
                    />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default DeleteUser
