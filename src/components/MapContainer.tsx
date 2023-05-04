import React, { useState, useEffect } from 'react'
import { propsType } from './SearchPlace'

const kakao = (window as any).kakao;

const MapContainer = (props: propsType) => {

    useEffect(() => {
        const container = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(37.566826004661, 126.978652258309),
                level: 9
            };
        // 지도를 생성합니다    
        const map = new kakao.maps.Map(container, mapOption);

        const ps = new kakao.maps.services.Places(); 
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        // searchPlaces();
    }, [props.searchKeyword]);

    return (
        <>
            {/* <div id="map" style={{ width: "100%", height: "800px" }}></div> */}
            <div id="map" style={{ width: "100%", height: "800px",position:"relative",overflow:"hidden"}}></div>
        </>
    )
}

export default MapContainer;