import Map from "@arcgis/core/Map";
import StreamLayer from "@arcgis/core/layers/StreamLayer";
import MapView from "@arcgis/core/views/MapView";
import Popup from "@arcgis/core/widgets/Popup";
import RotationVariable from "@arcgis/core/renderers/visualVariables/RotationVariable";
import planeUp from "./images/icons8-jet-64.png";
import heliUp from "./images/helicopter.png";
import droneUp from "./images/drone.png";
import flyUp from "./images/fly.png";
import birdUp from "./images/bird.png";
import machineUp from "./images/machine.png";
import kiteUp from "./images/kite.png";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

export const createStreamLayer = () => (
    new StreamLayer({
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
                name: "type",
                alias: "type",
                type: "string",
            },
            {
                name: "rotate",
                alias: "rotate",
                type: "integer",
            },
            {
                name: "time",
                alias: "time",
                type: "string",
            },
        ],
        timeInfo: {
            trackIdField: "TRACKID", // required
        },
        geometryType: "point", // required
        updateInterval: 1000,
        // popupTemplate: {
        //     title: "hello",
        //     // content: "{type} {rotate}",
        // },
        popupEnabled: true,
        labelingInfo: [
            {
                symbol: {
                    type: "text",
                    color: "white",
                },
                labelPlacement: "above-center",
                labelExpressionInfo: {
                    expression: "$feature.time",
                },
            },
        ],
        displayField: "TRACKID",
        labelsVisible: true,
        visible: true,
        renderer: pointRenderer(),
    })
);

const planeRenderer = () => ({
    type: "unique-value",
    field: "type",
    visualVariables: [
        new RotationVariable({ field: "rotate", rotationType: "geographic" })
    ],
    // field2: "rotate",
    // fieldDelimiter: ",",
    uniqueValueInfos: [
        {
            value: "plane",
            symbol: createPlaneUp(),
        },
        {
            value: "heli",
            symbol: createHeliUp(),
        },
        {
            value: "drone",
            symbol: createDroneUp(),
        },
        {
            value: "fly",
            symbol: createFlyUp(),
        },
        {
            value: "kite",
            symbol: createKiteUp(),
        },
        {
            value: "machine",
            symbol: createMachineUp(),
        },
        {
            value: "bird",
            symbol: createBirdUp(),
        },
        // {
        //     value: "plane,left",
        //     // type: "simple",
        //     symbol: createPlaneLeft(),
        // },
        // {
        //     value: "plane,down",
        //     // type: "simple",
        //     symbol: createPlaneDown(),
        // },
        // {
        //     value: "plane,right",
        //     // type: "simple",
        //     symbol: createPlaneRight(),
            
        // },
    ],
});

const pointRenderer = () => ({
    type: "unique-value",
    field: "type",
    uniqueValueInfos: [
        {
            value: typeEnum.PLANE,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "red",
                size: 10,
            },
        },
        {
            value: typeEnum.BIRD,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "blue",
                size: 10,
            },
        },
        {
            value: typeEnum.DRONE,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "green",
                size: 10,
            },
        },
        {
            value: typeEnum.FLY,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "purple",
                size: 10,
            },
        },
        {
            value: typeEnum.HELI,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "yellow",
                size: 10,
            },
        },
        {
            value: typeEnum.KITE,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "orange",
                size: 10,
            },
        },
        {
            value: typeEnum.MACHINE,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "turquoise",
                size: 10,
            },
        },
        {
            value: typeEnum.PLANE,
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "teal",
                size: 10,
            },
        },
    ],
});

const typeEnum = {
    PLANE: "plane",
    HELI: "heli",
    DRONE: 'drone',
    FLY: "fly",
    KITE: "kite",
    MACHINE: "machine",
    BIRD: "bird",
};

export const createMap = (layer) => (new Map({
        basemap: "dark-gray-vector",
        layers: [layer],
    }));

export const createMapView = (map) => (
    new MapView({
        container: "map",
        map,
        zoom: 12,
        center: [103.8198, 1.3521],
    })
);

const createPlaneUp = () => (
    new PictureMarkerSymbol({
        url: planeUp,
        height: 20,
        width: 20,
    })
);

const createHeliUp = () => (
    new PictureMarkerSymbol({
        url: heliUp,
        height: 20,
        width: 20,
    })
);

const createDroneUp = () => (
    new PictureMarkerSymbol({
        url: droneUp,
        height: 20,
        width: 20,
    })
);

const createFlyUp = () => (
    new PictureMarkerSymbol({
        url: flyUp,
        height: 20,
        width: 20,
    })
);

const createKiteUp = () => (
    new PictureMarkerSymbol({
        url: kiteUp,
        height: 20,
        width: 20,
    })
);

const createMachineUp = () => (
    new PictureMarkerSymbol({
        url: machineUp,
        height: 20,
        width: 20,
    })
);

const createBirdUp = () => (
    new PictureMarkerSymbol({
        url: birdUp,
        height: 20,
        width: 20,
    })
);

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
