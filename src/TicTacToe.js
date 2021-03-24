import React, { useState, useEffect, useCallback } from "react";
import {
  DIMS,
  PLAYER_X,
  PLAYER_O,
  SQUARE_DIMS,
  GAME_STATES,
  DRAW,
  GAME_MODES,
} from "./constants";
import { getRandomInt, switchPlayer } from "./utils.js";
import Board from "./Board";
import { minmax } from "./minmax";
import "./TicTacToe.scss";

const arr = new Array(DIMS ** 2).fill(null);

const board = new Board();

const TicTacToe = () => {
  return <Container></Container>;
};

const Container = () => {
  const style = {
    width: `${DIMS * (SQUARE_DIMS + 5)}px`,
  };

  const [grid, setGrid] = useState(arr);

  const [players, setPlayers] = useState({
    human: null,
    computer: null,
  });

  const [gameState, setGameState] = useState(GAME_STATES.notStarted);

  const [mode, setMode] = useState(GAME_MODES.medium);

  const [nextMove, setNextMove] = useState(null);

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const winner = board.getWinner(grid);
    const declareWinner = (winner) => {
      let winnerStr;
      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X wins";
          break;
        case PLAYER_O:
          winnerStr = "Player O wins";
          break;
        case DRAW:
        default:
          winnerStr = "It's a Draw!";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
    };
    if (winner !== null && gameState !== GAME_STATES.over) {
      declareWinner(winner);
    }
  }, [gameState, grid, nextMove]);

  const choosePlayer = (option) => {
    setPlayers({ human: option, computer: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(arr);
  };

  const move = useCallback(
    (index, player) => {
      if (player && gameState === GAME_STATES.inProgress) {
        setGrid((grid) => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  //Computer Move's
  const computerMove = useCallback(() => {
    const board = new Board(grid.concat());
    const emptyIndices = board.getEmptySquares(grid);
    let index;

    switch (mode) {
      case GAME_MODES.easy:
        index = getRandomInt(0, 8);
        while (!emptyIndices.includes(index)) {
          index = getRandomInt(0, 8);
        }
        break;
      case GAME_MODES.medium:
        const smartMove = !board.isEmpty(grid) && Math.random() < 0.5;
        if (smartMove) {
          index = minmax(board, players.computer)[1];
        } else {
          index = getRandomInt(0, 8);
          while (!emptyIndices.includes(index)) {
            index = getRandomInt(0, 8);
          }
        }
        break;
      case GAME_MODES.difficult:
      default:
        index = board.isEmpty(grid)
          ? getRandomInt(0, 8)
          : minmax(board, players.computer)[1];
    }

    if (!grid[index]) {
      move(index, players.computer);
      setNextMove(players.human);
    }
  }, [move, players, grid, mode]);

  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      nextMove === players.computer &&
      gameState !== GAME_STATES.over
    ) {
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer, gameState]);

  const humanMove = (index) => {
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.computer);
    }
  };

  const changeMode = (e) => {
    setMode(e.target.value);
  };

  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
        <StartScreen
          changeMode={changeMode}
          mode={mode}
          choosePlayer={choosePlayer}
        />
      );
    case GAME_STATES.inProgress:
      return (
        <div className="container" style={style}>
          {grid.map((value, index) => {
            const isActive = value !== null;
            return (
              <Square
                key={index}
                isActive={isActive}
                value={value}
                index={index}
                humanMove={humanMove}
              ></Square>
            );
          })}
        </div>
      );
    case GAME_STATES.over:
      return (
        <div>
          <p>{winner}</p>
          <button onClick={startNewGame}>Start Over</button>
        </div>
      );
  }
};

const StartScreen = ({ choosePlayer, changeMode, mode }) => {
  return (
    <div className="screen">
      <div className="inner">
        <p>Select Difficulty !!</p>
        <select onChange={changeMode} value={mode}>
          {Object.keys(GAME_MODES).map((key) => {
            const gameMode = GAME_MODES[key];
            return (
              <option key={gameMode} value={gameMode}>
                {key}
              </option>
            );
          })}
        </select>
      </div>
      <div className="inner">
        <p>Choose your Player</p>
        <div className="button-row">
          <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
          <p>or</p>
          <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
        </div>
      </div>
    </div>
  );
};

const Square = ({ isActive, value, index, humanMove }) => {
  return (
    <div className="square" onClick={() => humanMove(index)}>
      {isActive && <Marker value={value} />}
    </div>
  );
};

const Marker = ({ value }) => {
  return <div className="marker">{value === PLAYER_X ? "X" : "O"}</div>;
};

export default TicTacToe;
