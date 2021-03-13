import logo from './logo.svg';
import './App.css';
import TicTacToeGrid from './components/TicTacToeGrid.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        <p>
          Tic Tac Toe
        </p>
        <TicTacToeGrid />
        
      </header>
    </div>
  );
}

export default App;
