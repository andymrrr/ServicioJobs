// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
       

        <Route path="/" element={<Layout>""</Layout>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
