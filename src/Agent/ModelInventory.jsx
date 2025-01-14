import React, { useEffect, useState } from 'react';
import {Copy} from "lucide-react"

const AgentCard = ({ agent }) => {
    const handleClone = () => {
        if (agent) {
            const cloneData = { ...agent };
            navigator.clipboard.writeText(JSON.stringify(cloneData, null, 2))
                .then(() => alert('Agent configuration copied to clipboard!'))
                .catch((err) => console.error('Failed to copy:', err));
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-80">
            <div className="flex items-center gap-4 mb-4">
                <div>
                    <h2 className="text-lg font-semibold">{agent.name}</h2>
                    <p className="text-gray-500 text-sm">{agent.goal}</p>
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">{agent.description}</p>
            <button
                onClick={handleClone}
                className="flex items-center gap-2 justify-center w-full py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
            >
                <Copy/>
                Clone
            </button>
        </div>
    );
};



const ModelMarketPlace = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/agents'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch agents');
                }
                const data = await response.json();
                setAgents(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (agents.length === 0) {
        return <p>No agents available.</p>;
    }

    return (
        <div className="flex flex-wrap gap-6 p-4">
            {agents.map((agent, index) => (
                <AgentCard key={index} agent={agent} />
            ))}
        </div>
    );

};

export default ModelMarketPlace;
