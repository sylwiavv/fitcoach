import { supabase } from "../../shared/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import type { Clients } from "./types";

export const fetchClients = async (): Promise<Clients[]> => {
  const { data, error } = await supabase.from("Clients").select("*");
  if (error) throw new Error(error.message);
  return data || [];
};

export const useClients = () => {
  return useQuery({
    queryKey: ["Clients"],
    queryFn: fetchClients,
    staleTime: 5 * 60 * 1000,
  });
};
