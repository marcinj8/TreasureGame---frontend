import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import GameSingleField from './gameSingleField';

import { GameContainerStyled, GameFieldStyled, GameButtonStyled, RankingListStyled, RankingListItemStyled, GameTitleStyled } from './gameField.scss';
import gameActions from '../store/actions';
import { Modal } from '../shared';

const GameFieldPage = (props) => {

    const [choosenFields, setChoosenFields] = useState([]);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);

    const isFieldChoosen = useCallback(id => {
        return choosenFields.findIndex(fieldId => fieldId === id);
    }, [choosenFields])

    const chooseFieldsHandler = useCallback((id) => {
        const choosenFieldsUpdated = [...choosenFields];
        const isChoosen = isFieldChoosen(id);

        if (isChoosen >= 0) {
            choosenFieldsUpdated.splice(isChoosen, 1);
        } else if (choosenFieldsUpdated.length === 3) {
            return
        } else if (isChoosen < 0) {
            choosenFieldsUpdated.push(id);
        }
        setChoosenFields(choosenFieldsUpdated);
    }, [choosenFields, isFieldChoosen])

    const onRoundEndHandler = (choosenFields, gameId) => {
        props.onRoundEnd(choosenFields, gameId)
        setChoosenFields([]);
    }

    const gameField = useMemo(() => {
        return props.fields.map((field, i) => {
            return (
                <GameSingleField
                    key={field.id}
                    isRevealed={field.revealed}
                    value={field.value ? field.value : null}
                    id={field.id}
                    index={i}
                    choosenFields={choosenFields}
                    chooseFields={chooseFieldsHandler}
                />
            )
        })
    }, [choosenFields, chooseFieldsHandler, props.fields])

    useEffect(() => {
        if (choosenFields.length >= 1) {
            setIsConfirmButtonDisabled(false);
        } else {
            setIsConfirmButtonDisabled(true);
        }
    }, [choosenFields])

    return (
        <React.Fragment>
            <Modal show={props.ranking !== null}>
                <RankingListStyled>
                    <h3>top players</h3>
                    {props.ranking !== null
                        ? props.ranking.map(position => (
                            <RankingListItemStyled
                                key={position.name + position.rounds}
                            >
                                <span> {position.name} - rounds played: {position.rounds}</span>
                            </RankingListItemStyled>
                        ))
                        : ''
                    }
                </RankingListStyled>
                <button onClick={props.restartGameData}>new game</button>
            </Modal>
            <GameContainerStyled>
                <GameTitleStyled>Round: {props.roundsPlayed + 1}</GameTitleStyled>
                <GameFieldStyled>
                    {gameField}
                </GameFieldStyled>
                <GameButtonStyled
                    disabled={isConfirmButtonDisabled}
                    onClick={() => onRoundEndHandler(choosenFields, props.gameId)}
                >confirm</GameButtonStyled>
                <GameButtonStyled onClick={props.restartGameData}>new game</GameButtonStyled>

            </GameContainerStyled>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        gameId: state.gameId,
        isLoading: state.isLoading,
        error: state.isError,
        fields: state.fields,
        isWon: state.isWon,
        isActive: state.isActive,
        roundsPlayed: state.roundsPlayed,
        userName: state.userName,
        ranking: state.ranking
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRoundEnd: (choosenFields, gameId) => dispatch(gameActions.onRoundEnd(choosenFields, gameId)),
        restartGameData: () => dispatch(gameActions.restartGameData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameFieldPage);