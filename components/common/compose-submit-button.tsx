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
        className={`w-full py-5 rounded-2xl font-bold text-white text-lg shadow-xl shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 ${
          className || ""
        }`}
        style={{ backgroundColor: "#E6007E" }}
      >
        {pending
          ? buttonTextPending || " (Enviando...)"
          : buttonText || "Registrar Contacto"}
      </Button>
    </div>
  );
};

export default ComposeSubmitButton;
