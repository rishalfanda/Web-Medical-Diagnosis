import { ChevronDown } from "lucide-react";

function SelectUser({ id, disabled, options, value, onChange, ...props }) {
  return (
    <div className="relative">
      <select
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`
          w-full
          text-sm
          px-3 py-2
          pr-10
          border border-gray-600
          rounded-lg
          bg-gray-900
          text-gray-100
          appearance-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition-all
          duration-200
          disabled:bg-gray-800
          disabled:text-gray-500
          disabled:cursor-not-allowed
          hover:border-gray-500
          ${disabled ? 'opacity-60' : ''}
        `}
        style={{
          fontSize: '1.4rem',
          padding: '0.8rem 1.2rem',
          paddingRight: '2.5rem',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        }}
        {...props}
      >
        {options.map((option) => (
          <option 
            value={option.value} 
            key={option.value}
            className="text-gray-100 bg-gray-900 py-2"
            style={{ fontSize: '1rem' }}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown 
          className={`w-4 h-4 transition-colors ${
            disabled ? 'text-gray-500' : 'text-gray-300'
          }`} 
        />
      </div>
    </div>
  );
}

export default SelectUser;