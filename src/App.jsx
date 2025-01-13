import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AiAgent from './Agent/AiAgent';
import ModelMarketPlace from './Agent/ModelInventory';

function App() {
    const [agentData, setAgentData] = useState(null);

    const handleAgentData = (data) => {
        setAgentData(data);
    };

    return (
        <Routes>
            <Route path="/" element={<AiAgent onSubmitAgentData={handleAgentData} />} />
            <Route path="/agent" element={<ModelMarketPlace agentData={agentData} />} />
        </Routes>
    );
}

export default App;
