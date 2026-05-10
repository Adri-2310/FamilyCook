"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "recent", label: "Plus récentes" },
  { value: "oldest", label: "Plus anciennes" },
  { value: "a-z", label: "A → Z" },
  { value: "popular", label: "Plus likées" },
];

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "recent";

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    router.push(`/recipe/shared?${params.toString()}`);
  };

  return (
    <select
      value={sort}
      onChange={handleSort}
      className="h-10 px-4 py-2 bg-background border border-muted rounded-lg hover:border-primary hover:bg-primary/5 text-sm font-medium transition cursor-pointer"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
