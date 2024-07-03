import Map from "@arcgis/core/Map";
import StreamLayer from "@arcgis/core/layers/StreamLayer";
import MapView from "@arcgis/core/views/MapView";
import Popup from "@arcgis/core/widgets/Popup";
import planeUp from "./icons8-jet-64.png";
import planeLeft from "./modern-left.svg";
import planeRight from "./modern-right.svg";
import planeDown from "./modern-down.svg";
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
                type: "string",
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
        updateInterval: 500,
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
        labelsVisible: false,
        visible: true,
        renderer: planeRenderer(),
    })
);

const planeRenderer = () => ({
    type: "unique-value",
    field: "type",
    field2: "rotate",
    fieldDelimiter: ",",
    uniqueValueInfos: [
        {
            value: "plane,up",
            // type: "simple",
            symbol: createPlaneUp(),
        },
        {
            value: "plane,left",
            // type: "simple",
            symbol: createPlaneLeft(),
        },
        {
            value: "plane,down",
            // type: "simple",
            symbol: createPlaneDown(),
        },
        {
            value: "plane,right",
            // type: "simple",
            symbol: createPlaneRight(),
        },
    ],
});

const pointRenderer = () => ({
    type: "unique-value",
    field: "rotate",
    uniqueValueInfos: [
        {
            value: "up",
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
            value: "down",
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
            value: "left",
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
        {
            value: "right",
            type: "simple",
            symbol: {
                type: "simple-marker",
                color: "purple",
                size: 10,
                // outline: {
                //     width: 1,
                //     color: "white",
                // },
            },
        },
    ],
});

const rotation = ["up","down",'left',"right"];

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
        popup: new Popup({ defaultPopupTemplateEnabled: true })
    })
);

const createPlaneUp = () => (
    new PictureMarkerSymbol({
        url: planeUp,
        height: 20,
        width: 20,
    })
);

const createPlaneLeft = () => (
    new PictureMarkerSymbol({
        url: planeLeft,
        height: 20,
        width: 20,
    })
);

const createPlaneRight = () => (
    new PictureMarkerSymbol({
        url: planeRight,
        height: 20,
        width: 20,
    })
);

const createPlaneDown = () => (
    new PictureMarkerSymbol({
        url: planeDown,
        height: 20,
        width: 20,
    })
);
export const getRoatation = () => (rotation[Math.floor(Math.random() * 10) % 4]);
