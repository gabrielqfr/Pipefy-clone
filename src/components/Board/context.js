import { createContext } from 'react';

//Utilização de contexto para que as informações do Board sejam acessadas pelo Card
export default createContext({
    lists: [],
    move: () => {},
});