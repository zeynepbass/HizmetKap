"use client"

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const router = useRouter();

  return (
<ArrowBackIcon 
  className="cursor-pointer ml-4 text-amber-400"
  onClick={() => router.back()} 
  sx={{ fontSize: 35 }}
/>

  );
}
