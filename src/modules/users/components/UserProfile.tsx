
import React, { useState, useEffect } from "react";
import { api } from "@/modules/common/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import { 
  User, 
  Settings, 
  Shield, 
  ShieldOff, 
  Check, 
  X,
  ArrowDown
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [loginSession, setLoginSession] = useState<string | null>(null);
  const [credentialExpireDate, setCredentialExpireDate] = useState<string | null>(null);

  const [accountExpired, setAccountExpired] = useState<boolean>(false);
  const [accountLocked, setAccountLocked] = useState<boolean>(false);
  const [accountEnabled, setAccountEnabled] = useState<boolean>(true);
  const [credentialExpired, setCredentialExpired] = useState<boolean>(false);

  const [is2faEnabled, setIs2faEnabled] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [step, setStep] = useState<number>(1); // Step 1: Enable, Step 2: Verify

  // Loading states
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [disabledLoader, setDisabledLoader] = useState<boolean>(false);
  const [twofaCodeLoader, setTwofaCodeLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.firstName || "",
      email: user?.email || "",
      password: "",
    },
    mode: "onTouched",
  });

  // Fetch 2FA status
  useEffect(() => {
    setPageLoading(true);

    const fetch2FAStatus = async () => {
      try {
        const response = await api.get(`/api/auth/user/2fa-status`);
        setIs2faEnabled(response.data.is2faEnabled);
      } catch (error) {
        toast.error("Error fetching 2FA status");
      } finally {
        setPageLoading(false);
      }
    };

    fetch2FAStatus();
  }, []);

  // Enable 2FA
  const enable2FA = async () => {
    setDisabledLoader(true);
    try {
      const response = await api.post(`/api/auth/enable-2fa`);
      setQrCodeUrl(response.data);
      setStep(2);
      toast.success("2FA enabled successfully. Please scan the QR code.");
    } catch (error) {
      toast.error("Error enabling 2FA");
    } finally {
      setDisabledLoader(false);
    }
  };

  // Disable 2FA
  const disable2FA = async () => {
    setDisabledLoader(true);
    try {
      await api.post(`/api/auth/disable-2fa`);
      setIs2faEnabled(false);
      setQrCodeUrl("");
      toast.success("2FA disabled successfully");
    } catch (error) {
      toast.error("Error disabling 2FA");
    } finally {
      setDisabledLoader(false);
    }
  };

  // Verify 2FA
  const verify2FA = async () => {
    if (!code || code.trim().length === 0) {
      return toast.error("Please enter the code to verify");
    }

    setTwofaCodeLoader(true);
    const codeAsInt = parseInt(code, 10);
    try {
      await api.post(`/api/auth/verify-2fa?code=${codeAsInt}`);
      toast.success("2FA verified successfully");
      setIs2faEnabled(true);
      setStep(1);
    } catch (error) {
      console.error("Error verifying 2FA", error);
      toast.error("Invalid 2FA Code");
    } finally {
      setTwofaCodeLoader(false);
    }
  };

  // Update user credentials
  const handleUpdateCredential = async (data: any) => {
    const { username, password } = data;

    try {
      setLoading(true);
      await api.post("/api/auth/update-credentials", {
        username,
        password,
      });
      toast.success("Credentials updated successfully");
    } catch (error) {
      toast.error("Failed to update credentials");
    } finally {
      setLoading(false);
    }
  };

  // Set user data
  useEffect(() => {
    if (user?.id) {
      setValue("username", user.firstName || "");
      setValue("email", user.email || "");
      setAccountExpired(false);
      setAccountLocked(false);
      setAccountEnabled(true);
      setCredentialExpired(false);

      // Format credential expiry date (mock data for now)
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 6);
      setCredentialExpireDate(format(expiryDate, "d MMMM yyyy"));
    }
  }, [user, setValue]);

  // Set login session from token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const loginTime = new Date(decodedToken.iat * 1000);
        setLoginSession(format(loginTime, "EEEE, d MMMM yyyy, h:mm a"));
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  // Update account statuses
  const handleAccountExpiryStatus = async (checked: boolean) => {
    setAccountExpired(checked);
    try {
      await api.put("/api/auth/update-expiry-status", { expire: checked });
      toast.success("Account expiry status updated");
    } catch (error) {
      toast.error("Failed to update account expiry status");
    }
  };

  const handleAccountLockStatus = async (checked: boolean) => {
    setAccountLocked(checked);
    try {
      await api.put("/api/auth/update-lock-status", { lock: checked });
      toast.success("Account lock status updated");
    } catch (error) {
      toast.error("Failed to update account lock status");
    }
  };

  const handleAccountEnabledStatus = async (checked: boolean) => {
    setAccountEnabled(checked);
    try {
      await api.put("/api/auth/update-enabled-status", { enabled: checked });
      toast.success("Account enabled status updated");
    } catch (error) {
      toast.error("Failed to update account enabled status");
    }
  };

  const handleCredentialExpiredStatus = async (checked: boolean) => {
    setCredentialExpired(checked);
    try {
      await api.put("/api/auth/update-credentials-expiry-status", { expire: checked });
      toast.success("Credential expiry status updated");
    } catch (error) {
      toast.error("Failed to update credential expiry status");
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* User Information */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-2">{user?.firstName || "User"}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {user?.email || "user@example.com"}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Username:</span>
                  <span>{user?.firstName || "User"} {user?.lastName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Role:</span>
                  <span>{user?.role?.roleName || "User"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Organization:</span>
                  <span>{user?.organization?.name || "No Organization"}</span>
                </div>
              </div>

              {/* <Accordion type="single" collapsible>
                <AccordionItem value="update-credentials">
                  <AccordionTrigger className="text-base font-semibold">
                    Update User Credentials
                  </AccordionTrigger>
                  <AccordionContent>
                    <form
                      className="space-y-4"
                      onSubmit={handleSubmit(handleUpdateCredential)}
                    >
                      <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium">
                          Username
                        </label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          {...register("username", { required: true })}
                        />
                        {errors.username && (
                          <p className="text-xs text-destructive">Username is required</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          readOnly
                          {...register("email")}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                          New Password
                        </label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter new password"
                          {...register("password", { minLength: 6 })}
                        />
                        {errors.password && (
                          <p className="text-xs text-destructive">
                            Password must be at least 6 characters
                          </p>
                        )}
                      </div>

                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Updating..." : "Update Credentials"}
                      </Button>
                    </form>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-settings">
                  <AccordionTrigger className="text-base font-semibold">
                    Account Settings
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Account Expired</label>
                          <p className="text-xs text-muted-foreground">
                            Toggle if account is expired
                          </p>
                        </div>
                        <Switch
                          checked={accountExpired}
                          onCheckedChange={handleAccountExpiryStatus}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Account Locked</label>
                          <p className="text-xs text-muted-foreground">
                            Toggle if account is locked
                          </p>
                        </div>
                        <Switch
                          checked={accountLocked}
                          onCheckedChange={handleAccountLockStatus}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Account Enabled</label>
                          <p className="text-xs text-muted-foreground">
                            Toggle if account is enabled
                          </p>
                        </div>
                        <Switch
                          checked={accountEnabled}
                          onCheckedChange={handleAccountEnabledStatus}
                        />
                      </div>

                      <div className="pt-2 pb-2">
                        <div className="text-sm font-medium mb-2">Credential Settings</div>
                        <div className="bg-muted p-3 rounded-md text-sm">
                          Your credentials will expire on{" "}
                          <span className="font-medium">{credentialExpireDate || "N/A"}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Credential Expired</label>
                          <p className="text-xs text-muted-foreground">
                            Toggle if credentials are expired
                          </p>
                        </div>
                        <Switch
                          checked={credentialExpired}
                          onCheckedChange={handleCredentialExpiredStatus}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Last Login Session</h3>
                <div className="bg-muted p-3 rounded-md text-sm">
                  <p>
                    {loginSession || "No login session information available"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication (2FA) */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Two-Factor Authentication</CardTitle>
              <div
                className={`px-2 py-1 text-xs rounded-full ${
                  is2faEnabled
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {is2faEnabled ? "Activated" : "Deactivated"}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Multi-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication adds an additional layer of security to
                  your account by requiring more than just a password to sign in.
                </p>
              </div>

              <Button
                onClick={is2faEnabled ? disable2FA : enable2FA}
                disabled={disabledLoader}
                variant={is2faEnabled ? "destructive" : "default"}
                className="w-full"
              >
                {disabledLoader ? (
                  "Processing..."
                ) : is2faEnabled ? (
                  <>
                    <ShieldOff className="mr-2 h-4 w-4" />
                    Disable Two-Factor Authentication
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Enable Two-Factor Authentication
                  </>
                )}
              </Button>

              {step === 2 && (
                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4">Scan QR Code</h3>
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded mb-4">
                      {qrCodeUrl && (
                        <img 
                          src={qrCodeUrl} 
                          alt="QR Code" 
                          className="w-48 h-48"
                        />
                      )}
                    </div>
                    <p className="text-sm text-center mb-4">
                      Scan the QR code with your authenticator app. Then enter the
                      code below to verify.
                    </p>
                    <div className="flex w-full max-w-xs gap-2">
                      <Input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <Button 
                        onClick={verify2FA} 
                        disabled={twofaCodeLoader}
                      >
                        {twofaCodeLoader ? (
                          "Verifying..."
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
