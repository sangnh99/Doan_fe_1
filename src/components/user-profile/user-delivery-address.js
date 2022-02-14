import React, { useEffect, useState, useRef } from "react";
import { Divider, Input, Collapse } from "antd";
import { Button, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { List, Modal } from 'antd';
import userAddressService from "../../services/user.address.service";
import { IoLocationOutline } from 'react-icons/io5';
import { Search, GpsFixed } from "@mui/icons-material"
import '../test-ggmap/google-map-autocomplete.css';
import ShowMap1 from '../test-ggmap/show-map1';
import TestGoogleMapAutoComplete from "../test-ggmap/test-ggmap-autocomplete";
import useUnload from "../reload/use-reload";

const { Panel } = Collapse;


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




export default function UserDeliveryAddress(props) {
    const val = useRef();
    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [addressName, setAddressName] = useState("");
    const [addressNote, setAddressNote] = useState(null);
    const [addressSave, setAddressSave] = useState("");


    const [data, setData] = useState([]);
    const [activeAddress, setActiveAddress] = useState(null);
    const [messageActiveAddress, setMessageActiveAddress] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [isVisibleActiveModal, setIsVisibleActiveModal] = useState(false);
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

    // ==================================

    useEffect(
      () => {
        val.current = props;
      },
      [props]
    );
  

    useEffect(() => {

        userAddressService.getListAddressOfUser(JSON.parse(localStorage.getItem("user")).id).then(
            response => {
                setData(response.data.data);
                if (response.data.data.length != 0) {
                    setActiveAddress(response.data.data[0])
                }
            }
        );

        return () => {
          window.location.reload();
        };
    }, []);


      // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if(window.google) {
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

    if (place.address_components.length == 1){
        setAddressSave(place.address_components[0].long_name)
    } else{
        let addStr = place.address_components[0].long_name + " " + place.address_components[1].long_name;
    
        for (let i = 2 ; i < place.address_components.length; i++){
            addStr =  addStr.concat(", " + place.address_components[i].long_name);
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


  const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
    console.log("get location");
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
        .then(response => response.json())
        .then(location => {
          const place = location.results[1];
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



    // ==========================================================================================

    const changeAciveAddress = (item) => {
        setCurrentAddress(item);
        if (item.id == activeAddress.id) {
            // setMessageActiveAddress("Địa chỉ này đã được đặt làm địa chỉ chính !");
            info();
        } else {
            setMessageActiveAddress("Bạn muốn đặt " + item.address + " làm địa chỉ chính ?");
            setIsVisibleActiveModal(true);
        }
    }

    const info = () => {
        message.info("Địa chỉ này đã được đặt làm địa chỉ chính !");
    };

    const success = () => {
        message.success("Thay đổi địa chỉ chính thành công !");
    };

    const successDelete = () => {
        message.success("Xóa địa chỉ thành công !");
    };

    const successAdd = () => {
        message.success("Thêm địa chỉ thành công !");
    };

    const errorAdd = () => {
        message.error("Bạn cần nhập đủ Tên địa điểm và địa chỉ !");
    };
    

    const handleOkActive = () => {

        userAddressService.setActiveAddress(JSON.parse(localStorage.getItem("user")).id, currentAddress.id).then(
            response => {
                setData(response.data.data);
                if (response.data.data.length != 0) {
                    setActiveAddress(response.data.data[0])
                }
                success();
            }
        )

        setIsVisibleActiveModal(false);
      };
    
      const handleCancelActive = () => {
        setIsVisibleActiveModal(false);
      };

      // =====

      const handleOkDelete = () => {
        userAddressService.deleteAddress(JSON.parse(localStorage.getItem("user")).id, currentAddress.id).then(
            response => {
                setData(response.data.data);
                if (response.data.data.length != 0) {
                    setActiveAddress(response.data.data[0])
                }
                successDelete();
            }
        )

        setIsVisibleDeleteModal(false);
      };
    
      const handleCancelDelete = () => {
        setIsVisibleDeleteModal(false);
      };

      // =======

      const confirmAdd = () => {
          if (addressSave == '' || addressName == ''){
              errorAdd();
          } else {
            setIsVisibleAddModal(true)
          }
      }

      const handleOkAdd = () => {
        userAddressService.addAddress(JSON.parse(localStorage.getItem("user")).id, addressName, addressNote, addressSave, lat, lng).then(
            response => {
                setData(response.data.data);
                if (response.data.data.length != 0) {
                    setActiveAddress(response.data.data[0])
                }
                successAdd();
            }
        );
        setIsVisibleAddModal(false);
      };
    
      const handleCancelAdd = () => {
        setIsVisibleAddModal(false);
      };

      window.onbeforeunload = function () {
        window.location.reload();
      }

    return (
        <div className="container" style={{ marginTop: 35 }}>
            <Modal title="Thay đổi địa chỉ giao hàng" visible={isVisibleActiveModal} onOk={handleOkActive} onCancel={handleCancelActive}>
                <p>{messageActiveAddress}</p>
            </Modal>
            <Modal title="Xóa địa chỉ giao hàng" visible={isVisibleDeleteModal} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p>Bạn có chắc muốn xóa địa chỉ {currentAddress != null && currentAddress.address} không ?</p>
            </Modal>
            <Modal width={1000} title="Thêm địa chỉ" visible={isVisibleAddModal} onOk={handleOkAdd} onCancel={handleCancelAdd}>
                <p>Bạn có muốn thêm địa chỉ {addressSave} ?</p>
            </Modal>
            <div>
                <span style={{ fontFamily: "Nunito", fontSize: 30 }}>Địa chỉ giao hàng </span>
                {/* <Button size="large" style={{ float: "right" }} onClick={() => {setIsVisibleAddModal(true)}}><span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><PlusOutlined style={{ fontSize: 16 }} />&nbsp; Thêm địa chỉ</span></Button> */}
            </div>
            <Divider />
            <div>
                {
                    data.length != 0 ? (
                        <div>
                            {
                                activeAddress != null &&
                                <div style={{ marginBottom: 10 }}><span style={{ fontFamily: "Nunito", fontSize: 24 }}>Địa chỉ chính : <span> {activeAddress.name} - {activeAddress.address}</span></span></div>
                            }
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<IoLocationOutline fontSize="26px" style={{ color: "#fa541c" }} />}
                                            title={<a href="#">{item.name}</a>}
                                            description={(<span>{item.address}  {item.note != '' ? "-" + item.note : ''}</span>)}
                                        />
                                        <div><a style={{ color: "rgba(0, 0, 0, 0.85)" }} href="#" onClick={() => {
                                            changeAciveAddress(item)
                                        }}>Đặt làm địa chỉ chính</a>
                                            <Divider type="vertical" />
                                            <a style={{ color: "#f5222d" }} href="#" onClick={() => {setCurrentAddress(item) ; setIsVisibleDeleteModal(true)}}>Xóa</a></div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    ) : <div><span style={{ fontFamily: "Nunito", fontSize: 26 }}>Bạn chưa có địa chỉ giao hàng </span></div>
                }
            </div>
            <Divider />

            <Collapse defaultActiveKey={['1']} style={{marginBottom : 150}}>
                <Panel header={<span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><PlusOutlined style={{ fontSize: 16 }} />&nbsp; Thêm địa chỉ</span>} key="1" showArrow={false}>
                {/* <div style={{marginLeft : 188}}>
                    <p style={{fontFamily : "Nunito", marginBottom : 10}}>Tên địa điểm <span style={{color : "red"}}>*</span> :</p>
                    <Input style={{width : 700, marginBottom : 10}} onChange={(event) => {setAddressName(event.target.value)}}/>
                    <br/>
                    <p style={{fontFamily : "Nunito", marginBottom : 10}}>Ghi chú cho tài xế :</p>
                    <Input style={{width : 700, marginBottom : 20}} onChange={(event) => {setAddressNote(event.target.value)}}/>
                </div>     */}
                <div>
                    <p style={{fontFamily : "Nunito", marginBottom : 10, marginLeft : 202}}>Tên địa điểm <span style={{color : "red"}}>*</span> :</p>
                    <div style={{display : "flex", justifyContent : "center", alignItems :"center"}}>
                    <Input style={{width : 700}} onChange={(event) => {setAddressName(event.target.value)}}/>
                    </div>
                    <br/>
                    <p style={{fontFamily : "Nunito", marginBottom : 10, marginLeft : 202}}>Ghi chú cho tài xế :</p>
                    <div style={{display : "flex", justifyContent : "center", alignItems :"center"}}>
                    <Input style={{width : 700, marginBottom : 20}} onChange={(event) => {setAddressNote(event.target.value)}}/>
                    </div>
                </div>
                
                <div className="search-container">
                    <div className="search">
                    <span><Search /></span>
                    <input ref={searchInput} type="text" placeholder="Tìm địa điểm của bạn...."/>
                    <button onClick={findMyLocation}><GpsFixed /></button>
                    </div>
                </div>
                {
                    lat != null && (
                        <div>
                        <ShowMap1 lat={lat} lng={lng} height={"500px"} width={"700px"} marginLeft={"190px"} marginBottom={"30px"}/>
                        <span style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom : 50}}> 
                        <Button style={{width : 700}} type="primary" onClick={confirmAdd}>Xác nhận</Button>
                        </span>
                        </div>
                    )
                }
                </Panel>
            </Collapse>


        </div>
    )
}








// =====================================================================







// import { Divider, Input } from "antd";
// import React, { useEffect, useState } from "react";
// import { Button, message } from "antd";
// import { PlusOutlined } from '@ant-design/icons';
// import { List, Modal } from 'antd';
// import userAddressService from "../../services/user.address.service";
// import { IoLocationOutline } from 'react-icons/io5';
// import TestGoogleMapAutoComplete from "../test-ggmap/test-ggmap-autocomplete";

// export default function UserDeliveryAddress(props) {
//     const [data, setData] = useState([]);
//     const [activeAddress, setActiveAddress] = useState(null);
//     const [messageActiveAddress, setMessageActiveAddress] = useState(null);
//     const [currentAddress, setCurrentAddress] = useState(null);
//     const [isVisibleActiveModal, setIsVisibleActiveModal] = useState(false);
//     const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
//     const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

//     useEffect(() => {
//         userAddressService.getListAddressOfUser(JSON.parse(localStorage.getItem("user")).id).then(
//             response => {
//                 setData(response.data.data);
//                 if (response.data.data.length != 0) {
//                     setActiveAddress(response.data.data[0])
//                 }
//             }
//         );
//     }, []);

//     const changeAciveAddress = (item) => {
//         setCurrentAddress(item);
//         if (item.id == activeAddress.id) {
//             // setMessageActiveAddress("Địa chỉ này đã được đặt làm địa chỉ chính !");
//             info();
//         } else {
//             setMessageActiveAddress("Bạn muốn đặt " + item.address + " làm địa chỉ chính ?");
//             setIsVisibleActiveModal(true);
//         }
//     }

//     const info = () => {
//         message.info("Địa chỉ này đã được đặt làm địa chỉ chính !");
//     };

//     const success = () => {
//         message.success("Thay đổi địa chỉ chính thành công !");
//     };

//     const successDelete = () => {
//         message.success("Xóa địa chỉ thành công !");
//     };
    

//     const handleOkActive = () => {

//         userAddressService.setActiveAddress(JSON.parse(localStorage.getItem("user")).id, currentAddress.id).then(
//             response => {
//                 setData(response.data.data);
//                 if (response.data.data.length != 0) {
//                     setActiveAddress(response.data.data[0])
//                 }
//                 success();
//             }
//         )

//         setIsVisibleActiveModal(false);
//       };
    
//       const handleCancelActive = () => {
//         setIsVisibleActiveModal(false);
//       };

//       // =====

//       const handleOkDelete = () => {
//         userAddressService.deleteAddress(JSON.parse(localStorage.getItem("user")).id, currentAddress.id).then(
//             response => {
//                 setData(response.data.data);
//                 if (response.data.data.length != 0) {
//                     setActiveAddress(response.data.data[0])
//                 }
//                 successDelete();
//             }
//         )

//         setIsVisibleDeleteModal(false);
//       };
    
//       const handleCancelDelete = () => {
//         setIsVisibleDeleteModal(false);
//       };

//       // =======

//       const handleOkAdd = () => {
//         setIsVisibleAddModal(false);
//       };
    
//       const handleCancelAdd = () => {
//         setIsVisibleAddModal(false);
//       };

//     return (
//         <div className="container" style={{ marginTop: 35 }}>
//             <Modal title="Thay đổi địa chỉ giao hàng" visible={isVisibleActiveModal} onOk={handleOkActive} onCancel={handleCancelActive}>
//                 <p>{messageActiveAddress}</p>
//             </Modal>
//             <Modal title="Xóa địa chỉ giao hàng" visible={isVisibleDeleteModal} onOk={handleOkDelete} onCancel={handleCancelDelete}>
//                 <p>Bạn có chắc muốn xóa địa chỉ {currentAddress != null && currentAddress.address} không ?</p>
//             </Modal>
//             <Modal width={1000} title="Thêm địa chỉ" visible={isVisibleAddModal} onOk={handleOkAdd} onCancel={handleCancelAdd}>
//                 <span style={{ marginLeft : 127, fontFamily: "Nunito", marginBottom : 50}}> Nhập tên địa điểm :</span>
//                 <Input type="text" style={{width :  700, marginLeft : 127}}/>
//                 <span style={{ marginLeft : 127, fontFamily: "Nunito", marginBottom : 50}}>Nhập ghi chú : </span>
//                 <Input type="text" style={{width : 700, marginLeft : 127, marginBottom : 20}}/>
//                 <TestGoogleMapAutoComplete />
//             </Modal>
//             <div>
//                 <span style={{ fontFamily: "Nunito", fontSize: 30 }}>Địa chỉ giao hàng </span>
//                 <Button size="large" style={{ float: "right" }} onClick={() => {setIsVisibleAddModal(true)}}><span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><PlusOutlined style={{ fontSize: 16 }} />&nbsp; Thêm địa chỉ</span></Button>
//             </div>
//             <Divider />
//             <div>
//                 {
//                     data.length != 0 ? (
//                         <div>
//                             {
//                                 activeAddress != null &&
//                                 <div style={{ marginBottom: 10 }}><span style={{ fontFamily: "Nunito", fontSize: 24 }}>Địa chỉ chính : <span> {activeAddress.name} - {activeAddress.address}</span></span></div>
//                             }
//                             <List
//                                 itemLayout="horizontal"
//                                 dataSource={data}
//                                 renderItem={item => (
//                                     <List.Item>
//                                         <List.Item.Meta
//                                             avatar={<IoLocationOutline fontSize="26px" style={{ color: "#fa541c" }} />}
//                                             title={<a href="#">{item.name}</a>}
//                                             description={(<span>{item.address}  {item.note != '' ? "-" + item.note : ''}</span>)}
//                                         />
//                                         <div><a style={{ color: "rgba(0, 0, 0, 0.85)" }} href="#" onClick={() => {
//                                             changeAciveAddress(item)
//                                         }}>Đặt làm địa chỉ chính</a>
//                                             <Divider type="vertical" />
//                                             <a style={{ color: "#f5222d" }} href="#" onClick={() => {setCurrentAddress(item) ; setIsVisibleDeleteModal(true)}}>Xóa</a></div>
//                                     </List.Item>
//                                 )}
//                             />
//                         </div>
//                     ) : <div><span style={{ fontFamily: "Nunito", fontSize: 26 }}>Bạn chưa có địa chỉ giao hàng </span></div>
//                 }
//             </div>
//         </div>
//     )
// }