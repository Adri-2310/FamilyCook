"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    router.push(`/recipe/shared?${params.toString()}`);
  };

  return (
    <Select value={sort} onValueChange={handleSort}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Trier par..." />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
