import React, { useState, useEffect, useRef } from 'react';
import empty_img from './assets/Animation1/0.png';
import AnimationComponent from './AnimationComponent';
import AnimationComponentReverse from './AnimationComponentReverse';
import gameSound from './assets/themesong.mp3';
import gameOverSound from './assets/gameOver.mp3';
import gamesound0 from './assets/gamesound0.mp3';
import gamesound1 from './assets/gamesound1.mp3';
import gamesound2 from './assets/gamesound2.mp3';
import gamesound3 from './assets/gamesound3.mp3';
import gamesound4 from './assets/gamesound4.mp3';
import gamesound5 from './assets/gamesound5.mp3';
import gamesound6 from './assets/gamesound6.mp3';
import gamesound7 from './assets/gamesound7.mp3';
import openPortal from './assets/open_portal.mp3';
import portal_click from './assets/portal_click.mp3'
import './ThingInSpace.css';

const ThingInSpace = () => {
  const width = 8;
  const initialInterval = 2000;
  const [currentColorArrangement, setCurrentColorArrangement] = useState(new Array(width * width).fill("black"));
  const [activeTile, setActiveTile] = useState(-1);
  const [tilesState, setTilesState] = useState(new Array(width * width).fill(false));
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(initialInterval);
  const audioRefStartGame = useRef(new Audio(gameSound));
  const audioRefGameOver = useRef(new Audio(gameOverSound));
  const audioRefPortalOpen = useRef(new Audio(openPortal));
  const audioRefPortalClose = useRef(new Audio(portal_click));
  const audioRefs = [
    useRef(new Audio(gamesound0)),
    useRef(new Audio(gamesound1)),
    useRef(new Audio(gamesound2)),
    useRef(new Audio(gamesound3)),
    useRef(new Audio(gamesound4)),
    useRef(new Audio(gamesound5)),
    useRef(new Audio(gamesound6)),
    useRef(new Audio(gamesound7)),
  ];
  const [beatSound, setBeatSound] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isGameStarted && !isGameOver) {
      audioRefPortalOpen.current.volume = 0.5;
      audioRefPortalOpen.current.play().catch((error) => console.error('Error playing audio:', error));
      intervalId = setInterval(() => {
        if (tilesState[activeTile]) {
          const newTileIndex = Math.floor(Math.random() * (width * width));
          setActiveTile(newTileIndex);
          const newColorArrangement = new Array(width * width).fill("black");
          newColorArrangement[newTileIndex] = "red";
          setCurrentColorArrangement(newColorArrangement);
          setTilesState(new Array(width * width).fill(false));

          const newInterval = intervalDuration * 0.95;
          setIntervalDuration(newInterval);
        } else {
          endGame();
        }
      }, intervalDuration);
    }
    return () => clearInterval(intervalId);
  }, [isGameStarted, isGameOver, tilesState, intervalDuration, activeTile]);

  const tileClick = (index) => {
    if (index === activeTile) {
      const updatedTilesState = [...tilesState];
      updatedTilesState[index] = true;
      setTilesState(updatedTilesState);

      setScore((prevScore) => {
        const newScore = prevScore + 100;
        if (newScore > hiScore) {
          setHiScore(newScore);
        }
        return newScore;
      });

      audioRefPortalClose.current.play().catch((error) => console.error('Error playing audio:', error));
      setBeatSound(Math.floor(Math.random() * audioRefs.length));
    } else {
      endGame();
    }
  };

  const endGame = () => {
    audioRefStartGame.current.pause();
    audioRefStartGame.current.currentTime = 0;
    audioRefGameOver.current.play().catch((error) => console.error('Error playing audio:', error));
    setIsGameStarted(false);
    setIsGameOver(true);
    setIntervalDuration(initialInterval);
    setTilesState(new Array(width * width).fill(false));
  };

  const startGame = () => {
    audioRefGameOver.current.pause();
    audioRefGameOver.current.currentTime = 0;
    audioRefStartGame.current.loop = true;
    audioRefStartGame.current.play().catch((error) => console.error('Error playing audio:', error));
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setIntervalDuration(initialInterval);
    setCurrentColorArrangement(new Array(width * width).fill("black"));
    setActiveTile(Math.floor(Math.random() * (width * width)));
    setTilesState(new Array(width * width).fill(false));
  };

  return (
    <>
      <div className='app'>
        <div className='header'>
          THING IN SPACE
        </div>
        <h2>click the portals to close them, slowpoke</h2>
        {!isGameStarted && (
          <div className='startgame'>
            <button className="startgame-button" onClick={startGame}>Start Game</button>
            {isGameOver && <div className="gameOver"><span>Game over</span></div>}
          </div>
        )}
        <div className='game'>
          {currentColorArrangement.map((color, index) => {
            return (
              <div key={index} onClick={() => tileClick(index)}>
                {index === activeTile ? (
                  tilesState[index] ? (
                    <AnimationComponentReverse />
                  ) : (
                    <AnimationComponent/>
                  )
                ) : (
                  <img 
                    src={empty_img} 
                    alt="empty space" 
                    key={index} 
                    draggable="false" 
                    onDragStart={(e) => e.preventDefault()}
                    style={{ backgroundColor: 'transparent' }} 
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className='scores-container'>
          <div className='score'>Score: {score}</div>
          <div className='score'><p>High Score: {hiScore}</p></div>
        </div>
      </div>
      <div className='footer'>gameplay, music, terrible animations and soundeffects by me</div>
    </>
  );
};

export default ThingInSpace;
