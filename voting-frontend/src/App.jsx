import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePoll from './pages/CreatePoll';
import PollDetail from './pages/PollDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/polls/:id" element={<PollDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
