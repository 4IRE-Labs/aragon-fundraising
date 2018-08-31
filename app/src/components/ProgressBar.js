import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'
import { Text, theme } from "@aragon/ui";

const ProgressBar = ({ progress, minValue, maxValue }) => (
  <Top>
    <Labels>
      <div>{minValue}</div>
      <div>{maxValue}</div>
    </Labels>
    <Motion defaultStyle={{ progress: 0 }} style={{ progress: spring(progress) }}>
      {({ progress }) => (
        <Main>
          <Base>
            <Progress
              color={theme.positive}
              style={{ width: `${progress * 100}%` }}
            />
          </Base>
        </Main>
      )}
    </Motion>
  </Top>
);

ProgressBar.defaultProps = {
  progress: 0,
};

ProgressBar.propTypes = {
  type: PropTypes.oneOf(['positive', 'negative']).isRequired,
  progress: PropTypes.number,
};

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 12px;
  align-items: center;
`;
const Base = styled.div`
  width: 100%;
  height: 6px;
  background: #edf3f6;
  border-radius: 2px;
`;
const Progress = styled.div`
  height: 6px;
  background: ${({ color }) => color};
  border-radius: 2px;
`;
const Labels = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Top = styled.div`
  margin-top: 20px;
`;

export default ProgressBar
