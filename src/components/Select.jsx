import classNames from "classnames";

const Select = (props) => {
  const {
    variant = "primary",
    dimension = "lg",
    type,
    children,
    error,
    onSelect,
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
      "px-6 py-3 text-base rounded-md": dimension === "xl",
    },
    props.className
  );

  const labelClasses = classNames(
    "block mt-2 text-sm font-medium text-gray-700",
    { "!mt-0   !text-black": variant === "modal" }
  );

  return (
    <div className="mt-7 lg:mt-7 xl:mt-8 relative">
      {label ? (
        <label htmlFor={props.id} className={labelClasses}>
          {label}
        </label>
      ) : null}
      <div className="mt-5 relative">
        <select
          type={type}
          {...otherProps}
          id={props.id}
          // onChange={onSelect}
          className={classes}
          disabled={disabled}
        >
          {children}
        </select>
      </div>
      {error ? (
        <p
          className="mt-1 text-xs text-red-500 absolute"
          id={props.id ? `${props.id}-error-description` : undefined}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export { Select };
