import React, { useState } from 'react';
import './style.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

function Input({ label, state, setState, placeholder, type, showPasswordToggle }) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='input-wrapper mb-[0.5rem]'>
      <p className='label-input capitalize text-[1rem]'>{label}</p>
      <div className='relative'>
        <input required
          className='custom-input border-b-2 w-[100%] px-[0rem] py-[0.5rem] font-[1rem] opacity-[0.8]'
          type={type === 'password' && showPassword ? 'text' : type}
          value={state}
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
        />
        {type === 'password' && showPasswordToggle && (
          <button
            type='button'
            className='absolute right-0 top-1/2 transform -translate-y-1/2 px-2'
            onClick={handlePasswordToggle}
          >
            {showPassword ? (
              <EyeSlashIcon className='w-5 h-5 text-gray-500' />
            ) : (
              <EyeIcon className='w-5 h-5 text-gray-500' />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
