// CSS
import './App.css'

// React
import { useCallback, useEffect, useState } from "react";

// data
import { wordsList  } from "./data/words.js";

// components
import StartScreen from "./components/StartScreen.jsx";
import Game from "./components/Game.jsx";
import GameOver from "./components/GameOver.jsx";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    // pick a rndom category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { category, word }
  }

  // start the game
  const startGame = () => {
    // pick word and pick category
    const { word, category } = pickWordAndCategory()

    // create array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())

    console.log(category, word)
    console.log(wordLetters)

    // fill states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

// process the letter input
const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

  // check if letter has already been utilized
  if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
     ) {
    return
  }

  // push guessed letter or remove a guess
  if ( letters.includes(normalizedLetter)) {
    setGuessedLetters((actualGuessedLetters) => [
      ...actualGuessedLetters,
      normalizedLetter
    ])
  } else {
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,
      normalizedLetter
    ])
  }
}
  console.log(guessedLetters)
  console.log(wrongLetters)

const retry = () => {
    setGameStage(stages[0].name)
}

  return (
    <>
      <div className="App">
        { gameStage === 'start' && <StartScreen startGame={startGame} /> }
        { gameStage === 'game' && (
          <Game
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
           />
        ) }
        { gameStage === 'end' && <GameOver retry={retry} /> }
      </div>
    </>
  )
}

export default App
