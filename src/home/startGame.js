import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { Modal } from '../shared';

import gameActions from '../store/actions';

import * as StyledComponents from './startGame.scss';

const StartGamePage = (props) => {

    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const isNameValid = () => {
        if (name.length < 3) {
            setError({ error: true, message: 'To short name', type: 'input' })
            return false;
        } else {
            return true;
        }
    };

    const setNameHandler = e => {
        if (error && isNameValid()) {
            setError(null);
        }
        setName(e.target.value)
    };

    const startGameHandler = e => {
        e.preventDefault();
        if (!isNameValid()) {
            return
        }
        props.initNewGame(name);
    };

    useEffect(() => {
        if (props.game) {
            history.push('/game')
        }
    }, [props.game, history]);

    return (
        <React.Fragment>
            <Modal
                show={(error && error.type === 'modal') || props.isLoading}
                loading={props.isLoading}
                error={error}
                errorMessage={error ? error.message : ''}
                close={() => setError(null)}
            />
            <StyledComponents.StartGameContainerStyled>
                <StyledComponents.StartGameFormStyled onSubmit={startGameHandler}>
                    <StyledComponents.StartGameInputStyled onChange={setNameHandler} value={name} />
                    {
                        error && error.type === 'input' && <StyledComponents.StartGameErrorMessageStyled>
                            {error.message}
                        </StyledComponents.StartGameErrorMessageStyled>
                    }
                    <StyledComponents.StartGameButtonStyled type='submit'> Play </StyledComponents.StartGameButtonStyled>
                </StyledComponents.StartGameFormStyled>
            </StyledComponents.StartGameContainerStyled>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        error: state.isError,
        game: state.gameId ? true : false
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initNewGame: (name) => dispatch(gameActions.initNewGame(name)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartGamePage);