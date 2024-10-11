import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar, Footer} from './components/layout';
import { Home } from './components/home';
import { Todos } from './components/TodoApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './todo.css';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/todos" element={ <Todos/> } />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <App />
);