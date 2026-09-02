export function Input({
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    checked,
    className = "",
  }) {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        checked={checked}
        className={className}
      />
    );
  }