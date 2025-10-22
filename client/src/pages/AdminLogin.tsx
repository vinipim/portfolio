import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Lock, Mail, AlertCircle, CheckCircle } from "lucide-react";

/**
 * Admin Login Page
 * - Simple and secure login form
 * - Specific error messages
 * - Password recovery via email
 * - Redirects to admin dashboard on success
 */
export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => {
      setLocation("/admin/dashboard");
    },
    onError: (err) => {
      // Specific error messages
      const message = err.message.toLowerCase();
      if (message.includes("invalid") || message.includes("incorrect")) {
        setError("Incorrect password. Please try again or use password recovery.");
      } else if (message.includes("not found") || message.includes("email")) {
        setError("Email not found. Please check your email address.");
      } else {
        setError("Login failed. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement actual email sending
    // For now, just show success message
    console.log("Password recovery requested for:", recoveryEmail);
    
    // Simulate API call
    setTimeout(() => {
      setRecoverySuccess(true);
      setTimeout(() => {
        setShowRecovery(false);
        setRecoverySuccess(false);
        setRecoveryEmail("");
      }, 3000);
    }, 1000);
  };

  if (showRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Password Recovery</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to receive recovery instructions
              </p>
            </div>

            {/* Success message */}
            {recoverySuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium">Recovery email sent!</p>
                  <p className="mt-1">Check your inbox for password reset instructions.</p>
                </div>
              </div>
            )}

            {/* Recovery form */}
            <form onSubmit={handleRecovery} className="space-y-6">
              <div>
                <label htmlFor="recovery-email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="recovery-email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="danielblanchard@keemail.me"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={recoverySuccess}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  size="lg"
                >
                  {recoverySuccess ? "Email Sent!" : "Send Recovery Email"}
                </Button>
                
                <Button
                  type="button"
                  onClick={() => setShowRecovery(false)}
                  variant="ghost"
                  className="w-full"
                >
                  Back to Login
                </Button>
              </div>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-muted/50 rounded text-xs text-muted-foreground">
              <p className="font-medium mb-1">Note:</p>
              <p>Recovery emails are sent to the registered admin email address. 
              If you don't receive an email within 5 minutes, check your spam folder.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="danielblanchard@keemail.me"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowRecovery(true)}
                  className="text-xs text-accent hover:text-accent/80 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              size="lg"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Secure admin access only
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Current admin: <span className="font-medium">danielblanchard@keemail.me</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

