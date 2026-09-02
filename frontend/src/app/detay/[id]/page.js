
import Request from "@/features/feed/pages/Request"
export default function page({ params }) {
  const { id } = params;
  return <Request id={id}/>
}

