import React from 'react';
import '../styles/scoreBoard.css';

export default function ScoreBoard(props) {

    return (
        <div className='scoreBoard'>
            <button className="closeBtn" onClick={() => { props.closeBtn() }}>X</button>
            <h2>Score Board</h2>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Wins</th>
                        <th>Losses</th>
                    </tr>
                </thead>
                <tbody>
                    {props.players.map(player => (
                        <tr>
                            <td>{player.name}</td>
                            <td>{player.wins}</td>
                            <td>{player.loses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}   