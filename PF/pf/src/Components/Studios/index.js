import React, {Component, useContext, useEffect, useState} from "react";
import APIContext, {useAPIContext} from "../../Contexts/APIContext";
import StudiosTable from "./StudiosTable";

const Studios = () => {
    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/players?page=1&per_page=20&search=David")
            .then(res => {
                res.json()})
            .then(json => {
                console.log(json)
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
