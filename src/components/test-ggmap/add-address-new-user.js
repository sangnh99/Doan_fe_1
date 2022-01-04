import React, { useEffect, useRef, useState } from 'react'
import { Search, GpsFixed } from "@mui/icons-material"
import './google-map-autocomplete.css'
import ShowMap1 from './show-map1';
import { message, Modal, Input, Button, Divider } from 'antd';
import userAddressService from '../../services/user.address.service';
import { useHistory } from 'react-router-dom'


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


export default function AddAddressNewUser() {

    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const [addressName, setAddressName] = useState("");
    const [addressNote, setAddressNote] = useState(null);
    const [addressSave, setAddressSave] = useState("");
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

    const history = useHistory();


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

        if (place.address_components.length == 1) {
            setAddressSave(place.address_components[0].long_name)
        } else {
            let addStr = place.address_components[0].long_name + " " + place.address_components[1].long_name;

            for (let i = 2; i < place.address_components.length; i++) {
                addStr = addStr.concat(", " + place.address_components[i].long_name);
            }
            setAddressSave(addStr);
        }

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
                const place = location.results[1];
                console.log(location.results);
                setLat(place.geometry.location.lat);
                setLng(place.geometry.location.lng);
                setAddressSave(place.formatted_address);
                const _address = extractAddress(place);
                setAddress(_address);
                //   searchInput.current.value = _address.plain();
                searchInput.current.value = place.formatted_address;
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

    const successAdd = () => {
        message.success("Thêm địa chỉ thành công !");
    };

    const errorAdd = () => {
        message.error("Bạn cần nhập đủ Tên địa điểm và địa chỉ !");
    };

    const confirmAdd = () => {
        if (addressSave == '' || addressName == '') {
            errorAdd();
        } else {
            setIsVisibleAddModal(true)
        }
    }

    const handleOkAdd = () => {
        userAddressService.addAddressNewUser(localStorage.getItem('email'), addressName, addressNote, addressSave, lat, lng).then(
            response => {
                successAdd();
                setTimeout(() => {history.push("/login");
                window.location.reload();}, 1500);
            }
        )
        setIsVisibleAddModal(false);
    };

    const handleCancelAdd = () => {
        setIsVisibleAddModal(false);
    };


    return (
        <div className="container">
            <Modal width={1000} title="Thêm địa chỉ" visible={isVisibleAddModal} onOk={handleOkAdd} onCancel={handleCancelAdd}>
                <p>Bạn có muốn thêm địa chỉ {addressSave} ?</p>
            </Modal>
            <div style={{marginLeft : 206}}>
                    <div style={{marginTop : 50, marginBottom : 30 }}>
                        <span style={{fontSize : 30, fontFamily : "Nunito"}}>Thiết lập địa chỉ giao hàng của bạn</span>
                    </div>

     

                    <p style={{fontFamily : "Nunito", marginBottom : 10}}>Tên địa điểm <span style={{color : "red"}}>*</span> :</p>
                    <Input style={{width : 700, marginBottom : 10}} onChange={(event) => {setAddressName(event.target.value)}}/>
                    <br/>
                    <p style={{fontFamily : "Nunito", marginBottom : 10}}>Ghi chú cho tài xế :</p>
                    <Input style={{width : 700, marginBottom : 20}} onChange={(event) => {setAddressNote(event.target.value)}}/>
                </div>    
            <div className="search-container">
                <div className="search">
                    <span><Search /></span>
                    <input ref={searchInput} type="text" placeholder="Tìm địa điểm của bạn...." />
                    <button onClick={findMyLocation}><GpsFixed /></button>
                </div>

            </div>
            {
                    lat != null && (
                        <div style={{marginLeft:18, marginBottom : 50}}>
                        <ShowMap1 lat={lat} lng={lng}/>
                        <span style={{marginLeft : 190, marginBottom : 50}}> 
                        <Button style={{width : 700}} type="primary" onClick={confirmAdd}>Xác nhận</Button>
                        </span>
                        </div>
                    )
                }
                {
                   lat == null && (
                       <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                           <img src='https://cdn.dribbble.com/users/1250032/screenshots/5814122/where-are-you-_1.gif'
                            style={{backgroundSize : "cover", width : 700, height : 500, marginBottom : 60}} />
                       </div>
                   ) 
                }
        </div>
    )
}

