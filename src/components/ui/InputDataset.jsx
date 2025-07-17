import styled from 'styled-components';

const InputDataset = styled.input`
  border: 1px solid #4b5563; /* border-gray-600 */
  background-color: #111827; /* bg-gray-900 */
  color: #f3f4f6; /* text-gray-100 */
  border-radius: 0.5rem; /* rounded */
  padding: 0.8rem 1.2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

  &:focus {
    outline: none;
    border-color: #3b82f6; /* blue-500 */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export default InputDataset;
