import type { Award } from "@/lib/content";

export function AwardItem({ award }: { award: Award }) {
  return (
    <li className="flex flex-col gap-2 border-b border-border py-6 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <h3 className="text-display-md font-semibold text-foreground">
        {award.title}
      </h3>
      {award.detail && (
        <p className="text-body text-foreground-muted sm:max-w-[40ch] sm:text-right">
          {award.detail}
        </p>
      )}
    </li>
  );
}
