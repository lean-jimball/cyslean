import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const WHATSAPP_NUMBER = "527716612061";
const DEFAULT_MESSAGE = "Hola, me interesa cotizar un proyecto electrico. Me pueden ayudar?";

const messages = [
  "Necesitas una instalacion electrica?",
  "Cotizacion gratis en minutos",
  "Sistemas fotovoltaicos y mas",
];

function WhatsAppButtonContent() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000);
    const t2 = setTimeout(() => { setShowBubble(true); setPulse(true); }, 4000);
    const t3 = setTimeout(() => { setShowBubble(false); setPulse(false); }, 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (!showBubble) return;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showBubble]);

  const handleClick = () => {
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(DEFAULT_MESSAGE);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes wa-enter { from { opacity:0; transform:scale(0.5) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes wa-pulse { 0%,100% { box-shadow:0 0 0 0 rgba(37,211,102,0.5); } 50% { box-shadow:0 0 0 14px rgba(37,211,102,0); } }
        @keyframes bubble-in { from { opacity:0; transform:translateX(12px) scale(0.92); } to { opacity:1; transform:translateX(0) scale(1); } }
        @keyframes msg-fade { 0% { opacity:0; transform:translateY(4px); } 15% { opacity:1; transform:translateY(0); } 85% { opacity:1; } 100% { opacity:0; transform:translateY(-4px); } }
        .wa-btn { position:fixed !important; bottom:24px !important; right:16px !important; z-index:2147483647 !important; width:58px; height:58px; border-radius:50%; background:#25D366; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; animation:wa-enter 0.4s cubic-bezier(0.34,1.56,0.64,1) both; transition:transform 0.15s ease,background 0.15s ease; }
        .wa-btn:hover { background:#1ebe5d; transform:scale(1.08); }
        .wa-btn:active { transform:scale(0.95); }
        .wa-btn.pulsing { animation:wa-enter 0.4s cubic-bezier(0.34,1.56,0.64,1) both, wa-pulse 1.8s ease-in-out 0.4s 4; }
        .wa-bubble { position:fixed !important; bottom:90px !important; right:16px !important; z-index:2147483646 !important; background:#fff; border-radius:12px 12px 2px 12px; padding:10px 14px; max-width:220px; box-shadow:0 4px 20px rgba(0,0,0,0.13); animation:bubble-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both; border:1px solid rgba(0,0,0,0.07); }
        .wa-bubble::after { content:""; position:absolute; bottom:10px; right:-8px; width:0; height:0; border-top:8px solid transparent; border-bottom:0 solid transparent; border-left:8px solid #fff; }
        .wa-bubble-label { font-size:11px; font-weight:600; color:#25D366; margin-bottom:4px; text-transform:uppercase; font-family:system-ui,sans-serif; }
        .wa-bubble-msg { font-size:13px; color:#222; font-family:system-ui,sans-serif; line-height:1.4; animation:msg-fade 3s ease both; }
        .wa-close { position:absolute; top:4px; right:6px; background:none; border:none; cursor:pointer; font-size:14px; color:#aaa; }
      `}</style>
      {showBubble && (
        <div className="wa-bubble">
          <button className="wa-close" onClick={() => setShowBubble(false)}>x</button>
          <div className="wa-bubble-label">CYS Lean</div>
          <div className="wa-bubble-msg" key={msgIndex}>{messages[msgIndex]}</div>
        </div>
      )}
      <button className={"wa-btn" + (pulse ? " pulsing" : "")} onClick={handleClick} aria-label="WhatsApp">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M15 2C7.82 2 2 7.82 2 15c0 2.28.6 4.42 1.64 6.27L2 28l6.93-1.6A13 13 0 0015 28c7.18 0 13-5.82 13-13S22.18 2 15 2z" fill="white"/>
          <path d="M21.5 18.3c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.34z" fill="#25D366"/>
        </svg>
      </button>
    </>
  );
}

export default function WhatsAppButton() {
  return createPortal(<WhatsAppButtonContent />, document.body);
}
