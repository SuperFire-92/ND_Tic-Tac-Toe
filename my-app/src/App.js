import { useState } from 'react';

function Cell({xOrO, onClick})
{
  return(
    <>
      <button className="Cell" onClick={onClick}>{xOrO}</button>
    </>
  )
}

//Board class returns the current tic tac toe board
function Board({setTurn, turn, grid})
{
  function click(i)
  {
    if (grid[i] === '' && checkWin(grid) === -2)
    {
      grid[i] = (turn ? 'X' : 'O');
      setTurn(!turn);
    }
    if (checkWin(grid) !== -2)
    {
      console.log("finished");
    }
  }
  
  return (
    <>
    <br></br>
    <div className="Board">
      <div className="Row">
        <Cell xOrO={grid[0]} onClick={() => click(0)} />
        <Cell xOrO={grid[1]} onClick={() => click(1)} />
        <Cell xOrO={grid[2]} onClick={() => click(2)} />
      </div>
      <div className="Row">
        <Cell xOrO={grid[3]} onClick={() => click(3)} />
        <Cell xOrO={grid[4]} onClick={() => click(4)} />
        <Cell xOrO={grid[5]} onClick={() => click(5)} />
      </div>
      <div className="Row">
        <Cell xOrO={grid[6]} onClick={() => click(6)} />
        <Cell xOrO={grid[7]} onClick={() => click(7)} />
        <Cell xOrO={grid[8]} onClick={() => click(8)} />
      </div>
    </div>
    </>
  );
}


export default function App() {
  const [grid, setGrid] = useState(['','','','','','','','','']);
  const [turn, setTurn] = useState(true);
  
  function resetGame()
  {
    document.getElementById('winState').innerHTML = '';
    setGrid(['','','','','','','','',''])
    setTurn(true);
  }
  
  return (
    <div className="App">
      <Board setTurn={setTurn} turn={turn} grid={grid} />
      <div className='ButtonDisplay'>
        <button className="ResetButton" onClick={resetGame}>Restart Game</button>
        <p id='winState'></p>
      </div>
    </div>
  );
}

//Return -2 for unfinished, -1 for O win, 0 for tie, 1 for X win
function checkWin(grid)
{
  let isFull = true;
  const winConditons = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]];
    
  for (let i = 0; i < winConditons.length; i++)
  {
    if (grid[winConditons[i][0]] === 'X' && grid[winConditons[i][1]] === 'X' && grid[winConditons[i][2]] === 'X')
    {
      document.getElementById('winState').innerHTML = 'X WIN';
      return 1;
    }
    if (grid[winConditons[i][0]] === 'O' && grid[winConditons[i][1]] === 'O' && grid[winConditons[i][2]] === 'O')
    {
      document.getElementById('winState').innerHTML = 'O WIN';
      return -1;
    }
  }
  for (let i = 0; i < grid.length; i++)
  {
    if (grid[i] === '')
    {
      isFull = false;
    }
  }
  if (isFull)
  {
    document.getElementById('winState').innerHTML = 'TIE';
    return 0;
  }
  else
    return -2;
}