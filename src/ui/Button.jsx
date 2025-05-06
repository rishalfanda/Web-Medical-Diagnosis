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
};

const variations = {
  yellow: css`
    background-color: #eab308; /* Tailwind's bg-yellow-500 */
    color: white;
    padding: 0.5rem 1rem; /* py-2 px-4 */
    border-radius: 0.25rem; /* rounded */
    transition: background-color 0.2s;

  &:hover {
    background-color: #ca8a04; /* Tailwind's hover:bg-yellow-600 */
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

const Button = styled.button`
  border-radius: var(--border-radius-sm);
  border: none;
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.$size]}
  ${(props) => variations[props.$variation]}
`;

Button.defaultProps = {
  $variation: 'primary',
  $size: 'medium',
};


export default Button;
