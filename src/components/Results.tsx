import React, { useEffect } from "react";
import axios from 'axios';
import { Result } from '../App'
import styled from 'styled-components'

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

interface Props {
  name: string,
  results: Result | null,
  setResults: any,
}

const Output = styled.pre`
  text-align: left;
`

const Results: React.FC<Props> = ({ name, results, setResults }) => {
  const makeRequest = async (url: string) => {
    console.log('Making request...', url)
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
    console.log('running useEffect')
    const getNameData = async () => {
      console.log('Getting name data')
      const promises = [
        makeRequest(`https://api.agify.io/?name=${name}`),
        makeRequest(`https://api.nationalize.io/?name=${name}`),
        makeRequest(`https://api.genderize.io/?name=${name}`)
      ];

      const responses = await Promise.all(promises);
      const res: Result = {
        name,
        age: responses[0]?.age,
        nationality: responses[1]?.country?.map((c: { country_id: string, probability: number }) => ({
          country_id: regionNames.of(c?.country_id),
          probability: c?.probability
        })),
        gender: {
          gender: responses[2]?.gender,
          probability: responses[2]?.probability
        }
      }

      console.log(res)
      if (res) setResults(res);
    }

    const timer = setTimeout(() => {
      getNameData()
    }, 1000)

    return () => clearTimeout(timer)
  }, [name, setResults])

  return (
    <Output>
      {results && JSON.stringify(results, null, 2)}
    </Output>
  )
}

export default Results;