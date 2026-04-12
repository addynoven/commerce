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
    const customerId = getSessionId();

    const settings = {
      websocketUrl: "https://p-ws-async.verifast.ai",
      botUrl: "https://bot.verifast.ai",
      currentPage: "aarshaveda.com/",
      selectedIndex: "aarshaveda.myshopify.com",
      indexSuggestions: [
        "Suggest me something",
        "What are your bestsellers?",
      ],
      headerImageUrl:
        "https://static.verifast.ai/bot_image_config_data/Expert%20%282%29%20%281%29.webp",
      headerImageHeight: 50,
      headerImageWidth: 50,
      iconUrl:
        "https://static.verifast.ai/bot_image_config_data/Expert%20%282%29%20%281%29.webp",
      introMessage: "Welcome to Aarshaveda. How can I help you today?",
      botName: "AI Expert",
      botSubText: "",
      customerId,
      primaryHex: "#809671",
      nudgeText: "Talk to our Expert",
      nudgeTextSize: "12px",
      nudgeMaxHeight: 0,
      nudgeMaxWidth: 0,
      nudgeVariant: "text_only",
      agentIconSize: "large",
      agentIconPosition: "right",
      iconSpaceFromSide: "30",
      iconSpaceFromBottom: "30",
      customerData: null,
      currentPageHref: "https://aarshaveda.com/",
      productTitle: "",
      vfCollectionTitle: "",
      vfPageType: "index",
      marketCode: "in",
      addToCart: true,
      botDisabled: false,
      carouselInsideCarousel: false,
      cartflow: "shop_front_add_to_cart",
      chatbotAbsoluteTop: false,
      chatbotUIDesign: "DEFAULT",
      enableWidgetSounds: "None",
      internalBotConfig: {},
      isVideoEnabled: true,
      nudge: true,
      nudgeAppearDelay: "5",
      nudgeDisappearDelay: "15",
      persistUtm: false,
      provider: "shopify",
      recordInteraction: false,
      similarProductReplace: false,
      socketConnectionRule: {
        connectOn: "onDialogOpen",
        onPageSendTime: 30,
      },
      speechRecognition: false,
      storeType: "default",
      textColor: "None",
      "verifast-config-pointer": "chatbot-config",
      zIndex: "9",
    };

    // Verifast expects the settings param to be double-encoded
    const encoded = encodeURIComponent(
      encodeURIComponent(JSON.stringify(settings)),
    );
    setSrc(`https://bot.verifast.ai/?verifastSettings=${encoded}`);
  }, []);

  if (!src) return null;

  return (
    <iframe
      id="verifast-react-chatbot-iframe"
      src={src}
      allow="microphone; camera"
      style={{
        position: "fixed",
        right: "30px",
        bottom: "30px",
        width: "75px",
        height: "75px",
        border: "none",
        zIndex: 9,
      }}
    />
  );
}
