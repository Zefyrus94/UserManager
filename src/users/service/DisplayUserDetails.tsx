import axios from "axios";
import { useQuery } from "react-query";
import { User } from "../model/User";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import React from 'react';

  const getDetailsOfUser = async ({queryKey}:any) => {//vd
    const [_, id] = queryKey
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,//:id
    );
    return response.data;
  }
  const DisplayUserDetails = (props:any) => {
    /* let { id } = useParams(); 
    let navigate = useNavigate();  */
    let {
      setAction,
      setErrorMsg,
      currentUserId
    } = props
    const [fetchEnabled, setFetchEnabled] = useState(true);
    const {
      data: user,
      error,
      isLoading,
      isSuccess
    } = useQuery<User, Error>(['user', currentUserId], getDetailsOfUser, {enabled: fetchEnabled});
    
    useEffect(()=>{
      if (isLoading){
        toast.info('Fetching user...', {theme:'dark'})
      } 
      if (isSuccess){
        toast.success('User retrieved', {theme:'dark'})
        
      }
      if (error){
        toast.error(error.message, {theme:'dark'})
      }
      setFetchEnabled(false);
    },[isLoading, isSuccess]);
    
    function goBack(){
      setAction('list')
    }
    return (
      <div className="container">
        
        {user && 
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Detail</h5>
            <ul>
              <li>
                  ID: {user.id}
              </li>
              <li>
                  Name: {user.name}
              </li>
              <li>
                  Username: {user.username}
              </li>
              <li>
                  Email: {user.email}
              </li>
              <li>
                  Username: {user.username}
              </li>
              <li>
                  Address: {user.address!.street},  
                  {user.address!.suite} 
                  ({user.address!.city})
                  - zipcode: {user.address!.zipcode},
                  {user.address &&
                  user.address.geo && <span>Geo: ({user.address!.geo.lat}, {user.address!.geo.lng})</span>
                  }
              </li>
              <li>
                  Phone: {user.phone}
              </li>
              <li>
                  Website: {user.website}
              </li>
              <li>
                  Company: {user.company!.name}, '{user.company!.catchPhrase}', specialized in {user.company!.bs}
              </li>
          </ul>
          </div>
        </div>}
        <div className="row mt-2">
          <div className="col">
            <button onClick={()=>goBack()}
            type="button"
            className="btn btn-danger">
                Back
            </button>
          </div>
        </div>
      </div>
    );
  };

export default DisplayUserDetails
