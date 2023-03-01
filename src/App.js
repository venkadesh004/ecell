import './App.css';

import { Navbar, MainPage, SidePage } from './components';

function App() {
  return (
    <div className="App">
      <div className='navbar'>
       <Navbar />
      </div>
      <div className='Main'>
        <SidePage />
        <MainPage />
      </div>
    </div>
  );
}

export default App;
