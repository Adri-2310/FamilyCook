import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function promoteToAdmin(email: string) {
  try {
    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ Utilisateur non trouvé : ${email}`);
      process.exit(1);
    }

    // Promouvoir en admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });

    console.log("✅ Utilisateur promu ADMIN :");
    console.log(`   Email: ${updatedUser.email}`);
    console.log(`   Nom: ${updatedUser.name}`);
    console.log(`   Rôle: ${updatedUser.role}`);
  } catch (error) {
    console.error("❌ Erreur :", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer l'email depuis les arguments
const email = process.argv[2];

if (!email) {
  console.log("Usage: npm run promote-admin <email>");
  console.log("Exemple: npm run promote-admin bruno@example.com");
  process.exit(1);
}

console.log(`🔐 Promotion de ${email} en ADMIN...`);
promoteToAdmin(email);
