import React from "react";
import { Controller } from "react-hook-form";

function FileInput({
  labelTitle,
  labelStyle,
  containerStyle,
  control,
  name,
  rules,
  defaultValue = [],
  placeholder,
  onChange
}) {

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
        rules={rules}
        render={({ field: { value, ref }, fieldState: { error } }) => (
          <>
            <input
              ref={ref}
              type="file"
              className={`file-input file-input-bordered file-input-sm w-full max-w-xs ${
                error ? "input-error" : ""
              }`}
              placeholder={placeholder}
              onChange={onChange}
            />
            {(error ) && (
              <span className="label-text-alt text-error mt-1">
                {error?.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
}

export default FileInput;
