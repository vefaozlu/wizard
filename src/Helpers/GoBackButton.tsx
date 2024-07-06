import { useNavigate } from "react-router-dom";
import PrButton from "./PrButton";

type Props = {
  disabled?: boolean;
};

const GoBackButton = ({ disabled }: Props) => {
  const navigate = useNavigate();

  return (
    <PrButton
      type="secondary"
      icon={<span className="pi pi-arrow-left" />}
      onClick={() => navigate(-1)}
      text="Go Back"
    />
  );
};

export default GoBackButton;
