import React from "react";

import QuestionsContextProvider from "../components/QuestionsContextProvider";
import ModulePage from "./ModulePage";

const ModulePageWrapper = (): JSX.Element => {
  return (
    <QuestionsContextProvider>
      <ModulePage />
    </QuestionsContextProvider>
  );
};

export default ModulePageWrapper;
