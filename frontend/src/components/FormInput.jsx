export const FormInput = ({
  name,
  label,
  onChange,
  value,
  required,
  type,
  minLength,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>
      <input
        className="border rounded p-2"
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        type={type || "text"}
        minLength={minLength}
        placeholder={placeholder}
      />
    </div>
  );
};
