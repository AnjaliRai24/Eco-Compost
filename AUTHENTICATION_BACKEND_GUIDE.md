# Authentication Backend Implementation Guide

This guide explains how to implement the backend functionality for the enhanced authentication system with mobile login, forgot password, and verification features.

## Required Backend Endpoints

### 1. Enhanced Signup Endpoint
**POST** `/api/auth/signup`

```typescript
interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

interface SignupResponse {
  token: string;
  user: ApiUser;
  requiresVerification?: boolean;
}
```

**Implementation Notes:**
- If `phoneNumber` is provided, send SMS/WhatsApp verification code
- If `email` is provided, send email verification code
- Return `requiresVerification: true` if verification is needed
- Generate JWT token only after verification (if required)

### 2. Mobile Phone Signup Endpoint
**POST** `/api/auth/signup-phone`

```typescript
interface PhoneSignupRequest {
  phoneNumber: string;
  password: string;
  fullName: string;
}

interface PhoneSignupResponse {
  requiresVerification: boolean;
  message: string;
}
```

**Implementation Notes:**
- Validate phone number format
- Send SMS/WhatsApp verification code
- Don't create user account until verification is complete

### 3. Mobile Phone Login Endpoint
**POST** `/api/auth/login-phone`

```typescript
interface PhoneLoginRequest {
  phoneNumber: string;
  password: string;
}

interface PhoneLoginResponse {
  token: string;
  user: ApiUser;
}
```

**Implementation Notes:**
- Authenticate using phone number and password
- Return JWT token and user data

### 4. Forgot Password Endpoint
**POST** `/api/auth/forgot-password`

```typescript
interface ForgotPasswordRequest {
  emailOrPhone: string;
}

interface ForgotPasswordResponse {
  message: string;
  method: 'email' | 'sms' | 'whatsapp';
}
```

**Implementation Notes:**
- Detect if input is email or phone number
- Generate reset code and store temporarily
- Send code via appropriate method (email/SMS/WhatsApp)
- Return the method used for verification

### 5. Verification Code Endpoint
**POST** `/api/auth/verify`

```typescript
interface VerifyRequest {
  emailOrPhone: string;
  code: string;
  type: 'email' | 'phone';
}

interface VerifyResponse {
  verified: boolean;
  message: string;
}
```

**Implementation Notes:**
- Verify the code against stored temporary code
- If verified and it's a signup verification, create the user account
- If verified and it's a password reset, allow password reset

### 6. Resend Code Endpoint
**POST** `/api/auth/resend-code`

```typescript
interface ResendCodeRequest {
  emailOrPhone: string;
  type: 'email' | 'phone';
}

interface ResendCodeResponse {
  message: string;
}
```

## SMS/WhatsApp Integration

### SMS Service Integration (Recommended: Twilio)
```typescript
import twilio from 'twilio';

const client = twilio(accountSid, authToken);

async function sendSMS(phoneNumber: string, message: string) {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    throw new Error('Failed to send SMS');
  }
}
```

### WhatsApp Integration (Twilio WhatsApp API)
```typescript
async function sendWhatsApp(phoneNumber: string, message: string) {
  try {
    const result = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: `whatsapp:${phoneNumber}`
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    throw new Error('Failed to send WhatsApp message');
  }
}
```

## Email Service Integration

### Email Service (Recommended: SendGrid, Nodemailer)
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to: string, subject: string, html: string) {
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    throw new Error('Failed to send email');
  }
}
```

## Verification Code Management

### Database Schema for Verification Codes
```sql
CREATE TABLE verification_codes (
  id SERIAL PRIMARY KEY,
  email_or_phone VARCHAR(255) NOT NULL,
  code VARCHAR(10) NOT NULL,
  type VARCHAR(10) NOT NULL, -- 'email' or 'phone'
  purpose VARCHAR(20) NOT NULL, -- 'signup', 'reset', 'login'
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  used BOOLEAN DEFAULT FALSE
);
```

### Code Generation and Storage
```typescript
import crypto from 'crypto';

function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

async function storeVerificationCode(
  emailOrPhone: string, 
  code: string, 
  type: 'email' | 'phone',
  purpose: 'signup' | 'reset' | 'login'
) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  await db.query(
    'INSERT INTO verification_codes (email_or_phone, code, type, purpose, expires_at) VALUES ($1, $2, $3, $4, $5)',
    [emailOrPhone, code, type, purpose, expiresAt]
  );
}
```

## Sample Implementation for Node.js/Express

### Enhanced Auth Routes
```typescript
// routes/auth.ts
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Signup with email or phone
router.post('/signup', async (req, res) => {
  try {
    const { email, password, fullName, phoneNumber } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate verification code
    const verificationCode = generateVerificationCode();
    
    if (phoneNumber) {
      // Send SMS/WhatsApp verification
      await sendSMS(phoneNumber, `Your EcoCompost verification code is: ${verificationCode}`);
      await storeVerificationCode(phoneNumber, verificationCode, 'phone', 'signup');
      
      return res.json({
        requiresVerification: true,
        message: 'Verification code sent to your phone'
      });
    } else {
      // Send email verification
      await sendEmail(email, 'Verify Your EcoCompost Account', `
        <h2>Welcome to EcoCompost!</h2>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `);
      await storeVerificationCode(email, verificationCode, 'email', 'signup');
      
      return res.json({
        requiresVerification: true,
        message: 'Verification code sent to your email'
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify code
router.post('/verify', async (req, res) => {
  try {
    const { emailOrPhone, code, type } = req.body;
    
    // Check if code is valid and not expired
    const result = await db.query(
      'SELECT * FROM verification_codes WHERE email_or_phone = $1 AND code = $2 AND type = $3 AND expires_at > NOW() AND used = FALSE',
      [emailOrPhone, code, type]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }
    
    // Mark code as used
    await db.query(
      'UPDATE verification_codes SET used = TRUE WHERE id = $1',
      [result.rows[0].id]
    );
    
    // If this is a signup verification, create the user account
    if (result.rows[0].purpose === 'signup') {
      // Create user account logic here
      const user = await createUserAccount(emailOrPhone, result.rows[0].type);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      
      return res.json({
        verified: true,
        token,
        user
      });
    }
    
    return res.json({ verified: true, message: 'Code verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { emailOrPhone } = req.body;
    
    // Check if user exists
    const user = await findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate reset code
    const resetCode = generateVerificationCode();
    await storeVerificationCode(emailOrPhone, resetCode, 
      isEmail(emailOrPhone) ? 'email' : 'phone', 'reset');
    
    if (isEmail(emailOrPhone)) {
      await sendEmail(emailOrPhone, 'Reset Your EcoCompost Password', `
        <h2>Password Reset Request</h2>
        <p>Your password reset code is: <strong>${resetCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `);
      
      return res.json({
        message: 'Reset code sent to your email',
        method: 'email'
      });
    } else {
      await sendSMS(emailOrPhone, `Your EcoCompost password reset code is: ${resetCode}`);
      
      return res.json({
        message: 'Reset code sent to your phone',
        method: 'sms'
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
```

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ecocompost

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Email Service
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@ecocompost.com

# SMS/WhatsApp Service (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# WhatsApp (Twilio)
WHATSAPP_PHONE_NUMBER=+14155238886
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting for verification code requests
2. **Code Expiration**: Set short expiration times (5-10 minutes) for verification codes
3. **Code Reuse Prevention**: Mark codes as used after verification
4. **Input Validation**: Validate email and phone number formats
5. **Password Hashing**: Always hash passwords before storing
6. **JWT Security**: Use secure JWT secrets and appropriate expiration times

## Testing the Implementation

1. **Test Email Signup**: Verify email verification flow
2. **Test Phone Signup**: Verify SMS/WhatsApp verification flow
3. **Test Forgot Password**: Verify reset code functionality
4. **Test Login**: Verify both email and phone login
5. **Test Code Expiration**: Verify codes expire after specified time
6. **Test Rate Limiting**: Verify rate limiting works correctly

This implementation provides a complete authentication system with mobile support, forgot password functionality, and multi-channel verification (email, SMS, WhatsApp).
