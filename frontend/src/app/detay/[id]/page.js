
import Talep from "@/features/feed/pages/Talep"
export default function page({ params }) {
  const { id } = params;
  return <Talep id={id}/>
}

