import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Spinner from './Spinner';
import Loader from './Loader';
import Home from './Home';

const Dashboard = () => {
    const [wordCounts, setWordCounts] = useState({});
    const [showHistogram, setShowHistogram] = useState(false);
    const [showPieChart, setShowPieChart] = useState(false);
    const [showLineChart, setShowLineChart] = useState(false);
    const [loader, setLoader] = useState(false);
    const [dotload, setDotload] = useState(false);
    const [divsection, setDivsection] = useState(true);

    const fetchData = async () => {
        setDivsection(false);
        setDotload(true);
        setLoader(true);
        const response = await axios.get('https://www.terriblytinytales.com/test.txt');
        const text = response.data;
        const words = text.split(/\s+/);
        const counts = {};
        words.forEach((word) => {
            counts[word] = (counts[word] || 0) + 1;
        });
        setWordCounts(counts);
        setDotload(false);
        setLoader(false);
        setShowHistogram(true);
        setShowPieChart(true);
        setShowLineChart(true);
    };
    const exportData = () => {
        const data = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([word, count]) => ({ word, count }));
        const csv = 'Word,Count\n' + data.map(({ word, count }) => `${word},${count}`).join('\n');
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = 'word-counts.csv';
        link.click();
    };

    const data = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word, count]) => ({ word, count }));

    const handleHomeClick = () => {
        setDivsection(true);
        setWordCounts({});
        setShowHistogram(false);
        setShowPieChart(false);
        setShowLineChart(false);
    };

    return (
        <div>
            {divsection ? (
                <Home fetchdata={fetchData} />
            ) : (
                <>
                    <nav>
                        <ul>
                            <button
                                class="btn btn-info btn-lg"
                                style={{ marginLeft: '45%', marginTop: '4%' }}
                                onClick={handleHomeClick}
                            >
                                Go to Home
                            </button>
                            <br />
                            <div style={{ marginLeft: '15%', marginTop: '5%' }}>
                                {dotload && <Loader />}
                            </div>
                            {data.length > 0 && (
                                <>
                                    <nav id="navbar" class="navbar navbar-light bg-dark">
                                        <div class="container-fluid justify-content-space-between">
                                            <button
                                                class="btn btn-info btn-lg"
                                                onClick={() => setShowHistogram(!showHistogram)}
                                            >
                                                Toggle Histogram
                                            </button>
                                            <button
                                                class="btn btn-success btn-lg"
                                                onClick={() => setShowPieChart(!showPieChart)}
                                            >
                                                Toggle Pie Chart
                                            </button>
                                            <button
                                                class="btn btn-primary btn-lg"
                                                onClick={() => setShowLineChart(!showLineChart)}
                                            >
                                                Toggle Line Chart
                                            </button>
                                            <button class="btn btn-danger btn-lg" onClick={exportData}>
                                                Export
                                            </button>
                                        </div>
                                    </nav>
                                </>
                            )}
                        </ul>
                    </nav>
                    {data.length > 0 && (
                        <>
                            {showHistogram && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data}>
                                        <XAxis
                                            dataKey="word"
                                            tick={{ fill: 'blue', fontWeight: 'bold' }}
                                        />
                                        <YAxis tick={{ fill: 'red', fontWeight: 'bold' }} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                            <br />
                            <br />
                            {showPieChart && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            dataKey="count"
                                            nameKey="word"
                                            fill="#25B433"
                                            label={{ fill: '#000', fontWeight: 'bold' }}
                                        />
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                            <br />
                            <br />
                            {showLineChart && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data}>
                                        <XAxis
                                            dataKey="word"
                                            tick={{ fill: 'blue', fontWeight: 'bold' }}
                                        />
                                        <YAxis tick={{ fill: 'red', fontWeight: 'bold' }} />
                                        <Tooltip />
                                        <Legend />
                                        <Line dataKey="count" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;