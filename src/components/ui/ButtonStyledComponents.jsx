import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
  customYellow: css`
    padding: 0.5rem 1rem; /* py-2 px-4 */
  `,
  
};

const variations = {
  yellow: css`
    background-color: #eab308; /* Tailwind's bg-yellow-500 */
    color: white;
    border-radius: 0.25rem; /* rounded */
    transition: background-color 0.2s;

    &:hover {
      background-color: #ca8a04; /* Tailwind's hover:bg-yellow-600 */
    }
  `,
  indigo: css`
    background: linear-gradient(to right, #3b82f6, #4f46e5); /* from-blue-500 to-indigo-600 */
    color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); /* shadow-lg */
    transition: all 0.3s ease; /* transition-all duration-300 */

    &:hover {
      background: linear-gradient(to right, #2563eb, #4338ca); /* hover:from-blue-600 to-indigo-700 */
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); /* hover:shadow-xl */
    }
  `,
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const ButtonStyledComponents = styled.button`
  border-radius: var(--border-radius-sm);
  border: none;
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  ${(props) => sizes[props.$size]}
  ${(props) => variations[props.$variation]}
`;

ButtonStyledComponents.defaultProps = {
  $variation: 'primary',
  $size: 'medium',
};


export default ButtonStyledComponents;
