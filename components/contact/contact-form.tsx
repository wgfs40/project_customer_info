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
    <div className="background-contact-form">
      <h2 className="contact-form-title">Contactanos</h2>
      <form action={handleAction} className="space-y-6">
        <div className="mb-5">
          <label htmlFor="nombre" className="label-contact-form">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="name"
            required
            defaultValue={formState.data?.name}
            className="input-contact-form"
          />
          <FormError error={formState.errors?.name} />
        </div>
        <div className="mb-5">
          <label htmlFor="correo" className="label-contact-form">
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="correo"
            defaultValue={formState.data?.email}
            className="input-contact-form"
          />
          <FormError error={formState.errors?.email} />
        </div>
        <div className="mb-8">
          <label htmlFor="mensaje" className="label-contact-form">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="message"
            rows={6}
            required
            defaultValue={formState.data?.message}
            className="input-contact-form resize-none"
          ></textarea>
          <FormError error={formState.errors?.message} />
        </div>

        {/* Botón de Envío usa ORANGE_COLOR como color de acción */}
        <div className="text-center">
          <ComposeSubmitButton />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
