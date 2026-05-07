import { auth, db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";

export function useActivityLogger() {
  const logAction = async (action: string, details: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const workspaceId = userDoc.exists() ? userDoc.data()?.workspaceId : "unknown";

      await addDoc(collection(db, "activity_logs"), {
        userId: user.uid,
        userEmail: user.email,
        workspaceId,
        action,
        details,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  };

  return { logAction };
}
