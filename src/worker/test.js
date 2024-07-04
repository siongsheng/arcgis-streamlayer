import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
// import { getRoatation, getType } from "../Helper";

let intervalRef;
const encoder = new TextEncoder();

onmessage = function(event) {
    // event.data contains the input sent from the main thread
    const signal = event.data;

    if (signal) start();
    else end();
};

const start = () => {
    console.log("Start signal");
    let objectIdCounter = 0;
    const maxTracks = 7000;
    const mid = maxTracks / 2;
    const length = Math.floor(Math.sqrt(maxTracks));
    let lastLon = 103.6198;
    let lastLat = 1.3021;

    let counter = 0;
    intervalRef = setInterval(() => {
        const date = new Date();
        counter += 1;
        console.log("starting counter: ", counter);
        lastLat += 0.1;
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
                type: getType(index),
                rotate: getRoatation(),
                time: `${date.getMinutes()}:${date.getSeconds()}`,
            },
            geometry: {
                x,
                y,
            },
        }});

        console.log("ending counter: ", counter);
        const buffer = encoder.encode(JSON.stringify(features));
        self.postMessage(buffer, [buffer.buffer]);
    }, 2000);
};

const end = () => {
    console.log("End signal");
    if (intervalRef) clearTimeout(intervalRef);
};

const typeEnum = {
    PLANE: "plane",
    HELI: "heli",
    DRONE: 'drone',
    FLY: "fly",
    KITE: "kite",
    MACHINE: "machine",
    BIRD: "bird",
};

export const getRoatation = () => (Math.floor(Math.random() * 360));

export const getType = (index) => {
    if (index < 10000) return typeEnum.PLANE;
    if (index < 20000) return typeEnum.HELI;
    if (index < 30000) return typeEnum.DRONE;
    if (index < 40000) return typeEnum.MACHINE;
    if (index < 50000) return typeEnum.FLY;
    if (index < 60000) return typeEnum.KITE;
    return typeEnum.BIRD;
}

export default {};
