export enum UserRole {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
}

export enum TicketStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

export enum TicketPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface Workspace {
  id: string;
  name: string;
  businessType: string;
  createdAt: string;
  ownerId: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  workspaceId: string;
  createdAt: string;
}

export interface ChatbotConfig {
  id: string;
  workspaceId: string;
  name: string;
  personality: string;
  tone: "friendly" | "professional" | "aggressive" | "minimal";
  welcomeMessage: string;
  colors: {
    primary: string;
    secondary: string;
  };
  avatarUrl?: string;
  position: "right" | "left";
  updatedAt: string;
}

export interface Ticket {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  createdBy: string;
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  workspaceId: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: string;
}
