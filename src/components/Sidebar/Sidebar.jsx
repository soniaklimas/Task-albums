import React from "react";
import { Button } from "reactstrap";

const Sidebar = (props) => {
  return props.userList.length !== 0
    ? props.userList.map((id) => (
        <Button
          block
          className="px-1"
          key={id}
          onClick={() => props.showAlbumsHandler(id)}
        >
          User {id}
        </Button>
      ))
    : null;
};

export default Sidebar;
