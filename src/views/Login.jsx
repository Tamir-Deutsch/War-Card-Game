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
    // const [isCloseBtnClicked, setIsCloseBtnClicked] = useState(false);

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

    return (
        <div className='loginContainer'>
            <h1>Welcome To War Card Game</h1>
            {isScoreBoardClicked ? <div className="overlay"></div> : <></>}
            <div className='gameLogo'>
                <div className='heart'>
                    <img src={heart} alt="heart" width={'75px'} height={'75px'} />
                </div>
                <div className='diamond'>
                    <img src={diamond} alt="diamond" width={'90px'} height={'90px'} />
                </div>
                <div>
                    <img src={swords} alt="swords" width={'300px'} height={'300px'} />
                </div>
                <div className='clover'>
                    <img src={clover} alt="clover" width={'75px'} height={'75px'} />
                </div>
                <div className='spade'>
                    <img src={spade} alt="spade" width={'75px'} height={'80px'} />
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className='userNameDiv'>
                <label className='userName' htmlFor="input">
                    <input required id='input' placeholder='Enter your name' onInput={(event) => {
                        setName(event.target.value);
                        setIsErrorShown(false);
                    }}
                    />
                </label>
            </div>
            <br />
            {isErrorShown ? <div style={{
                color: 'crimson', fontSize: '16px'
            }}>
                Please enter a valid name with at least 2 characters</div> : <></>}

            <div className='buttonsContainer'>
                <button className='play' onClick={validation}>
                    Start game
                </button>
                <div>
                    <button disabled={isScoreBoardClicked} style={{ pointerEvents: isScoreBoardClicked ? 'none' : 'auto'}} className='scoreBoardBtn' onClick={() => {
                        setIsScoreBoardClicked(!isScoreBoardClicked);
                    }}
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
