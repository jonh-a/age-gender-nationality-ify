import React, { useState, useEffect } from 'react';
import Search from './Search';
import Results from './Results';
import { useParams, useNavigate } from 'react-router-dom'

export interface Result {
  name: string,
  age?: number,
  nationality?: { country_id: string, probability: number }[],
  gender?: { gender: string, probability: number }
}


const Names: React.FC = () => {

  const [name, setName] = useState(useParams()?.name || '');
  const [results, setResults] = useState(null);

  return (
    <div>
      <Search name={name} setName={setName} />
      <Results name={name} results={results} setResults={setResults} />
    </div>
  )
}

export default Names