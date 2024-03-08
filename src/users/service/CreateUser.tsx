import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../model/User";
import { toast } from "react-toastify";
import { Formik, Form, Field } from 'formik';
import { ValidationMessage, validateAddressCity, validateAddressGeoLat, validateAddressGeoLng, validateAddressStreet, validateAddressSuite, validateAddressZipCode, validateCompanyBs, validateCompanyCatchphrase, validateCompanyName, validateEmail, validateName, validatePhone, validateUsername, validateWebsite } from "../utilities/FormValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import CreateEditUser from "./CreateEditUser";

const CreateUser = (props:any) => {
    let {
        setAction,
        setAllUsers,
        setErrorMsg
    } = props;
  /* const [title, setTitle] = useState("");
  const [body, setBody] = useState(""); */
    const startingUser:User = {
        "name": '',
        "username": '',
        "email": '',
        "address": {

        },
        "phone": '',
        "website": '',
        "company": {
        "name": '',
        "catchPhrase": '',
        "bs": ''
        }
    };
    const [user, setUser] = useState(startingUser)

    const mutation = useMutation(async (newUser) =>{
        const resp = await axios.post("https://jsonplaceholder.typicode.com/users", newUser)
        return resp.data
    },
    {
      onSuccess: async (data) => {    
        //assegna un id, todo vedi se lo restituisce l'api
        user.id = data.id;
        setAllUsers((prevUsers:User[]) => {
            let newUsers = [...prevUsers, user]
            return newUsers
        });
        setAction('list');
      },
      onError: async (error) => {
        console.log(error)
      },
    }
    );
    function checkUserValid(user:User){
        return !!user.name && !!user.username && !!user.email && !!user.phone && !!user.website;
    }
    const submitData = (e:any) => {
        e.preventDefault();
        if(checkUserValid(user)){
            let data:any = user
            mutation.mutate(data);
            /* console.log("res: ",mutation.data) */
            
        }
        else{
            setErrorMsg("Invalid user");
            toast.error("Invalid user",{theme:'dark'});
        }
    };
    const submitForm = () => {
        /* if(checkUserValid(user)){ */
            let data:any = user
            mutation.mutate(data);
        /* }
        else{
            setErrorMsg("Invalid user");
            toast.error("Invalid user",{theme:'dark'});
        } */
    };
    if (mutation.isLoading) {
        return <span>Submitting...</span>;
    }

    /* if (mutation.isError) {
        return <span>Error: {mutation.error.message}</span>;
    } */

    /* if (mutation.isSuccess) {
        return <span>User created!</span>;
    } */
    function goBack(){
        setErrorMsg(null);
        setAction('list');
    }
    function changeUser(e:any, field:string){
        setUser(prevUser=>{
            return {
                ...prevUser,
                [field]: e.target.value
            }
        })
    }
    function setNested(v:any, k:string[], object:any){
        if(k.length > 1){
            const KEY = k.shift()!;
            setNested(v, k, object[KEY])
        }
        else{
            const IDX = k[0]
            object[IDX] = v
        }
    }
    function changeUserNested(e:any, fields:string[]){
        setUser(prevUser=>{
            let newUser:User = {
                ...prevUser,
            }
            setNested(e.target.value, fields, newUser);
            return newUser
        })
    }
  return (
    <CreateEditUser setAction={setAction}
    setAllUsers={setAllUsers}
    setErrorMsg={setErrorMsg}
    user={user}
    setUser={setUser}
    mutation={mutation}/>
  );
};
export default CreateUser;