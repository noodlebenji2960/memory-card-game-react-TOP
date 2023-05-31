import { useState, useRef, useEffect } from "react";
import Card from "./card";
import './inGame.css';

function InGame(props) {
    const cardRef = useRef()

    function DrawCards(){
        let cards = []

            for(let i=0;i<props.gameData.level;i++){
                let cardObj = props.chosenTheme.imageList[Math.floor(Math.random()*props.chosenTheme.imageList.length)];

                let touchable = true
                const img = cardObj.url
                const flipped=true
                const flipOnRender=[true, 50]
                const card = Card({touchable,flipped,flipOnRender,img, i})
                cards.push(
                    <div 
                        title={cardObj.title}
                        ref={cardRef} 
                        key={crypto.randomUUID()} 
                        onClick={(e)=>handleClick(e, cardObj)}
                        style={{
                            flexBasis:10+"em",
                        }}
                    >
                        {card.render}
                    </div>
                )
            }
            return cards
        }

    function handleClick(e, cardObj){
        let cards
        let level
        let score
        let bestScore
        if(!props.gameData.cards.find((e)=>{
            if(e.title==cardObj.title){
                return true
            }
        })){
            cards = props.gameData.cards.concat(cardObj)
            level = props.gameData.level+1
            score = props.gameData.score+1
            bestScore = props.gameData.bestScore
            if(bestScore<score){
                bestScore = score
            }
        }else{
            console.log("gameover")
            score = 0
            level = 2
            cards = []
            bestScore = props.gameData.bestScore
        }
        props.setGameData({level,score,bestScore, cards})
    }

    return {render:(
            <div className="inGameScreen">
                <DrawCards></DrawCards>
            </div>
        )
}}

export default InGame