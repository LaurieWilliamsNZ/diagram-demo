import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import GlobalStyle from './assets/globalStyles';
import Header from './components/Header';
import FlowCanvas from './components/FlowCanvas';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <ReactFlowProvider>
      <AppContainer>
        <Header>IAG-Themed Flowchart</Header>
        <FlowCanvas />
      </AppContainer>
    </ReactFlowProvider>
  </>
);

export default App;