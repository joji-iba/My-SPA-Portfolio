'use client';

import { SWRConfig } from 'swr';
import { fetchJson } from '../lib/fetchJson';

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
