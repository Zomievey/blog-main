import { useState } from 'react';
import axios from 'axios';

export default function Newsletter() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        axios.post('/api/emails', { email }).then(() => {
            setEmail('');
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Newsletter Signup</h1>
            <form onSubmit={handleSubmit} className="my-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="block w-full p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}
