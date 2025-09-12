"use client"

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const router = useRouter();

  return (
<ArrowBackIcon 
  className="cursor-pointer ml-4 text-[rgb(255,190,60)]"
  onClick={() => router.back()} 
  sx={{ fontSize: 35 }}
/>

  );
}
