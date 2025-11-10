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
