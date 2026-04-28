import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Video, MoreVertical, CheckCheck, ArrowLeft, Paperclip, Smile, Terminal, Book, Box, Code2, Cpu, Globe, ArrowRight, Layers } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Welcome to the WhatsApp Bot Simulator!", sender: "bot", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch("/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await response.json();
      
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || data.error || "Error connecting to service",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-4 lg:p-8 overflow-hidden flex flex-col">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-pulse"></span>
            WhatsApp Chatbot API Engine <span className="text-slate-500 font-normal text-sm ml-2 px-2 py-0.5 bg-slate-900 rounded border border-slate-800">v1.2.0-stable</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Java Spring Boot • Multi-layer Architecture Webhook</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3 flex-1 md:flex-none">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest whitespace-nowrap">Service Health</span>
            <div className="h-1.5 w-full md:w-32 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-full bg-emerald-500"
              ></motion.div>
            </div>
          </div>
          <div className="bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/5">
            ONLINE
          </div>
        </div>
      </header>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 grid-rows-6 gap-6 flex-grow overflow-auto lg:overflow-hidden pb-4 lg:pb-0">
        
        {/* Project Structure Card */}
        <div className="col-span-12 lg:col-span-3 row-span-4 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm self-stretch overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em]">File Structure</h3>
            <Layers className="w-4 h-4 text-slate-600" />
          </div>
          <div className="font-mono text-sm space-y-3 overflow-y-auto flex-grow scrollbar-hide">
            <div className="flex items-center gap-2 text-emerald-500/80">
              <span className="text-xs opacity-50">📂</span> src/main/java
            </div>
            <div className="pl-4 text-slate-400 flex items-center gap-2">
              <span className="text-xs opacity-50">📂</span> com.example.whatsapp
            </div>
            <div className="pl-8 flex items-center gap-2 text-slate-300">
              <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
              <span className="text-xs opacity-50">📂</span> controller
            </div>
            <div className="pl-12 text-slate-400 text-xs">📄 WebhookController.java</div>
            <div className="pl-8 flex items-center gap-2 text-slate-300">
              <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
              <span className="text-xs opacity-50">📂</span> service
            </div>
            <div className="pl-12 text-slate-400 text-xs">📄 ChatbotService.java</div>
            <div className="pl-8 flex items-center gap-2 text-slate-300">
              <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
              <span className="text-xs opacity-50">📂</span> model
            </div>
            <div className="pl-12 text-slate-400 text-xs italic opacity-60">MessageRequest.java</div>
            <div className="pl-12 text-slate-400 text-xs italic opacity-60">MessageResponse.java</div>
            <div className="pl-4 text-emerald-500/80 mt-4 flex items-center gap-2">
              <span className="text-xs opacity-50">📂</span> resources
            </div>
            <div className="pl-8 text-slate-400 text-xs">📄 application.properties</div>
            <div className="text-emerald-500/80 mt-6 flex items-center gap-2 p-2 bg-emerald-500/5 rounded border border-emerald-500/10">
              <Box className="w-4 h-4" /> pom.xml
            </div>
          </div>
        </div>

        {/* Simulator Card (Center Chat) */}
        <div className="col-span-12 lg:col-span-6 row-span-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-slate-800/40 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/40"></div>
              </div>
              <div className="h-4 w-px bg-slate-700 mx-2"></div>
              <span className="text-xs text-white font-semibold flex items-center gap-2 lowercase">
                <Terminal className="w-3 h-3 text-emerald-400" />
                simulator.sandbox.io
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <Video className="w-4 h-4 cursor-not-allowed opacity-30" />
              <Phone className="w-4 h-4 cursor-not-allowed opacity-30" />
              <MoreVertical className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-grow flex flex-col bg-slate-950/50">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scrollbar-hide">
              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`max-w-[80%] p-3 rounded-2xl text-sm relative border ${
                      m.sender === "user" 
                        ? "bg-emerald-600/10 border-emerald-500/20 text-emerald-100 self-end rounded-tr-none" 
                        : "bg-slate-900 border-slate-800 text-slate-200 self-start rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="mb-2 pr-12 leading-relaxed">{m.text}</p>
                    <div className={`flex items-center gap-1.5 float-right opacity-40 text-[9px] font-mono mt-1 ${m.sender === "user" ? "text-emerald-300" : ""}`}>
                      <span>{m.timestamp}</span>
                      {m.sender === "user" && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="self-start px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-[10px] text-slate-500 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                  API processing request...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 translate-z-0">
              <div className="flex items-center gap-3 max-w-4xl mx-auto">
                <div className="flex-grow bg-slate-950 border border-slate-800 rounded-xl flex items-center px-4 py-3 shadow-inner group transition-all focus-within:border-emerald-500/50">
                  <Smile className="w-5 h-5 text-slate-600 group-hover:text-emerald-500/50 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Send message to webhook..."
                    className="flex-grow bg-transparent outline-none text-sm px-3 text-white placeholder-slate-700"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Paperclip className="w-5 h-5 text-slate-600 rotate-45 cursor-pointer hover:text-emerald-500/50 transition-colors" />
                </div>
                <button 
                  onClick={handleSend}
                  className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* API Specs Card */}
        <div className="col-span-12 lg:col-span-3 row-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <h3 className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-6">API Endpoint</h3>
          <div className="space-y-6 flex-grow">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-wider">Method & Resource</div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.05)]">POST</span>
                <span className="text-xs font-mono text-slate-300">/api/v1/webhook</span>
              </div>
            </div>
            <div className="h-px bg-slate-800 w-full"></div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-3 tracking-wider">Request Model</div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400 group relative">
                <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <Terminal className="w-3 h-3 text-emerald-400" />
                </div>
                {"{"}
                <br />
                &nbsp;&nbsp;<span className="text-emerald-400">"message"</span>: <span className="text-slate-300">"input_string"</span>
                <br />
                {"}"}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3 text-slate-500">
            <Globe className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-semibold">CORS: Enabled</span>
          </div>
        </div>

        {/* Live Logs Card */}
        <div className="col-span-12 lg:col-span-5 row-span-2 bg-slate-950/60 border border-slate-800 rounded-2xl p-5 font-mono text-[10px] relative overflow-hidden group">
          <div className="absolute top-4 right-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[9px] text-emerald-500 uppercase font-bold tracking-widest">Live Logger (SLF4J)</span>
          </div>
          <div className="space-y-2 opacity-70 group-hover:opacity-100 transition-opacity flex flex-col h-full overflow-hidden">
             <div className="mt-6 flex-grow overflow-y-auto space-y-1.5 scrollbar-hide">
                <div className="text-slate-600">[{new Date().toLocaleTimeString()}] INFO c.e.w.c.WebhookController - Engine initialized</div>
                {messages.map((m, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <div className="text-slate-600">[{m.timestamp}] INFO c.e.w.c.WebhookController - {m.sender === "user" ? "Incoming" : "Outgoing"}: {`{ text: "${m.text.substring(0, 20)}${m.text.length > 20 ? '...' : ''}" }`}</div>
                    {m.sender === "bot" && (
                       <div className="text-emerald-500/40">[{m.timestamp}] DEBUG c.e.w.s.ChatbotService - Logic executed successfully</div>
                    )}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="col-span-12 lg:col-span-4 row-span-2 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-emerald-500/20 transition-colors">
               <div className="text-lg font-bold text-emerald-50 text-white leading-tight">Java 17</div>
               <div className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Backend Target</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-emerald-500/20 transition-colors">
               <div className="text-lg font-bold text-emerald-50 text-white leading-tight">Spring 3.2</div>
               <div className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Framework</div>
            </div>
          </div>
        </div>

        {/* Swagger Badge */}
        <div className="col-span-12 lg:col-span-3 row-span-3 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:border-emerald-500/40 transition-all">
           <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.05)]">
             <Book className="w-7 h-7 text-emerald-500" />
           </div>
           <h4 className="text-white font-bold text-base">OpenAPI Documentation</h4>
           <p className="text-slate-500 text-[11px] mt-2 max-w-xs uppercase tracking-tighter">Swagger interface is enabled for real-time exploratory testing.</p>
           <div className="mt-5 text-[10px] font-mono text-emerald-400 bg-emerald-400/5 px-4 py-1.5 rounded-full border border-emerald-400/20 flex items-center gap-2">
             /swagger-ui.html <ArrowRight className="w-3 h-3" />
           </div>
        </div>

      </div>

      {/* Footer Info */}
      <footer className="mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 gap-4 border-t border-slate-900 pt-6">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3" />
            <span>Architecture: <strong className="text-slate-400 ml-1">CLEAN / SOLID</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Box className="w-3 h-3" />
            <span>Persistence: <strong className="text-slate-400 ml-1">H2 (In-Memory)</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>Latency: <strong className="text-emerald-500 ml-1">12ms</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-1 bg-slate-900 rounded-full border border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="font-bold text-slate-300">CORE SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
