import React, { useEffect, useRef, useState } from 'react'
import { Search, GpsFixed } from "@mui/icons-material"
import './google-map-autocomplete.css'
import ShowMap1 from './show-map1';


const apiKey = "AIzaSyAyvTvIJSyOspJ6_GHlvL3klcnJEnzNVXw";
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';


// load google map api js

function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}

const extractAddress = (place) => {

  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    }
  }

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach(component => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }

  });

  return address;
}


export default function TestGoogleMapAutoComplete() {

  const searchInput = useRef(null);
  const [address, setAddress] = useState({});
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);


  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  }

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
    // console.log(place.address_components[0].long_name);
    // console.log(place.address_components[1].long_name);
    // console.log(place.address_components[2].long_name);
    // console.log(place.address_components[3].long_name);
    // console.log(place.address_components[4].long_name);

  }

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

  }


  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then(response => response.json())
      .then(location => {
        const place = location.results[0];
        console.log(place);
        setLat(place.geometry.location.lat);
        setLng(place.geometry.location.lng);
        const _address = extractAddress(place);
        setAddress(_address);
        searchInput.current.value = _address.plain();
      })
  }


  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        reverseGeocode(position.coords)
      })
    }
  }





  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete())
  }, []);



  return (
    <div className="container">
      <div className="search-container">
        <div className="search">
          <span><Search /></span>
          <input ref={searchInput} type="text" placeholder="Tìm địa điểm của bạn...." />
          <button onClick={findMyLocation}><GpsFixed /></button>
        </div>

      </div>
      {
        lat != null && (
          <ShowMap1 lat={lat} lng={lng} />
        )
      }
    </div>
  )
}

