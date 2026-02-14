"use client";
import { contactRegister } from "@/actions/contact-action";
import { useActionState, useRef, useTransition } from "react";
import ComposeSubmitButton from "../common/compose-submit-button";
import FormError from "../common/form-error";
import { type FormState } from "@/validations/form-state";
import { toast } from "sonner";
import { getCaptchaToken } from "@/actions/recapcha-action";

const INITIAL_FORM_STATE: FormState = {
  success: false,
  message: "",
  token: "",
  data: {},
  errors: {},
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const regAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const token = await getCaptchaToken();
    if (!token) {
      toast.error("Error al obtener el token de reCAPTCHA. Por favor, inténtalo de nuevo.");
      return prevState;
    }
    return contactRegister(prevState, formData, token);
  };

  const [formState, formAction] = useActionState(regAction, INITIAL_FORM_STATE);

  const handleAction = async (formData: FormData) => {
    const token = await getCaptchaToken();
    if (!token) {
      toast.error("Error al obtener el token de reCAPTCHA. Por favor, inténtalo de nuevo.");
      return;
    }
    startTransition(() => {
      formAction(formData);
    });
    toast.success("¡Mensaje enviado con éxito!");
    console.log("Form State:", formState);
    formRef.current?.reset();
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-bl-full -mr-10 -mt-10"></div>
      <h2 className="contact-form-title">Contactanos</h2>
      <form action={handleAction} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label htmlFor="nombre" className="text-sm font-bold text-gray-700 ml-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="name"
            required
            defaultValue={formState?.data?.name}
            className="w-full px-5 py-4 bg-gray-50 border-transparent focus:border-orange-600 focus:bg-white border-2 rounded-2xl transition-all outline-none"
          />
          <FormError error={formState?.errors?.name} />
        </div>
        <div className="mb-5">
          <label htmlFor="correo" className="text-sm font-bold text-gray-700 ml-1">
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="correo"
            defaultValue={formState?.data?.email}
            className="w-full px-5 py-4 bg-gray-50 border-transparent focus:border-orange-600 focus:bg-white border-2 rounded-2xl transition-all outline-none"
          />
          <FormError error={formState?.errors?.email} />
        </div>
        <div className="mb-8">
          <label htmlFor="mensaje" className="text-sm font-bold text-gray-700 ml-1">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="message"
            rows={6}
            required
            defaultValue={formState?.data?.message}
            className="w-full px-5 py-4 bg-gray-50 border-transparent focus:border-orange-600 focus:bg-white border-2 rounded-2xl transition-all outline-none resize-none"
          ></textarea>
          <FormError error={formState?.errors?.message} />
        </div>
        <div className="text-center">
          <ComposeSubmitButton isPending={isPending} />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
