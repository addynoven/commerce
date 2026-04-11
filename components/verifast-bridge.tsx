"use client";

import { useEffect } from "react";

export function VerifastBridge() {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.origin.includes("verifast.ai")) return;

      const data = event.data;
      const iframe = document.getElementById("verifast-iframe") as HTMLIFrameElement | null;

      // Handle resize request from Verifast (fixes "Max retries reached")
      if (data?.type === "SET_DIMENSIONS" || data?.height) {
        if (iframe) {
          const h = data.height || 600;
          const w = data.width || 380;
          // Expand to full chat size or collapse back to icon
          if (h > 100) {
            iframe.style.height = `${h}px`;
            iframe.style.width = `${w}px`;
            iframe.style.borderRadius = "12px";
          } else {
            iframe.style.height = "80px";
            iframe.style.width = "80px";
            iframe.style.borderRadius = "50%";
          }
        }

        // IMPORTANT: Correct response that stops the retry loop
        if (event.source) {
          (event.source as Window).postMessage(
            {
              type: "SET_DIMENSIONS_SUCCESS",
              success: true,
            },
            event.origin,
          );
        }
      }

      // Fallback response for untyped messages
      if (!data?.type && event.source) {
        (event.source as Window).postMessage(
          { success: true },
          event.origin,
        );
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
