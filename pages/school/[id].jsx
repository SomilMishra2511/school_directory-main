// pages/school/[id].jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SchoolDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch('/api/schools?id=' + id)
      .then((r) => r.json())
      .then((d) => {
        setSchool(d[0] || null);
      });
  }, [id]);

  if (!school) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      <div className="h-64 bg-gray-200">
        {school.image && (
          <img
            src={school.image}
            alt={school.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold">{school.name}</h1>
        <p className="text-gray-700 mt-3">{school.address}</p>
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <div>
            <strong>City:</strong> {school.city}
          </div>
          <div>
            <strong>State:</strong> {school.state}
          </div>
          <div>
            <strong>Contact:</strong> {school.contact}
          </div>
          <div>
            <strong>Email:</strong> {school.email_id}
          </div>
        </div>
        <div className="mt-6">
          <Link href="/showSchools" className="text-blue-600">
            ← Back to list
          </Link>
        </div>
      </div>
    </div>
  );
}
