import { Controller } from "react-hook-form";

function InputNumber({
  labelTitle,
  labelStyle,
  containerStyle,
  readOnly,
  control,
  name,
  rules,
  defaultValue = "",
  placeholder,
}) {
  const updatedRules = {
    ...rules,
    validate: (value) => {
      if (!value || value >= 0) {
        return true; // Validation passed
      }
      return "Negative values not allowed";
    },
  };
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={`label-text text-base-content ${labelStyle}`}>
          {labelTitle}
        </span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={updatedRules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <input
              ref={ref}
              type="number"
              className={`input input-bordered w-full ${
                error ? "input-error" : ""
              }`}
              placeholder={placeholder}
              onChange={onChange}
              readOnly={readOnly}
              onBlur={onBlur}
              value={value || ""}
            />
            {error && (
              <span className="label-text-alt text-error">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
}

export default InputNumber;
