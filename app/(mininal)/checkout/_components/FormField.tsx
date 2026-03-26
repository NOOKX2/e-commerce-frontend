import React from 'react';
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';

type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function FormField({ name, label, type, placeholder, value, onChange }: FormFieldProps) {
  return (
    <div className='w-full'>
      <Label htmlFor={name} className='text-sm font-medium text-neutral-700'>{label}</Label>
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="mt-2 rounded-xl border-black/10 bg-white"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FormField
