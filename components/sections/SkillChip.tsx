export function SkillChip({ label }: { label: string }) {
  return (
    <li className="flex min-h-11 items-center rounded-full border border-border bg-surface px-4 font-mono text-label uppercase tracking-[0.08em] text-foreground transition-[border-color,box-shadow] duration-fast ease-out-expo hover:border-accent hover:shadow-[0_0_16px_var(--color-glow)]">
      {label}
    </li>
  );
}
