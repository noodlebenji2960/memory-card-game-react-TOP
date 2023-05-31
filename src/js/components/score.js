import React, {useState, useRef, useEffect} from 'react';
import './score.css';

const Score = (props) => {
    return (
        <div className='scoreBoard'>
            <div className="currentScore">Current Score: <span className='score'>{props.score}</span></div>
            <div className="bestScore">Best Score: <span className='score'>{props.bestScore}</span></div>
        </div>
    )
}

export default Score