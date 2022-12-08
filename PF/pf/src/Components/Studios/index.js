import React, { useEffect, useState } from "react";

const Studios = () => {
  const [ studios, setStudios ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchStudios = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/studios/list/"
      );
      const data = await res.json();
      setStudios(data);
    } catch {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchStudios, [fetchStudios]);

  if (loading) return <p>Data are loading...</p>;
  if (error) return <p>Error: {error.status}</p>;

  return (
    <table>
        <thead>
        <tr>
            <th> # </th>
            <th> id </th>
            <th> name </th>
            <th> address </th>
            <th> postal_cde </th>
        </tr>
        </thead>
        <tbody>
        {studios?.map((studio, index) => (
            <tr key={ studio.id }>
                <td></td>
                <td>{ studio.id }</td>
                <td>{ studio.name }</td>
                <td>{ studio.address }</td>
                <td>{ studio.postal_code }</td>
            </tr>
        ))}
        </tbody>
    </table>
  );
}

export default Studios;