"use client";

import { useState, useEffect, FormEvent } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

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
  status: string;
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
  created_at: string;
  title: string;
  category: string;
  year: number;
  location: string;
  description?: string;
  visible: boolean;
}

type Tab = "dashboard" | "anfragen" | "referenzen";

// ─── Helpers ───────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

async function api<T>(url: string, opts: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "x-admin-token": token } : {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const statusColors: Record<string, string> = {
  new: "bg-orange-100 text-orange-700",
  forwarded: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
};

const statusLabels: Record<string, string> = {
  new: "Neu",
  forwarded: "Weitergeleitet",
  done: "Erledigt",
};

// ─── Login ─────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api<{ token: string }>("/api/auth", {
        method: "POST",
        body: JSON.stringify({ email, password: pw }),
      });
      localStorage.setItem("admin_token", data.token);
      onLogin();
    } catch {
      setError("Login fehlgeschlagen");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E88B00] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <span className="text-2xl font-bold text-white">ET</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin-Bereich</h1>
          <p className="text-sm text-gray-500 mt-1">ET König GmbH</p>
        </div>
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 space-y-4">
          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-Mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E88B00] focus:ring-2 focus:ring-[#E88B00]/20 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Passwort</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E88B00] focus:ring-2 focus:ring-[#E88B00]/20 outline-none text-sm" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-[#E88B00] text-white font-semibold rounded-xl hover:bg-[#d07e00] active:scale-[0.98] transition-all disabled:opacity-60 text-sm">
            {loading ? "..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────

function DashboardView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Stats>("/api/stats").then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">{error}</div>;
  if (!stats) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-[#E88B00] border-t-transparent rounded-full animate-spin" /></div>;

  const daily = Object.entries(stats.dailyViews || {})
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14);
  const maxV = Math.max(...daily.map((d) => d.views), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Heute", value: stats.todayViews, icon: "📊" },
          { label: "Diese Woche", value: stats.weekViews, icon: "📈" },
          { label: "Dieser Monat", value: stats.monthViews, icon: "📅" },
          { label: "Neue Anfragen", value: stats.newInquiries, icon: "🔔", accent: true },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl p-5 shadow-sm border ${s.accent ? "border-[#E88B00]/30 bg-orange-50/30" : "border-gray-100"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{s.label}</span>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className={`text-3xl font-bold ${s.accent ? "text-[#E88B00]" : "text-gray-900"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {daily.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Seitenaufrufe – letzte 14 Tage</h3>
          <div className="flex items-end gap-1.5 h-40">
            {daily.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center justify-end h-full group">
                <span className="text-[10px] text-gray-400 mb-1 opacity-0 group-hover:opacity-100 transition">{d.views}</span>
                <div className="w-full bg-[#E88B00]/20 group-hover:bg-[#E88B00]/80 rounded-t transition-all" style={{ height: `${Math.max((d.views / maxV) * 100, 3)}%` }} />
                <span className="text-[9px] text-gray-400 mt-1">{d.date.slice(5).replace("-", ".")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.topPages.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-50"><h3 className="text-sm font-semibold text-gray-900">Meistbesuchte Seiten</h3></div>
          {stats.topPages.map((p, i) => (
            <div key={p.path} className={`flex items-center justify-between px-5 py-2.5 text-sm ${i % 2 ? "bg-gray-50/50" : ""}`}>
              <span className="text-gray-700 font-mono text-xs">{p.path}</span>
              <span className="text-gray-500 font-medium">{p.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Anfragen ──────────────────────────────────────────────────────────────

function AnfragenView() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [fwdEmail, setFwdEmail] = useState("info@et-koenig.at");
  const [showFwd, setShowFwd] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api<Inquiry[]>("/api/inquiries").then(setInquiries).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = inquiries.filter((i) => {
    if (filter !== "all" && i.status !== filter) return false;
    if (catFilter !== "all" && i.category !== catFilter) return false;
    return true;
  });

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    forwarded: inquiries.filter((i) => i.status === "forwarded").length,
    done: inquiries.filter((i) => i.status === "done").length,
  };

  const categories = [...new Set(inquiries.map((i) => i.category))];

  const updateStatus = async (id: string, status: string) => {
    await api("/api/inquiries", { method: "PATCH", body: JSON.stringify({ id, status, notes }) });
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status, notes } : i)));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status, notes } : null);
  };

  const saveNotes = async () => {
    if (!selected) return;
    await api("/api/inquiries", { method: "PATCH", body: JSON.stringify({ id: selected.id, notes, status: selected.status }) });
    setInquiries((prev) => prev.map((i) => (i.id === selected.id ? { ...i, notes } : i)));
  };

  const forward = async () => {
    if (!selected || !fwdEmail) return;
    setSending(true);
    try {
      await api("/api/forward", { method: "POST", body: JSON.stringify({ inquiryId: selected.id, toEmail: fwdEmail }) });
      setInquiries((prev) => prev.map((i) => (i.id === selected.id ? { ...i, status: "forwarded", forwarded_to: fwdEmail, forwarded_at: new Date().toISOString() } : i)));
      setSelected((prev) => prev ? { ...prev, status: "forwarded", forwarded_to: fwdEmail, forwarded_at: new Date().toISOString() } : null);
      setShowFwd(false);
    } catch {}
    setSending(false);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-[#E88B00] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* List */}
      <div className={`${selected ? "hidden lg:flex" : "flex"} flex-col flex-1 min-w-0`}>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(["all", "new", "forwarded", "done"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${filter === f ? "bg-[#E88B00] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f === "all" ? "Alle" : statusLabels[f]} ({counts[f]})
            </button>
          ))}
          {categories.length > 1 && (
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border-0 outline-none ml-auto">
              <option value="all">Alle Bereiche</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>

        {/* Inquiry List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Keine Anfragen</p>}
          {filtered.map((inq) => (
            <button key={inq.id} onClick={() => { setSelected(inq); setNotes(inq.notes || ""); setShowFwd(false); }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === inq.id ? "border-[#E88B00] bg-orange-50/50 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-gray-900">{inq.name}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[inq.status] || "bg-gray-100 text-gray-600"}`}>
                  {statusLabels[inq.status] || inq.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-medium text-[#E88B00]">{inq.category}</span>
                <span>·</span>
                <span>{fmtDate(inq.created_at)}</span>
                {inq.equipment_name && <><span>·</span><span>{inq.equipment_name}</span></>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{selected.name}</h3>
              <p className="text-xs text-gray-500">{selected.category} · {fmtDateTime(selected.created_at)}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>

          <div className="p-6 space-y-5">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[selected.status] || "bg-gray-100"}`}>
                {statusLabels[selected.status] || selected.status}
              </span>
              {selected.forwarded_to && (
                <span className="text-xs text-gray-400">→ {selected.forwarded_to} ({fmtDate(selected.forwarded_at || "")})</span>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">E-Mail</p>
                <a href={`mailto:${selected.email}`} className="text-sm font-medium text-[#E88B00]">{selected.email}</a>
              </div>
              {selected.phone && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Telefon</p>
                  <a href={`tel:${selected.phone}`} className="text-sm font-medium text-gray-900">{selected.phone}</a>
                </div>
              )}
            </div>

            {/* Equipment & Dates */}
            {selected.equipment_name && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Gerät</p>
                <p className="text-sm font-medium">{selected.equipment_name}</p>
                {selected.rental_from && <p className="text-xs text-gray-500 mt-1">Zeitraum: {selected.rental_from} – {selected.rental_to || "offen"}</p>}
              </div>
            )}

            {/* Answers */}
            {selected.answers && Object.keys(selected.answers).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Quiz-Antworten</p>
                <div className="space-y-1.5">
                  {Object.entries(selected.answers).map(([q, a]) => (
                    <div key={q} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-xs text-gray-500 flex-1">{q}</span>
                      <span className="text-xs font-semibold text-gray-900">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            {selected.message && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Nachricht</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.message}</p>
              </div>
            )}

            {/* Notes */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-1.5">Notizen</p>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Interne Notizen..."
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#E88B00] focus:ring-1 focus:ring-[#E88B00]/20 outline-none resize-none" />
              <button onClick={saveNotes} className="mt-1.5 text-xs font-medium text-[#E88B00] hover:underline">Notizen speichern</button>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
              {!showFwd ? (
                <button onClick={() => setShowFwd(true)} className="px-4 py-2 text-xs font-semibold bg-[#E88B00] text-white rounded-xl hover:bg-[#d07e00] transition">
                  ✉ Weiterleiten
                </button>
              ) : (
                <div className="flex gap-2 items-center w-full">
                  <input type="email" value={fwdEmail} onChange={(e) => setFwdEmail(e.target.value)} placeholder="E-Mail"
                    className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#E88B00] outline-none" />
                  <button onClick={forward} disabled={sending} className="px-4 py-2 text-xs font-semibold bg-[#E88B00] text-white rounded-xl hover:bg-[#d07e00] transition disabled:opacity-50">
                    {sending ? "..." : "Senden"}
                  </button>
                  <button onClick={() => setShowFwd(false)} className="text-xs text-gray-400 hover:text-gray-600">Abbrechen</button>
                </div>
              )}
              {selected.status !== "done" && (
                <button onClick={() => updateStatus(selected.id, "done")} className="px-4 py-2 text-xs font-semibold bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
                  ✓ Erledigt
                </button>
              )}
              <button onClick={async () => {
                if (!confirm("Anfrage wirklich löschen?")) return;
                await api("/api/inquiries", { method: "DELETE", body: JSON.stringify({ id: selected.id }) });
                setInquiries((prev) => prev.filter((i) => i.id !== selected.id));
                setSelected(null);
              }} className="px-4 py-2 text-xs font-semibold bg-red-500 text-white rounded-xl hover:bg-red-600 transition ml-auto">
                🗑 Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Referenzen ────────────────────────────────────────────────────────────

function ReferenzenView() {
  const allCategories = ["Photovoltaik", "Elektro", "HLS", "Dachdeckerei"];
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Photovoltaik", year: new Date().getFullYear(), location: "", description: "", visible: true });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState("all");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  useEffect(() => {
    api<Project[]>("/api/projects").then((p) => {
      setProjects(p);
      // Expand the latest year by default
      if (p.length > 0) {
        const latestYear = Math.max(...p.map((x) => x.year)).toString();
        setExpandedYears(new Set([latestYear]));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openNew = (category?: string, year?: number) => {
    setForm({ title: "", category: category || activeCat === "all" ? "Photovoltaik" : activeCat, year: year || new Date().getFullYear(), location: "", description: "", visible: true });
    setIsNew(true);
    setEditing({} as Project);
  };

  const openEdit = (p: Project) => {
    setForm({ title: p.title, category: p.category, year: p.year, location: p.location, description: p.description || "", visible: p.visible });
    setIsNew(false);
    setEditing(p);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (isNew) {
      await api("/api/projects", { method: "POST", body: JSON.stringify(form) });
    } else if (editing) {
      await api("/api/projects", { method: "PATCH", body: JSON.stringify({ id: editing.id, ...form }) });
    }
    const fresh = await api<Project[]>("/api/projects");
    setProjects(fresh);
    setEditing(null);
  };

  const remove = async (id: string) => {
    await api("/api/projects", { method: "DELETE", body: JSON.stringify({ id }) });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const toggleYear = (key: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  // Group by category → year
  const filtered = activeCat === "all" ? projects : projects.filter((p) => p.category === activeCat);
  const grouped: Record<string, Record<number, Project[]>> = {};
  for (const p of filtered) {
    if (!grouped[p.category]) grouped[p.category] = {};
    if (!grouped[p.category][p.year]) grouped[p.category][p.year] = [];
    grouped[p.category][p.year].push(p);
  }

  // Count per category
  const catCounts: Record<string, number> = { all: projects.length };
  for (const p of projects) catCounts[p.category] = (catCounts[p.category] || 0) + 1;

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-[#E88B00] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Referenzen ({projects.length})</h2>
        <button onClick={() => openNew()} className="px-4 py-2 text-xs font-semibold bg-[#E88B00] text-white rounded-xl hover:bg-[#d07e00] transition">
          + Neue Referenz
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button onClick={() => setActiveCat("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${activeCat === "all" ? "bg-[#E88B00] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
          Alle ({catCounts.all})
        </button>
        {allCategories.map((c) => (
          <button key={c} onClick={() => setActiveCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${activeCat === c ? "bg-[#E88B00] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {c} ({catCounts[c] || 0})
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-lg">{isNew ? "Neue Referenz" : "Referenz bearbeiten"}</h3>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titel / Projektname *" required
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#E88B00] outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#E88B00] outline-none">
                {allCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: +e.target.value })} placeholder="Jahr" min={2000} max={2030}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#E88B00] outline-none" />
            </div>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Ort (z.B. Murau, Scheifling)"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#E88B00] outline-none" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Beschreibung (optional)" rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#E88B00] outline-none resize-none" />
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="accent-[#E88B00]" />
              Auf Website sichtbar
            </label>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-2.5 bg-[#E88B00] text-white font-semibold rounded-xl hover:bg-[#d07e00] transition text-sm">Speichern</button>
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition text-sm">Abbrechen</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm text-center">
            <p className="font-semibold mb-2">Referenz löschen?</p>
            <p className="text-sm text-gray-500 mb-4">Diese Aktion kann nicht rückgängig gemacht werden.</p>
            <div className="flex gap-2">
              <button onClick={() => remove(deleteId)} className="flex-1 py-2 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600">Löschen</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-200">Abbrechen</button>
            </div>
          </div>
        </div>
      )}

      {/* Grouped Content */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <p className="text-sm text-gray-400">Keine Referenzen in dieser Kategorie</p>
          <button onClick={() => openNew(activeCat === "all" ? undefined : activeCat)} className="mt-3 text-sm font-medium text-[#E88B00] hover:underline">+ Jetzt hinzufügen</button>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([category, years]) => (
            <div key={category}>
              {activeCat === "all" && (
                <h3 className="text-sm font-bold text-gray-700 mb-2 mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E88B00]" />
                  {category}
                </h3>
              )}
              {Object.entries(years).sort(([a], [b]) => Number(b) - Number(a)).map(([year, items]) => {
                const yearKey = `${category}-${year}`;
                const isExpanded = expandedYears.has(yearKey) || expandedYears.has(year);
                return (
                  <div key={yearKey} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-2">
                    <button onClick={() => toggleYear(yearKey)}
                      className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">{year}</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{items.length} Projekt{items.length !== 1 ? "e" : ""}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); openNew(category, Number(year)); }}
                          className="text-xs text-[#E88B00] hover:underline font-medium">+ Hinzufügen</button>
                        <span className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-gray-50">
                        {items.map((p, i) => (
                          <div key={p.id} className={`flex items-center justify-between px-5 py-2.5 ${i % 2 ? "bg-gray-50/30" : ""} hover:bg-orange-50/30 transition group`}>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-gray-900">{p.title}</span>
                              {p.location && <span className="text-xs text-gray-400 ml-2">· {p.location}</span>}
                              {!p.visible && <span className="text-[10px] text-red-400 ml-2">(versteckt)</span>}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                              <button onClick={() => openEdit(p)} className="text-xs text-[#E88B00] hover:underline font-medium px-2 py-1">Bearbeiten</button>
                              <button onClick={() => setDeleteId(p.id)} className="text-xs text-red-500 hover:underline font-medium px-2 py-1">Löschen</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  useEffect(() => {
    setAuthed(!!getToken());
  }, []);

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "anfragen", label: "Anfragen", icon: "📩" },
    { key: "referenzen", label: "Referenzen", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/80">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <span className="font-bold text-gray-900">ET König <span className="text-[#E88B00]">Admin</span></span>
          <nav className="hidden sm:flex gap-1">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === t.key ? "bg-[#E88B00]/10 text-[#E88B00]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={() => { localStorage.removeItem("admin_token"); setAuthed(false); }}
          className="text-sm text-gray-400 hover:text-red-500 transition font-medium">Abmelden</button>
      </header>

      {/* Mobile Tabs */}
      <nav className="sm:hidden flex border-b border-gray-200 bg-white px-2">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 py-3 text-xs font-medium text-center transition border-b-2 ${tab === t.key ? "border-[#E88B00] text-[#E88B00]" : "border-transparent text-gray-500"}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {tab === "dashboard" && <DashboardView />}
        {tab === "anfragen" && <AnfragenView />}
        {tab === "referenzen" && <ReferenzenView />}
      </main>
    </div>
  );
}
