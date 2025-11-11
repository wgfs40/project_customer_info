"use client";
import { contactRegister } from "@/actions/contact-action";
import { useActionState, useRef } from "react";
import ComposeSubmitButton from "../common/compose-submit-button";
import { type FormState } from "@/validations/contact-validation";
import FormError from "../common/form-error";

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
  return (
    <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl border-t-8 border-orange-500">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-principal-text">
        Contactanos
      </h2>
      <form
        action={async (formData: FormData) => {
          formAction(formData);
          formRef.current?.reset();
        }}
        className="space-y-6"
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block text-gray-700 font-medium mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="name"
            required
            defaultValue={formState.data?.name}
            className={`w-full p-3 border border-gray-300 rounded-xl  focus:ring-1 focus:border-accent-text focus:ring-accent-text transition duration-200`}
          />
          <FormError error={formState.errors?.name} />
        </div>
        <div className="mb-5">
          <label
            htmlFor="correo"
            className="block text-gray-700 font-medium mb-2"
          >
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="correo"
            defaultValue={formState.data?.email}
            className={`w-full p-3 border  border-gray-300 rounded-xl  focus:border-accent-text focus:ring-accent-text transition duration-200`}
          />
          <FormError error={formState.errors?.email} />
        </div>
        <div className="mb-8">
          <label
            htmlFor="mensaje"
            className="block text-gray-700 font-medium mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="message"
            rows={6}
            required
            defaultValue={formState.data?.message}
            className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-1 focus:border-accent-text focus:ring-accent-text transition duration-200 resize-none`}
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
