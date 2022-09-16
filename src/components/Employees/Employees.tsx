//React
import React, { useEffect } from "react";
//Style
import st from "./index.module.scss";
//Redux
import { useAppDispatch, useAppSelector } from "../../helper/hooks";
import { getUsers } from "store/EmployeesSlice/EmployeesSlice";
//type
import { RootState } from "store/store";
//Components
import User from "../User/User";
import Alphabet from "../Alphabet/Alphabet";
import Birthday from "../Birthday/Birthday";
import CheckApiStatus from "../assets/checkStatusApi/CheckApiStatus";

const Employees = () => {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector(
    (state: RootState) => state.employeesSlice
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <Alphabet />
      <div className={st.wp}>
        <CheckApiStatus status={status}>
          <ul className={st.listUsers}>
            {!!users.length ? users.map((item) => (
              <User key={item.id} user={item} tag="li" />
            ))
            :
              <p className={st.noEmpl}>No Employees</p>
            }
          </ul>
          <Birthday />
        </CheckApiStatus>
      </div>
    </>
  );
};

export default Employees;
