import React from "react";
import styled from 'styled-components'

interface Props {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>
}

const Input = styled.input`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  font-size: 2em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
`

const Search: React.FC<Props> = ({ name, setName }) => {
  return (
    <Input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder='Enter a first name'
    />
  )
}

export default Search;