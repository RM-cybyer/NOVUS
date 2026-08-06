import type { Metadata } from "next";
import { ChatView } from "@/components/domain/chat/chat-view";

export const metadata: Metadata = {
  title: "Novus",
  description:
    "Conversa con Novus: analiza tus finanzas, revisa tus metas y planifica tu agenda.",
};

/** Novus home. The conversational surface the sidebar points at. */
export default function HomePage() {
  return <ChatView />;
}
