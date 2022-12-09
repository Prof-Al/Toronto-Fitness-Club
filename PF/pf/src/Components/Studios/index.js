import React, {useEffect, useState} from "react";

const Studios = () => {
    const [studios, setStudios] = useState(null);
    const [params, setParams] = useState({page: 1, name: "", coach: "", amenity: ""});
    const [total, setTotal] = useState(1);

    useEffect(() => {
        const { page, name, coach, amenity } = params;
        fetch(`http://127.0.0.1:8000/studios/list/?p=${page}&name=${name}&coach=${coach}&amenity=${amenity}`)
            .then(res => {
                const comp = parseInt(res.headers.get('count'));
                (comp % 5)===0 ? setTotal(Math.round(comp / 5)) : setTotal(Math.round(comp / 5) + 1);
                return res.json()
            }).then(json => {setStudios(json);})
    }, [params])

  return (
      <>
      <p>Studio Name
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
         /></p>
      <p>Coach Name
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
         /></p>
      <p>Amenity
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={params.amenity}
            onChange={(event) => {
                setParams({
                    ...params,
                    amenity: event.target.value,
                    page: 1,
                })
            }}
         /></p>
          <br/><br/><>{ total }</>
        {/*<button onClick={*/}

        {/*  }>Search!</button>*/}
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
            <>{ params.page }</>
            <button onClick={() => setParams({
                ...params,
                page: Math.min(total, params.page + 1)
            })}>
                next
            </button>
        </>
    );
}

export default Studios;
// comment