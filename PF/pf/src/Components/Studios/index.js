import React, {useCallback, useEffect, useState} from "react";

const Studios = () => {
  const [studios, setStudios] = useState(null);
  // const [headers, setHeaders] = useState(null);
  const [params, setParams] = useState({page: 1, search: ""})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchStudios = useCallback(async () => {
      const { page } = params;
      try {
          const res = await fetch(
              'http://127.0.0.1:8000/studios/list/?p=' + page);
          const data = await res.json();
          setStudios(data);
          // setHeaders(parseFloat(res.headers.get('Content-Type')));
      } catch {
          console.log("error", error);
          setError(error);
      } finally {
          setLoading(false);
      }
  }, [error, params])

  useEffect(() => fetchStudios, [fetchStudios]);

  if (loading) return <p>Data are loading...</p>;
  if (error) return <p>Error: {error.status}</p>;

  return (
      <>
        <>{ params.page }</>
        {/*<>{ headers.count }</>*/}
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
            {studios?.map((studio) => (
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
        <button onClick={() => setParams({
                ...params,
                page: params.page - 1
            })}>
                prev
            </button>
            <button onClick={() => setParams({
                ...params,
                page: params.page + 1
            })}>
                next
        </button>
      </>
  );
}

export default Studios;