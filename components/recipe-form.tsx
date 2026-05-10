"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Step {
  content: string;
}

interface RecipeFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    category: string;
    prepTime: number;
    cookTime: number;
    difficulty: string;
    baseServings: number;
    visibility: string;
    ingredients: Ingredient[];
    steps: Step[];
  };
  isEditing?: boolean;
}

const CATEGORIES = [
  { value: "APPETIZER", label: "Apéritif" },
  { value: "MAIN", label: "Plat principal" },
  { value: "DESSERT", label: "Dessert" },
  { value: "BREAKFAST", label: "Petit-déjeuner" },
  { value: "SAUCE", label: "Sauce" },
  { value: "BREAD", label: "Pain" },
  { value: "DRINK", label: "Boisson" },
  { value: "OTHER", label: "Autre" },
];

const DIFFICULTIES = [
  { value: "EASY", label: "Facile" },
  { value: "MEDIUM", label: "Moyen" },
  { value: "HARD", label: "Difficile" },
];

export function RecipeForm({ initialData, isEditing = false }: RecipeFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    coverImageUrl: initialData?.coverImageUrl || "",
    category: initialData?.category || "MAIN",
    prepTime: initialData?.prepTime || 0,
    cookTime: initialData?.cookTime || 0,
    difficulty: initialData?.difficulty || "EASY",
    baseServings: initialData?.baseServings || 4,
    visibility: initialData?.visibility || "PRIVATE",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients || [{ name: "", quantity: 0, unit: "" }]
  );

  const [steps, setSteps] = useState<Step[]>(
    initialData?.steps || [{ content: "" }]
  );

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "prepTime" || name === "cookTime" || name === "baseServings"
          ? parseInt(value)
          : value,
    }));
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: field === "quantity" ? parseFloat(value.toString()) : value,
    };
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { content: value };
    setSteps(newSteps);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, { content: "" }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ingredients: ingredients.filter((ing) => ing.name.trim()),
        steps: steps.filter((step) => step.content.trim()),
      };

      if (isEditing && initialData) {
        payload.id = initialData.id;
      }

      const url = isEditing ? "/api/recipes" : "/api/recipes";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const recipe = await response.json();
        router.push(`/recipe/my/show/${recipe.id}`);
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Champs principaux */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Informations de base</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Titre *</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ex: Pâtes Carbonara"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Décrivez votre recette..."
            className="w-full min-h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            URL image de couverture
          </label>
          <Input
            type="url"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleInputChange}
            placeholder="https://..."
          />
          {formData.coverImageUrl && (
            <img
              src={formData.coverImageUrl}
              alt="Aperçu"
              className="mt-2 h-32 w-full object-cover rounded"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Catégorie *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Difficulté *</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {DIFFICULTIES.map((diff) => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Temps préparation (min) *
            </label>
            <Input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Temps cuisson (min)
            </label>
            <Input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Portions *
            </label>
            <Input
              type="number"
              name="baseServings"
              value={formData.baseServings}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Visibilité *</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="PRIVATE">Privé</option>
            <option value="PUBLIC">Public</option>
          </select>
        </div>
      </Card>

      {/* Ingrédients */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Ingrédients</h2>
        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="text"
                placeholder="Nom de l'ingrédient"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Quantité"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                className="w-24"
                step="0.1"
              />
              <Input
                type="text"
                placeholder="Unité"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                className="w-24"
              />
              {ingredients.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeIngredient(index)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addIngredient}>
          + Ajouter ingrédient
        </Button>
      </Card>

      {/* Étapes */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Préparation</h2>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <textarea
                placeholder="Décrivez cette étape..."
                value={step.content}
                onChange={(e) => handleStepChange(index, e.target.value)}
                className="flex-1 min-h-16 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {steps.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeStep(index)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addStep}>
          + Ajouter étape
        </Button>
      </Card>

      {/* Boutons */}
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Sauvegarde..."
            : isEditing
              ? "Mettre à jour"
              : "Créer la recette"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
