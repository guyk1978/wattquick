"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CalculatorLaunchModal } from "@/components/calculator/calculator-launch-modal";
import type { CalculatorId } from "@/lib/calculators";
import type { BlogPost } from "@/lib/blog/posts";
import {
  clearToolLaunchContext,
  setToolLaunchContext,
  type ToolLaunchContext,
} from "@/lib/content-tool-link";

interface BlogIndexToolLaunchContextValue {
  openToolForPost: (post: BlogPost) => void;
}

const BlogIndexToolLaunchCtx =
  createContext<BlogIndexToolLaunchContextValue | null>(null);

export function useBlogIndexToolLaunch(): BlogIndexToolLaunchContextValue {
  const ctx = useContext(BlogIndexToolLaunchCtx);
  if (!ctx) {
    throw new Error(
      "useBlogIndexToolLaunch must be used within BlogIndexToolLaunch"
    );
  }
  return ctx;
}

export function BlogIndexToolLaunch({ children }: { children: ReactNode }) {
  const [activeToolId, setActiveToolId] = useState<CalculatorId | null>(null);
  const [launchCtx, setLaunchCtx] = useState<ToolLaunchContext | null>(null);

  const openToolForPost = useCallback((post: BlogPost) => {
    const ctx: ToolLaunchContext = {
      articleSlug: post.slug,
      articleTitle: post.title,
      toolId: post.relatedToolId,
    };
    setToolLaunchContext(ctx);
    setLaunchCtx(ctx);
    setActiveToolId(post.relatedToolId);
  }, []);

  const closeModal = useCallback(() => {
    setActiveToolId(null);
    setLaunchCtx(null);
    clearToolLaunchContext();
  }, []);

  const value = useMemo(() => ({ openToolForPost }), [openToolForPost]);

  return (
    <BlogIndexToolLaunchCtx.Provider value={value}>
      {children}
      <CalculatorLaunchModal
        calculatorId={activeToolId}
        onClose={closeModal}
        launchContext={launchCtx}
      />
    </BlogIndexToolLaunchCtx.Provider>
  );
}
