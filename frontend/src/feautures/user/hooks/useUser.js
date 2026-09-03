
"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveRenovations } from "../api/tadilat.service";
import { getUsers } from "@/features/users/api/user.service";

export const useTadilat = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const tadilatQuery = useQuery({
    queryKey: ["active-tadilat"],
    queryFn: getActiveRenovations,
  });

  return {
    users: usersQuery.data ?? [],
    tadilat: tadilatQuery.data ?? [],

    isLoading: usersQuery.isLoading || tadilatQuery.isLoading,

    isError: usersQuery.isError || tadilatQuery.isError,

    usersError: usersQuery.error,
    tadilatError: tadilatQuery.error,
  };
};

