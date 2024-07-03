import React, { useEffect, useState } from "react";
import config from "@arcgis/core/config";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import { createMap, createMapView, createStreamLayer, getRoatation } from "./Helper";

export default function App() {
    let intervalRef;
    config.apiKey = "AAPKac458b218ac34c4280c90e39dea551cef5eurSJgU3FtDPTmbAgaW7ipmE_wylm69-qv7qAbcYEvl43diR9eVeD6Uk5TKUtv";
    const [layer, setLayer] = useState();
    
    useEffect(() => {
        const layer = createStreamLayer();
    
        const map = createMap(layer);
    
        const view = createMapView(map);
    
        // view.whenLayerView(layer).then((layerView) => {
        //     layerView.filter = {
        //         where: "type in ('red', 'blue', 'green')",
        //     };
        // });
        setLayer(layer);
    }, []);

    const start = () => {
        let objectIdCounter = 0;
        const maxTracks = 10000;
        const length = Math.floor(Math.sqrt(maxTracks));
        let lastLon = 103.6198;
        let lastLat = 1.3021;

        let counter = 0;
        intervalRef = setInterval(() => {
            const date = new Date();
            counter += 1;
            console.log("starting counter: ", counter);
            lastLat += 0.001;
            let resetCounter = 0;
            const features = [...Array(maxTracks)].map((_, index) => {
                let lonPointer = index % length;
                if (index % length === 0) {
                    resetCounter += 1;
                }
                const [x, y] = webMercatorUtils.lngLatToXY(lastLon + lonPointer * 0.03, lastLat + resetCounter * 0.03)
                return {
                attributes: {
                    TRACKID: index,
                    OBJECTID: objectIdCounter++,
                    type: 'plane',
                    rotate: getRoatation(),
                    time: `${date.getMinutes()}:${date.getSeconds()}`,
                },
                geometry: {
                    x,
                    y,
                },
            }});
            // send "features" message to the client to update
            // positions of features on the map.
            layer.sendMessageToClient({
                type: "features",
                // spatialReference: { wkid: 4326 },
                features: features,
            });
            console.log("ending counter: ", counter);
        }, 1000);
    };

    const end = () => {
        if (intervalRef) clearTimeout(intervalRef);
    }

    useEffect(() => {
        
    }, []);
    return (
        <>
            <div style={{ height: "90vh", width: "100vw" }} id="map" />
            <button onClick={start}>Start</button>
            <button onClick={end}>Stop</button>
        </>
    );
}
