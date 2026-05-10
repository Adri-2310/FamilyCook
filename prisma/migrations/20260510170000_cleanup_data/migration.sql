-- Supprimer toutes les données existantes pour permettre le re-seeding
DELETE FROM "favorites";
DELETE FROM "recipe_tags";
DELETE FROM "steps";
DELETE FROM "ingredients";
DELETE FROM "recipes";
DELETE FROM "tags";
DELETE FROM "verifications";
DELETE FROM "sessions";
DELETE FROM "accounts";
DELETE FROM "users";