import React, {Component, useEffect, useState} from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class Maps extends Component {
    initMap() {
        const map = new window.google.maps(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        });
    }
    render(){
        return(
            <>
            </>
        )
    }
}

export default Maps;