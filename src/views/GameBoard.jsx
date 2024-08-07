import React, { useState, useEffect } from 'react';
import '../styles/GameBoard.css';
import * as deck from '@letele/playing-cards'; // Import the entire deck
import getSeperateRandomDecks from '../deckCreator';

// Assuming getSeperateRandomDecks returns two separate decks
const [firstDeck, secondDeck] = getSeperateRandomDecks();

const initialGameState = {
    playerCard: null,  // Set initial values to null
    computerCard: null,
    playerWins: 0,
    computerWins: 0,
};

export default function GameBoard(props) {
    const [playerDeck, setPlayerDeck] = useState(firstDeck);
    const [computerDeck, setComputerDeck] = useState(secondDeck);
    const [game, setGame] = useState(initialGameState);

    useEffect(() => {
        // Initialize with back cards
        setGame(prevGameState => ({
            ...prevGameState,
            playerCard: 0,  // Back card 1 for player
            computerCard: 1,  // Back card 2 for computer
        }));
    }, []);

    const doTurn = () => {
        if (playerDeck.length === 0 || computerDeck.length === 0) {
            props.onEndGame(game.playerWins > game.computerWins);
            return;
        }

        // Draw the first card for both player and computer
        let playerCard = playerDeck[0];
        let computerCard = computerDeck[0];

        // Validate card values
        if (playerCard < 2 || playerCard > 14) {
            console.warn(`Invalid player card value: ${playerCard}`);
            playerCard = 2; // Default to 2 if invalid
        }

        if (computerCard < 2 || computerCard > 14) {
            console.warn(`Invalid computer card value: ${computerCard}`);
            computerCard = 2; // Default to 2 if invalid
        }

        // Remove the first card from both decks
        setPlayerDeck(prevPlayerDeckState => prevPlayerDeckState.slice(1));
        setComputerDeck(prevComputerDeckState => prevComputerDeckState.slice(1));

        const determineWinner = (playerCard, computerCard) => {
            if (playerCard > computerCard) {
                return 'player';
            } else if (computerCard > playerCard) {
                return 'computer';
            } else {
                return 'tie';
            }
        };

        const winner = determineWinner(playerCard, computerCard);

        setGame(prevGameState => ({
            ...prevGameState,
            playerCard,
            computerCard,
            playerWins: winner === 'player' ? prevGameState.playerWins + 1 : prevGameState.playerWins,
            computerWins: winner === 'computer' ? prevGameState.computerWins + 1 : prevGameState.computerWins,
        }));
    };

    const getCardComponent = (cardValue) => {
        if (cardValue == null || cardValue < 0 || cardValue > 14) {
            console.warn(`Invalid card value: ${cardValue}`);
            return null;
        }

        const suits = ['H', 'D', 'C', 'S'];
        const rankMapping = {
            0: 'B1', 1: 'B2', // Back cards
            2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10',
            11: 'j', 12: 'q', 13: 'k', 14: 'a'
        };

        if (cardValue === 0 || cardValue === 1) {
            const componentName = rankMapping[cardValue];
            const CardComponent = deck[componentName];

            if (!CardComponent) {
                console.warn(`Card component not found for ${componentName}`);
                return null;
            }

            return <CardComponent style={{ width: '150px', height: '200px' }} />;
        }

        const suitIndex = Math.floor(Math.random() * 4);
        const suit = suits[suitIndex];
        const rank = rankMapping[cardValue];

        if (!rank) {
            console.warn(`Invalid card rank for value: ${cardValue}`);
            return null;
        }

        const componentName = `${suit}${rank}`;
        const CardComponent = deck[componentName];

        if (!CardComponent) {
            console.warn(`Card component not found for ${componentName}`);
            return null;
        }

        return <CardComponent style={{ width: '150px', height: '200px' }} />;
    };

    return (
        <div className="GameBoard">
            <h2>Computer || Wins: {game.computerWins}</h2>

            <div className="computer-card card" style={{ marginRight: '50px' }}>
                {getCardComponent(game.computerCard)}
            </div>

            <div className="player-card card" style={{ marginRight: '50px' }}>
                {getCardComponent(game.playerCard)}
            </div>

            <h2>
                {props.player.name} || Wins: {game.playerWins}
            </h2>

            <button className="nextBtn" onClick={doTurn}>Hit</button>
        </div>
    );
}
