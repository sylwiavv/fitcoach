// entities/client/api.ts
import { supabase } from "../../shared/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Client } from "./types";

export const fetchClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase.from("clients").select("*");
  if (error) throw error;
  return data;
};

export const useClients = () => {
  return useQuery(["clients"], fetchClients, {
    staleTime: 5 * 60 * 1000, // cache 5 minut
  });
};
