import React from 'react';
import Grid from './grid';
import './App.css';

const App = ()=> {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The people of Star Wars</h1>
      </header>
      <main><Grid /></main>
    </div>
  );
}

export default App;
