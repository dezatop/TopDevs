//React
import React, {FC, useState} from 'react';
//Style
import st from "./index.module.scss";
//Type
import {IUser} from "store/EmployeesSlice/types";
//Redux
import {useAppDispatch} from "helper/hooks";
import {addUserBirthday, deleteUserBirthday} from 'store/EmployeesSlice/EmployeesSlice'

interface IProps {
  user: IUser
  checked: 'active' | 'disabled'
  actualityChecked: (check: boolean) => void
}

const RadioBtn: FC<IProps> = ({ user,checked,actualityChecked}) => {
  const dispatch = useAppDispatch()
  const {id} = user
  const [active, setActive] = useState<boolean>(checked === 'active')
  const [disabled, setDisabled] = useState<boolean>(checked === 'disabled')

  const activeLogic = (data:string[]) => {
    setActive(true)
    setDisabled(false)
    actualityChecked(true)

    if(!!data.length) {
      !data.includes(id) && localStorage.setItem('userActive', JSON.stringify([...data, id]))
      !data.includes(id) && dispatch(addUserBirthday(user))
    } else {
      localStorage.setItem('userActive', JSON.stringify([id]))
      dispatch(addUserBirthday(user))
    }
  }

  const disabledLogic = (data:string[]) => {
    setDisabled(true)
    setActive(false)
    actualityChecked(false)

    if(!!data.length) {
      const delUser = data.filter(user => user !== id)
      dispatch(deleteUserBirthday(id))
      data.includes(id) && localStorage.setItem('userActive', JSON.stringify(delUser))
    }
  }

  const handleChange = (type:string) => {
    const userActive = JSON.parse(localStorage.getItem('userActive') || '[]')
    type === 'active' ? activeLogic(userActive) : disabledLogic(userActive)
  }

  return (
    <>
      <label className={st.wp}>
        <input
          checked={active}
          onChange={() => handleChange('active')}
          className={st.checkboxInput}
          type="checkbox"/>
        <span/>
        <p>Active</p>
      </label>
      <label className={st.wp}>
        <input
          checked={disabled}
          onChange={() => handleChange('disable')}
          className={st.checkboxInput}
          type="checkbox"/>
        <span/>
        <p>No Active</p>
      </label>
    </>
  );
};

export default RadioBtn;
