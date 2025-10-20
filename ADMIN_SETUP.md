# Admin Setup Guide

This guide explains how to make a user an admin in your EcoCompost application.

## Making Someone an Admin

Since this is the first setup, you'll need to manually assign admin role to users through the backend.

### Method 1: Using Backend (Recommended)

1. Open your backend dashboard
2. Go to the SQL Editor
3. Run this query to make a user an admin (replace the email):

```sql
-- First, find the user's ID
SELECT id, email FROM auth.users WHERE email = 'admin@example.com';

-- Then insert admin role (use the ID from above)
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

### Method 2: Direct Database Access

If you have direct database access:

```sql
-- Make a user admin by email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'admin@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Features Available to Admins

Once a user has admin privileges, they can:

1. **Access Admin Dashboard**: Available in the account menu after login
2. **Manage Pickups**: View all pickup requests and update their status
3. **Manage Orders**: View all product orders and mark them as delivered
4. **Configure MongoDB**: Set up MongoDB connection for backend integration

## Security Notes

- Admin access is controlled server-side through Row Level Security (RLS) policies
- Only users with the 'admin' role in the `user_roles` table can access admin features
- Admin status is checked on every request to ensure security

## Default Roles

- **customer**: Assigned automatically to all new signups
- **admin**: Must be manually assigned (see above)

## Testing

To test admin functionality:

1. Create a regular account through signup
2. Use one of the methods above to grant admin role
3. Logout and login again
4. The "Admin Dashboard" option will appear in the account menu
