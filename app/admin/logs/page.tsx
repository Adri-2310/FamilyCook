"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { LogType, LogLevel } from "@prisma/client";

type LogWithUser = {
  id: string;
  type: LogType;
  level: LogLevel;
  action: string;
  message: string;
  ipAddress: string | null;
  userId: string | null;
  user: { id: string; name: string | null; email: string } | null;
  createdAt: string;
};

export default function LogsPage() {
  const searchParams = useSearchParams();
  const [logs, setLogs] = useState<LogWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [archiving, setArchiving] = useState(false);

  const type = searchParams.get("type") || "";
  const level = searchParams.get("level") || "";
  const userId = searchParams.get("userId") || "";

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        ...(type && { type }),
        ...(level && { level }),
        ...(userId && { userId }),
      });

      const res = await fetch(`/api/admin/logs?${params}`);
      const data = await res.json();
      setLogs(data.logs || []);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, type, level, userId]);

  const handleArchive = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    setArchiving(true);
    try {
      const res = await fetch("/api/admin/logs/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, month }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Archivage réussi: ${data.archived} logs archivés`);
        fetchLogs();
      } else {
        alert("Erreur lors de l'archivage");
      }
    } catch (error) {
      console.error("Archive error:", error);
      alert("Erreur lors de l'archivage");
    } finally {
      setArchiving(false);
    }
  };

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case "DEBUG":
        return "bg-gray-100 text-gray-800";
      case "INFO":
        return "bg-blue-100 text-blue-800";
      case "WARN":
        return "bg-yellow-100 text-yellow-800";
      case "ERROR":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: LogType) => {
    switch (type) {
      case "AUTH":
        return "bg-purple-100 text-purple-800";
      case "USER_ACTION":
        return "bg-green-100 text-green-800";
      case "SYSTEM_ERROR":
        return "bg-red-100 text-red-800";
      case "API_ACCESS":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Logs Système</h1>
        <button
          onClick={handleArchive}
          disabled={archiving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {archiving ? "Archivage..." : "Archiver ce mois"}
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value) newParams.set("type", e.target.value);
                else newParams.delete("type");
                window.history.pushState(null, "", `?${newParams}`);
              }}
              className="w-full px-3 py-2 border border-border rounded bg-background"
            >
              <option value="">Tous les types</option>
              <option value="AUTH">Authentification</option>
              <option value="USER_ACTION">Actions utilisateur</option>
              <option value="SYSTEM_ERROR">Erreurs système</option>
              <option value="API_ACCESS">Accès API</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Niveau</label>
            <select
              value={level}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value) newParams.set("level", e.target.value);
                else newParams.delete("level");
                window.history.pushState(null, "", `?${newParams}`);
              }}
              className="w-full px-3 py-2 border border-border rounded bg-background"
            >
              <option value="">Tous les niveaux</option>
              <option value="DEBUG">Debug</option>
              <option value="INFO">Info</option>
              <option value="WARN">Warning</option>
              <option value="ERROR">Error</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Utilisateur</label>
            <input
              type="text"
              placeholder="ID utilisateur..."
              value={userId}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value) newParams.set("userId", e.target.value);
                else newParams.delete("userId");
                window.history.pushState(null, "", `?${newParams}`);
              }}
              className="w-full px-3 py-2 border border-border rounded bg-background"
            />
          </div>
        </div>
      </div>

      {/* Tableau des logs */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Chargement...</div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Aucun log trouvé</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Niveau</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Message</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Utilisateur</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(log.createdAt).toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                            log.type
                          )}`}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getLevelColor(
                            log.level
                          )}`}
                        >
                          {log.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono">{log.action}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {log.message}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {log.user ? (
                          <>
                            {log.user.name} ({log.user.email})
                          </>
                        ) : (
                          <span className="italic">Anonyme</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-border flex justify-between items-center bg-muted/30">
              <span className="text-sm text-muted-foreground">
                Page {page} sur {totalPages}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border border-border rounded text-sm hover:bg-muted disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border border-border rounded text-sm hover:bg-muted disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
