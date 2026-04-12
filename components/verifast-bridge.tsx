"use client";

import { useEffect } from "react";

export function VerifastBridge() {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.origin.includes("verifast.ai")) return;

      const data = event.data;
      const iframe = document.getElementById(
        "verifast-react-chatbot-iframe",
      ) as HTMLIFrameElement | null;
      if (!iframe) return;

      // Accept any message that carries width/height and resize the iframe.
      const h =
        typeof data?.height === "number"
          ? data.height
          : typeof data?.payload?.height === "number"
            ? data.payload.height
            : null;
      const w =
        typeof data?.width === "number"
          ? data.width
          : typeof data?.payload?.width === "number"
            ? data.payload.width
            : null;

      if (h !== null || w !== null) {
        const finalH = h ?? parseInt(iframe.style.height) ?? 75;
        const finalW = w ?? parseInt(iframe.style.width) ?? 75;
        iframe.style.height = `${finalH}px`;
        iframe.style.width = `${finalW}px`;
        iframe.style.borderRadius = finalH > 100 ? "12px" : "50%";
      }

      // Always ack so Verifast stops its retry loop.
      if (event.source) {
        (event.source as Window).postMessage(
          { type: "SET_DIMENSIONS_SUCCESS", success: true },
          event.origin,
        );
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
