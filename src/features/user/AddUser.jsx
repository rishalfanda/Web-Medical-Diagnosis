import Button from '../../ui/Button';

import Modal from '../../ui/Modal';
import CreateUserForm from "./CreateUserForm";

function AddUser({ users }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button $variation="yellow" $size="customYellow">
            Add new User
          </Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateUserForm user={users} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser
