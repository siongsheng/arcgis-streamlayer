import React, { useEffect, useState } from "react";
import config from "@arcgis/core/config";
import { createMap, createMapView, createStreamLayer, getRoatation, getType } from "./Helper";
import Meh from "./Meh";

export default function App() {
    const decoder = new TextDecoder();

    config.apiKey = "AAPKac458b218ac34c4280c90e39dea551cef5eurSJgU3FtDPTmbAgaW7ipmE_wylm69-qv7qAbcYEvl43diR9eVeD6Uk5TKUtv";
    const [layer, setLayer] = useState();
    const worker = new Worker(new URL('./worker/test.js', import.meta.url), { type: "module" });
    worker.onmessage = (event) => {
        const features = JSON.parse(decoder.decode(event.data));
        console.log({ features });
        layer.sendMessageToClient({
            type: "features",
            features,
        });
    };
    
    useEffect(() => {
        const layer = createStreamLayer();
    
        const map = createMap(layer);
    
        const view = createMapView(map);
    
        setLayer(layer);
        
    }, []);

    const start = () => {
        worker.postMessage(true);
    };

    const end = () => {
        worker.postMessage(false);
    }

    return (
        <>
            <div style={{ height: "90vh", width: "100vw" }} id="map" />
            <button onClick={start}>Start</button>
            <button onClick={end}>Stop</button>
            <Meh />
        </>
    );
}
