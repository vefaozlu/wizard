import React, { useState, createContext, ReactNode, FC } from "react";
import Wizard from "../Wizard";
import AccountDetails from "../steps/AccountDetails";
import CustomProducts from "../steps/CustomProducts";
import ChannelsUsing from "../steps/ChannelsUsing";
import ProductsInterested from "../steps/ProductsInterested";
import SalesFigures from "../steps/SalesFigures";

interface WizardStep {
  isCompleted: boolean;
  isCanNext: boolean;
  component: ReactNode;
}

const wizardSteps: WizardStep[] = [
  { isCompleted: false, isCanNext: false, component: <AccountDetails /> },
  { isCompleted: false, isCanNext: false, component: <CustomProducts /> },
  { isCompleted: false, isCanNext: false, component: <ChannelsUsing /> },
  { isCompleted: false, isCanNext: false, component: <ProductsInterested /> },
  { isCompleted: false, isCanNext: false, component: <SalesFigures /> },
];

export type WizardContextType = {
  step: WizardStep;
  setStep: (index: number) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sellingCustomProducts: boolean;
  setsellingCustomProducts: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateWizardContext = createContext<WizardContextType | null>(null);

const WizardContextProvider = () => {
  const [step, _setStep] = useState<WizardStep>(wizardSteps[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sellingCustomProducts, setsellingCustomProducts] =
    useState<boolean>(false);

  const setStep = (index: number): void => {
    _setStep(wizardSteps[index]);
  };

  return (
    <CreateWizardContext.Provider
      value={{
        step,
        setStep,
        loading,
        setLoading,
        sellingCustomProducts,
        setsellingCustomProducts,
      }}
    >
      <Wizard />
    </CreateWizardContext.Provider>
  );
};

export { WizardContextProvider, CreateWizardContext, wizardSteps };
