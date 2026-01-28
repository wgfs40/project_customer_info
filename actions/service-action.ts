/**
 * Acciones del servidor para gestionar servicios
 * Proporciona funciones CRUD para crear, leer, actualizar y eliminar servicios
 */
"use server";

import { Service } from "@/types/service";
import { createClient } from "@/lib/supabase/server";

/**
 * Obtiene la lista completa de todos los servicios
 * @returns Objeto con array de servicios y mensaje de estado
 * @example
 * const { services, message } = await GetServices();
 */
export const GetServices = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("services").select("*");
  const services: Service[] = data as Service[];

  if (error) {
    return { services: [], message: "Error fetching services" };
  } else {
    return { services, message: "Services fetched successfully" };
  }
};

/**
 * Obtiene los últimos 3 servicios agregados
 * @returns Objeto con array de últimos servicios y mensaje de estado
 * @example
 * const { services, message } = await GetLatestServices();
 */
export const GetLatestServices = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);
  const services: Service[] = data as Service[];
  if (error) {
    return { services: [], message: "Error fetching latest services" };
  }
  return { services, message: "Latest services fetched successfully" };
};

/**
 * Crea un nuevo servicio
 * @param formData - Datos del formulario con campos: name, description, icon, color
 * @returns Objeto con mensaje de estado de la operación
 * @example
 * const formData = new FormData();
 * formData.append('name', 'Diseño Web');
 * const { message } = await CreateService(formData);
 */
export const CreateService = async (formData: FormData) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("services").insert({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    color: formData.get("color"),
  });
  if (error) {
    return { message: "Error creating service" };
  }
  return { message: "Service created successfully" };
};

/**
 * Actualiza un servicio existente
 * @param id - ID del servicio a actualizar
 * @param formData - Datos del formulario con campos: name, description, icon, color
 * @returns Objeto con mensaje de estado de la operación
 * @example
 * const formData = new FormData();
 * formData.append('name', 'Diseño Web Avanzado');
 * const { message } = await UpdateService('789', formData);
 */
export const UpdateService = async (id: string, formData: FormData) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .update({
      name: formData.get("name"),
      description: formData.get("description"),
      icon: formData.get("icon"),
      color: formData.get("color"),
    })
    .eq("id", id);
  if (error) {
    return { message: "Error updating service" };
  }
  return { message: "Service updated successfully" };
};

/**
 * Elimina un servicio
 * @param id - ID del servicio a eliminar
 * @returns Objeto con mensaje de estado de la operación
 * @example
 * const { message } = await DeleteService('789');
 */
export const DeleteService = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("services").delete().eq("id", id);
  if (error) {
    return { message: "Error deleting service" };
  }
  return { message: "Service deleted successfully" };
};
