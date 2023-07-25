import styled from '@emotion/styled';

export const Button = styled.button`
  border-radius: 5px;
  border-color: ${(props) => props.isOpen ? 'blue' : 'red'}
`;
