import { ErrorMessage } from "formik";
import { InputMask, InputMaskProps } from "primereact/inputmask";

interface Props extends InputMaskProps {
  label?: string;
  name: string;
}

const TextMaskInput = ({ label, name, ...props }: Props) => {
  return (
    <>
      <div className="flex align-items-center justify-content-between px-1 mb-1">
        <label>{label || ""}</label>
        <ErrorMessage
          name={name}
          component="small"
          className="text-red font-medium"
        />
      </div>
      <InputMask name={name} {...props} className="w-full" />
    </>
  );
};

export default TextMaskInput;
