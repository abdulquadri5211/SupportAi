import { useState, useEffect } from "react";

export function useDemo() {
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Determine if we are in demo mode from URL or local storage
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "true") {
      setIsDemo(true);
    }
  }, []);

  return { isDemo };
}
