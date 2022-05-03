import './App.scss';
import Timeline from './layout/Timeline';
import { CustomProvider } from "rsuite"
import { useState } from 'react';
import TimelineProvider from './layout/Timeline/Provider';
import { Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import PostDetail from './components/post/PostDetail';

function App() {
  const [theme] = useState('light');
  return (
    <CustomProvider theme={theme}>
      <div className="App">
        <TimelineProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/:id" element={<PostDetail />} />
          </Routes>
        </TimelineProvider>
      </div>
    </CustomProvider>
  );
}

export default App;
