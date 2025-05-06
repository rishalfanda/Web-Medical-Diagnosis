import Button from '../../ui/Button';

import Modal from '../../ui/Modal';

function AddUser() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="user-form">
                <Button $variation="yellow">Add new User</Button>
                </Modal.Open>
                <Modal.Window name="user-form">
                {/* <CreateCabinForm /> */}
                </Modal.Window>
            </Modal>
    </div>
    )
}

export default AddUser
