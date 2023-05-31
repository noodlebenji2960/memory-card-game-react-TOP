import React, {useState, useRef, useEffect, createElement} from 'react';
import './themeChooser.css';
import Card from './card';
import {themeCardObject as planets} from '../themes/planetsImageList'
import {themeCardObject as celebrities} from '../themes/celebrityImageList'
import {themeCardObject as pokemon} from '../themes/pokemonImageList'
import {themeCardObject as molecules} from '../themes/moleculesImageList';
import {themeCardObject as paintings} from '../themes/paintingsImageList';

const ThemeChooser = (props) => {
    const themeSelectionRef = useRef()
    const cardRef = useRef()
    const previousThemeList = useRef()
    const themeList = useRef()
    const [chosenTheme, setChosenTheme] = useState()
    const [themes, setThemes] = useState(
        [   {difficulty:undefined, list:undefined},
            {difficulty:"easy", list:[pokemon]},
            {difficulty:"medium", list:[celebrities, paintings]},
            {difficulty:"hard", list:[planets, molecules]}
        ])

    function Cards(){
        //intial
        let touchable=false;
        let flipped=true;
        let flipOnRender=false;
        let looplength = 5
        let img = undefined;
        let classNameSuffix;
        let cards = []
    if(props.chosenDifficulty==undefined){
        for(let index=0;index<looplength;index++){
            classNameSuffix = index+1
            //button onMouseEnter
            if(props.difficultyButtonHover!==undefined){
                if(props.difficultyButtonHover!==undefined&&previousThemeList.current!==undefined){
                    themeList.current = themes.find((e)=>{if(e.difficulty==props.difficultyButtonHover){return true}}).list;
                    let difference = themeList.current.length-previousThemeList.current.length
                    img = themeList.current[index].url
                    looplength = themeList.current.length
                    flipOnRender=[true,50]
                    if(difference>0){
                        looplength = themeList.current.length-difference
                    }
                }else{
                    themeList.current = themes.find((e)=>{if(e.difficulty==props.difficultyButtonHover){return true}}).list;
                    img = themeList.current[index].url
                    looplength = themeList.current.length
                    flipOnRender=[true,50]
                }
            //button onMouseLeave
            }else if(props.difficultyButtonHover==undefined&&previousThemeList.current!==undefined){
                themeList.current = previousThemeList.current
                looplength = previousThemeList.current.length
                img = previousThemeList.current[(index-looplength+1)*-1].url
                flipOnRender=[true,50]
                flipped=false
                classNameSuffix =  (index-looplength+1)*-1+1
            }
            const card = Card({touchable,flipped,flipOnRender,img, index})
            cards.push(
                <div key={crypto.randomUUID()} ref={cardRef} className={`themeCard themeOption${classNameSuffix}`}>
                    {card.render}
                </div>
            )
        }
        if(props.difficultyButtonHover!==undefined&&previousThemeList.current!==undefined){
            let difference = themeList.current.length-previousThemeList.current.length
            if(difference<0){
                for(let i=0;i<difference*-1;i++){
                    img = undefined
                    classNameSuffix = previousThemeList.current.length-i
                    flipped=true
                    flipOnRender=false
                    const card = Card({touchable,flipped,flipOnRender,img, i})
                    cards.push(
                        <div key={crypto.randomUUID()} ref={cardRef} className={`peakDown themeCard themeOption${classNameSuffix}`}>
                           {card.render}
                        </div>
                    )
                }
            }else if(difference>0){
                for(let i=0;i<difference;i++){
                    classNameSuffix = themeList.current.length-i
                    img = themeList.current[themeList.current.length-i-1].url
                    flipped=true
                    flipOnRender=[true, 50]
                    const theme =themeList.current[themeList.current.length-i-1].url
                    console.log(theme)
                    const card = Card({touchable,flipped,flipOnRender,img, i})
                    cards.push(
                        <div key={crypto.randomUUID()} ref={cardRef} className={`peakUp themeCard themeOption${classNameSuffix}`}>
                            {card.render}
                        </div>
                    )
                }
            }
        }
    }else{
            for(let i=0;i<previousThemeList.current.length;i++){
                classNameSuffix = i+1
                flipped=false
                flipOnRender=false
                touchable=true
                img = previousThemeList.current[i].url
                const theme = previousThemeList.current[i]
                const card = Card({touchable,flipped,flipOnRender,img, i})
                cards.push(
                    <div 
                        key={crypto.randomUUID()} 
                        ref={cardRef} 
                        className={`hoverUp themeCard themeOption${classNameSuffix}`}
                        onClick={(e)=>handleClick(e, theme)}
                        title={previousThemeList.current[i].themeName}
                    >
                        {card.render}
                    </div>
                )
            }
        }
        return cards
    }

    const handleClick=(e, theme)=>{
        setChosenTheme(theme)
    }

    function ThemeSelector(){
        return (
            <div ref={themeSelectionRef} className='themeSelection'>
                <Cards></Cards>
            </div>
        )
    }

    useEffect(() => {
        previousThemeList.current = themeList.current
    })

    return  {chosenTheme: chosenTheme ,render:(
       <ThemeSelector></ThemeSelector>
    )}
}

export default ThemeChooser