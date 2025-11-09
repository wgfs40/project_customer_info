"use client";
import { useFormStatus } from "react-dom";

const ComposeSubmitButton = () => {
    const {pending} = useFormStatus();
  return <div>
    <button disabled={pending} type="submit"  className="bg-accent-text text-white py-2 px-4 rounded-md">      
        {pending ? " (Enviando...)" : "Registrar Contacto"}
    </button>
  </div>;
};

export default ComposeSubmitButton;
