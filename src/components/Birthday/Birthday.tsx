//React
import React, { useEffect, useMemo, useState } from "react";
//Style
import st from "./index.module.scss";
//Redux
import { useAppDispatch, useAppSelector } from "helper/hooks";
import { RootState } from "store/store";
import { addUserBirthday } from "store/EmployeesSlice/EmployeesSlice";
//Type
import { IUser } from "store/EmployeesSlice/types";

interface IActual {
  title: string;
  data: IUser[];
}

const Birthday = () => {
  const dispatch = useAppDispatch();
  const [actualityData, setActualityData] = useState<IActual[]>([]);
  const { usersBirthday, usersApi } = useAppSelector(
    (state: RootState) => state.employeesSlice
  );

  const filterArray = useMemo(() => {
    const currentMonth = new Date().getMonth();
    let countdown = 0;
    let arrayIndx = [];

    for (let i = 0; i <= 11; i++) {
      if (!!arrayIndx.length) {
        if (currentMonth + i <= 11) {
          arrayIndx.push(currentMonth + i);
        } else {
          arrayIndx.push(countdown);
          countdown += 1;
        }
      } else {
        arrayIndx.push(currentMonth);
      }
    }
    return arrayIndx;
  }, []);

  useEffect(() => {
    const month: IActual[] = [
      { title: "January", data: [] },
      { title: "February", data: [] },
      { title: "March", data: [] },
      { title: "April", data: [] },
      { title: "May", data: [] },
      { title: "June", data: [] },
      { title: "July", data: [] },
      { title: "August", data: [] },
      { title: "September", data: [] },
      { title: "October", data: [] },
      { title: "November", data: [] },
      { title: "December", data: [] },
    ];

    usersBirthday.forEach((user) => {
      const key = new Date(user.dob).getMonth();
      month[key].data.push(user);

      month[key].data.sort((x, y) => {
        if (x.lastName < y.lastName) {
          return -1;
        }
        if (x.lastName > y.lastName) {
          return 1;
        }
        return 0;
      });
    });

    const filterArrayMonth = filterArray.map((numMonth) => month[numMonth]);

    setActualityData(filterArrayMonth);
  }, [usersBirthday]);

  useEffect(() => {
    if (!!usersApi.length) {
      const userActive = JSON.parse(localStorage.getItem("userActive") || "[]");
      const filterArray = userActive.map((id: string) => {
        return usersApi.find((userId) => userId.id === id);
      });
      !!userActive.length && dispatch(addUserBirthday(filterArray));
    }
  }, [usersApi]);

  return (
    <div className={st.birthday}>
      <h2>Birthday</h2>
      {actualityData.map(({ title, data }) => (
        <div key={title}>
          <h3 className={st.month}>{title}</h3>
          {!!data.length ? (
            data.map(({ firstName, lastName, dob }) => (
              <ul key={firstName}>
                <li>
                  <span>
                    {firstName} {lastName}
                  </span>
                  <span className={st.date}>
                    {new Date(dob).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            ))
          ) : (
            <p className={st.empty}>Employees List is empty</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Birthday;
