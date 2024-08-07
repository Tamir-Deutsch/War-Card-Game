import React from 'react';
import '../styles/endingScreen.css';
import heart from '../images/hearts.png';
import diamond from '../images/diamond.png';
import clover from '../images/clover.png';
import spade from '../images/spades.png';

export default function EndingScreen(props) {
    return (
        <div className="EndingScreen">
            <div className='blackTypes'>
                <img src={clover} alt="clover" width={'40px'} height={'40px'} />
                <img src={spade} alt="spade" width={'40px'} height={'40px'} />
            </div>
            <h1>{props.player.isLastGameWin ? 'You win!' : 'You lost... but try again!'}</h1>
            <h2>
                {props.player.wins} - {props.player.loses}
            </h2>
            <div className='btnsContainer'>
                <button className='playAgainBtn'
                    onClick={() => {
                        props.onStartGame();
                    }}> Play again
                </button>
                <button className='logOutBtn' onClick={props.onLogout}>Log out</button>
            </div>
            <div className='redTypes'>
                <img src={heart} alt="heart" width={'40px'} height={'40px'} />
                <img src={diamond} alt="diamond" width={'50px'} height={'50px'} />
            </div>
        </div>
    );
}
