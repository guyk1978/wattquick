"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { LegalModal } from "@/components/grid-modal/legal-modal";
import type { LegalDocId, LegalDocument } from "@/lib/legal-types";

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
      <LegalModal
        open={document !== null}
        document={document}
        onClose={closeLegal}
      />
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
