
import Detay from "@/features/feed/pages/Detay";

export default function page({ params })  {
  const { id } = params;
  return<Detay paramsId={id} />

};

