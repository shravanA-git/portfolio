import type { Metadata } from "next";
import { Leadership } from "@/components/sections/Leadership";

export const metadata: Metadata = { title: "Leadership" };

export default function LeadershipPage() {
  return <Leadership />;
}
