import React, { useState } from 'react';
import './App.css';
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
  max-width: 40em;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1em;
  padding-bottom: 1em;
`

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState(null);

  return (
    <Container>
      <Search name={name} setName={setName} />
      <Results name={name} results={results} setResults={setResults} />
    </Container>
  );
}

export default App;
