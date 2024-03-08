import { faPen, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "../model/User";
import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import { v4 as uuid } from "uuid";
function DisplayUsersBody(props:any) {
    let navigate = useNavigate(); 
    let {
        allUsers,
        setAllUsers,
        setAction,
        setCurrentUserId,
        setErrorMsg
    } = props;
    const showUserDetail = (id:number) =>{ 
        /* let path = `${id}`; //slash
        navigate(path); */
        setCurrentUserId(id);
        setAction('detail')
    }
    const editUser = (e:any, id:number) =>{ //MouseEvent<HTMLButtonElement, MouseEvent>; SyntheticBaseEvent 
        e.stopPropagation();
        setCurrentUserId(id);
        setAction('update');
        /* let path = `edit/${id}`; //slash
        navigate(path); */
    //e.nativeEvent.stopImmediatePropagation();
    }
    const createUser = () =>{ 
        /* let path = `create`; //slash
        navigate(path); */
        setErrorMsg(null);
        setAction('create');
    }
    return (
        <div>
            <h2>
                <button title='Create a new user' className="btn btn-success me-2"
                onClick={createUser}>
                <FontAwesomeIcon icon={faUserPlus} className="me-2"/>
                </button>Users List
                
            </h2>
            {allUsers && allUsers.length > 0? <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {allUsers && allUsers.map((user:User) => (
                    <tr key={uuid()} role="button"
                    onClick={()=>showUserDetail(user.id!)}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        {/* <button className="btn btn-primary me-1">
                        <span className="me-1">Dettagli</span><FontAwesomeIcon icon={faList} />
                        </button> */}
                        <button 
                        onClick={e=>editUser(e,user.id!)}
                        className="btn btn-outline-light me-1"
                        title={'Edit user '+user.name}>
                        <span className="me-1">Edit</span><FontAwesomeIcon icon={faPen} />
                        </button>
                        <DeleteUser user={user} 
                        setAllUsers={setAllUsers}/>
                        {/* <button 
                        onClick={()=>deleteUserFn(user.id)}
                        className="btn btn-danger">
                        <span className="me-1">Elimina</span><FontAwesomeIcon icon={faTrash} />
                        </button> */}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>:<h3>No user found</h3>}
        </div>
    )
}

export default DisplayUsersBody
