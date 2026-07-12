"use client";

import { useEffect, useState } from "react";
import {
  User,
  Bell,
  Heart,
  History,
  MessageSquare,
  Settings,
  LogOut,
  Trash2,
  Mail,
  Star,
  Loader2,
  Send,
  CheckCheck,
  Shield,
  Globe,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/store/auth-context";
import { useAppStore } from "@/lib/store/app-store";
import { useLang } from "@/lib/i18n";
import { fetchFavorites, removeFavorite } from "@/lib/services/favorites";
import { fetchHistory, clearHistory } from "@/lib/services/history";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
} from "@/lib/services/notifications";
import { supabase } from "@/lib/supabase/client";
import type { Favorite, HistoryEntry, AppNotification } from "@/types/db";
import { formatDistanceToNow } from "date-fns";
import { arSA, enUS } from "date-fns/locale";

type ProfileTab = "overview" | "favorites" | "history" | "notifications" | "feedback" | "settings";

export function ProfileScreen({ onAdminClick }: { onAdminClick?: () => void }) {
  const { user, isGuest, logout } = useAuth();
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const [tab, setTab] = useState<ProfileTab>("overview");

  return (
    <div className="space-y-4 pb-4">
      {/* User card */}
      <Card className="overflow-hidden border-border/60">
        <div className="h-20 bg-gradient-to-r from-primary to-emerald-600" />
        <CardContent className="-mt-10 p-4">
          <div className="flex items-end gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-secondary text-2xl font-black">
              {(user?.full_name || user?.email || "G").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 pb-1">
              <h3 className="text-lg font-bold">
                {isGuest
                  ? isRtl ? "ضيف" : "Guest"
                  : user?.full_name || user?.email?.split("@")[0] || "User"}
              </h3>
              <p className="truncate text-xs text-muted-foreground">
                {isGuest ? (isRtl ? "وضع الضيف" : "Guest mode") : user?.email}
              </p>
              {user?.role === "admin" && (
                <Badge className="mt-1 gap-1 bg-amber-500 hover:bg-amber-600">
                  <Shield className="h-3 w-3" /> Admin
                </Badge>
              )}
            </div>
          </div>

          {user?.role === "admin" && onAdminClick && (
            <Button onClick={onAdminClick} className="mt-4 w-full gap-2" variant="default">
              <Shield className="h-4 w-4" />
              {isRtl ? "لوحة التحكم" : "Admin Dashboard"}
            </Button>
          )}
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={(v) => setTab(v as ProfileTab)}>
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="overview" className="gap-1 text-xs">
            <User className="h-3.5 w-3.5" />
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-1 text-xs">
            <Heart className="h-3.5 w-3.5" />
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1 text-xs">
            <History className="h-3.5 w-3.5" />
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1 text-xs">
            <Bell className="h-3.5 w-3.5" />
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-1 text-xs">
            <MessageSquare className="h-3.5 w-3.5" />
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-1 text-xs">
            <Settings className="h-3.5 w-3.5" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <OverviewPanel />
        </TabsContent>
        <TabsContent value="favorites" className="mt-4">
          <FavoritesPanel />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <HistoryPanel />
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <NotificationsPanel />
        </TabsContent>
        <TabsContent value="feedback" className="mt-4">
          <FeedbackPanel />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <SettingsPanel onLogout={logout} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ---------- Overview ---------- */
function OverviewPanel() {
  const { user, isGuest } = useAuth();
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (user && !isGuest) getUnreadCount(user.id).then(setUnread);
  }, [user, isGuest]);

  const stats = [
    { label: isRtl ? "إشعارات غير مقروءة" : "Unread", value: unread, icon: Bell },
    { label: isRtl ? "العضوية" : "Plan", value: "Free", icon: Star },
    { label: isRtl ? "الوضع" : "Mode", value: isGuest ? (isRtl ? "ضيف" : "Guest") : (isRtl ? "عضو" : "Member"), icon: User },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label} className="border-border/60">
            <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xl font-black">{s.value}</span>
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

/* ---------- Favorites ---------- */
function FavoritesPanel() {
  const { user, isGuest } = useAuth();
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [items, setItems] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(() => Boolean(user && !isGuest));
  const { toast } = useToast();

  useEffect(() => {
    if (!user || isGuest) return;
    let active = true;
    fetchFavorites(user.id).then((f) => {
      if (!active) return;
      setItems(f);
      setLoading(false);
    });
    return () => { active = false; };
  }, [user, isGuest]);

  const handleRemove = async (id: string) => {
    await removeFavorite(id);
    setItems((prev) => prev.filter((f) => f.id !== id));
    toast({ title: isRtl ? "تم الحذف" : "Removed" });
  };

  if (loading) return <LoadingSpinner />;
  if (isGuest)
    return <EmptyState icon={Heart} title={isRtl ? "سجّل الدخول لحفظ المفضلة" : "Sign in to save favorites"} />;
  if (!items.length)
    return <EmptyState icon={Heart} title={isRtl ? "لا توجد مفضلات" : "No favorites yet"} />;

  return (
    <div className="space-y-2">
      {items.map((f) => (
        <Card key={f.id} className="border-border/60">
          <CardContent className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{f.name || "—"}</p>
              <p className="truncate text-xs text-muted-foreground">
                {new Date(f.created_at).toLocaleDateString(isRtl ? "ar-EG" : "en-US")}
              </p>
            </div>
            <Button size="icon" variant="ghost" onClick={() => handleRemove(f.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ---------- History ---------- */
function HistoryPanel() {
  const { user, isGuest } = useAuth();
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [items, setItems] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(() => Boolean(user && !isGuest));
  const { toast } = useToast();

  useEffect(() => {
    if (!user || isGuest) return;
    let active = true;
    fetchHistory(user.id).then((h) => {
      if (!active) return;
      setItems(h);
      setLoading(false);
    });
    return () => { active = false; };
  }, [user, isGuest]);

  const handleClear = async () => {
    if (!user) return;
    await clearHistory(user.id);
    setItems([]);
    toast({ title: isRtl ? "تم المسح" : "Cleared" });
  };

  if (loading) return <LoadingSpinner />;
  if (isGuest)
    return <EmptyState icon={History} title={isRtl ? "سجّل الدخول لحفظ السجل" : "Sign in to save history"} />;
  if (!items.length)
    return <EmptyState icon={History} title={isRtl ? "لا يوجد سجل" : "No history yet"} />;

  return (
    <div className="space-y-2">
      <Button variant="outline" size="sm" className="gap-1.5" onClick={handleClear}>
        <Trash2 className="h-3.5 w-3.5" />
        {isRtl ? "مسح الكل" : "Clear all"}
      </Button>
      {items.map((h) => (
        <Card key={h.id} className="border-border/60">
          <CardContent className="p-3">
            <p className="text-sm font-bold">{h.name || "—"}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(h.created_at), {
                addSuffix: true,
                locale: isRtl ? arSA : enUS,
              })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ---------- Notifications ---------- */
function NotificationsPanel() {
  const { user, isGuest } = useAuth();
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(() => Boolean(user && !isGuest));
  const { toast } = useToast();

  const load = async () => {
    if (!user || isGuest) return;
    const n = await fetchNotifications(user.id);
    setItems(n);
    setLoading(false);
  };

  useEffect(() => {
    load();
     
  }, [user, isGuest]);

  const handleRead = async (id: string) => {
    await markNotificationRead(id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const handleReadAll = async () => {
    if (!user) return;
    await markAllNotificationsRead(user.id);
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
    toast({ title: isRtl ? "تم تعليم الكل كمقروء" : "All marked as read" });
  };

  if (loading) return <LoadingSpinner />;
  if (isGuest)
    return <EmptyState icon={Bell} title={isRtl ? "سجّل الدخول للإشعارات" : "Sign in for notifications"} />;
  if (!items.length)
    return <EmptyState icon={Bell} title={isRtl ? "لا توجد إشعارات" : "No notifications"} />;

  return (
    <div className="space-y-2">
      <Button variant="outline" size="sm" className="gap-1.5" onClick={handleReadAll}>
        <CheckCheck className="h-3.5 w-3.5" />
        {isRtl ? "تعليم الكل كمقروء" : "Mark all read"}
      </Button>
      {items.map((n) => (
        <Card
          key={n.id}
          className={`cursor-pointer border-border/60 transition-colors hover:bg-secondary/30 ${
            !n.is_read ? "border-primary/30 bg-primary/5" : ""
          }`}
          onClick={() => !n.is_read && handleRead(n.id)}
        >
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              {!n.is_read && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[10px] text-muted-foreground/70">
                  {formatDistanceToNow(new Date(n.created_at), {
                    addSuffix: true,
                    locale: isRtl ? arSA : enUS,
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ---------- Feedback ---------- */
function FeedbackPanel() {
  const { user, isGuest } = useAuth();
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({ title: isRtl ? "املأ كل الحقول" : "Fill all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("feedback").insert({
        user_id: user && !isGuest ? user.id : null,
        subject,
        message,
        rating,
        contact: user?.email ?? null,
      });
      if (error) throw error;
      toast({ title: isRtl ? "تم الإرسال، شكراً!" : "Sent, thank you!" });
      setSubject("");
      setMessage("");
      setRating(5);
    } catch (err) {
      toast({
        title: isRtl ? "تعذّر الإرسال" : "Failed to send",
        description: err instanceof Error ? err.message : "",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/60">
      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <Label>{isRtl ? "الموضوع" : "Subject"}</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={isRtl ? "موضوع الرسالة" : "Subject"} />
        </div>
        <div className="space-y-2">
          <Label>{isRtl ? "التقييم" : "Rating"}</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((r) => (
              <button key={r} onClick={() => setRating(r)} type="button">
                <Star className={`h-6 w-6 ${r <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>{isRtl ? "الرسالة" : "Message"}</Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isRtl ? "اكتب رسالتك هنا..." : "Write your message..."}
            rows={4}
          />
        </div>
        <Button onClick={submit} disabled={loading} className="w-full gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isRtl ? "إرسال" : "Send"}
        </Button>
      </CardContent>
    </Card>
  );
}

/* ---------- Settings ---------- */
function SettingsPanel({ onLogout }: { onLogout: () => void }) {
  const { user, isGuest } = useAuth();
  const { settings, locale, theme, setLocale, setTheme } = useAppStore();
  const { lang } = useLang();
  const isRtl = lang === "ar";

  const social = [
    { key: "facebook", label: "Facebook", icon: Globe },
    { key: "whatsapp", label: "WhatsApp", icon: Mail },
    { key: "telegram", label: "Telegram", icon: Send },
  ] as const;

  return (
    <div className="space-y-4">
      <Card className="border-border/60">
        <CardContent className="space-y-3 p-4">
          <h4 className="text-sm font-bold">{isRtl ? "المظهر واللغة" : "Appearance & Language"}</h4>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{isRtl ? "اللغة" : "Language"}</span>
            <div className="flex gap-1 rounded-lg bg-muted p-1">
              {(["ar", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`rounded-md px-3 py-1 text-xs font-bold ${
                    locale === l ? "bg-background shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {l === "ar" ? "العربية" : "English"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{isRtl ? "المظهر" : "Theme"}</span>
            <div className="flex gap-1 rounded-lg bg-muted p-1">
              {([
                { v: "light", icon: Sun },
                { v: "dark", icon: Moon },
                { v: "system", icon: Settings },
              ] as const).map(({ v, icon: Icon }) => (
                <button
                  key={v}
                  onClick={() => setTheme(v)}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold ${
                    theme === v ? "bg-background shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardContent className="space-y-2 p-4">
          <h4 className="text-sm font-bold">{isRtl ? "روابط التواصل" : "Connect"}</h4>
          {social.map(({ key, label, icon: Icon }) => {
            const url = settings[key] as string | undefined;
            if (!url) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border/60 p-2.5 text-sm transition-colors hover:bg-secondary/30"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </a>
            );
          })}
          {settings.contact_email && (
            <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-2 rounded-lg border border-border/60 p-2.5 text-sm transition-colors hover:bg-secondary/30">
              <Mail className="h-4 w-4 text-primary" />
              {settings.contact_email as string}
            </a>
          )}
        </CardContent>
      </Card>

      {!isGuest && user && (
        <Card className="border-border/60">
          <CardContent className="p-4">
            <h4 className="mb-2 text-sm font-bold">{isRtl ? "الحساب" : "Account"}</h4>
            <p className="mb-3 text-xs text-muted-foreground">{user.email}</p>
            <Button variant="destructive" className="w-full gap-2" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              {isRtl ? "تسجيل الخروج" : "Sign Out"}
            </Button>
          </CardContent>
        </Card>
      )}

      {isGuest && (
        <Card className="border-border/60">
          <CardContent className="p-4">
            <Button variant="destructive" className="w-full gap-2" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              {isRtl ? "الخروج من وضع الضيف" : "Exit guest mode"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */
function LoadingSpinner() {
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

function EmptyState({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <Icon className="h-10 w-10 text-muted-foreground/40" />
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}
