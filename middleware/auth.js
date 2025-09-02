import jwt from "jsonwebtoken";
import User from "../models/user.js";

export function requireAuth(req, res, next) {
  try {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Missing token" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export async function requireAdmin(req, res, next) {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    const u = await User.findById(req.user.id).lean();
    if (!u || u.role !== "admin") return res.status(403).json({ message: "Admin only" });
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
