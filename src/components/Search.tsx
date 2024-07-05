import React from "react";
import styled from 'styled-components'

interface Props {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>
}

const Container = styled.div`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  width: 100%;
`

const Input = styled.input`
  width: 90%;
  font-size: 2em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  background-color: #1b263b;
  box-shadow: none;
  border: 1px solid white;
  color: #e0e1dd;
`

const Search: React.FC<Props> = ({ name, setName }) => {
  return (
    <Container>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value?.toLowerCase())}
        placeholder='Enter a first name'
      />
    </Container>
  )
}

export default Search;