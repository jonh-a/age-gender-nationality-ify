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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Description = styled.h3`
  width: 100%;
  text-align: center;
`

const Details = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Code = styled.pre`
  width: 80%;
  text-align: left;
`

const Countries = styled.div`
  width: 80%;
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
    <Container>
      <Description>
        {`You are a ${results?.age} year old ${results?.gender?.gender} from ${results?.nationality?.[0]?.country_id}.`}
      </Description>
      <Details>
        <Code>
          {results && JSON.stringify(results, null, 2)}
        </Code>
        <Countries>
          asdf
        </Countries>
      </Details>
    </Container>

  )
}

export default Results;