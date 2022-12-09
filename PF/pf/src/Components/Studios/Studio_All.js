import React, {useEffect, useState} from "react";

const Studios = () => {
    const [studios, setStudios] = useState(null);
    const [params, setParams] = useState({page: 1, name: "", coach: "", amenity: "", quantity: "", lat: "", lng: ""});
    const [preps, setPreps] = useState({page: 1, name: "", coach: "", amenity: "", quantity: "", lat: "", lng: ""});
    const [total, setTotal] = useState(1);

    useEffect(() => {
        const { page, name, coach, amenity, quantity, lat, lng } = params;
        fetch(`http://127.0.0.1:8000/studios/list/?p=${page}&name=${name}&coach=${coach}&amenity=${amenity}&quantity=${quantity}&lat=${lat}&lng=${lng}`)
            .then(res => {
                const comp = parseInt(res.headers.get('count'));
                (comp % 5)===0 ? setTotal(Math.floor(comp / 5)) : setTotal(Math.floor(comp / 5) + 1);
                return res.json()
            }).then(json => {setStudios(json);})
    }, [params])

  return (
      <>
      <p>Studio Name
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={preps.name}
            onChange={(event) => {
                setPreps({
                    ...preps,
                    name: event.target.value,
                    page: 1,
                })
            }}
         /></p>
      <p>Coach Name
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={preps.coach}
            onChange={(event) => {
                setPreps({
                    ...preps,
                    coach: event.target.value,
                    page: 1,
                })
            }}
         /></p>
      <p>Amenity
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={preps.amenity}
            onChange={(event) => {
                setPreps({
                    ...preps,
                    amenity: event.target.value,
                    page: 1,
                })
            }}
         /></p>
      <p>Quantity
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={preps.quantity}
            onChange={(event) => {
                setPreps({
                    ...preps,
                    quantity: event.target.value,
                    page: 1,
                })
            }}
         /></p>
      <p>Latitude
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={preps.lat}
            onChange={(event) => {
                setPreps({
                    ...preps,
                    lat: event.target.value,
                    page: 1,
                })
            }}
         /></p>
      <p>Longitude
         <input
            style={{width: 100, height: 20, fontSize: 18, margin: 4}}
            value={preps.lng}
            onChange={(event) => {
                setPreps({
                    ...preps,
                    lng: event.target.value,
                    page: 1,
                })
            }}
         /></p>
        <button onClick={(event) => {
                setParams({
                    ...params,
                    name: preps.name,
                    coach: preps.coach,
                    amenity: preps.amenity,
                    quantity: preps.quantity,
                    lat: preps.lat,
                    lng: preps.lng,
                    page: 1,
                })
            }}>Search!</button>
          <br/><br/><>{ total }</>
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
            })} disabled={ params.page === 1 }>
                prev
            </button>
            <>{ params.page }</>
            <button onClick={() => setParams({
                ...params,
                page: Math.min(total, params.page + 1)
            })} disabled={ params.page === total || total === 0 }>
                next
            </button>
        </>
    );
}

export default Studios;
// comment