
import React from "react";
import User from '.';

const UsersList = ({userList, setUserList}) => {

  // const deleteUser = (userId) => {
  //   axios.delete("https://localhost:3000/api/deleteUser?id=" + userId)
  //     .then(res => {
  //       window.alert(`"${res.data.title}" user is deleted`);
  //     }).finally(() => {
  //       setUserList();
  //     });
  // }
  // const updateUser = (userId) => {
  //   axios.patch("https://localhost:3000/api/updateUser?id=" + userId)
  //     .then(res => {
  //       window.alert(`"${res.data.title}" user is updated`);
  //     }).finally(() => {
  //       setUserList();
  //     });
  // }
      

  return (
    <table className="table table-striped ">
      <thead>
        <tr>
          <th scope="col">#ID</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
        </tr>
      </thead>

      <tbody>
        {userList.map((userItem, index) => {
        return <User userItem={userItem} index={index}>             
        </User>
      })}
      </tbody>
    </table>
  );
};

export default UsersList;
