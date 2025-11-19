import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

function FormField({name, label, type, placeholder}: FormFieldProps) {
  return (
    <div className='w-full'>
      <Label htmlFor={name} className='font-semibold'>{label}</Label>
        <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="mt-2"
      />
    </div>
  )
}

export default FormField
