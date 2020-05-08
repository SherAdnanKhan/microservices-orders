import React from "react";
import http from "../services/httpService"
import { GET_ART } from "../constants/actionTypes";
import { Redirect } from "react-router-dom";

export const getArt = () => dispatch => {
  http
    .get('/api/art')
    .then(res => {
      if(res.data.success){
        console.log("res",res.data);
       dispatch({
         type: GET_ART,
         payload: res.data.data
       })
      }
    })
    .catch(res => {
    });
};

export const newArt = (value, history) => dispatch => {
  http
    .post('api/art',{name:value})
    .then(res => {
      if(res.data.success){
       history.push('/lobby');
      }
    })
    .catch(res => {
    });
};