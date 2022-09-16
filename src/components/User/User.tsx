//React
import React, { FC, useState } from "react";
//Style
import st from "./index.module.scss";
//Type
import { IUser } from "store/EmployeesSlice/types";
//Components
import RadioBtn from "../UI/GroupRadioBtn/GroupRadioBtn";

interface IProps {
  tag?: string;
  user: IUser;
}

const User: FC<IProps> = ({ tag, user }) => {
  const { firstName, lastName, id } = user;
  const userActive = JSON.parse(localStorage.getItem("userActive") || "[]");
  const activeStorage = userActive.includes(id) ? "active" : "disabled";
  const [active, setActive] = useState<boolean>(activeStorage === "active");
  const Tag = tag || "div";

  return (
    // @ts-ignore
    <Tag className={`${st.user} ${active ? st.active : ""}`}>
      <h3>
        {firstName} {lastName}
      </h3>
      <RadioBtn
        actualityChecked={setActive}
        checked={activeStorage}
        user={user}
      />
    </Tag>
  );
};

export default User;
