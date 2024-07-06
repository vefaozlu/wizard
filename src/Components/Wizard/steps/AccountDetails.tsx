import PrPrefixDropdownInput from "Helpers/PrPrefixDropdownInput";
import TextInput from "Helpers/TextInput";
import TextMaskInput from "Helpers/TextMaskInput";
import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import React, { useState } from "react";
import * as Yup from "yup";
import { CreateWizardContext, WizardContextType } from "../context/WizardContextProvider";

const AccountDetails = () => {
  const context: WizardContextType = React.useContext(CreateWizardContext) as WizardContextType;

  const [prefix, setPrefix] = useState<string>("+1");

  const initialValues = {
    fullName: "John Doe",
    email: "jdoe@test.com",
    prefix: "+1",
    phone: "5555555555",
  };

  const phoneRegExp = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;

  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Full Name Too Short")
      .max(50, "Full Name Too Long")
      .required("Full Name Required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Full Name Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
  });

  const submitForm = (values: any) => {
    console.log(values);

    context.setStep(1);
  };

  return (
    <div className="AccountDetails flex flex-column justify-content-center align-items-stretch sm:w-11 md:w-11 lg:w-30rem">
      <div className="text-center">
        <h1 className="font-semibold">What is Your Account Details</h1>
        <p>We will use this information to customize your experience.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={submitForm}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="flex flex-column justify-content-between h-17rem">
              <div>
                <TextInput
                  label="Full Name*"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextInput
                  label="Email*"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-row">
                <div className="flex-grow-2 mr-3">
                  <PrPrefixDropdownInput
                    label="Prefix*"
                    name="prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                  />
                </div>

                <div className="flex-grow-1">
                  <TextMaskInput
                    label="Phone*"
                    mask="999-999-9999"
                    name="phone"
                    unmask={true}
                    value={values.phone}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="flex flex-row justify-content-center my-1">
                <Button
                  label="Skip"
                  onClick={() => context.setStep(1)}
                  className="p-button-text mr-4 text-lg"
                  style={{ color: "#101531", textDecoration: "underline" }}
                />

                <Button
                  className="border-round-md border-none hover:bg-transparent text-lg px-4 py-2"
                  style={{ backgroundColor: "#4541FF" }}
                  label={!context.loading ? "Next" : ""}
                  type="submit"
                ></Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountDetails;
