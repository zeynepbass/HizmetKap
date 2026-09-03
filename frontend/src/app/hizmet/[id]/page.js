
import Service from "@/feautures/feed/pages/Service";

export default function page({ params })  {
  const { id } = params;
  return<Service paramsId={id} />

};

