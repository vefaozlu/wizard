import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ToggleButton } from "primereact/togglebutton";
import React, { useState } from "react";
import { PrimeIcons } from "primereact/api";
import {CreateWizardContext, WizardContextType} from "../context/WizardContextProvider";

function ChannelsUsing() {
  const context: WizardContextType = React.useContext(CreateWizardContext) as WizardContextType;

  const [etsySelected, setEtsySelected] = useState(false);
  const [shopifySelected, setShopifySelected] = useState(false);
  const [magentoSelected, setMagentoSelected] = useState(false);
  const [amazonSelected, setAmazonSelected] = useState(false);
  const [woocommerceSelected, setWoocommerceSelected] = useState(false);
  const [otherSelected, setOtherSelected] = useState(false);
  const [otherInput, setOtherInput] = useState<string>("");
  const [error, setError] = useState("");

  const options = [
    { 
      name: "Etsy",
      selected: etsySelected,
      setSelected: setEtsySelected
    },
    {
      name: "Shopify",
      selected: shopifySelected,
      setSelected: setShopifySelected,
    },
    {
      name: "Magento",
      selected: magentoSelected,
      setSelected: setMagentoSelected,
    },
    {
      name: "Amazon",
      selected: amazonSelected,
      setSelected: setAmazonSelected,
    },
    {
      name: "Woocommerce",
      selected: woocommerceSelected,
      setSelected: setWoocommerceSelected,
    },
    {
      name: "Other",
      selected: otherSelected,
      setSelected: setOtherSelected
    },
  ];

  const validateSelection = () => {
    const isAnySelected = options.some((option) => option.selected);
    if (isAnySelected && (otherSelected ? otherInput != "" : true)) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-column justify-content-center align-items-center w-full">
      <div className="text-center mb-1">
        <h1 className="font-semibold">Which sales channel do you use?</h1>
        <p>We will use this information to customize your experience.</p>

        <div className="h-1rem mb-2">
          {error != "" && <div className="text-sm my-auto">{error}</div>}
        </div>
      </div>

      <div className="p-grid  md:w-10 lg:w-10 xl:w-10 custom_grid three_by_two">
        {options.map((option) => {
          return (
            <ToggleButton
              className={
                option.selected
                  ? "border-round-lg bg-blue-50"
                  : "border-round-lg hover:bg-blue-50"
              }
              style={{ color: "#101531" }}
              onLabel={option.name}
              offLabel={option.name}
              checked={option.selected}
              disabled={context.loading}
              onChange={(e) => {
                setError("");
                option.setSelected(e.value);
              }}
            />
          );
        })}
      </div>

      <div className="md:w-10 lg:w-10 xl:w-10 h-6rem">
        {otherSelected ? (
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
          label={!context.loading ? "Next" : ""}
          onClick={() => {
            validateSelection()
              ? context.setStep(3)
              : setError("Please select at least one of the options");
          }}
        ></Button>
      </div>
    </div>
  );
}

export default ChannelsUsing;
