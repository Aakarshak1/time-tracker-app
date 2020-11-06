import styled from 'styled-components';

export const AppContainer = styled.div`
  background: #f8f8ff;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  div {
    width: 50%;
  }
`;

export const CreateTaskContainer = styled.form`
  width: 100%;
`;
export const TaskTitleInput = styled.input`
  font-family: sans-serif;
  width: 100%;
  font-size: 24px;
  border: 0;
  border-bottom: 2px solid #1e1e1e;
  border-radius: 20px;
  margin: 30px 0px;
  padding: 15px 10px;
  &:focus {
    outline: none;
  }
  button {
    &:focus {
      outline: none;
    }
    &:active {
      outline: none;
    }
  }
`;

export const ListContainer = styled.ul`
  margin: 20px 0px;
  list-style: none;
  padding: 0px;
`;

export const ListItem = styled.li`
  background: #f2f0e6;
  border: 1px solid #495464;
  border-radius: 20px;
  color: #090909;
  font-size: 24px;
  width: 100%;
  margin: 20px 0px;
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .actions {
    text-align: right;
  }
  .tag {
    font-size: 12px;
    background: rgba(40, 50, 60, 0.5);
    border-radius: 8px;
    padding: 4px;
    color: #fff;
  }
  .task-title {
    font-family: Lato;
    border: none;
    font-size: 24px;
    background: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
  }
`;
