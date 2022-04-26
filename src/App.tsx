import './App.css';
import MainView from './components/MainView';

function App() {
  return (
    <div className="App">
      <header className='d-flex flex-row justify-content-cente mx-auto pt-3'>
        <h1>Sorting Visualizer</h1>
      </header>
      <MainView />
      <footer className='d-flex flex-row justify-content-center align-content-center pt-3'>
        <p>
          Developed by <a href="www.github.com/JP2620">Juan Pablo Saucedo</a>
        </p>
      </footer>
    </div>

  );
}

export default App;
