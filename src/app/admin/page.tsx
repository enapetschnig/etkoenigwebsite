"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Stats {
  todayViews: number;
  weekViews: number;
  monthViews: number;
  newInquiries: number;
  totalInquiries: number;
  dailyViews: Record<string, number>;
  topPages: { path: string; count: number }[];
}

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  status: "new" | "forwarded" | "done";
  message?: string;
  answers?: Record<string, string>;
  equipment_name?: string;
  rental_from?: string;
  rental_to?: string;
  notes?: string;
  forwarded_to?: string;
  forwarded_at?: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  location: string;
  description?: string;
  visible: boolean;
}

type Tab = "dashboard" | "anfragen" | "projekte";
type InquiryFilter = "all" | "new" | "forwarded" | "done";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}

function clearToken() {
  localStorage.removeItem("admin_token");
}

async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "x-admin-token": token } : {}),
      ...(options.headers || {}),
    },
  });
  if (res.status === 401) {
    throw new Error("Nicht autorisiert");
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `Fehler ${res.status}`);
  }
  return res.json();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const CATEGORIES = [
  "Photovoltaik",
  "Elektro",
  "HLS",
  "Dachdeckerei",
  "Mietpark",
] as const;

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  new: { label: "Neu", bg: "bg-orange-100", text: "text-orange-800" },
  forwarded: {
    label: "Weitergeleitet",
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  done: { label: "Erledigt", bg: "bg-green-100", text: "text-green-800" },
};

// ─── Login Screen ────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiFetch<{ token: string }>("/api/auth", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(data.token);
      onLogin();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Login fehlgeschlagen"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              ET König <span className="text-[#E88B00]">Admin</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Melden Sie sich an, um fortzufahren
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-Mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none transition-all text-gray-900"
                placeholder="admin@et-koenig.at"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Passwort
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none transition-all text-gray-900"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-2.5 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E88B00] hover:bg-[#d07e00] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Anmelden…" : "Anmelden"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "anfragen", label: "Anfragen", icon: "📨" },
    { id: "projekte", label: "Projekte", icon: "🏗️" },
  ];

  return (
    <aside className="w-60 min-h-screen bg-[#1a1a1a] text-white flex flex-col shrink-0">
      <div className="p-5 border-b border-white/10">
        <h2 className="text-lg font-bold tracking-tight">
          ET König <span className="text-[#E88B00]">Admin</span>
        </h2>
      </div>
      <nav className="flex-1 py-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-white/10 text-[#E88B00] border-r-2 border-[#E88B00]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 text-xs text-gray-500">
        ET König GmbH &copy; {new Date().getFullYear()}
      </div>
    </aside>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header({ onLogout }: { onLogout: () => void }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setEmail(payload.email || "Admin");
      } catch {
        setEmail("Admin");
      }
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-lg font-semibold text-gray-800">
        ET König <span className="text-[#E88B00]">GmbH</span>
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{email}</span>
        <button
          onClick={onLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium"
        >
          Abmelden
        </button>
      </div>
    </header>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p
        className={`text-3xl font-bold ${
          accent ? "text-[#E88B00]" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Dashboard Tab ───────────────────────────────────────────────────────────

function DashboardView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<Stats>("/api/stats")
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm">Lade Statistiken…</div>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">
        {error}
      </div>
    );
  if (!stats) return null;

  // Convert dailyViews object to sorted array (last 14 days)
  const dailyArray = Object.entries(stats.dailyViews)
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14);
  const maxViews = Math.max(...dailyArray.map((d) => d.views), 1);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Übersicht</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Heute Besucher" value={stats.todayViews} />
          <StatCard label="Diese Woche" value={stats.weekViews} />
          <StatCard label="Dieser Monat" value={stats.monthViews} />
          <StatCard
            label="Neue Anfragen"
            value={stats.newInquiries}
            accent
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tägliche Aufrufe (letzte 14 Tage)
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-end gap-2 h-48">
            {dailyArray.map((day) => (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <span className="text-xs text-gray-500 mb-1 font-medium">
                  {day.views}
                </span>
                <div
                  className="w-full bg-[#E88B00]/80 hover:bg-[#E88B00] rounded-t-md transition-colors min-h-[4px]"
                  style={{
                    height: `${(day.views / maxViews) * 100}%`,
                  }}
                />
                <span className="text-[10px] text-gray-400 mt-1.5">
                  {new Date(day.date).toLocaleDateString("de-AT", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top 10 Seiten
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Seite
                </th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">
                  Aufrufe
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.topPages.map((page, i) => (
                <tr
                  key={page.path}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-5 py-2.5 text-gray-800 font-mono text-xs">
                    {page.path}
                  </td>
                  <td className="px-5 py-2.5 text-right text-gray-600 font-medium">
                    {page.count.toLocaleString("de-AT")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

// ─── Inquiry Detail Panel ────────────────────────────────────────────────────

function InquiryDetail({
  inquiry,
  onClose,
  onUpdate,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onUpdate: (updated: Inquiry) => void;
}) {
  const [notes, setNotes] = useState(inquiry.notes || "");
  const [saving, setSaving] = useState(false);
  const [forwarding, setForwarding] = useState(false);
  const [forwardEmail, setForwardEmail] = useState("info@et-koenig.at");
  const [showForward, setShowForward] = useState(false);
  const [message, setMessage] = useState("");

  async function saveNotes() {
    setSaving(true);
    setMessage("");
    try {
      const updated = await apiFetch<Inquiry>(`/api/inquiries`, {
        method: "PATCH",
        body: JSON.stringify({ id: inquiry.id, notes }),
      });
      onUpdate(updated);
      setMessage("Notizen gespeichert");
    } catch (err: unknown) {
      setMessage(
        err instanceof Error ? err.message : "Fehler beim Speichern"
      );
    } finally {
      setSaving(false);
    }
  }

  async function markDone() {
    setSaving(true);
    setMessage("");
    try {
      const updated = await apiFetch<Inquiry>(`/api/inquiries`, {
        method: "PATCH",
        body: JSON.stringify({ id: inquiry.id, status: "done" }),
      });
      onUpdate(updated);
      setMessage("Als erledigt markiert");
    } catch (err: unknown) {
      setMessage(
        err instanceof Error ? err.message : "Fehler"
      );
    } finally {
      setSaving(false);
    }
  }

  async function forwardInquiry(e: FormEvent) {
    e.preventDefault();
    setForwarding(true);
    setMessage("");
    try {
      await apiFetch("/api/forward", {
        method: "POST",
        body: JSON.stringify({
          inquiryId: inquiry.id,
          toEmail: forwardEmail,
        }),
      });
      const updated = { ...inquiry, status: "forwarded" as const };
      onUpdate(updated);
      setShowForward(false);
      setMessage("Erfolgreich weitergeleitet");
    } catch (err: unknown) {
      setMessage(
        err instanceof Error ? err.message : "Fehler beim Weiterleiten"
      );
    } finally {
      setForwarding(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white shadow-2xl overflow-y-auto animate-slide-in">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-gray-900">
            Anfrage Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Date */}
          <div className="flex items-center justify-between">
            <StatusBadge status={inquiry.status} />
            <span className="text-sm text-gray-500">
              {formatDateTime(inquiry.created_at)}
            </span>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Kontaktdaten
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Name</span>
                <p className="text-gray-900 font-medium">{inquiry.name}</p>
              </div>
              <div>
                <span className="text-gray-500">E-Mail</span>
                <p className="text-gray-900">{inquiry.email}</p>
              </div>
              {inquiry.phone && (
                <div>
                  <span className="text-gray-500">Telefon</span>
                  <p className="text-gray-900">{inquiry.phone}</p>
                </div>
              )}
              <div>
                <span className="text-gray-500">Kategorie</span>
                <p className="text-gray-900">{inquiry.category}</p>
              </div>
            </div>
          </div>

          {/* Quiz Answers */}
          {inquiry.answers &&
            Object.keys(inquiry.answers).length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Quiz-Antworten
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  {Object.entries(inquiry.answers).map(([key, val]) => (
                    <div key={key} className="flex gap-2">
                      <span className="text-gray-500 shrink-0">
                        {key}:
                      </span>
                      <span className="text-gray-900">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Equipment */}
          {inquiry.equipment_name && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Geräte / Ausstattung
              </h4>
              <p className="text-sm text-gray-800 bg-gray-50 rounded-lg p-4">
                {inquiry.equipment_name}
              </p>
            </div>
          )}

          {/* Dates */}
          {inquiry.rental_from && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Gewünschte Termine
              </h4>
              <p className="text-sm text-gray-800 bg-gray-50 rounded-lg p-4">
                {inquiry.rental_from}
              </p>
            </div>
          )}

          {/* Message */}
          {inquiry.message && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Nachricht
              </h4>
              <p className="text-sm text-gray-800 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Interne Notizen
            </h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none transition-all text-sm text-gray-900 resize-none"
              placeholder="Notizen hinzufügen…"
            />
            <button
              onClick={saveNotes}
              disabled={saving}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {saving ? "Speichern…" : "Notizen speichern"}
            </button>
          </div>

          {/* Forward */}
          {showForward ? (
            <form
              onSubmit={forwardInquiry}
              className="space-y-3 bg-blue-50 rounded-lg p-4"
            >
              <h4 className="text-sm font-semibold text-blue-800">
                Anfrage weiterleiten
              </h4>
              <input
                type="email"
                required
                value={forwardEmail}
                onChange={(e) => setForwardEmail(e.target.value)}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={forwarding}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {forwarding ? "Senden…" : "Senden"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForward(false)}
                  className="text-sm text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setShowForward(true)}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Weiterleiten
              </button>
              {inquiry.status !== "done" && (
                <button
                  onClick={markDone}
                  disabled={saving}
                  className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
                >
                  Als erledigt markieren
                </button>
              )}
            </div>
          )}

          {/* Message */}
          {message && (
            <div className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg text-sm">
              {message}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}

// ─── Anfragen Tab ────────────────────────────────────────────────────────────

function AnfragenView() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<InquiryFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const fetchInquiries = useCallback(() => {
    setLoading(true);
    apiFetch<Inquiry[]>("/api/inquiries")
      .then(setInquiries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const filtered = inquiries.filter((inq) => {
    if (statusFilter !== "all" && inq.status !== statusFilter) return false;
    if (categoryFilter !== "all" && inq.category !== categoryFilter)
      return false;
    return true;
  });

  function handleUpdate(updated: Inquiry) {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === updated.id ? updated : inq))
    );
    setSelected(updated);
  }

  const statusTabs: { id: InquiryFilter; label: string; count: number }[] = [
    { id: "all", label: "Alle", count: inquiries.length },
    {
      id: "new",
      label: "Neu",
      count: inquiries.filter((i) => i.status === "new").length,
    },
    {
      id: "forwarded",
      label: "Weitergeleitet",
      count: inquiries.filter((i) => i.status === "forwarded").length,
    },
    {
      id: "done",
      label: "Erledigt",
      count: inquiries.filter((i) => i.status === "done").length,
    },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm">Lade Anfragen…</div>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Anfragen</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                statusFilter === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-gray-400">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none text-gray-700"
        >
          <option value="all">Alle Kategorien</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            Keine Anfragen gefunden
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Datum
                </th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Kategorie
                </th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq, i) => (
                <tr
                  key={inq.id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-orange-50/50 transition-colors cursor-pointer`}
                  onClick={() => setSelected(inq)}
                >
                  <td className="px-5 py-3 text-gray-600">
                    {formatDate(inq.created_at)}
                  </td>
                  <td className="px-5 py-3 text-gray-900 font-medium">
                    {inq.name}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {inq.category}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(inq);
                      }}
                      className="text-[#E88B00] hover:text-[#d07e00] font-medium"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Panel */}
      {selected && (
        <InquiryDetail
          inquiry={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

// ─── Project Form ────────────────────────────────────────────────────────────

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project?: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(project?.title || "");
  const [category, setCategory] = useState(
    project?.category || "Photovoltaik"
  );
  const [year, setYear] = useState(
    project?.year || new Date().getFullYear()
  );
  const [location, setLocation] = useState(project?.location || "");
  const [description, setDescription] = useState(
    project?.description || ""
  );
  const [visible, setVisible] = useState(project?.visible ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = {
        ...(project ? { id: project.id } : {}),
        title,
        category,
        year,
        location,
        description,
        visible,
      };
      const saved = await apiFetch<Project>("/api/projects", {
        method: project ? "PATCH" : "POST",
        body: JSON.stringify(body),
      });
      onSave(saved);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Fehler beim Speichern"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {project ? "Projekt bearbeiten" : "Neues Projekt"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titel
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none text-sm text-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none text-sm text-gray-700"
              >
                {["Photovoltaik", "Elektro", "HLS", "Dachdeckerei"].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jahr
              </label>
              <input
                type="number"
                required
                min={2000}
                max={2100}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none text-sm text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ort
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none text-sm text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E88B00]/40 focus:border-[#E88B00] outline-none text-sm text-gray-900 resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                visible ? "bg-[#E88B00]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  visible ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700">
              {visible ? "Sichtbar" : "Versteckt"}
            </span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm bg-[#E88B00] hover:bg-[#d07e00] text-white font-semibold rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? "Speichern…" : "Speichern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Projekte Tab ────────────────────────────────────────────────────────────

function ProjekteView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProjects = useCallback(() => {
    setLoading(true);
    apiFetch<Project[]>("/api/projects")
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function handleDelete(id: string) {
    try {
      await apiFetch("/api/projects", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleting(null);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Fehler beim Löschen"
      );
      setDeleting(null);
    }
  }

  function handleSave(saved: Project) {
    if (creating) {
      setProjects((prev) => [saved, ...prev]);
      setCreating(false);
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === saved.id ? saved : p))
      );
      setEditing(null);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm">Lade Projekte…</div>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Projekte</h2>
        <button
          onClick={() => setCreating(true)}
          className="bg-[#E88B00] hover:bg-[#d07e00] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Neues Projekt
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            Keine Projekte vorhanden
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Titel
                </th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Kategorie
                </th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Jahr
                </th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">
                  Ort
                </th>
                <th className="text-center px-5 py-3 text-gray-500 font-medium">
                  Sichtbar
                </th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, i) => (
                <tr
                  key={proj.id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-orange-50/50 transition-colors`}
                >
                  <td className="px-5 py-3 text-gray-900 font-medium">
                    {proj.title}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {proj.category}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{proj.year}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {proj.location}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        proj.visible ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditing(proj)}
                        className="text-[#E88B00] hover:text-[#d07e00] font-medium"
                      >
                        Bearbeiten
                      </button>
                      {deleting === proj.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(proj.id)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            Ja
                          </button>
                          <span className="text-gray-400">|</span>
                          <button
                            onClick={() => setDeleting(null)}
                            className="text-gray-500 hover:text-gray-700 font-medium"
                          >
                            Nein
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleting(proj.id)}
                          className="text-red-500 hover:text-red-600 font-medium"
                        >
                          Löschen
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create / Edit modal */}
      {(creating || editing) && (
        <ProjectForm
          project={editing || undefined}
          onSave={handleSave}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  useEffect(() => {
    const token = getToken();
    setAuthenticated(!!token);
    setChecking(false);
  }, []);

  function handleLogin() {
    setAuthenticated(true);
  }

  function handleLogout() {
    clearToken();
    setAuthenticated(false);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Laden…</div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onLogout={handleLogout} />
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "anfragen" && <AnfragenView />}
          {activeTab === "projekte" && <ProjekteView />}
        </main>
      </div>
    </div>
  );
}
