import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import styled from 'styled-components'

export interface Result {
  name: string,
  age?: number,
  nationality?: { country_id: string, probability: number }[],
  gender?: { gender: string, probability: number }
}

const Container = styled.div`
  width: 100%;
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
  const [name, setName] = useState('');
  const [results, setResults] = useState(null);

  return (
    <Container>
      <Main>
        <Search name={name} setName={setName} />
        <Results name={name} results={results} setResults={setResults} />
      </Main>
    </Container>
  );
}

export default App;
