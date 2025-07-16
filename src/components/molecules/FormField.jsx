import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  className,
  children,
  ...props 
}) => {
  const renderInput = () => {
    if (type === "textarea") {
      return <Textarea error={error} {...props} />;
    }
    
    if (type === "select") {
      return (
        <Select error={error} {...props}>
          {children}
        </Select>
      );
    }
    
    return <Input type={type} error={error} {...props} />;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      {renderInput()}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;