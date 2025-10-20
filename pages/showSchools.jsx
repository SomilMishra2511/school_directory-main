// pages/showSchools.jsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState('');
    const [city, setCity] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchSchools = async (reset = false) => {
        setLoading(true);
        const params = new URLSearchParams();
        if (q) params.append('q', q);
        if (city) params.append('city', city);
        params.append('page', reset ? 1 : page);
        params.append('limit', 8);
        const res = await fetch('/api/schools?' + params.toString());
        const data = await res.json();
        if (reset) {
            setSchools(data);
            setPage(2);
        } else {
            setSchools(prev => [...prev, ...data]);
            setPage(prev => prev + 1);
        }
        setHasMore(data.length >= 8);
        setLoading(false);
    };

    useEffect(() => { fetchSchools(true) }, [q, city]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search schools or address..." className="w-full p-2 border rounded" />
                </div>
                <div className="w-48">
                    <input value={city} onChange={e => setCity(e.target.value)} placeholder="Filter by city" className="w-full p-2 border rounded" />
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {schools.map(s => (
                    <Link
                        key={s.id}
                        href={'/school/' + s.id}
                        className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                    >
                        <div className="h-44 bg-gray-200">
                            {s.image ? (
                                <img
                                    src={s.image}
                                    alt={s.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />

                            ) : null}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{s.name}</h3>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{s.address}</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-sm font-medium">{s.city}</span>
                                <span className="text-xs text-gray-500">{s.state}</span>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>

            <div className="mt-6 flex justify-center">
                {hasMore ? (
                    <button onClick={() => fetchSchools(false)} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                ) : (
                    <span className="text-gray-500">No more results</span>
                )}
            </div>
        </div>
    );
}
