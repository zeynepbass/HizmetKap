"use client";

import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";
import { Button } from "@/shared/components/atoms";

export function TalepSuccess({
  dialog,
  handleClose,
  handleClick,
  storedData,
}) {
  const router = useRouter();

  return (
    <div className="w-full justify-center mt-10 p-6 bg-white rounded shadow">

      <Snackbar
        open={dialog}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Başarıyla talep alındı!
        </Alert>
      </Snackbar>

      <p className="font-bold text-gray-600 text-left p-4">
        Talebini Aldık
      </p>

      <p className="text-gray-300 text-left pl-3">
        İstek aldığında e-postana bildirim gelicek.
      </p>

      <a
        href={`/hizmet/${storedData}`}
        className="font-bold hover:underline text-gray-600 p-4 underline"
      >
        Detaylara bak
      </a>

      <img
        src="/2769497.png"
        width="45%"
        height="30%"
        className="m-auto"
        alt=""
      />

      <div className="flex justify-center gap-1 p-5">

        <Button
          className="p-3 text-[rgb(237,203,206)] rounded-md cursor-pointer"
          onClick={handleClick}
        >
          Talebi iptal et
        </Button>

        <Button
          className="p-3 text-[rgb(237,203,206)] rounded-md cursor-pointer"
          onClick={() => router.push("/ana-sayfa")}
        >
          İşlerime git
        </Button>

      </div>
    </div>
  );
}