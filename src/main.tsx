import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Erro } from './pages/Erro';
import { Topbar } from './components/Topbar';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Topbar />
      <Container fluid>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<Erro />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);
