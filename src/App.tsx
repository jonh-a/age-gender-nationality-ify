import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import Names from './components/Names';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #0d1b2a;
`

const Main = styled.div`
  max-width: 42em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  margin-bottom: 1em;

  @media screen and (max-width: 50em) {
    width: 95%;
  }
`

const App: React.FC = () => {
  return (
    <Container>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/names/:name" element={<Names />} />
            <Route path="/names/" element={<Names />} />
            <Route path="/" element={<Names />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>

  );
}

export default App;
