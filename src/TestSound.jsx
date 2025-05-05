import React, { useRef } from 'react';
import gameSound from './assets/spacejam.mp3';
import gamesound1 from './assets/gamesound1.mp3';
import gamesound2 from './assets/gamesound2.mp3';

const TestSound = () => {
    const audioRef0 = useRef(new Audio(gameSound));
    const audioRef1 = useRef(new Audio(gamesound1));
    const audioRef2 = useRef(new Audio(gamesound2));

    const playSound = (sound) => {
        switch (sound) {
            case 0:
                audioRef0.current.play().catch((error) => console.error('Error playing audio:', error));
                break;
            case 1:
                audioRef1.current.play().catch((error) => console.error('Error playing audio:', error));
                break;
            case 2:
                audioRef2.current.play().catch((error) => console.error('Error playing audio:', error));
                break;
            default:
                // Handle any cases where 'sound' is not 0, 1, or 2
                console.log('Invalid sound number');
        }
    };

    return (
        <>
            <button className="startgame-button" onClick={() => playSound(0)}>Play Sound 1</button>
            <button className="startgame-button" onClick={() => playSound(1)}>Play Sound 2</button>
            <button className="startgame-button" onClick={() => playSound(2)}>Play Sound 3</button>
        </>
    );
};

export default TestSound;
