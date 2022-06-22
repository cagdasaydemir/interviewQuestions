import React from 'react'
// import axios from "axios";
import { useEffect, useState } from "react";
import UsersList from '../../Components/User/UsersList'


const Master = () => {
  const [userList, setUserList] = useState([{id: 1, username: "bbbbb", password: "asdf",  email: "asdf", first_name: "asdf", last_name: "asdf"},
  {id: 1, username: "asdf", password: "asdf",  email: "asdf", first_name: "asdf", last_name: "asdf"},
  {id: 1, username: "ffffff", password: "asdf",  email: "asdf", first_name: "asdf", last_name: "asdf"},
  {id: 1, username: "jjjjjj", password: "asdf",  email: "asdf", first_name: "asdf", last_name: "asdf",}]);



  // const getAllUsers = async () => {
  //   axios
  //     .get("http://localhost:3000/api/v1/getAll")
  //     .then((res) => setUserList(res.data));
  // };
  useEffect(()=> {}, [userList]);

  return (
    <UsersList userList={userList} setUserList={setUserList}/>
  )
}

export default Master