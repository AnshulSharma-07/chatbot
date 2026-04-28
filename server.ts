import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simulation of the Java Webhook Controller
  app.post("/webhook", (req, res) => {
    const { message } = req.body;

    console.log(`[SLF4J Logger] Incoming message: ${message}`);

    if (!message || message.trim() === "") {
        console.warn(`[SLF4J Logger] Validation failed: message is empty`);
        return res.status(400).json({ error: "Message cannot be null or empty" });
    }

    const input = message.trim().toLowerCase();
    let reply = "";

    // Mirroring Java ChatbotService logic
    if (input === "hi" || input === "hello") {
        reply = "Hello";
    } else if (input === "bye" || input === "goodbye") {
        reply = "Goodbye";
    } else {
        reply = "I didn’t understand that";
    }

    console.log(`[SLF4J Logger] Outgoing reply: ${reply}`);
    res.json({ reply });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
