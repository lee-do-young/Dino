import React, { createContext, useState } from 'react';

const GameContext = createContext([{}, () => {}]);

const GameProvider = (props) => {
    const [ state, setState ] = useState({
        gameInfo: null,
        gameSubscription: null,
        playerInfoArray: [],
        playerSubscriptionArray: [],
    });

    return (
        <GameContext.Provider value={[state, setState]}>
            {props.children}
        </GameContext.Provider>
    );
};


export { GameContext, GameProvider };