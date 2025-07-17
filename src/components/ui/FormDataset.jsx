import styled, { css } from 'styled-components';

const FormDataset = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;
      background-color: #1f2937; /* bg-gray-800 */
      border: 1px solid #4b5563; /* border-gray-600 */
      border-radius: 0.75rem; /* rounded-md */
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

FormDataset.defaultProps = {
  type: 'regular',
};

export default FormDataset;
