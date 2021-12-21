// import { ChakraProvider } from "@chakra-ui/react";
// import React from "react";
// import { useState, useEffect } from "react";
// import { Switch, Route } from "react-router";
// import userService from "../../services/user.service";
// import Sidebar from "./Sidebar";
// import UserInfo from "./user-info.js";
// import UserPassword from "./user-password";
// import { UserInfoProvider } from "../../contexts/user-info-context";

// //muon sua lai thi len git copy
// export default function UserManager(props) {
//     // const [userInfo, setUserInfo] = useState(null);

//     // useEffect(() => {
//     //     userService.getUserInfo(JSON.parse(localStorage.getItem("user")).id).then(response => {
//     //         localStorage.setItem("userInfo", JSON.stringify(response.data.data));
//     //         // setUserInfo(response.data.data);
//     //       })
//     // },[]);

//     return (
//         <UserInfoProvider>
//     <div className="row">

//         <div className="col-xl-2">

//             <ChakraProvider>
//                 <Sidebar />
//             </ChakraProvider>
//         </div>
//         <div className="col-xl-10">
//             {/* <UserInfo /> */}
//             <Switch>
//                 <Route path="/user/info" component={UserInfo} />
//                 <Route path="/user/password" component={UserPassword} />
//             </Switch>
//         </div>
//     </div>
//         </UserInfoProvider>
//     );
// }

//=============================================================================




import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router";
import userService from "../../services/user.service";
import TestGoogleMapAutoComplete from "../test-ggmap/test-ggmap-autocomplete";
import Sidebar from "./Sidebar";
import UserDeliveryAddress from "./user-delivery-address";
import UserFavourite from "./user-favourite";
import UserInfo from "./user-info.js";
import UserPassword from "./user-password";

export default function UserManager(props) {

    useEffect(() => {
        userService.getUserInfo(JSON.parse(localStorage.getItem("user")).id).then(response => {
            localStorage.setItem("userInfo", JSON.stringify(response.data.data));
          })
    },[]);

    return (<div className="row">
        <div className="col-xl-2">

            <ChakraProvider>
                <Sidebar />
            </ChakraProvider>
        </div>
        <div className="col-xl-10">
            {/* <UserInfo /> */}
            <Switch>
                <Route path="/user/info" component={UserInfo} />
                <Route path="/user/password" component={UserPassword} />
                <Route path="/user/favourite" component={UserFavourite} />
                <Route path="/user/delivery-address" component={UserDeliveryAddress} />
            </Switch>
        </div>
    </div>);
}
