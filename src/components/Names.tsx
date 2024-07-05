import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import Search from './Search';
import Results from './Results';

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

const Names: React.FC = () => {
  const [name, setName] = useState(useParams()?.name || '');
  const [results, setResults] = useState(baseResults);

  return (
    <div>
      <Search name={name} setName={setName} />
      <Results name={name} results={results} setResults={setResults} />
    </div>
  )
}

export default Names