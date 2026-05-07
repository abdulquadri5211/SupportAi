import { useState, useEffect } from "react";
import { auth, db } from "@/services/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export interface WorkspaceData {
  id: string;
  name: string;
  businessType: string;
  ownerId: string;
  createdAt: string;
  onboarded?: boolean;
}

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    let unsubscribe: () => void;

    const fetchUserAndWorkspace = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data()?.workspaceId) {
          const workspaceId = userDoc.data().workspaceId;
          
          unsubscribe = onSnapshot(doc(db, "workspaces", workspaceId), (doc) => {
            if (doc.exists()) {
              setWorkspace({ id: doc.id, ...doc.data() } as WorkspaceData);
            }
            setLoading(false);
          }, (err) => {
            console.error("Workspace stream error:", err);
            setError(err.message);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching workspace metadata:", err);
        setError("Failed to load workspace configuration.");
        setLoading(false);
      }
    };

    fetchUserAndWorkspace();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { workspace, loading, error, isDemo: !auth.currentUser };
}
