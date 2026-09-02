
import Hizmet from "@/features/feed/pages/Hizmet";

export default function page({ params })  {
  const { id } = params;
  return<Hizmet paramsId={id} />

};

