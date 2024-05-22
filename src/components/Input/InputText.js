import { Controller } from 'react-hook-form';

function InputText({ name, labelTitle, labelStyle, type, containerStyle, control, rules, readOnly = false }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={`form-control w-full ${containerStyle}`}>
          <label className="label">
            <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
          </label>
          <input
            type={type || "text"}
            value={value || ''}
            onChange={onChange}
            readOnly={readOnly}
            className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
          />
          {error && <span className="label-text-alt text-error">{error.message}</span>}
        </div>
      )}
    />
  );
}

export default InputText;
