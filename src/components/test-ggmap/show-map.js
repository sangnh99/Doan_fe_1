import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '1400px',
    height: '700px'
};

const center = {
  lat: 16.0038912,
  lng: 108.199936
};

export default function ShowMap(props) {

    const [map, setMap] = React.useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAyvTvIJSyOspJ6_GHlvL3klcnJEnzNVXw"
    })

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <div>
        <div>
            {
                props.lat
            }
        </div>
        <GoogleMap
            mapContainerStyle={containerStyle}
            // center={{
            //     lat: props.lat,
            //     lng: props.lng
            // }
            // }
            center={center}
            zoom={20}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>a</>
        </GoogleMap>

            </div>
    ) : <></>
    
}
