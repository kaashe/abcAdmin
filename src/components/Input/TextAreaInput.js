import { Controller } from 'react-hook-form';

function TextAreaInput({ labelTitle, labelStyle, containerStyle, control, name, rules,readOnly, defaultValue = "", placeholder }) {
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={`label-text text-base-content ${labelStyle}`}>{labelTitle}</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
          <>
            <textarea
              ref={ref}
              name={name}
              className={`textarea textarea-bordered w-full ${error ? 'textarea-error' : ''}`}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              readOnly={readOnly}
              value={value || ''}
            ></textarea>
            {error && <span className="label-text-alt text-error">{error.message}</span>}
          </>
        )}
      />
    </div>
  );
}

export default TextAreaInput;
