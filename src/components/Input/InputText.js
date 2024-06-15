import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
function InputText({ name, labelTitle, labelStyle, type, containerStyle, control, rules, readOnly = false }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

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
          <div className="relative">
            <input
              type={showPassword ? "text" : type || "text"}
              value={value || ''}
              onChange={onChange}
              readOnly={readOnly}
              className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
            />
            {type === "password" && (
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              >
                  {showPassword ? <BiHide className='h-6 w-6'/> : <BiShow className='h-6 w-6'/>}
              </span>
            )}
          </div>
          {error && <span className="label-text-alt text-error m-1">{error.message}</span>}
        </div>
      )}
    />
  );
}

export default InputText;