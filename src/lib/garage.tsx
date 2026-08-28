import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

const KEY = 'bikeville.garage.v1';

interface GarageValue {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
}

const GarageContext = createContext<GarageValue | null>(null);

function read(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function GarageProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(read);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* storage unavailable — non fatal */
    }
  }, [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<GarageValue>(
    () => ({
      ids,
      has: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear,
      count: ids.length,
    }),
    [ids, toggle, remove, clear],
  );

  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}

export function useGarage(): GarageValue {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error('useGarage must be used inside <GarageProvider>');
  return ctx;
}
