import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?:  (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function FormField({name, label, type, placeholder, value, onChange}: FormFieldProps) {
  return (
    <div className='w-full'>
      <Label htmlFor={name} className='font-semibold'>{label}</Label>
        <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="mt-2"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FormField
