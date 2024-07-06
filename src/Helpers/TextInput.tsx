import { ErrorMessage } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext';

interface Props extends InputTextProps {
    label: string;
	name: string;
	optional?: boolean;
}

const TextInput = ({ label, name, optional, ...props }: Props) => {
    return (
        <>
            <div className="flex align-items-center justify-content-between px-1 mb-1">
				<label>{label} { !!optional ? <small>(Optional)</small> : '' }</label>
                <ErrorMessage name={name} component="small" className="text-red font-medium" />
            </div>
            <InputText name={name} {...props} className="w-full" />
        </>
    );
};

export default TextInput;
