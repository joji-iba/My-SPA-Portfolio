'use client';

import { SWRConfig } from 'swr';

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
