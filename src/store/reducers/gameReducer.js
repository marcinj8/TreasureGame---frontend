const initialState = {
    gameId: null,
    userName: null,
    roundsPlayed: null,
    fields: [],
    isActive: true,
    isWon: false,
    gameExpirationDate: null,
    isLoading: false,
    error: null,
    ranking: null
}

const startGame = (state, action) => {
    const newState = { ...action.payload };

    return {
        ...state,
        ...newState
    }
};

const restartGame = () => {

    return {
        ...initialState,
    }
};

const onRoundComplete = (state, action) => {
    const { fields, isWon, round } = { ...action.payload };

    return {
        ...state,
        fields,
        isWon,
        roundsPlayed: round
    }
};

const onEndGame = (state, action) => {
    const { fields, isWon, ranking } = { ...action.payload };

    return {
        ...state,
        fields,
        isWon,
        ranking: ranking
    }
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case "START_GAME": return startGame(state, action);
        case "RESTART_GAME": return restartGame();
        case "ROUND_COMPLETE": return onRoundComplete(state, action);
        case "END_GAME": return onEndGame(state, action);
        default: return state;
    }
}

export default gameReducer;