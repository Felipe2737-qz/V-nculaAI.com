import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Globe, Trash2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { VinculaLogo } from '@/components/shared/VinculaLogo';
import { toast } from 'sonner';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const currencies = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'BRL', label: 'BRL (R$)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
];

export default function AccountSettings() {
  const { t, language, setLanguage, currency, setCurrency } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(() => localStorage.getItem('vincula_profile_image'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image too large (max 2MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setProfileImage(dataUrl);
      localStorage.setItem('vincula_profile_image', dataUrl);
      toast.success('Profile image updated!');
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('Profile updated (demo mode)');
    setIsSaving(false);
  };

  const handleDeleteAccount = async () => {
    toast.success('Account deleted (demo mode)');
    await logout();
    navigate('/');
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/chat">
                <ArrowLeft className="w-4 h-4" />
                {t.common.back}
              </Link>
            </Button>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">{t.settings.title}</h1>
            </div>

            {/* Vínculos Card */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <VinculaLogo size="lg" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t.settings.vinculos}</div>
                    <div className="text-3xl font-bold">{user?.vinculos || 0}</div>
                  </div>
                </div>
                <Button variant="hero" asChild>
                  <Link to="/pricing">{t.settings.buyMore}</Link>
                </Button>
              </div>
            </div>

            {/* Account Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {t.settings.account}
              </h2>

              <div className="space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border overflow-hidden flex items-center justify-center">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-6 h-6 text-background" />
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                  <p className="text-xs text-muted-foreground">Click to change photo</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">{t.auth.name}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    {t.settings.emailNoChange}
                  </p>
                </div>

                <Button
                  variant="default"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? t.common.loading : t.settings.updateProfile}
                </Button>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t.settings.preferences}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{t.settings.language}</Label>
                  <Select value={language} onValueChange={(v) => setLanguage(v as typeof language)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.settings.currency}</Label>
                  <Select value={currency} onValueChange={(v) => setCurrency(v as typeof currency)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>
                          {curr.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {t.settings.langNoCurrency}
                  </p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-destructive">
                <Trash2 className="w-5 h-5" />
                {t.settings.dangerZone}
              </h2>

              <p className="text-muted-foreground mb-4">
                {t.settings.deleteWarning}
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    {t.settings.deleteAccount}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t.settings.deleteConfirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t.settings.deleteConfirmDesc}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>
                      {t.settings.deleteAccount}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
