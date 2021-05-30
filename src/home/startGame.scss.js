import styled from 'styled-components';

export const StartGameContainerStyled = styled.article`
    margin: 0;
    padding: 15px;
    width: 100%;
    height: 100vh;
`;

export const StartGameFormStyled = styled.form`
    margin: 0 auto;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const StartGameInputStyled = styled.input`
    margin: 5px auto;
    border-radius: 5px;
    outline: none;
    padding: 5px;
`;

export const StartGameErrorMessageStyled = styled.div`
    margin: 5px auto;
    padding: 5px;
    color: red;
`;

export const StartGameButtonStyled = styled.button`
    margin: 5px auto;
    outline: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
`;