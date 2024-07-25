import { useState } from 'react';
import axios from 'axios';

export default function Suggestions() {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        axios.post('/api/suggestions', { topic }).then(() => {
            setTopic('');
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Suggestions</h1>
            <form onSubmit={handleSubmit} className="my-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Suggest a Topic"
                    className="block w-full p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}
