import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Table from './components/Table';
import PasswordForm from './components/PasswordForm';
import axios from 'axios';

function App() {
    const [passwords, setPasswords] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/app/");
            setPasswords(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid text-white">
            <h1 className="p-2 text-center">Password Manager</h1>
            <PasswordForm setPasswords={setPasswords} fetchData={fetchData} />
            <Table passwords={passwords} setPasswords={setPasswords} isLoading={isLoading} />
        </div>
    );
}

export default App;