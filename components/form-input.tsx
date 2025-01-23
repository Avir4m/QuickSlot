import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
    type?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export default function FormInput({ type, label, name, placeholder, required, className }: FormInputProps) {

    return (
        <>
            <Label htmlFor={name}>{label}</Label>
            <Input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                required={required} 
                className={className}
            />
        </>
    )
}