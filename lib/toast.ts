import { toast } from "sonner";

// Recettes
export const toastRecipeCreated = () =>
  toast.success("Recette créée avec succès");

export const toastRecipeUpdated = () =>
  toast.success("Recette mise à jour avec succès");

export const toastRecipeDeleted = () =>
  toast.success("Recette supprimée avec succès");

// Favoris
export const toastAddedToFavorites = () =>
  toast.success("Ajoutée à vos favoris");

export const toastRemovedFromFavorites = () =>
  toast.success("Retirée de vos favoris");

// Authentification
export const toastLoginSuccess = () =>
  toast.success("Connecté avec succès");

export const toastLogoutSuccess = () =>
  toast.success("Déconnecté avec succès");

export const toastRegistrationSuccess = () =>
  toast.success("Inscription réussie, vérifiez votre email");

export const toastVerificationEmailSent = () =>
  toast.success("Email de vérification envoyé");

export const toastPasswordResetSuccess = () =>
  toast.success("Mot de passe réinitialisé avec succès");

// Profil
export const toastProfileUpdated = () =>
  toast.success("Profil mis à jour avec succès");

export const toastAvatarUploaded = () =>
  toast.success("Avatar mis à jour");

export const toastPasswordChanged = () =>
  toast.success("Mot de passe modifié avec succès");

// Erreurs
export const toastError = (message: string) =>
  toast.error(message);

export const toastNetworkError = () =>
  toast.error("Erreur réseau. Veuillez réessayer");

export const toastValidationError = (message: string) =>
  toast.error(message);

export const toastUnauthorized = () =>
  toast.error("Vous n'êtes pas autorisé à effectuer cette action");

export const toastSessionExpired = () =>
  toast.error("Votre session a expiré. Veuillez vous reconnecter");

// Info
export const toastInfo = (message: string) =>
  toast.info(message);
