import React, { useState, useEffect } from "react";
import "./App.css";

const shuffleArray = (array: string[]): string[] => [...array].sort(() => Math.random() - 0.5);

const App: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [selectedLetters, setSelectedLetters] = useState<string>("");
  const [lives, setLives] = useState<number>(5);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("");

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = (): void => {
    const newWord: string = shuffleArray(["APPLE", "BANANA", "CHERRY", "GRAPES"])[0];
    setWord(newWord);
    setSelectedLetters("");
    setLives(5);
    setGameOver(false);
    setWin(false);
    setMessage("");
    setMessageColor("");
  };

  const handleLetterSelect = (letter: string): void => {
    if (gameOver || win) return;

    const correctLetter: string = word[selectedLetters.length];

    if (letter === correctLetter) {
      const updatedLetters = selectedLetters + letter;
      setSelectedLetters(updatedLetters);
      setMessage("");

      if (updatedLetters === word) {
        setWin(true);
      }
    } else if (word.includes(letter)) {
      setMessage("Oops! Right letter at the wrong time");
      setMessageColor("orange");
    } else {
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives === 0) {
          setGameOver(true);
        }
        return newLives;
      });
      setMessage("Oops! Wrong letter at the wrong time");
      setMessageColor("red");
    }
  };

  return (
    <div className="main-container">
      <div className="game-container">
        <h1 className="title">Word Guessing Game</h1>
        <p className="lives">Lives: {"❤️".repeat(lives)}</p>
        <div className="word-display">
          {Array.from({ length: word.length }).map((_, index) => (
            <div key={index} className={`letter-box ${selectedLetters[index] ? "filled" : ""}`}>
              {selectedLetters[index] || ""}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "20px", color: messageColor }}>{message}</p>
        <div className="letters-container">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterSelect(letter)}
              className="letter-btn"
              disabled={gameOver || win}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {(gameOver || win) && (
        <div className="modal">
          <div className="modal-content">
            <h2>{win ? "🎉 You Won!" : "❌ Game Over!"}</h2>
            <button onClick={resetGame} className="retry-btn">Retry 🔄</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
