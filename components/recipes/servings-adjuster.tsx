"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServingsAdjusterProps {
  currentServings: number;
  baseServings: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetServings: (value: number) => void;
}

export function ServingsAdjuster({
  currentServings,
  baseServings,
  onIncrement,
  onDecrement,
  onSetServings,
}: ServingsAdjusterProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-4">
      <p className="text-sm font-medium mb-3">
        Pour {currentServings} {currentServings === 1 ? "personne" : "personnes"}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDecrement}
          disabled={currentServings === 1}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <input
          type="number"
          min="1"
          value={currentServings}
          onChange={(e) => onSetServings(parseInt(e.target.value) || 1)}
          className="w-16 px-2 py-1 border rounded text-center"
        />
        <Button variant="outline" size="sm" onClick={onIncrement}>
          <Plus className="w-4 h-4" />
        </Button>
        {currentServings !== baseServings && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSetServings(baseServings)}
            className="ml-auto text-xs"
          >
            Réinitialiser ({baseServings})
          </Button>
        )}
      </div>
    </div>
  );
}
