import React, {useState, useRef, useEffect} from 'react';
import './userForm.css';

function UserForm(props) {
  const [playerName, setPlayerName] = useState()
  const [buttonHover, setButtonHover] = useState()
  const [chosenDifficulty, setChosenDifficulty] = useState()
  const [gameState, setGameState] = useState()
  const nameInputDivRef = useRef()
  const nameInputRef = useRef()
  const submitNameButtonRef = useRef()
  const messagePromptRef = useRef()
  const difficultyInputRef = useRef()
  const startScreenFormRef = useRef()

  const handleNameInput=(e)=>{
    if(e.target.value.length>0){
      submitNameButtonRef.current.style.display ="flex"
    }else{
      submitNameButtonRef.current.style.display ="none"
    }
  }
  const submitName=(e)=>{
    if(nameInputRef.current.value.length>0){
      setPlayerName(nameInputRef.current.value)
      nameInputDivRef.current.style.display = "none"
      difficultyInputRef.current.style.display = "flex"
      messagePromptRef.current.textContent = `choose a difficulty.`
    }else{
      messagePromptRef.current.textContent = "*Player name required"
    }
  }

  const handleDifficultyButtonHover=(e, level)=>{
    setButtonHover(level)
    messagePromptRef.current.textContent = `choose a difficulty.`
  }

  const handleDifficultyButtonLeave=(e, level)=>{
    setButtonHover(undefined)
  }

  const chooseTheme=(e, level)=>{
    e.preventDefault()
    setGameState("difficulty")
    setChosenDifficulty(level)
    messagePromptRef.current.textContent = `Now choose a theme, ${playerName}`
  }

  return {
    gameState:gameState,
    chosenDifficulty:chosenDifficulty,
    difficultyButtonHover:buttonHover,
    render:(
      <>
        <form className='startScreenForm' ref={startScreenFormRef}>
          <div  ref={nameInputDivRef}>
            <input
            ref={nameInputRef}
              type="text"
              required
              minLength={1}
              maxLength={25}
              placeholder='Enter player name'
              onChange={(e)=>{
                handleNameInput(e)
              }}
            />
            <span
              ref={submitNameButtonRef}
              title="confirm name"
              onClick={(e)=>{
                submitName(e)
              }}
            >✓</span>
          </div>
          <div ref={difficultyInputRef}>
            <button 
              onClick={(e)=>chooseTheme(e, "easy")}
              onMouseOver={(e)=>handleDifficultyButtonHover(e, "easy")}
              onMouseLeave={(e)=>{handleDifficultyButtonLeave(e)}}>
                easy
            </button>
            <button 
              onClick={(e)=>chooseTheme(e, "medium")} 
              onMouseOver={(e)=>handleDifficultyButtonHover(e, "medium")}
              onMouseLeave={(e)=>{handleDifficultyButtonLeave(e)}}>
                medium
            </button>
            <button 
             onClick={(e)=>chooseTheme(e, "hard")}
              onMouseOver={(e)=>handleDifficultyButtonHover(e, "hard")}
              onMouseLeave={(e)=>{handleDifficultyButtonLeave(e)}}>
                hard
            </button>
          </div>
        </form>
        <div ref={messagePromptRef} className='formMessagePrompt'>Let's start with your name...</div>
      </>
    )
  }
}

export default UserForm;
