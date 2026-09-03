
"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateDurum } from "../api";

export const useTadilat = (initialItems = []) => {
  const [itemsAktif, setItemsAktif] = useState(initialItems);
  const [showText, setShowText] = useState({});

  useEffect(() => {
    const initialState = {};

    itemsAktif.forEach((item) => {
      initialState[item._id] = item.durum === "aktif";
    });

    setShowText(initialState);
  }, [itemsAktif]);

  const updateDurumMutation = useMutation({
    mutationFn: ({ id, show }) =>
      updateDurum(id, show, false),

    onSuccess: (result, variables) => {
      const { id } = variables;

      setShowText((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      setItemsAktif((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                durum: result.newDurum,
              }
            : item
        )
      );
    },
  });

  const handleSubmit = (e, id) => {
    e.preventDefault();

    updateDurumMutation.mutate({
      id,
      show: showText[id],
    });
  };

  return {
    itemsAktif,
    showText,
    handleSubmit,
    isUpdating: updateDurumMutation.isPending,
  };
};

