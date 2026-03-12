## Supabase Customer Account Plan

### Stack
- Frontend: current static site on GitHub Pages
- Auth: Supabase Auth
- Database: Supabase Postgres
- Scope for this phase: customer login, register, profile edit, password reset, account deletion flow

### Data model
- `auth.users`
  - managed by Supabase Auth
  - primary source for authentication state and email ownership
- `public.profiles`
  - one-to-one with `auth.users`
  - customer-facing profile data
- `public.customer_preferences`
  - optional extension table for store preference and marketing consent

### Recommended columns
#### `public.profiles`
- `id uuid primary key`
- `full_name text not null`
- `display_name text`
- `email text not null`
- `status text not null default 'active'`
- `favorite_store text`
- `newsletter_opt_in boolean not null default false`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`
- `deleted_at timestamptz`

#### `public.customer_preferences`
- `profile_id uuid primary key`
- `preferred_scent_family text`
- `preferred_experience text`
- `notes text`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### RLS direction
- authenticated users can read only their own profile
- authenticated users can update only their own profile
- inserts are allowed only for the signed-in user id
- deleted accounts should be soft-deleted first with `deleted_at`

### UI mapping
- Login modal
  - `signInWithPassword`
- Register modal
  - `signUp`
  - then insert profile row
- Forgot password modal
  - `resetPasswordForEmail`
- My Account modal
  - `select * from profiles where id = auth.uid()`
- Profile edit modal
  - `update profiles`
- Password change modal
  - `updateUser`
- Delete account modal
  - first set `deleted_at`
  - then optional admin-side cleanup later

### Implementation order
1. Add Supabase client bootstrap and env handling
2. Replace modal mock values with live session/profile data
3. Wire login/register/reset flows
4. Wire profile update flow
5. Add soft-delete action and logout
