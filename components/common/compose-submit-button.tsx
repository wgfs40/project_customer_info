"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface ComposeSubmitButtonProps {
  buttonText?: string;
  buttonTextPending?: string;
  className?: string;
}
const ComposeSubmitButton = ({
  buttonText,
  buttonTextPending,
  className,
}: ComposeSubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        disabled={pending}
        type="submit"
        className={`bg-accent-text text-white py-2 px-4 rounded-md ${
          className || ""
        }`}
      >
        {pending
          ? buttonTextPending || " (Enviando...)"
          : buttonText || "Registrar Contacto"}
      </Button>
    </div>
  );
};

export default ComposeSubmitButton;
