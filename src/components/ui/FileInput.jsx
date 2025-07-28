import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background: linear-gradient(to right, #3b82f6, #4f46e5);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(to right, #2563eb, #4338ca); /* hover:from-blue-600 to-indigo-700 */
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); /* hover:shadow-xl */
    }
  }
`;

export default FileInput;
