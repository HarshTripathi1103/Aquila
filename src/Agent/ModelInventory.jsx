const ModelMarketPlace = ({ agentData }) => {
    const handleClone = () => {
        if (agentData) {
            const cloneData = { ...agentData };
            navigator.clipboard.writeText(JSON.stringify(cloneData, null, 2))
                .then(() => {
                    alert('Agent configuration copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        }
    };

    if (!agentData) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-xl text-gray-600">
                    No agent data available. Please create an agent first.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="bg-white rounded-3xl shadow-lg p-6 max-w-md">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{agentData.name}</h2>
                    </div>
                </div>
                
                <p className="text-gray-500 mb-6">
                    {agentData.background}
                </p>

                <button 
                    onClick={handleClone}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" 
                        />
                    </svg>
                    Clone
                </button>
            </div>
        </div>
    );
};

export default ModelMarketPlace;