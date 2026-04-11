"use client";

import { useEffect, useState } from "react";

function getSessionId() {
  let id = localStorage.getItem("vf_session");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("vf_session", id);
  }
  return id;
}

export function VerifastChat() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = getSessionId();

    const settings = {
      websocketUrl: "https://p-ws-async.verifast.ai",
      botUrl: "https://bot.verifast.ai",

      selectedIndex: "arshavedaa.myshopify.com",

      // Use Shopify domain so Verifast recognizes the parent
      currentPage: "arshavedaa.myshopify.com",
      currentPageHref: "https://arshavedaa.myshopify.com/",

      customerId: sessionId,

      botName: "Store Expert",
      introMessage: "Welcome to our store! How can I help you today?",

      indexSuggestions: [
        "Suggest me something",
        "What are your bestsellers?",
        "Track my Order",
      ],

      headerImageUrl:
        "https://storage.googleapis.com/cdn.asia.verifast.tech/bot_images_new/skin_care_female_agent.webp",

      iconUrl:
        "https://storage.googleapis.com/cdn.asia.verifast.tech/bot_images_new/skin_care_female_agent.webp",

      marketCode: "in",
      websocket: true,
      zIndex: "999999",
    };

    const encoded = encodeURIComponent(JSON.stringify(settings));
    setSrc(`https://bot.verifast.ai/?verifastSettings=${encoded}`);
  }, []);

  if (!src) return null;

  return (
    <iframe
      id="verifast-iframe"
      src={src}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "80px",
        height: "80px",
        border: "none",
        zIndex: 999999,
        borderRadius: "50%",
        overflow: "hidden",
        pointerEvents: "auto",
      }}
      allow="microphone; clipboard-write"
    />
  );
}
