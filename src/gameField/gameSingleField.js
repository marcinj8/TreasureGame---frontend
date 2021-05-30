import React from 'react';
import { GameSingleFieldStyled, FieldValueStyled } from './gameField.scss';

const GameSingleField = (props) => {
    const { isRevealed, value, id, chooseFields, choosenFields } = props;
    const isChoosen = choosenFields.findIndex(fieldId => fieldId === id);

    let onChooseField;
    let bgColor = '#63361d';

    if (isChoosen >= 0) {
        bgColor = '#c9784b';
    }
    if (value === 1) {
        bgColor = '#3498db';
    }
    if (value === 2) {
        bgColor = '#00e640';
    }
    if (value === 3) {
        bgColor = '#cf000f';
    }
    if (value === "T") {
        bgColor = '#eeee00';
    }

    if (isRevealed) {
        onChooseField = () => false
    } else {
        onChooseField = () => chooseFields(id)
    }

    return (
        <GameSingleFieldStyled
            onClick={onChooseField}
            isRevealed={isRevealed}
            isChoosen={isChoosen >= 0}
            background={bgColor}
        >
            <FieldValueStyled>
                {value}
            </FieldValueStyled>
        </GameSingleFieldStyled>
    )
}

export default GameSingleField;