import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  padding: 0 24px;
  height: 60px;
  background-color: #1f1f1a;

  @media (min-width: 768px) {
    margin-bottom: 16px;
  }

  a {
    display: flex;
    align-items: center;

    font-size: 16px;
    text-decoration: none;
    padding: 30px 0 30px 0;
    color: #888888;
    border-bottom: 1px solid transparent;

    &.active {
      color: #ffffff;
      border-color: #ffffff;
      /* background-color: #006ff2; */
      /* border-radius: 2px; */

      font-weight: 500;
    }

    &:not(:last-of-type) {
      margin-right: 16px;
    }
  }
`;
