"use client";
import { contactRegister } from "@/actions/contact-action";
import { useActionState, useRef } from "react";
import ComposeSubmitButton from "../common/compose-submit-button";
import FormError from "../common/form-error";
import { type FormState } from "@/validations/form-state";
import { toast } from "sonner";

const INITIAL_FORM_STATE: FormState = {
  success: false,
  message: "",
  data: {},
  errors: {},
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useActionState(
    contactRegister,
    INITIAL_FORM_STATE
  );

  const handleAction = async (formData: FormData) => {
    formAction(formData);
    formRef.current?.reset();
    formState.success && toast.success("¡Mensaje enviado con éxito!");
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-bl-full -mr-10 -mt-10"></div>
      <h2 className="contact-form-title">Contactanos</h2>
      <form action={handleAction} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label
            htmlFor="nombre"
            className="text-sm font-bold text-gray-700 ml-1"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="name"
            required
            defaultValue={formState.data?.name}
            className="w-full px-5 py-4 bg-gray-50 border-transparent focus:border-pink-600 focus:bg-white border-2 rounded-2xl transition-all outline-none"
          />
          <FormError error={formState.errors?.name} />
        </div>
        <div className="mb-5">
          <label
            htmlFor="correo"
            className="text-sm font-bold text-gray-700 ml-1"
          >
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="correo"
            defaultValue={formState.data?.email}
            className="w-full px-5 py-4 bg-gray-50 border-transparent focus:border-pink-600 focus:bg-white border-2 rounded-2xl transition-all outline-none"
          />
          <FormError error={formState.errors?.email} />
        </div>
        <div className="mb-8">
          <label
            htmlFor="mensaje"
            className="text-sm font-bold text-gray-700 ml-1"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="message"
            rows={6}
            required
            defaultValue={formState.data?.message}
            className="w-full px-5 py-4 bg-gray-50 border-transparent focus:border-pink-600 focus:bg-white border-2 rounded-2xl transition-all outline-none resize-none"
          ></textarea>
          <FormError error={formState.errors?.message} />
        </div>
        <div className="text-center">
          <ComposeSubmitButton />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
