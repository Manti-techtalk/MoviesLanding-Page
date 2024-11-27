import React from 'react'
import { useState } from 'react';

const FlappyBird = () => {
  const [bird, setBird] = useState({ x: 50, y: 300, size: 30 });
  const [pipes, setPipes] = useState([
    { x: 800, y: Math.floor(Math.random() * 400), width: 50, height: 300 },
    { x: 1200, y: Math.floor(Math.random() * 400), width: 50, height: 300 },
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const windowSize = useWindowSize();

  const gameLoopRef = useRef(null);

  useEffect(() => {
    if (isStarted) {
      gameLoopRef.current = setInterval(gameLoop, 16);
      return () => clearInterval(gameLoopRef.current);
    }
  }, [isStarted]);

  const gameLoop = () => {
    // Move bird
    setBird((prevBird) => ({
      ...prevBird,
      y: prevBird.y + 3,
    }));

    // Move pipes
    setPipes((prevPipes) =>
      prevPipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - 3,
      }))
    );

    // Check for collisions
    if (
      bird.y <= 0 ||
      bird.y + bird.size >= windowSize.height ||
      pipes.some(
        (pipe) =>
          bird.x + bird.size > pipe.x &&
          bird.x < pipe.x + pipe.width &&
          (bird.y < pipe.y || bird.y + bird.size > pipe.y + pipe.height)
      )
    ) {
      setGameOver(true);
      clearInterval(gameLoopRef.current);
    }

    // Check for passed pipes
    pipes.forEach((pipe) => {
      if (pipe.x + pipe.width < bird.x && !pipe.passed) {
        setScore((prevScore) => prevScore + 1);
        setPipes((prevPipes) =>
          prevPipes.map((p) =>
            p === pipe ? { ...p, passed: true } : p
          )
        );
      }
    });

    // Add new pipes
    if (pipes[pipes.length - 1].x < 600) {
      setPipes((prevPipes) => [
        ...prevPipes,
        {
          x: 800,
          y: Math.floor(Math.random() * 400),
          width: 50,
          height: 300,
        },
      ]);
    }
  };

  const handleJump = () => {
    if (!isStarted) {
      setIsStarted(true);
    }
    setBird((prevBird) => ({
      ...prevBird,
      y: prevBird.y - 50,
    }));
  };

  return (
    <div
      className="bg-sky-500 w-full h-screen flex flex-col justify-center items-center"
      onKeyDown={handleJump}
      tabIndex={0}
    >
      {gameOver ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Game Over</h1>
          <p className="text-xl mb-4">Your score: {score}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setGameOver(false);
              setIsStarted(false);
              setScore(0);
              setBird({ x: 50, y: 300, size: 30 });
              setPipes([
                { x: 800, y: Math.floor(Math.random() * 400), width: 50, height: 300 },
                { x: 1200, y: Math.floor(Math.random() * 400), width: 50, height: 300 },
              ]);
            }}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <div
            className="absolute bg-yellow-400 rounded-full"
            style={{
              left: bird.x,
              top: bird.y,
              width: bird.size,
              height: bird.size,
            }}
          />
          {pipes.map((pipe, index) => (
            <div
              key={index}
              className="absolute bg-green-500"
              style={{
                left: pipe.x,
                top: 0,
                width: pipe.width,
                height: pipe.y,
              }}
            />
          ))}
          {pipes.map((pipe, index) => (
            <div
              key={index + 'bottom'}
              className="absolute bg-green-500"
              style={{
                left: pipe.x,
                top: pipe.y + pipe.height,
                width: pipe.width,
                height: windowSize.height - pipe.y - pipe.height,
              }}
            />
          ))}
          <div className="absolute top-4 left-4 text-white text-2xl font-bold">
            Score: {score}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlappyBird;

