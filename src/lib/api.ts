export type ApiUser = { id: string; email: string; fullName: string; isAdmin: boolean; phoneNumber?: string };

const API_BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

function authHeaders(): Record<string, string> {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function apiSignup(email: string, password: string, fullName: string, phoneNumber?: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, fullName, phoneNumber }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  return res.json() as Promise<{ token: string; user: ApiUser; requiresVerification?: boolean }>;
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json() as Promise<{ token: string; user: ApiUser }>;
}

export async function apiLoginWithPhone(phoneNumber: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json() as Promise<{ token: string; user: ApiUser }>;
}

export async function apiSignupWithPhone(phoneNumber: string, password: string, fullName: string) {
  const res = await fetch(`${API_BASE}/auth/signup-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, password, fullName }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  return res.json() as Promise<{ requiresVerification: boolean; message: string }>;
}

export async function apiForgotPassword(emailOrPhone: string) {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrPhone }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Forgot password failed');
  return res.json() as Promise<{ message: string; method: 'email' | 'sms' | 'whatsapp' }>;
}

export async function apiVerifyCode(emailOrPhone: string, code: string, type: 'email' | 'phone') {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrPhone, code, type }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Verification failed');
  return res.json() as Promise<{ verified: boolean; message: string }>;
}

export async function apiResendCode(emailOrPhone: string, type: 'email' | 'phone') {
  const res = await fetch(`${API_BASE}/auth/resend-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrPhone, type }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Resend code failed');
  return res.json() as Promise<{ message: string }>;
}

export async function apiMe() {
  const res = await fetch(`${API_BASE}/auth/me`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json() as Promise<{ user: ApiUser }>;
}

export async function apiCreatePickup(payload: any) {
  const res = await fetch(`${API_BASE}/pickups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Pickup failed');
  return res.json();
}

export async function apiCreateOrder(payload: any) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Order failed');
  return res.json();
}

export async function apiAdminUpdate(table: 'pickups' | 'orders', id: string, status: string) {
  const res = await fetch(`${API_BASE}/admin/${table}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Update failed');
  return res.json();
}



















