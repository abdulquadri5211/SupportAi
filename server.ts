import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "SupportPilot AI API is running" });
  });

  // Activity Logs
  app.post("/api/logs", async (req, res) => {
    const { userId, workspaceId, action, details } = req.body;
    console.log(`[LOG] ${new Date().toISOString()} - ${workspaceId} - ${userId}: ${action} (${details})`);
    // In production, save to Firestore
    res.json({ success: true });
  });

  // Email API with Resend
  app.post("/api/email/send", async (req, res) => {
    const { to, subject, html } = req.body;
    const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.warn("Resend API key missing. Email not sent.");
      return res.json({ success: false, error: "Configuration missing" });
    }

    try {
      // Mocking Resend call for now to avoid crashing without key
      console.log(`[EMAIL] Sending to ${to}: ${subject}`);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Email failed" });
    }
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
