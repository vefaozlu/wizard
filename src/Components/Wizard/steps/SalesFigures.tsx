import React, { useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { CreateWizardContext, WizardContextType } from "../context/WizardContextProvider";
import { PrimeIcons } from "primereact/api";

function SalesFigures() {
  const context: WizardContextType = React.useContext(CreateWizardContext) as WizardContextType;

  const [error, setError] = useState("");
  const [otherInput, setOtherInput] = useState("");
  const [recieveNewsChecked, setRecieveNewsChecked] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =useState(false);
  const [selectedFiguresOption, setSelectedFiguresOptions] = useState<number | null>(null);

  const salesFiguresOptions = [
    {
      key: 0,
      text: "0-49 Product",
    },
    {
      key: 1,
      text: "50-499 Product",
    },
    {
      key: 2,
      text: "500-999 Product",
    },
    {
      key: 3,
      text: "Other",
    },
  ];

  const validateSelection = () => {
    if (
      selectedFiguresOption &&
      (selectedFiguresOption === 3 ? otherInput != "" : true)
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-column justify-content-center align-items-center w-full">
      <div className="text-center mb-1">
        <h1 className="font-semibold">
          What are your average monthly sales figures?
        </h1>
        <p>We will use this information to customize your experience.</p>

        <div className="h-1rem mb-2">
          {error != "" && <div className="text-sm my-auto">{error}</div>}
        </div>
      </div>

      <div className="p-grid custom_grid two_by_two  md:w-10 lg:w-10 xl:w-10">
        {salesFiguresOptions.map((option) => {
          return (
            <ToggleButton
              key={option.key}
              onLabel={option.text}
              offLabel={option.text}
              checked={option.key === selectedFiguresOption}
              style={{ color: "#101531" }}
              className={
                option.key === selectedFiguresOption
                  ? "border-round-lg bg-blue-50"
                  : "border-round-lg hover:bg-blue-50"
              }
              onChange={(e) =>
                e.value
                  ? setSelectedFiguresOptions(option.key)
                  : setSelectedFiguresOptions(null)
              }
            />
          );
        })}
      </div>

      <div className="w-full h-6rem">
        {selectedFiguresOption === 3 ? (
          <div className="flex flex-column justify-content-center align-items-stretch">
            <p className="text-sm" style={{ color: "#555555" }}>
              You selected 'Other'. Please enter your answer below.
            </p>
            <InputText
              className={error != "" ? "border-red-500 transition-linear" : ""}
              id="channel_other"
              onChange={(value) => {
                setError("");
                setOtherInput(value.target.value);
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="agreements__container">
        <div className="flex flex-row justify-content-center align-items-center my-2">
          <Checkbox
            inputId="terms_and_conditions"
            name=""
            value=""
            onChange={(e) => setTermsAndConditionsChecked(e.checked)}
            checked={termsAndConditionsChecked}
          />
          <label htmlFor="terms_and_conditions" className="ml-2 text-sm">
            I accept the <a href="google.com">API User Terms</a> and I have read
            the <a href="google.com">Data Processing Terms</a>
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
          onClick={() => {
            validateSelection()
              ? context.setStep(3)
              : setError("Please select one of the options");
          }}
        ></Button>
      </div>
    </div>
  );
}

export default SalesFigures;
