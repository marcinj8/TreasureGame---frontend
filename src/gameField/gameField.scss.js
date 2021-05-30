import styled from 'styled-components';


export const GameContainerStyled = styled.article`
    position: relative;
    top:0;
    left: 0;
    width: 100%;
    height: 100vh;
    margin: 0;
`;

export const GameTitleStyled = styled.h2`
    margin: 0 auto;
    text-align: center;
    outline: none;
`;

export const GameButtonStyled = styled.button`
    border: 1px solid gray;
    border-radius: 5px;
    display: block;
    margin: 5px;
    padding: 5px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

export const GameFieldStyled = styled.ul`
    position: absolute;
    box-sizing: border-box;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 90%;
    min-width: 300px;
    min-height: 300px;
    max-width: 500px;
    max-height: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0;
    padding: 0;
`;

export const RankingListStyled = styled.ul`
    margin: 5px;
    padding: 0;
`;

export const RankingListItemStyled = styled.li`
    margin: 10px 5px;
    padding: 0;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    list-style-type: none;
    text-align: center;
   
`;

export const GameSingleFieldStyled = styled.li`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 20%;
    height: 20%;
    border: 1px solid black;
    list-style-type: none;
    text-align: center;
    background: ${props => props.background};
    cursor: ${props => props.isRevealed ? 'default' : 'pointer'};
`;

export const FieldValueStyled = styled.h3`
    padding-top: 18%;
    color: black;
    text-shadow: 0 0 3px white;
`;