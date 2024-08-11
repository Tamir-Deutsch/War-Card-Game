import React, { useState } from 'react';
import ScoreBoard from '../components/ScoreBoard';
import '../styles/login.css';
// import GameBoard from './GameBoard';
import swords from '../images/swords.png';
import heart from '../images/hearts.png';
import diamond from '../images/diamond.png';
import clover from '../images/clover.png';
import spade from '../images/spades.png';

export default function Login(props) {
    const [name, setName] = useState('');
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [isScoreBoardClicked, setIsScoreBoardClicked] = useState(false);
    const [isStartBtnTouched, setIsStartBtnTouched] = useState(false);
    const [isScoreboardBtnTouched, setIsScoreboardBtnTouched] = useState(false);

    const validation = () => {
        if (name.length > 0 && name.length >= 2) {
            props.onStartGame(name);
        } else {
            setIsErrorShown(true);
        }
    }

    //Close the score board
    const closeBtn = () => {
        setIsScoreBoardClicked(!isScoreBoardClicked);
    }

    //when the user touches the button with his finger
    const enterStartBtnTouch = () => {
        setIsStartBtnTouched(true);
    }

    //when the user removes hos finger
    const exitStartBtnTouch = () => {
        setIsScoreboardBtnTouched(false);
    }

    //when the user touches the button with his finger
    const enterScoreboardBtnTouch = () => {
        setIsScoreboardBtnTouched(true);
    }

    //when the user removes hos finger
    const exitScoreboardBtnTouch = () => {
        setIsScoreboardBtnTouched(false);
    }

    return (
        <div className='loginContainer'>
            <h1>Welcome To War Card Game</h1>
            {isScoreBoardClicked ? <div className="overlay"></div> : <></>}
            <div className='gameLogo'>
                <div className='heart'>
                    <img src={heart} alt="heart" width={window.innerWidth <= 768 ? '50px' : '75px'}
                        height={window.innerWidth <= 768 ? '50px' : '75px'} />
                </div>
                <div className='diamond'>
                    <img src={diamond} alt="diamond" width={window.innerWidth <= 768 ? '65px' : '90px'}
                        height={window.innerWidth <= 768 ? '65px' : '90px'} />
                </div>
                <div className='swords'>
                    <img src={swords} alt="swords" width={window.innerWidth <= 768 ? '225px' : '300px'}
                        height={window.innerWidth <= 768 ? '225px' : '300px'} />
                </div>
                <div className='clover'>
                    <img src={clover} alt="clover" width={window.innerWidth <= 768 ? '50px' : '75px'}
                        height={window.innerWidth <= 768 ? '50px' : '75px'} />
                </div>
                <div className='spade'>
                    <img src={spade} alt="spade" width={window.innerWidth <= 768 ? '50px' : '75px'} h
                        height={window.innerWidth <= 768 ? '55px' : '75px'} />
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className='userNameDiv'>
                <label className='userName' htmlFor="input">
                    <input required id='input' placeholder='Enter your name'
                        onInput={(event) => {
                            setName(event.target.value);
                            setIsErrorShown(false);
                        }}
                    />
                </label>
            </div>

            {isErrorShown ? <div className='userNameError'>
                Please enter a valid name with at least 2 characters</div> : <></>}

            <div className='buttonsContainer'>
                <button style={{
                    backgroundColor: isStartBtnTouched ? 'black' : '',
                    color: isStartBtnTouched ? '#e60000' : ''
                }} className='play' onClick={validation} onTouchStart={enterStartBtnTouch}
                    onTouchEnd={exitStartBtnTouch}>
                    Start game
                </button>
                <div>
                    <button disabled={isScoreBoardClicked} style={{
                        pointerEvents: isScoreBoardClicked ? 'none' : 'auto',
                        backgroundColor: isScoreboardBtnTouched ? 'black' : '',
                        color: isScoreboardBtnTouched ? '#e60000' : '',
                    }}
                        className='scoreBoardBtn' onClick={() => {
                            setIsScoreBoardClicked(!isScoreBoardClicked);
                        }}
                        onTouchStart={enterScoreboardBtnTouch}
                        onTouchEnd={exitScoreboardBtnTouch}
                    >
                        Score board
                    </button>
                </div>
                {isScoreBoardClicked ? <ScoreBoard closeBtn={closeBtn}
                    players={props.players} /> : <></>}
            </div>
        </div >
    );
}
