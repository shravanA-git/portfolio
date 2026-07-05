import type { LeadershipItem as LeadershipItemData } from "@/lib/content";

export function LeadershipItem({ item }: { item: LeadershipItemData }) {
  return (
    <li className="flex flex-col gap-2 border-b border-border py-6 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <h3 className="text-display-md font-semibold text-foreground">
        {item.role}
      </h3>
      <p className="text-body text-foreground-muted sm:max-w-[40ch] sm:text-right">
        {item.detail}
      </p>
    </li>
  );
}
