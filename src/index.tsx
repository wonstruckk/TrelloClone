import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { darkTheme } from "./theme";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// recoil은 작은 규모의 프로젝트에 어울린다. 검색해보자.
root.render(
  <>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </>
);

//npm i @tanstack/react-query
//@tanstack/react-query에서 useQuery사용시에 query key값은 대괄호로묶어야함.
//const {isLoading, data} = useQuery(["allCoins"],fetchCoins)
