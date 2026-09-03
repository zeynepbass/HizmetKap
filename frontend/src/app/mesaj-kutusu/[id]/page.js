
import Chatroom from "@/feautures/feed/pages/Chatroom";

export default function page({ params }) {
  const { id } = params;

  return <Chatroom id={id} />;
}
