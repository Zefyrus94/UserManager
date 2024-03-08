import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../model/User";
import { toast } from "react-toastify";
import CreateEditUser from "./CreateEditUser";
const getDetailsOfUser = async ({queryKey}:any) => {//vd
  const [_, id] = queryKey
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,//:id
  );
  return response.data;
}
const UpdateUser = (props:any) => {
  let {
    setAction,
    setAllUsers,
    currentUserId,
    setErrorMsg
  } = props;
  
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
  const {
    data: userRes,
    error,
    isLoading,
    status
  } = useQuery<User, Error>(['user', currentUserId], getDetailsOfUser);
  useEffect(() => {
    if (status === 'success') {
      setErrorMsg(null)
      setUser(userRes);
    }
    if (error){
      setErrorMsg("Cannot find user")
      setAction('list')
    }

    
  }, [status, userRes]); 
  
  /* if (isLoading) return <div>Fetching user...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
   */
  /* const mutation = useMutation(async (updatedUser) =>{
    return await axios.put(`https://jsonplaceholder.typicode.com/users/${currentUserId}`, updatedUser)
    },
    onError: async (error) => {
      console.log(error)
    },
  ); */
  const mutation = useMutation((updatedUser) =>
    axios.put(`https://jsonplaceholder.typicode.com/users/${currentUserId}`, updatedUser),
  );
  useEffect(()=>{
    if (mutation.isLoading) {
      toast.info("Updating user...", {theme: 'dark'})
    }
    if (mutation.isSuccess) {
      setAllUsers((prevUsers:User[]) => {
        let foundUserIdx = prevUsers.findIndex((u:User)=>u.id === currentUserId)
        prevUsers.splice(foundUserIdx,1,user);
        let newUsers = [...prevUsers]
        return newUsers
      });
      toast.success("User updated!", {theme: 'dark'})
      setAction('list');
    }
    if (mutation.isError) {
      toast.error("Updating error", {theme: 'dark'})
    }
  },[mutation]);
  
  function checkUserValid(user:User){
    return !!user.name && !!user.username && !!user.email && !!user.phone && !!user.website;
  }
  const submitData = (event:any) => {
      event.preventDefault();
      if(checkUserValid(user)){
        let userData:any = user;
        mutation.mutate(userData);
          
      }
      else{
        setErrorMsg("Invalid user")
      }
  };
 
  function goBack(){
    setErrorMsg(null);
    setAction('list');
  }
  return (
    <CreateEditUser setAction={setAction}
    setAllUsers={setAllUsers}
    setErrorMsg={setErrorMsg}
    user={user}
    setUser={setUser}
    mutation={mutation}
    isEdit/>
  );
};

export default UpdateUser;