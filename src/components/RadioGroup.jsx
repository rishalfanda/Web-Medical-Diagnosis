export const RadioGroup = ({ label, name, options, disabled, register, horizontal = false }) => (
  <div className="flex flex-col h-full">
    <label className="block text-sm font-medium mb-2 leading-tight">
      {label}:
    </label>

    <div className={horizontal ? "flex space-x-4" : "flex flex-col space-y-1"}>
      {options.map((opt) => (
        <label key={opt} className="flex items-center space-x-2">
          <input
            type="radio"
            value={opt}
            {...register(name)}
            disabled={disabled}
            className="form-radio text-blue-600"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  </div>
);
