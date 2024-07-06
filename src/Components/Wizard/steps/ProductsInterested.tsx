import { Button } from "primereact/button";
import React, { useState } from "react";
import { CreateWizardContext, WizardContextType } from "../context/WizardContextProvider";
import { PrimeIcons } from "primereact/api";
import { Checkbox } from "primereact/checkbox";

function ProductsInterested() {
  const context: WizardContextType = React.useContext(CreateWizardContext) as WizardContextType;

  const [error, setError] = useState<string | null>(null);
  const [toggle, setToggle] = useState<number | null>(null);
  const [recieveNewsChecked, setRecieveNewsChecked] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =useState(false);
  
  const productOptions = [
    { 
      key: 0,
      title: "Drinkware",
      subtitle: "Mugs & bottles" },
    {
      key: 1,
      title: "Paper prints",
      subtitle: "Photo books, cards, calendars...",
    },
    {
      key: 2,
      title: "Clothing",
      subtitle: "T-shirts, hoodies, sweatshirts...",
    },
    {
      key: 3,
      title: "Other merch",
      subtitle: "Phone cases, tote bags..." },
  ];

  const validateSelection = () => {
    if (toggle && termsAndConditionsChecked) {
      return true;
    }

    return false;
  };

  const optionButtonSelectAction = (key: number) => {
    setError(null);
    setToggle(key);
  };

  const optionButtonSubmitAction = () => {
    context.setStep(4);
  };

  const formSubmitAction = () => {
    validateSelection()
      ? alert("Wizard finished")
      : setError("Please select one of the options");
  };

  return (
    <div className="flex flex-column justify-content-center align-items-stretch">
      <div className="text-center mb-1">
        <h1 className="font-semibold">What products are you interested in?</h1>
        <p>
          We will use this information to recommend products. But you will still
          have access to all categories, don't worry :)
        </p>

        <div className="h-1rem mb-2">
          {error != "" && <div className="text-sm my-auto">{error}</div>}
        </div>
      </div>

      <div className="p-grid custom_grid two_by_two mb-2">
        {productOptions.map((productOption) => {
          return (
            <Button
              className={
                toggle === productOption.key
                  ? "mx-1 bg-blue-50 border-round-lg"
                  : "mx-1 bg-white border-round-lg hover:bg-blue-50"
              }
              onClick={() => {
                context.sellingCustomProducts
                  ? optionButtonSubmitAction()
                  : optionButtonSelectAction(productOption.key);
              }}
              style={{ borderColor: "#D1D3D4" }}
            >
              <div className="flex flex-column justify-content-center align-items-start">
                <div className="my-1" style={{ color: "#101531" }}>
                  {productOption.title}
                </div>
                <div className="my-1" style={{ color: "#858585" }}>
                  {productOption.subtitle}
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {context.sellingCustomProducts && (
        <div className="flex flex-row justify-content-center my-1">
          <Button
            label="Back"
            onClick={() => context.setStep(2)}
            icon={PrimeIcons.ANGLE_LEFT}
            className="p-button-text mr-4 text-lg"
            style={{ color: "#101531" }}
          />
        </div>
      )}

      {!context.sellingCustomProducts && (
        <React.Fragment>
          <div className="flex flex-column justify-content-start align-items-center my-2 w-auto">
            <div className="flex flex-row justify-content-center align-items-center my-1">
              <Checkbox
                inputId="terms_and_conditions"
                name=""
                value=""
                className={
                  error && !termsAndConditionsChecked ? "checkbox_error" : ""
                }
                onChange={(e) => setTermsAndConditionsChecked(e.checked)}
                checked={termsAndConditionsChecked}
              />
              <label htmlFor="terms_and_conditions" className="ml-2 text-sm">
                I accept the <a href="google.com">API User Terms</a> and I have
                read the <a href="google.com">Data Processing Terms</a>
              </label>
            </div>

            <div className="flex flex-row justify-content-center align-items-center my-2">
              <Checkbox
                inputId="recieve_news"
                name=""
                value=""
                onChange={(e) => setRecieveNewsChecked(e.checked)}
                checked={recieveNewsChecked}
              />
              <label htmlFor="recieve_news" className="ml-2 text-sm">
                I would like to receive news, insights, and best practices from
                Printram
              </label>
            </div>
          </div>

          <div className="flex flex-row justify-content-center my-1">
            <Button
              label="Back"
              onClick={() => context.setStep(1)}
              icon={PrimeIcons.ANGLE_LEFT}
              className="p-button-text mr-4 text-lg"
              style={{ color: "#101531" }}
            />

            <Button
              className="border-round-md border-none hover:bg-transparent text-lg px-4 py-2"
              style={{ backgroundColor: "#4541FF" }}
              label={!context.loading ? "Finish" : ""}
              onClick={formSubmitAction}
            ></Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default ProductsInterested;
