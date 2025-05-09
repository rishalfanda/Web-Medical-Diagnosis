import { Edit } from 'lucide-react';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import CreateUserForm from './CreateUserForm';

function EditUser({user}) {
    
    return (
        <div className='h-4 w-4'>
        <Modal>
          {/* <Menus.Menu>
            <Menus.List id={user.id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<Edit />}></Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit">
              <CreateUserForm userToEdit={user}/>
            </Modal.Window>
          </Menus.Menu> */}
          <Modal.Open opens="edit-form">
            <button className="text-blue-500 hover:text-blue-600">
              <Edit className="h-4 w-4" />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-form">
            <CreateUserForm userToEdit={user}/>
          </Modal.Window>
        </Modal>
      </div>
    )
}

export default EditUser
