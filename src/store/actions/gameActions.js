import axios from "axios"

const setGame = game => {
    localStorage.setItem(
        'userData',
        JSON.stringify({
            gameId: game.gameId,
            gameExpirationDate: game.gameExpirationDate
        }));
    return ({
        type: 'START_GAME',
        payload: game
    })
};

export const initNewGame = (name) => {
    return async dispatch => {
        axios.post(`http://localhost:5000/api/start`, { userName: name })
            .then(res => dispatch(setGame(res.data.gameData)))
            .catch(err => console.log(err))

    }
};

export const restartGameData = () => {
    localStorage.clear();
    return {
        type: 'RESTART_GAME'
    }
};

const resumeExistingGame = (gameId) => {
    return async dispatch => {
        axios.post(`http://localhost:5000/api/resume`, { gameId })
            .then(res => {
                if (res.data.gameExpiried) {
                    return dispatch(restartGameData());
                }
                return dispatch(setGame(res.data.gameData));
            })
            .catch(err => console.log(err));

    };
}

export const checkIsGameActive = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const currentDate = new Date().getTime();
    if (userData && userData.gameExpirationDate > currentDate) {
        return resumeExistingGame(userData.gameId);
    } else {
        return restartGameData();
    }

};

const endGame = updatedGameData => {
    return ({
        type: 'END_GAME',
        payload: updatedGameData
    })
};

const startNextRound = updatedGameData => {
    return ({
        type: 'ROUND_COMPLETE',
        payload: updatedGameData
    })
};

const choosenFieldsConfirmation = updatedGameData => {
    if (updatedGameData.isWon) {
        return endGame(updatedGameData)
    } else {
        return startNextRound(updatedGameData)
    }

};

export const onRoundEnd = (choosenFields, gameId) => {
    return async dispatch => {
        axios.post(`http://localhost:5000/api/check-answer`, { choosenFields, gameId })
            .then(res => dispatch(choosenFieldsConfirmation(res.data)))
            .catch(err => console.log(err))

    }
};