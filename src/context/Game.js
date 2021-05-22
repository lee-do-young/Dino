import React, { createContext, useState } from 'react';

const GameContext = createContext([{}, () => {}]);

const GameProvider = (props) => {
    const [ state, setState ] = useState({
    });

    return (
        <GameContext.Provider value={[state, setState]}>
            {props.children}
        </GameContext.Provider>
    );
};


export { GameContext, GameProvider };