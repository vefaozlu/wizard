import { ErrorMessage } from "formik";
import { Dropdown, DropdownProps } from "primereact/dropdown";

interface Props extends DropdownProps {
  label: string;
  name: string;
  isOptional?: boolean;
}

const DropdownInput = ({ label, name, isOptional, ...props }: Props) => {
  return (
    <>
      <div className="flex align-items-center justify-content-between px-1 mb-1">
        <label>
          {label}
          {!!isOptional ? (
            <span className="text-color-secondary"> (Optional)</span>
          ) : null}
        </label>
        {!!props.required ? (
          <ErrorMessage
            name={name}
            component="small"
            className="text-red font-medium"
          />
        ) : null}
      </div>

      <Dropdown name={name} {...props} className="w-full" />
    </>
  );
};

export default DropdownInput;
 