
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../api/post.api";
import { toSlug } from "@/shared/helpers/toSlug";

export function useSidebar ()  {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [storedData, setStoredData] = useState(null);

  const {
    data: category = [],
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("kullanici") || "null"
    );

    setStoredData(data);
  }, []);

  const handleClick = (id) => {
    setActive(id);
  };

  const handleCategoryClick = (name) => {
    router.push(`/${toSlug(name)}`);
  };

  return {
    open,
    setOpen,
    active,
    storedData,
    category,
    handleClick,
    handleCategoryClick,
    isLoading,
  };
};

