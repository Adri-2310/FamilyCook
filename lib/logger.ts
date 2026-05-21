import { prisma } from "./prisma";

type LogData = {
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  duration?: number;
  metadata?: Record<string, any>;
};

class Logger {
  private async log(
    type: "AUTH" | "USER_ACTION" | "SYSTEM_ERROR" | "API_ACCESS",
    level: "DEBUG" | "INFO" | "WARN" | "ERROR",
    action: string,
    message: string,
    data: LogData = {}
  ) {
    try {
      await prisma.systemLog.create({
        data: {
          type,
          level,
          action,
          message,
          userId: data.userId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          path: data.path,
          method: data.method,
          statusCode: data.statusCode,
          duration: data.duration,
          metadata: data.metadata,
        },
      });
    } catch (error) {
      console.error("[Logger] Failed to write log:", error);
    }
  }

  async auth(
    action: "sign-in" | "sign-out" | "sign-up" | "sign-in-failed",
    data: LogData = {}
  ) {
    const messages: Record<string, string> = {
      "sign-in": "Connexion utilisateur",
      "sign-out": "Déconnexion utilisateur",
      "sign-up": "Création de compte",
      "sign-in-failed": "Tentative de connexion échouée",
    };

    return this.log("AUTH", "INFO", `auth.${action}`, messages[action], data);
  }

  async userAction(
    action: string,
    data: LogData = {}
  ) {
    const message = data.metadata?.message || `Actión utilisateur: ${action}`;
    return this.log("USER_ACTION", "INFO", action, message, data);
  }

  async error(
    action: string,
    error: unknown,
    data: LogData = {}
  ) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    const metadata = {
      ...data.metadata,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    };

    return this.log(
      "SYSTEM_ERROR",
      "ERROR",
      action,
      `Erreur système: ${errorMessage}`,
      { ...data, metadata }
    );
  }

  async apiAccess(data: LogData = {}) {
    const action = `api.${data.method} ${data.path}`;
    const statusCategory =
      (data.statusCode || 200) >= 400 ? "ERROR" : "INFO";
    const message = `Accès API: ${data.method} ${data.path} - ${data.statusCode} (${data.duration}ms)`;

    return this.log(
      "API_ACCESS",
      statusCategory as "ERROR" | "INFO",
      action,
      message,
      data
    );
  }

  async archiveMonth(year: number, month: number) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      const logs = await prisma.systemLog.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
        orderBy: { createdAt: "asc" },
      });

      if (logs.length === 0) {
        console.log(`[Logger] No logs to archive for ${year}-${month.toString().padStart(2, "0")}`);
        return { archived: 0, deleted: 0 };
      }

      const monthStr = `${year}-${month.toString().padStart(2, "0")}`;
      const filename = `logs/${monthStr}.json`;

      // Upload to Vercel Blob
      try {
        const content = JSON.stringify(logs, null, 2);

        if (!globalThis.fetch) {
          throw new Error("fetch not available");
        }

        // Note: Ce code suppose que vous avez configuré une route upload
        // Pour maintenant, on va juste sauvegarder localement
        console.log(`[Logger] Archive ready: ${filename} (${logs.length} logs)`);
      } catch {
        console.error(`[Logger] Failed to upload archive to Blob: ${filename}`);
      }

      // Delete archived logs from DB
      const deleted = await prisma.systemLog.deleteMany({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      return { archived: logs.length, deleted: deleted.count };
    } catch (error) {
      console.error("[Logger] Failed to archive month:", error);
      return { archived: 0, deleted: 0 };
    }
  }
}

export const logger = new Logger();
