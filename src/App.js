import React, {useState, useRef, useEffect, createContext} from 'react';
import './App.css';
import Logo from './js/components/logo';
import Score from './js/components/score'
import ThemeChooser from './js/components/themeChooser'
import UserForm from './js/components/userForm';
import InGame from './js/components/inGame';

function App() {
    const userForm = UserForm()
    const chosenDifficulty = userForm.chosenDifficulty
    const difficultyButtonHover=  userForm.difficultyButtonHover
    const themeChooser = ThemeChooser({chosenDifficulty, difficultyButtonHover})
    const [gameData, setGameData] = useState((e)=>{
        const cards = [];
        const level = 2
        const score = 0
        const bestScore = 0
    return {cards,level,score,bestScore}
})
    const StartScreen = (
        <div>
            <div>
                {themeChooser.render}
                <Logo/>
            </div>
            {userForm.render}
        </div>
    )

    function InGameScreen(){
        let chosenTheme = themeChooser.chosenTheme
        const ele = InGame({chosenTheme, chosenDifficulty, gameData, setGameData})
        return ele.render
    }

    return (
        <div className="App">
            <header>
            </header>
            <main>
                {themeChooser.chosenTheme==undefined ? (StartScreen) : <InGameScreen/>}
            </main>
            <footer>
              <Score score={gameData.score} bestScore={gameData.bestScore}/>
            </footer>
        </div>
    );
}

export default App;
