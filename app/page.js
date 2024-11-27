'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function Home() {
  const ClientComponent = dynamic(
    () => import("./components/Cake"),
    { ssr: false }
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponent />
    </Suspense>
  );
}
