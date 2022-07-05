import logo from './logo.svg';
import './App.css';
import TicTacToeGrid from './components/TicTacToeGrid';

function App() {
  return (
    <div className="App">
      <div className="App-header">        
        {/* <p>
          Tic Tac Toe
        </p> */}
        <TicTacToeGrid />               
      </div>
    </div>
  );
}

export default App;
