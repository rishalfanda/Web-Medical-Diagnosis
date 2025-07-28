import { ChevronDown } from "lucide-react";

function Select({ id, disabled, options, value, onChange, ...props }) {
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
          border border-gray-300
          rounded-md
          bg-white
          shadow-sm
          appearance-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition-all
          duration-200
          disabled:bg-gray-100
          disabled:text-gray-400
          disabled:cursor-not-allowed
          hover:border-gray-400
          ${disabled ? 'opacity-60' : ''}
        `}
        style={{
          fontSize: '1.4rem',
          padding: '0.8rem 1.2rem',
          paddingRight: '2.5rem',
          border: '1px solid var(--color-grey-300)',
          borderRadius: 'var(--border-radius-sm)',
          backgroundColor: 'var(--color-grey-0)',
          boxShadow: 'var(--shadow-sm)',
        }}
        {...props}
      >
        {options.map((option) => (
          <option 
            value={option.value} 
            key={option.value}
            className="text-gray-900 bg-white py-2"
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
            disabled ? 'text-gray-400' : 'text-gray-500'
          }`} 
        />
      </div>
    </div>
  );
}

export default Select;