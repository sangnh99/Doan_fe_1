import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';
import storeService from "../../services/store-service";
export default function Store(props){
    const [storeId, setStoreId] = useState(useParams().id);
    const [storeDetail, setStoreDetail] = useState(0);

    useEffect(() => {
        storeService.getStoreDetail(storeId).then(
            response => {
                setStoreDetail(response.data.data);
                console.log(response.data.data);
            }
        );
    }, []);

    return(
        <div>
            {
                JSON.stringify(storeId)
            }
        </div>
    )
}