import React, {useEffect, useState} from "react";

const Studios = () => {
  const [studios, setStudios] = useState(null);
  const [params, setParams] = useState({page: 1, name: "", coach: ""})

  useEffect(() => {
        const { page, name, coach } = params;
        fetch(`http://127.0.0.1:8000/studios/list/?p=${page}&name=${name}&coach=${coach}`)
            .then(res => res.json())
            .then(json => {
                setStudios(json);
            })
        fetch(`http://127.0.0.1:8000/studios/list/?p=${page}`, {method: 'OPTIONS'}) //&search=${search}
            .then((response) => {
              response.setHeader("Access-Control-Expose-Headers", "X-Custom-Header");
              console.log(...response.headers.get('X-Custom-Header'));
            })
  }, [params])

  return (
      <>
      <p>Studio Name</p>
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={params.name}
            onChange={(event) => {
                setParams({
                    ...params,
                    name: event.target.value,
                    page: 1,
                })
            }}
         />
      <p>Coach Name</p>
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={params.coach}
            onChange={(event) => {
                setParams({
                    ...params,
                    coach: event.target.value,
                    page: 1,
                })
            }}
         />
      {/*<button onClick={*/}

      {/*  }>Search!</button>*/}
        <>{ params.page }</>
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
                page: Math.max(1, params.page - 1)
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
// comment