"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) {
        params.set("search", value);
        params.set("page", "1");
      } else {
        params.delete("search");
        params.set("page", "1");
      }
      router.push(`/recipe/shared?${params.toString()}`);
    },
    [searchParams, router]
  );

  const handleClear = () => {
    setQuery("");
    handleSearch("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
      <Input
        placeholder="Chercher une recette..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => handleSearch(query)}
        className="pl-10 pr-10"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(query);
          }
        }}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
