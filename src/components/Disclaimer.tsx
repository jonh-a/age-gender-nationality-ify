import styled from 'styled-components';

const Container = styled.div`
  color: lightgray;
  font-size: .5em;
  margin-top: auto;
`

const P = styled.p`
  padding-bottom: .2em;
`

const Link = styled.a`
  color: lightgray;
`

const Disclaimer = () => {
  return (
    <Container>
      <P>
        Data sourced from <Link href="https://agify.io/">Agify</Link>, <Link href="https://genderize.io/">Genderize</Link>, and <Link href="https://nationalize.io/">Nationalize</Link>.
      </P>
    </Container>
  )
}

export default Disclaimer