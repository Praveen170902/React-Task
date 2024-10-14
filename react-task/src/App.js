import React from 'react';
import { DiagramProvider } from './context/DiagramContext';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <DiagramProvider>
      <div className="app">
        <Sidebar />
        <Diagram />
      </div>
    </DiagramProvider>
  );
}

export default App;

