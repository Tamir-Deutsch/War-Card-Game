import React, { useState } from 'react';
import '../styles/endingScreen.css';
import heart from '../images/hearts.png';
import diamond from '../images/diamond.png';
import clover from '../images/clover.png';
import spade from '../images/spades.png';

export default function EndingScreen(props) {
    const [isPlayAgainTouched, setIsPlayAgainTouched] = useState(false);
    const [isLogOutTouched, setIsLogOutTouched] = useState(false);

    const enterPlayAgainTouch = () => {
        setIsPlayAgainTouched(true);
    }

    const exitPlayAgainTouch = () => {
        setIsPlayAgainTouched(false);
    }

    const enterLogOutTouch = () => {
        setIsLogOutTouched(true);
    }

    const exitLogOutTouch = () => {
        setIsLogOutTouched(false);
    }

    return (
        <div className="EndingScreen">
            <div className='blackTypes'>
                <img src={clover} alt="clover" width={'40px'} height={'40px'} />
                <img src={spade} alt="spade" width={'40px'} height={'40px'} />
            </div>
            <h1 className='winnerHeader'>{props.player.isLastGameWin ? 'You win!' : 'You lost... but try again!'}</h1>
            <h2>
                {props.player.wins} - {props.player.loses}
            </h2>
            <div className='btnsContainer'>
                <button style={{
                    backgroundColor: isPlayAgainTouched ? 'black' : '',
                    color: isPlayAgainTouched ? '#e60000' : ''
                }}
                    className='playAgainBtn'
                    onClick={() => {
                        props.onStartGame();
                    }} onTouchStart={enterPlayAgainTouch} onTouchEnd={exitPlayAgainTouch}>
                    Play again
                </button>
                <button style={{
                    backgroundColor: isLogOutTouched ? 'black' : '',
                    color: isLogOutTouched ? '#e60000' : ''
                }} className='logOutBtn' onClick={props.onLogout}
                    onTouchStart={enterLogOutTouch} onTouchEnd={exitLogOutTouch}>
                    Log out
                </button>
            </div>
            <div className='redTypes'>
                <img src={heart} alt="heart" width={'40px'} height={'40px'} />
                <img src={diamond} alt="diamond" width={'50px'} height={'50px'} />
            </div>
        </div>
    );
}
