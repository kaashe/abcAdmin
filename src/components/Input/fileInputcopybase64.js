import { Controller } from "react-hook-form";

function FileInput33333333({
  labelTitle,
  labelStyle,
  containerStyle,
  control,
  name,
  rules,
  defaultValue = [],
  placeholder,
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
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <input
              ref={ref}
              type="file"
              className={`file-input file-input-bordered file-input-sm w-full max-w-xs ${
                error ? "input-error" : ""
              }`}
              placeholder={placeholder}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const filePromises = files.map((file) => {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve({ file, base64: reader.result }); // Include file object and Base64 data
                  });
                });
                Promise.all(filePromises).then((filesData) => {
                  const newFiles = filesData.map((data) => data); // Include file object and Base64 data
                  onChange(newFiles.concat(value));
                });
              }}
              onBlur={onBlur}
              multiple
            />
            {error && (
              <span className="label-text-alt text-error">{error.message}</span>
            )}
            {/* Check if files are available */}
           
          </>
        )}
      />
    </div>
  );
}

export default FileInput33333333;
