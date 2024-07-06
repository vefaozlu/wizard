import { Tooltip } from "primereact/tooltip";
import React from "react";

type Props = {
  text: string;
  type: "primary" | "secondary" | "success" | "danger" | "icon";
  btnType: "button" | "submit" | "reset" | undefined;
  className: string;
  icon: JSX.Element;
  loading: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  childRef: React.LegacyRef<HTMLButtonElement>;
  tooltip: string;
  id: string;
  style: React.CSSProperties;
  size: "small" | "large";
};

const PrButton = (props: Partial<Props>) => {
  return (
    <React.Fragment>
      {!!props.id && !!props.tooltip ? (
        <Tooltip target={`#${props.id}`} />
      ) : null}

      <button
        id={props.id}
        ref={props.childRef}
        data-pr-tooltip={props.tooltip}
        data-pr-position="top"
        type={props.btnType}
        onClick={props.onClick}
        disabled={props.disabled}
        className={`pr-btn pr-btn-${props.type || "primary"}${
          props.loading ? " pr-btn-loading" : ""
        }${!!props.className ? ` ${props.className}` : ""} pr-btn-${
          props.size || "medium"
        }`}
        style={props.style}
      >
        {props.type !== "icon" ? (
          !props.loading && !!props.icon ? (
            props.icon
          ) : props.loading ? (
            <span className="pi pi-fw pi-sync" />
          ) : null
        ) : null}

        {props.type === "icon" ? (
          !props.loading && !!props.icon ? (
            props.icon
          ) : props.loading ? (
            <span className="pi pi-fw pi-sync" />
          ) : null
        ) : (
          <span
            className={`pr-btn-text${
              (!!props.icon && props.text) || props.loading ? " ml-2" : ""
            }`}
          >
            {props.text}
          </span>
        )}
      </button>
    </React.Fragment>
  );
};

export default PrButton;
