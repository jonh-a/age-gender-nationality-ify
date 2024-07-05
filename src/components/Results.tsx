import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import Meter from "./Meter";
import { Result, baseResults } from './Names'


const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

interface Props {
  name: string,
  results: Result,
  setResults: any,
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: #e0e1dd;
`

const Description = styled.h3`
  width: 100%;
  text-align: center;
`

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Category = styled.div`
  width: 90%;
`

const Country = styled.div`
  width: 100%;

  meter {
    -webkit-appearance: none;
  }
  
  meter::-webkit-meter-bar {
    background: #eee;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
    border-radius: 3px;
  }
`

const Results: React.FC<Props> = ({ name, results, setResults }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isResult = () => {
    if (results?.name === '' || !results?.age || !results?.nationality || !results?.gender) return false
    return true
  }

  const isResultNotFound = () => {
    if (
      (results?.age === 0
        || results?.nationality?.length === 0
        || results?.gender?.gender === '')
      && name.length > 0
      && !loading
    ) return true
    return false
  }

  const makeRequest = async (url: string) => {
    try {
      const resp = await axios.get(url);
      if (resp?.status === 200) return {
        ...resp?.data,
        success: true,
      }
    } catch (e) {
      return { success: false }
    }
  }

  useEffect(() => {
    const getNameData = async () => {
      navigate(`/names/${name}`)

      if (!name) return;

      const promises = [
        makeRequest(`https://api.agify.io/?name=${name}`),
        makeRequest(`https://api.nationalize.io/?name=${name}`),
        makeRequest(`https://api.genderize.io/?name=${name}`),
      ];

      const responses = await Promise.all(promises);
      setLoading(false)

      const res: Result = {
        name,
        age: responses[0]?.age | 0,
        nationality: responses[1]?.country?.map((c: { country_id: string, probability: number }) => ({
          country_id: regionNames.of(c?.country_id) || 0,
          probability: c?.probability || 0
        })),
        gender: {
          gender: responses[2]?.gender || '',
          probability: responses[2]?.probability || 0
        }
      }

      if (res) setResults(res);
    }

    if (!name || name === '') setLoading(false);

    const timer = setTimeout(() => {
      getNameData()
    }, 1000)

    if (name) setLoading(true);
    setResults(baseResults);

    return () => clearTimeout(timer)
  }, [name])

  return (
    <Container>
      <Description>
        {isResult() &&
          `You are a ${results?.age} year old ${results?.gender?.gender} from ${results?.nationality?.[0]?.country_id}.`
        }
        {isResultNotFound() && `You are a totally new person who has never existed before.`}
        {loading && 'Thinking...'}
      </Description>
      {isResult() && (
        <Details>
          <Category>
            <h4>Country Breakdown</h4>
            {results?.nationality?.map(
              (c: { country_id: string, probability: number }) => (
                <Country key={c?.country_id}>
                  <Meter
                    text={c?.country_id}
                    percentage={c?.probability * 100}
                    backgroundColor='#1b263b'
                    foregroundColor='#415a77'
                    textColor='#e0e1dd'
                  />
                </Country>
              ))}
          </Category>

          <Category>
            <h4>Gender Breakdown</h4>
            <Meter
              text={results?.gender?.gender || ''}
              percentage={results?.gender.probability * 100 || 0}
              backgroundColor='#1b263b'
              foregroundColor='#415a77'
              textColor='#e0e1dd'
            />
          </Category>
        </Details>
      )}
    </Container>

  )
}

export default Results;