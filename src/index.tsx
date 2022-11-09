import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// recoil은 작은 규모의 프로젝트에 어울린다. 검색해보자.
root.render(
  <>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </>
);

//npm i @tanstack/react-query
//@tanstack/react-query에서 useQuery사용시에 query key값은 대괄호로묶어야함.
//const {isLoading, data} = useQuery(["allCoins"],fetchCoins)
