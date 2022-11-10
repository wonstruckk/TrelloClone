import { atom, selector } from "recoil";

//selector = state를 가져다가 뭔가 return함. derived state라고함.

//enum은 프로그래머를 돕기위헤 일련의 숫자를 문자로 표현해줌.
//사실상 0,1,2임.
export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}

//tsx만들어줌.
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

//리코일만들어줌.
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

//atom에 변화를 줄수 있다. getfunction이 있어야 atom을받음.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
