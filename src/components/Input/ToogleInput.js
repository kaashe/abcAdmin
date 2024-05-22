import { Controller } from "react-hook-form";

function ToggleInput({ control, name, labelTitle, labelStyle, containerStyle, defaultValue }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref } }) => (
        <div className={`form-control w-full ${containerStyle}`}>
          <label className="label cursor-pointer">
            <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            <input
              ref={ref}
              type="checkbox"
              className="toggle"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          </label>
        </div>
      )}
    />
  );
}

export default ToggleInput;
