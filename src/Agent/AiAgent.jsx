import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ScratchModal({ isOpen, onClose, onSubmitAgentData }) {
    if (!isOpen) return null;
    const navigate = useNavigate();
    const [scratchModal, setIsScratchModal] = useState(false);
    const handleScratchModel = () => setIsScratchModal(!scratchModal);
    
    const handleScratchModelSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonResponse = {
            name: formData.get("name"),
            background: formData.get("background"),
            model: formData.get("model"),
            goal: formData.get("goal"),
            expected_output: formData.get("expected_output"),
        };
        onSubmitAgentData(jsonResponse);
        navigate("/agent");
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg  max-w-2xl p-8 relative shadow-lg">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Create New AI Agent</h2>
                <hr className="border-gray-200 mb-6" />
                <p className="text-gray-600 mb-6">
                    What do you want your AI Agent to help you with? Let us help you configure the AI for you! 😊
                </p>
                <div className="bg-slate-50 rounded-lg ">
                <label className="block text-gray-700 font-medium p-2  text-sm">
                    What do you want the AI Agent to help with?
                </label>
                <input
                    type="text"
                    placeholder="Type what you want to achieve"
                    className="w-full bg-slate-50 rounded-md px-4 py-2 focus:ring-0 focus:outline-none"
                />
                </div>
                <button className="w-full mt-10 bg-[#4C61CC] text-white font-semibold py-3 rounded-lg hover:bg-[#455dd5] transition mb-6">
                    ⚡ Generate AI Agent with AI
                </button>
                <div class="relative flex items-center py-5">
  <div class="flex-grow border-t border-gray-300"></div>
  <span class="flex-shrink px-10 text-gray-600">Or</span>
  <div class="flex-grow border-t border-gray-300"></div>
</div>
                <div className="flex justify-between items-center">
                    <button 
                        className="flex-1 bg-white text-[#455dd5] border border-[#455dd5] rounded-lg py-3 px-4 hover:bg-gray-200 transition mr-2"
                        onClick={handleScratchModel}
                    >
                        Create AI Agent From Scratch →
                    </button>
                    <button className="flex-1 bg-[#4C61CC] text-white border  rounded-lg py-3 px-4 hover:bg-[#455dd5] transition ml-2">
                        Customise From Template 🛠️
                    </button>
                </div>

                {scratchModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Create New AI Agent</h2>
                                <button onClick={() => setIsScratchModal(false)} className="text-gray-500 hover:text-gray-700">
                                    ✖
                                </button>
                            </div>
                            <form onSubmit={handleScratchModelSubmit}>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter agent name"
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">Background</label>
                                    <textarea
                                        name="background"
                                        placeholder="Enter agent background"
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">Model</label>
                                    <select
                                        name="model"
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    >
                                        <option value="gpt-4o-mini">GPT-4O-Mini</option>
                                        <option value="gpt-4">GPT-4</option>
                                        <option value="gpt-3.5">GPT-3.5</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">Goal</label>
                                    <input
                                        type="text"
                                        name="goal"
                                        placeholder="Enter agent goal"
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block font-medium mb-2">Expected Output</label>
                                    <textarea
                                        name="expected_output"
                                        placeholder="Describe the expected output"
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#4C61CC] text-white font-semibold py-3 rounded-lg hover:bg-[#455dd5] transition"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const AiAgent = ({ onSubmitAgentData }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="h-screen flex items-center justify-center">
            <button
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition"
                onClick={openModal}
            >
                Create An AI Agent
            </button>
            <ScratchModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onSubmitAgentData={onSubmitAgentData}
            />
        </div>
    );
}

export default AiAgent;