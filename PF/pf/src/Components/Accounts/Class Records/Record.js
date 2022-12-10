import React, {useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
const Record = () => {
    const [records, setRecords] = useState(null);
    const [params, setParams] = useState({page: 1});
    const [total, setTotal] = useState(1);

    // let navigate = useNavigate();
    // function routeChange(id) {
    //     let path = `../studio/` + id;
    //     navigate(path);
    // }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/accounts/time/upcoming/`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`}}
          )
            .then(res => {
                const comp = parseInt(res.headers.get('count'));
                (comp % 5)===0 ? setTotal(Math.floor(comp / 5)) : setTotal(Math.floor(comp / 5) + 1);
                return res.json()
            }).then(json => {setRecords(json);})
    }, [])

  return (
      <>
            <table>
            <thead>
            <tr>
                <th> # </th>
                <th> id </th>
                <th> studio_class_id </th>
                <th> date_from </th>
                <th> date_end </th>
            </tr>
            </thead>
            <tbody>
            {records?.map((record) => (
                <tr key={ record.id }>
                    <td></td>
                    <td>{ record.id }</td>
                    <td>{ record.studio_class_id }</td>
                    <td>{ record.date_from }</td>
                    <td>{ record.date_end }</td>
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
            })} disabled={ params.page === total || total === 0 || records === null }>
                next
            </button>
        </>
    );
}

export default Record;
// comment