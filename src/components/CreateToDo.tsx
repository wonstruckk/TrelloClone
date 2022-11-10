import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";

import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = (data: IForm) => {
    setToDos((oldToDos) => [
      { text: data.toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "투두적어주세요",
        })}
        placeholder="할 일 적어주세요."
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
