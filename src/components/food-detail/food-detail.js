import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function FoodDetail(){
    const [id, setId] = useState(useParams().id);
    
//    const {id} = useParams();
        return (
            <div>{id}</div>
            );
        
}