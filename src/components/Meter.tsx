import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string,
  percentage: number
  backgroundColor: string,
  foregroundColor: string,
  textColor: string,
}

interface TrackerProps {
  backgroundColor: string,
}

interface ProgressInTrackerProps {
  percentage: number,
  foregroundColor: string,
}

interface TextColorProps {
  textColor: string,
}

const Tracker = styled.div<TrackerProps>`
  display: relative;
  width: 100%;
  height: 4em;
  margin: 15px auto;
  background: ${({ backgroundColor = 0 }) => backgroundColor};;
  border-radius: 0.3em;
`

const ProgressInTracker = styled.div<ProgressInTrackerProps>`
  width: ${({ percentage = 0 }) => percentage}%;
  height: 100%;
  background: ${({ foregroundColor = 0 }) => foregroundColor};
  border-top-left-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
`

const Container = styled.div`
  text-align: center;
`

const Text = styled.h5<TextColorProps>`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: ${({ textColor = 0 }) => textColor};
`

const Meter: React.FC<Props> = ({ text, percentage, backgroundColor, foregroundColor, textColor }) => {
  return (
    <Container>
      <Text textColor={textColor}>{text} ({Math.floor(percentage)}%)</Text>
      <Tracker backgroundColor={backgroundColor}>
        <ProgressInTracker percentage={percentage} foregroundColor={foregroundColor} />
      </Tracker>
    </Container>
  )
}

export default Meter