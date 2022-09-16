//React
import React, { useState } from "react";
//Style
import st from "./index.module.scss";
//Redux
import { useAppDispatch } from "../../helper/hooks";
import { filterUsers } from "store/EmployeesSlice/EmployeesSlice";
//Mock
import { arr_EN } from "./mock";

const Alphabet = () => {
  const dispatch = useAppDispatch();
  const [selectedLetters, setSelectedLetters] = useState<string>("");

  const handleClick = (letter: string) => {
    dispatch(filterUsers(letter));
    setSelectedLetters(letter);
  };

  return (
    <ul className={st.letters}>
      {arr_EN.map((letter) => (
        <li
          className={`${selectedLetters === letter ? st.active : ""}`}
          onClick={() => handleClick(letter)}
          key={letter}
        >
          {letter}
        </li>
      ))}
    </ul>
  );
};

export default Alphabet;
