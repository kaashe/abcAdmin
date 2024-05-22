import { Controller } from 'react-hook-form';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';

function SelectBox({ name, labelTitle, labelDescription, containerStyle, placeholder, labelStyle, options, control, rules, disabled = false }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={`inline-block ${containerStyle}`}>
          <label className={`label  ${labelStyle}`}>
            <div className="label-text">
              {labelTitle}
              {labelDescription && (
                <div className="tooltip tooltip-right" data-tip={labelDescription}>
                  <InformationCircleIcon className='w-4 h-4' />
                </div>
              )}
            </div>
          </label>

          <select
            className={`select select-bordered w-full ${error ? 'select-error' : ''}`}
            value={value}
            onChange={onChange}
            disabled={disabled}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options?.map((option, index) => (
              <option value={option.value || option.name} key={index}>
                {option.label || option.name}
              </option>
            ))}
          </select>
          {error && <span className="label-text-alt text-error">{error.message}</span>}
        </div>
      )}
    />
  );
}

export default SelectBox;
