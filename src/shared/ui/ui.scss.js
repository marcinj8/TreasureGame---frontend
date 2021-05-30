import styled from 'styled-components';

export const BackdropStyled = styled.div`
    position: fixed;
    background: rgba(0,0,0,.6);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`

export const ModalStyled = styled.div`
    position: fixed;
    background: silver;
    border: 1px solid black;
    border-radius: 5px;
    padding: 45px 15px;;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    min-height: 100px;
    z-index: 10;
    text-align: center;
    box-shadow: 5px 5px 10px black;
`