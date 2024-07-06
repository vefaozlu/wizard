import { Button } from "primereact/button";
import React from "react";
import { CreateWizardContext, WizardContextType } from "../context/WizardContextProvider";

function CustomProducts() {
  const context: WizardContextType = React.useContext(CreateWizardContext) as WizardContextType;

  return (
    <div className="flex flex-column justify-content-center align-items-stretch">
      <div className="text-center">
        <h1 className="font-semibold">
          Are you already selling custom products
        </h1>
        <p>We will use this information to customize your experience.</p>

        <div className="h-1rem mb-2">
          {/* {error != "" && <div className="text-sm my-auto">{error}</div>} */}
        </div>
      </div>
      <div className="flex flex-row justify-content-center align-items-center lg:w-full">
        <Button
          className="flex-1 mx-1 bg-white border-round-lg hover:bg-blue-50"
          style={{ color: "#101531", borderColor: "#D1D3D4" }}
          label="No, not yet"
          onClick={() => {
            context.setStep(3);
            context.setsellingCustomProducts(false);
          }}
        />
        <Button
          className="flex-1 mx-1 bg-white border-round-lg hover:bg-blue-50"
          style={{ color: "#101531", borderColor: "#D1D3D4" }}
          label="Yes"
          onClick={() => {
            context.setsellingCustomProducts(true);
            context.setStep(2);
          }}
        />
      </div>
    </div>
  );
}

export default CustomProducts;
