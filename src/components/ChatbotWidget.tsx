import { useEffect, useRef, useState } from "react";
import "./ChatbotWidget.css";
import { useTranslation } from "react-i18next";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    if (!loading) {
      setLoadingDots("");
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setLoadingDots(".".repeat((i % 3) + 1));
      i++;
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    const userMsg = msg;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("https://chatbot-omom.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Błąd połączenia 😢" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chatbot-fab" onClick={() => setOpen(!open)}>
        Chatbot 💬
      </div>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-message bot">{loadingDots}</div>}
            <div ref={bottomRef} />
          </div>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("type_message")}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? loadingDots : t("send")}
          </button>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
