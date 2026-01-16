import { Service } from "@/types/service";
import { createClient } from "@/lib/supabase/server";

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

// obtener los ultimos 3 servicios agregados
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

// crear un nuevo servicio
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

// actualizar un servicio
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

// eliminar un servicio
export const DeleteService = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("services").delete().eq("id", id);
  if (error) {
    return { message: "Error deleting service" };
  }
  return { message: "Service deleted successfully" };
};
