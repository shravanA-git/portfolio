import type { Metadata } from "next";
import { Awards } from "@/components/sections/Awards";

export const metadata: Metadata = { title: "Awards" };

export default function AwardsPage() {
  return <Awards />;
}
