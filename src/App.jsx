import { useState, useEffect } from 'react';
import './App.css';
import Login from './views/Login';
import GameBoard from './views/GameBoard';
import EndingScreen from './views/EndingScreen';
import screenRotation from './images/screenRotation.png';

const initialPlayerState = {
    name: '',
    totalGames: 0,
    wins: 0,
    loses: 0,
    isLastGameWin: true,
};

const pages = {
    login: 0,
    gameBoard: 1,
    endingScreen: 2,
};

function App() {
    const [player, setPlayer] = useState(initialPlayerState);
    const [players, setPlayers] = useState([]);
    const [currentScreen, setCurrentScreen] = useState(pages.login);
    const [isLandscape, setIsLandscape] = useState(false);
    // const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleOrientationChange = () => {
            const isMobileDevice = window.matchMedia("only screen and (max-width: 1024px)").matches;
            const isLandscapeMode = window.screen.orientation && window.screen.orientation.type
                ? window.screen.orientation.type.includes('landscape')
                : false;
            setIsLandscape(isLandscapeMode && isMobileDevice);
        };

        // Initial check
        handleOrientationChange();

        // Add event listener
        window.addEventListener('orientationchange', handleOrientationChange);

        // Cleanup
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    const onStartGame = (playerName = player.name) => {
        if (player.name === '') {
            const existingPlayer = players.find((player) => player.name === playerName);
            if (existingPlayer) {
                setPlayer(existingPlayer);
            } else {
                const playerCopy = { ...player };
                playerCopy.name = playerName;
                setPlayer(playerCopy);
                setPlayers((prevPlayersState) => [...prevPlayersState, playerCopy]);
            }
        }
        setCurrentScreen(pages.gameBoard);
    };

    const onEndGame = (isPlayerWin) => {
        const playerCopy = { ...player };
        playerCopy.totalGames += 1;
        playerCopy.wins = isPlayerWin ? playerCopy.wins + 1 : playerCopy.wins;
        playerCopy.loses = !isPlayerWin ? playerCopy.loses + 1 : playerCopy.loses;
        playerCopy.isLastGameWin = isPlayerWin;

        setPlayer(playerCopy);
        setPlayers((prevPlayersState) => {
            const playersCopy = [...prevPlayersState];
            const playerIndex = playersCopy.findIndex((player) => player.name === playerCopy.name);
            playersCopy.splice(playerIndex, 1, playerCopy);
            return playersCopy;
        });
        setCurrentScreen(pages.endingScreen);
    };

    const onLogout = () => {
        setCurrentScreen(pages.login);
        setPlayer(initialPlayerState);
    };

    const getCurrentScreen = () => {
        if (currentScreen === pages.login) {
            return <Login onStartGame={onStartGame} players={players} />;
        } else if (currentScreen === pages.gameBoard) {
            return <GameBoard onEndGame={onEndGame} player={player} />;
        } else if (currentScreen === pages.endingScreen) {
            return <EndingScreen onStartGame={onStartGame} player={player} onLogout={onLogout} />;
        }
    };

    return (
        <div className="App">
            {getCurrentScreen()}
            {isLandscape ? <div>
                <img className="rotateScreenImg" src={screenRotation} alt="Rotate your screen" />
                <h2 className="rotateScreenText">Rotate your screen</h2>
            </div> : <></>
            }
        </div>
    );
}

export default App;
