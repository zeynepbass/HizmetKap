
import Chatroom from "@/features/feed/pages/Chatroom";

export default async function Page({ params }) {
  const { id } = params;

  return <Chatroom id={id} />;
}
