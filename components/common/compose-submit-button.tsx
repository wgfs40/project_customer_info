"use client";
import { useFormStatus } from "react-dom";

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
      <button
        disabled={pending}
        type="submit"
        className={`bg-accent-text text-white py-2 px-4 rounded-md ${
          className || ""
        }`}
      >
        {pending
          ? buttonTextPending || " (Enviando...)"
          : buttonText || "Registrar Contacto"}
      </button>
    </div>
  );
};

export default ComposeSubmitButton;
