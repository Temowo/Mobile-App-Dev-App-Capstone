import classNames from "classnames";

const Input = (props) => {
  const {
    variant,
    dimension,
    type,
    error,
    readOnly,
    rightSlot,
    leftSlot,
    onClick,
    label,
    disabled,
    ...otherProps
  } = props;
  const classes = classNames(
    `block w-full rounded-md border shadow-sm sm:text-sm input  ${
      error && "border-red-400"
    }`,
    {
      "focus:border-primary-500 focus:ring-primary-500 border-gray-300":
        variant === "primary",
      "focus:border-red-500 focus:ring-red-500 border-red-300":
        variant === "danger",
      "bg-[#F2F2F2] border-[#F2F2F2] ": variant === "modal",
      "px-2.5 py-1.5 text-xs rounded": dimension === "xs",
      "px-3 py-2 text-sm leading-4 rounded-md": dimension === "sm",
      "px-4 py-2 text-sm rounded-md": dimension === "md",
      "px-4 py-3 text-base rounded-md": dimension === "lg",
      "px-6 py-4 text-base rounded-md": dimension === "xl",
      "pl-9": leftSlot !== undefined,
      "pr-9": rightSlot !== undefined,
    }
  );

  const labelClasses = classNames(
    "block mt-2 text-sm font-medium text-gray-700",
    { "!mt-0   !text-black": variant === "modal" }
  );

  return (
    <div className={props.className}>
      {label ? (
        <label htmlFor={props.id} className={labelClasses}>
          {label}
        </label>
      ) : null}
      <div className="mt-5 relative">
        <input
          type={type}
          {...otherProps}
          readOnly={readOnly}
          id={props.id}
          defaultValue={otherProps.defaultValue}
          className={classes}
          disabled={disabled}
        />
        {rightSlot ? (
          <div className="absolute inset-y-0 right-0 inline-flex justify-center items-center pr-2">
            {rightSlot()}
          </div>
        ) : null}
        {leftSlot ? (
          <div className="absolute inset-y-0 left-0 inline-flex justify-center items-center pl-2">
            {leftSlot()}
          </div>
        ) : null}
      </div>
      {error ? (
        <p
          className="mt-2 text-xs text-red-500"
          id={props.id ? `${props.id}-error-description` : undefined}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
