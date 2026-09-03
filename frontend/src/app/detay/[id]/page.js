
import Request from "@/feautures/feed/pages/Request"
export default function page({ params }) {
  const { id } = params;
  return <Request id={id}/>
}

