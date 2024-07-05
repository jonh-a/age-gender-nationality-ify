import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import Search from './Search';
import Results from './Results';
import Disclaimer from './Disclaimer';

export interface Result {
  name: string,
  age: number,
  nationality: { country_id: string, probability: number }[],
  gender: { gender: string, probability: number }
}

export const baseResults = {
  name: '',
  age: 0,
  nationality: [],
  gender: { gender: '', probability: 0 }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  height: 90vh;
  justify-content: space-between;
`

const Names: React.FC = () => {
  const [name, setName] = useState(useParams()?.name || '');
  const [results, setResults] = useState(baseResults);

  return (
    <Container>
      <Search name={name} setName={setName} />
      <Results name={name} results={results} setResults={setResults} />
      <Disclaimer />
    </Container>
  )
}

export default Names