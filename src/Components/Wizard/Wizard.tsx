import React from "react";
import { CreateWizardContext, WizardContextType } from "./context/WizardContextProvider";
import logo from "../../assets/logo.svg";

import "./Wizard.scss";

function Wizard() {
  const context: WizardContextType = React.useContext(CreateWizardContext) as WizardContextType;

  return (
    <div className="Wizard flex justify-content-center align-items-start w-screen h-screen pt-8">
      <div className="flex flex-column justify-content-center align-items-center sm:w-full md:w-full lg:w-8 xl:w-5">
        <img
          style={{ width: "163.15px", height: "60px" }}
          src={logo}
          alt="logo"
        />

        {context.step.component}
      </div>
    </div>
  );
}

export default Wizard;
