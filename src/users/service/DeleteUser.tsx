import { useMutation } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faList, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "../model/User";
import { toast } from "react-toastify";
import { useEffect } from "react";
const DeleteUser = ({user, setAllUsers}:any) => {
  const mutation = useMutation(() =>
    axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`),
  );

  const deleteData = (e:any) => {
    e.stopPropagation();
    mutation.mutate();
  };

  /* if (mutation.isLoading) {
    toast.info("Deleting user...", {theme: 'dark'})
  } */

  /* if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  } */

  useEffect(()=>{
    if (mutation.isSuccess) {
      setAllUsers((prevUsers: User[]) => {
        return prevUsers.filter((userT:User) => userT.id !== user.id);
      });
      toast.success("User deleted", {theme: 'dark'});
    }
    if (mutation.isLoading) {
      toast.info("Deleting user...", {theme: 'dark'})
    }
  },[mutation]);

  return (
      <button onClick={e => deleteData(e)}
      className="btn btn-danger"
      title={'Delete user '+user.name}>
      <span className="me-1">
        Delete
      </span><FontAwesomeIcon icon={faTrash} />
      </button>
  );
};

export default DeleteUser;