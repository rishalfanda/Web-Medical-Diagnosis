import styled from 'styled-components';
import Button from './ButtonStyledComponents';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this <span className='font-bold'>{resourceName}</span> permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          $size="medium"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          $variation="danger"
          $size="medium"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
