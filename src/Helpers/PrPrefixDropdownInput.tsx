import DropdownInput from "../Helpers/DropdownInput";
import prefixCountryNumbers from "../assets/json/prefix-country-numbers.json";
import { DropdownChangeParams } from "primereact/dropdown";

const prefixesSet = new Set(
  prefixCountryNumbers
    .filter((_prefix) => _prefix.active)
    .map((_prefix) => _prefix.prefix)
);
const prefixes = [...(prefixesSet as any)].map((_prefix: string) => {
  const country = prefixCountryNumbers.find((c) => c.prefix === _prefix);
  return {
    label: `(${country?.name})`,
    value: _prefix,
    codeFilter: `${country?.code.toLowerCase()}`,
    codeFilterUppercase: `${country?.code}`,
    prefixFilter: country?.prefix.replaceAll('+', ''),
    flagUrl: `https://flagcdn.com/28x21/${country?.code.toLowerCase()}.png`,
  };
});

type Props = {
  value: string;
  onChange: (event: DropdownChangeParams) => void;
  label: string;
  name: string;
  isOptional: boolean;
  required: boolean;
  className: string;
  style: React.CSSProperties;
};

const PrPrefixDropdownInput = (props: Partial<Props>) => {
  const itemTemplate = (option: any) => {
    return (
      <div className="p-d-flex p-ai-center">
        <img
          alt="flag"
          src={option.flagUrl}
          className="p-mr-2"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>{option.value}</span>
      </div>
    );
  };

  const valueTemplate = (option: any) => {
    if (!option) {
      return null;
    }
    return (
      <div className="p-d-flex p-ai-center">
        <img
          alt="flag"
          src={option.flagUrl}
          className="p-mr-2"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>{option.value}</span>
      </div>
    );
  };

  return (
    <DropdownInput
      filter
      filterBy="label, value, codeFilter, codeFilterUppercase, prefixFilter"
      label={props.label || ""}
      name={props.name || "prefix"}
      isOptional={props.isOptional}
      required={props.required}
      options={prefixes}
      style={props.style}
      value={props.value || prefixes[0]}
      onChange={props.onChange}
      className={props.className}
      itemTemplate={itemTemplate}
      valueTemplate={valueTemplate}
    />
  );
};

export default PrPrefixDropdownInput;
