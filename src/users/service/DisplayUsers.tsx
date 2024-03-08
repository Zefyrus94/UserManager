import { useQuery } from "react-query";
import axios from "axios";
import { User } from "../model/User";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faList, faPen, faTrash, faTriangleExclamation, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteUser from "./DeleteUser";
import DisplayUsersBody from "./DisplayUsersBody";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { toast } from "react-toastify";
import DisplayUserDetails from "./DisplayUserDetails";
const retrieveUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data;
};


const DisplayUsers = () => {
  console.log("Display users")
  const initialErrorMsg:string|null = null;
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg);
  const startingUserValue:User[] = []
  const startingActionValue:string = 'list';
  const initialCurrentUserId:number|null = null;
  const [allUsers, setAllUsers] = useState(startingUserValue);//vd
  const [currentUserId, setCurrentUserId] = useState(initialCurrentUserId)
  const [action, setAction] = useState(startingActionValue);//vd
  const [fetchEnabled, setFetchEnabled] = useState(true);
  const {
    data: users,
    error,
    isLoading,
    status,
    isSuccess
  } = useQuery<User[], Error>("usersData", retrieveUsers, {enabled: fetchEnabled});
  useEffect(() => {
    if (status === 'success') {
      console.log("call ok")
      setAllUsers(users);
    }
    if (isLoading){
      toast.info("Fetching users...", {theme: 'dark'})
    }
    if (isSuccess){
      toast.success('Users list retrieved', {theme:'dark'})
      
    }
    if (error){
      toast.error(`An error occurred: {error.message}`, {theme: 'dark'})
    }
    setFetchEnabled(false);
    
  }, [status, users]); 
  
  
  let body;
  let bcrumb;
  switch(action){
    case 'list':
      body = <DisplayUsersBody setAction={setAction} 
      allUsers={allUsers}
      setAllUsers={setAllUsers}
      setCurrentUserId={setCurrentUserId}
      setErrorMsg={setErrorMsg}/>

      bcrumb = <div className="row mt-2">
        <div className="col">
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              <span className="me-2">
                  You are at:
              </span> 
              <li className="breadcrumb-item active" aria-current="page">
                  Users
              </li>
              </ol>
          </nav>
        </div>
    </div>
    break;
    case 'create':
      body = <CreateUser setAction={setAction}
      setAllUsers={setAllUsers}
      setErrorMsg={setErrorMsg}/>

      bcrumb = <div className="row mt-2">
        <div className="col">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <span className="me-2">
                    You are at:
                </span> 
                <li className="breadcrumb-item">
                <Link to={`/users`} onClick={()=>setAction('list')}>
                    Users
                </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Create
                </li>
                </ol>
            </nav>
        </div>
    </div>
    break;
    case 'update':
      body = <UpdateUser setAction={setAction}
      setAllUsers={setAllUsers}
      currentUserId={currentUserId}
      setErrorMsg={setErrorMsg}/>

      bcrumb = <div className="row mt-2">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <span className="me-2">
                  You are at:
                </span> 
                <li className="breadcrumb-item">
                <Link to={`/users`} onClick={()=>setAction('list')}>
                  Users
                </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Edit
                </li>
              </ol>
            </nav>
          </div>
        </div>
    break;
    case 'detail':
      body = <DisplayUserDetails setAction={setAction} 
      setErrorMsg={setErrorMsg} currentUserId={currentUserId}/>

      bcrumb = <div className="row mt-2">
        <div className="col">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <span className="me-2">
                    You are at:
                </span> 
                <li className="breadcrumb-item">
                <Link to={`/users`} onClick={()=>setAction('list')}>
                    Users
                </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Detail
                </li>
                </ol>
            </nav>
        </div>
    </div>
    break;
    default:
      body = <></>
      bcrumb = <></>
    break;
  }
  const displayError = errorMsg? <div className="alert alert-danger d-flex align-items-center mx-2" role="alert">
  <FontAwesomeIcon icon={faTriangleExclamation} className="me-2"/>
  <div>
    {errorMsg}
  </div>
</div>:<></>;
  return (
    <div className="container">
      {bcrumb}
      {displayError}
      {body}
    </div>
    
  );
};

export default DisplayUsers;