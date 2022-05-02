import './App.scss';
import Timeline from './layout/Timeline';
import { CustomProvider } from "rsuite"
import { useState } from 'react';
import TimelineProvider from './layout/Timeline/Provider';

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <CustomProvider theme={theme}>
      <div className="App">
        <TimelineProvider>
          <Timeline />
        </TimelineProvider>
      </div>
    </CustomProvider>
  );
}

export default App;
