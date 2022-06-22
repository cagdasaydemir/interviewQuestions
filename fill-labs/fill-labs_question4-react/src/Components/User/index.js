import React from "react";

const User = ({userItem,index}) => {
  return (
    <tr key={index}>
      <th scope="row">{userItem.id}</th>
      <td>{userItem.password}</td>
      <td>{userItem.email}</td>
      <td>{userItem.first_name}</td>
      <td>{userItem.last_name}</td>
    </tr>
  );
};

export default User;
