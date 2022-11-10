import React, { useState } from "react";
import { AbortedDeferredError } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // const value = useRecoilValue(toDoState);
  //value변경. setState랑똑같다.
  // const modFn = useSetRecoilState(toDoState);

  //useRecoilValue사용해서 recoil에 접근한다.

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

//register : onChange핸들러가 필요 없어진다. 관련된 state포함.
//watch : form의 입력값들의 변화를 감지한다.
//handlesubmit : validation,preventDefault..담당.
//formState : form의 에러 확인가능. validation/error
// const {
//   register,
//   handleSubmit,
//   formState: { errors },
//   setError,
// } = useForm<IForm>({
//   defaultValues: {
//     email: "@naver.com",
//     toDo: "",
//   },
// });

// const onValid = (data: IForm) => {
//   if (data.password !== data.password1) {
//     setError(
//       "password1",
//       { message: "비밀번호가다릅니다." },
//       // 에러난곳으로 포커스옮김.
//       { shouldFocus: true }
//     );
//   }
// setError("extraError", {message: "server Offline"});
// };

// return (
//   <div>
//     <form
//       style={{ display: "flex", flexDirection: "column" }}
//       onSubmit={handleSubmit(onValid)}
//     >
//       <input
//         {...register("email", {
//           required: "Email is required",
//           pattern: {
//             value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//             message: "메일똑바로적어",
//           },
//         })}
//         placeholder="Email"
//       />
//       <span>{errors?.email?.message}</span>
//       <input
//         {...register("toDo", {
//           required: "제대로입력하세요.",
//           validate: {
//             noInwon: (value) =>
//               value.includes("인원") ? "인원은쓰지마라" : true,
//           },
//         })}
//         placeholder="Write to do"
//       />
//       <span>{errors?.toDo?.message}</span>
//       <input
//         {...register("password", {
//           required: "비밀번호가필요합니다.",
//           minLength: {
//             value: 10,
//             message: "숫자만적어ㅡㅡ.",
//           },
//         })}
//         placeholder="비번입력"
//       />
//       <span>{errors?.password?.message}</span>
//       <input
//         {...register("password1", {
//           required: "비밀번호확인제대로해라",
//           minLength: {
//             value: 10,
//             message: "숫자만적어라제발.",
//           },
//         })}
//         placeholder="비번확인"
//       />
//       <span>{errors?.password1?.message}</span>
//       <button>Add</button>
//       <span>{errors?.extraError?.message}</span>
//     </form>
//   </div>
