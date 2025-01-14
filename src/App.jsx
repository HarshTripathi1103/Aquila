import { Routes, Route } from 'react-router-dom';
import AiAgent from './Agent/AiAgent';
import ModelMarketPlace from './Agent/ModelInventory';

function App() {
    return (
        <Routes>
            <Route path="/" element={<AiAgent/>} />
            <Route path="/agent" element={<ModelMarketPlace/>} />
        </Routes>
    );
}

export default App;
