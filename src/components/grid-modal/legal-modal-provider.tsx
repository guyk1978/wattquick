"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import type { LegalDocId, LegalDocument } from "@/lib/legal-types";

const LegalModal = dynamic(
  () =>
    import("@/components/grid-modal/legal-modal").then((mod) => ({
      default: mod.LegalModal,
    })),
  { ssr: true }
);

type LegalModalContextValue = {
  openLegal: (id: LegalDocId) => void;
  closeLegal: () => void;
  activeDoc: LegalDocId | null;
};

const LegalModalContext = createContext<LegalModalContextValue | null>(null);

type LegalModalProviderProps = {
  documents: Record<LegalDocId, LegalDocument>;
  initialDoc?: LegalDocId | null;
  children: ReactNode;
};

export function LegalModalProvider({
  documents,
  initialDoc = null,
  children,
}: LegalModalProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeDoc, setActiveDoc] = useState<LegalDocId | null>(initialDoc);

  const closeLegal = useCallback(() => {
    setActiveDoc(null);
    if (
      pathname?.startsWith("/privacy") ||
      pathname?.startsWith("/terms")
    ) {
      router.replace("/");
    }
  }, [pathname, router]);

  const openLegal = useCallback((id: LegalDocId) => {
    setActiveDoc(id);
  }, []);

  const value = useMemo(
    () => ({ openLegal, closeLegal, activeDoc }),
    [openLegal, closeLegal, activeDoc]
  );

  const document = activeDoc ? documents[activeDoc] : null;

  return (
    <LegalModalContext.Provider value={value}>
      {children}
      {document ? (
        <LegalModal open document={document} onClose={closeLegal} />
      ) : null}
    </LegalModalContext.Provider>
  );
}

export function useLegalModal(): LegalModalContextValue {
  const ctx = useContext(LegalModalContext);
  if (!ctx) {
    throw new Error("useLegalModal must be used within LegalModalProvider");
  }
  return ctx;
}
