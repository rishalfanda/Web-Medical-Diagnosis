export const RadioGroup = ({ label, name, options, disabled, register }) => (
  <div>
    <label className="block text-sm mb-1">{label}:</label>
    <div className="space-y-1">
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
