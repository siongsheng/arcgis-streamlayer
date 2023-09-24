import React, { useEffect } from "react";
// import { loadModules } from "esri-loader";
// import Map from "@arcgis/core/Map";
import config from "@arcgis/core/config";
import StreamLayer from "@arcgis/core/layers/StreamLayer";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Point from "@arcgis/core/geometry/Point";
// const [Map, MapView, config] = await loadModules([
//     "esri/Map",
//     "esri/views/MapView",
//     "esri/config",
//     // "esri/layers/StreamLayer",
// ]);
export default function App() {
    useEffect(() => {
        config.apiKey =
            "AAPKac458b218ac34c4280c90e39dea551cef5eurSJgU3FtDPTmbAgaW7ipmE_wylm69-qv7qAbcYEvl43diR9eVeD6Uk5TKUtv";
        const layer = new StreamLayer({
            objectIdField: "OBJECTID",
            fields: [
                {
                    name: "OBJECTID", // required
                    alias: "ObjectId",
                    type: "oid",
                },
                {
                    name: "TRACKID",
                    alias: "TrackId",
                    type: "long",
                },
                {
                    name: "STATUS",
                    alias: "STATUS",
                    type: "string",
                },
                {
                    name: "COLOR",
                    alias: "COLOR",
                    type: "string",
                },
            ],
            timeInfo: {
                trackIdField: "TRACKID", // required
            },
            geometryType: "point", // required
            // spatialReference: { wkid: 3857 },
            updateInterval: 1000,
            popupTemplate: {
                title: "{STATUS}",
                content: "{TRACKID}, {this}",
            },
            renderer: {
                type: "unique-value",
                field: "STATUS",
                uniqueValueInfos: [
                    {
                        value: "red",
                        type: "simple",
                        symbol: {
                            type: "simple-marker",
                            color: "red",
                            size: 10,
                            // outline: {
                            //     width: 1,
                            //     color: "white",
                            // },
                        },
                    },
                    {
                        value: "blue",
                        type: "simple",
                        symbol: {
                            type: "simple-marker",
                            color: "blue",
                            size: 10,
                            // outline: {
                            //     width: 1,
                            //     color: "white",
                            // },
                        },
                    },
                    {
                        value: "green",
                        type: "simple",
                        symbol: {
                            type: "simple-marker",
                            color: "green",
                            size: 10,
                            // outline: {
                            //     width: 1,
                            //     color: "white",
                            // },
                        },
                    },
                ],
            },
        });

        const map = new Map({
            basemap: "gray-vector",
            layers: [layer],
        });

        const view = new MapView({
            container: "map",
            map,
            zoom: 2,
            center: [-118.4, 34.0573],
        });
        // sl.sendMessageToClient({});

        view.when().then(() => {
            let objectIdCounter = 0;
            let lastX = -13180792.01151011;
            let lastY = 4037145.9303959487;
            // let lastX = -118.4;
            // let lastY = 34.0573;
            // call sendMessageToClient method every 1 second
            // to stream new features with different attributes
            setInterval(() => {
                lastY += 50000;
                console.log(lastX, lastY);
                const features = [...Array(10000)].map((_, index) => ({
                    attributes: {
                        TRACKID: index,
                        OBJECTID: objectIdCounter++,
                        STATUS:
                            index < 3000
                                ? "red"
                                : index < 7000
                                ? "blue"
                                : "green",
                    },
                    geometry: {
                        x: lastX + index * 1000,
                        y: lastY,
                    },
                }));
                console.log({ features });
                // send "features" message to the client to update
                // positions of features on the map.
                layer.sendMessageToClient({
                    type: "features",
                    spatialReference: { wkid: 3857 },
                    features: features,
                });
            }, 1000);
        });
        view.whenLayerView(layer).then((layerView) => {
            layerView.filter = {
                where: "STATUS in ('red', 'blue')",
            };
        });
    }, []);
    return (
        <div style={{ height: "100vh", width: "100vw" }} id="map">
            hello
        </div>
    );
}
