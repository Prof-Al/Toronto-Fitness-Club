import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const Studio = () => {
    const { studio_id } = useParams();
    const [studio, setStudio] =
        useState({address: "", id: "", name: "",
            phone_number: "", postal_code: "", latitude: "", longitude: ""});

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/studios/detail/${studio_id}/`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setStudio(json);
            })
    }, [studio_id])

    return (
        <div>
            <h1>{ studio_id }</h1>
            <p>{ studio.name }</p>
            <p>{ studio.address }</p>
            <p>{ studio.phone_number }</p>
            <p>{ studio.postal_code }</p>
            <p>{ studio.latitude }</p>
            <p>{ studio.longitude }</p>
        </div>
    );
}

export default Studio;