import React, {Component, useContext, useEffect, useState} from "react";
import APIContext, {useAPIContext} from "../../Contexts/APIContext";
import StudiosTable from "./StudiosTable";

const Studios = () => {
    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/studios/list/`)
            .then(res => res.json())
            .then(json => {
                setStudios(json.data);
            })
    }, [setStudios])

    return (
        <>
            <APIContext.Provider value={useAPIContext}>
                <StudiosTable />
            </APIContext.Provider>
        </>
    )
}

export default Studios;
