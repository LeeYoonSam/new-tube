import { Suspense } from "react";
import { HydrateClient, trpc } from "../trpc/server";
import { PageClient } from "./client";

export default async function Home() {
  void trpc.hello.prefetch ({ text: "Albert" })
  
  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <PageClient />
      </Suspense>
    </HydrateClient>
  );
}
