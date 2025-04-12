import { useState } from 'react';

export function InputForm({
  type = 'text',
  name,
  label,
  required = false,
  disabled = false,
  error = null,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const hasError = error?.length > 0;

  return (
    <div className="w-full mb-6 ">
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          id={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value !== '')}
          className={`w-full p-2 pt-6 px-4 pb-2 border rounded-md focus:outline-none transition-all duration-200 
            ${hasError ? 'border-red-400 focus:ring-red-500 bg-red-50 text-red-600' : 'border-gray-300 focus:ring-blue-500 bg-blue-50'}
            focus:ring-2`}
        />

        <label
          htmlFor={name}
          className={`pointer-events-none absolute left-4 transition-all duration-150 px-1
            ${isFocused || value
              ? 'top-[6px] text-sm text-blue-500'
              : 'top-1/2 translate-y-[-50%] text-base text-gray-400 '
            } ${hasError ? 'text-red-600' : ''}`}
        >
          {label}
        </label>

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>

      {hasError && (
        <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-3 animate-fade-in">
          <h3 className="text-red-600 font-semibold mb-1">❌ {label} debe cumplir con:</h3>
          <ul className="text-red-500 list-disc list-inside text-sm space-y-1">
            {error.map((er, index) => (
              <li key={index}>{er}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
