-- schema.sql
-- Source of Truth for the Gym Management System Database

-- Enable UUID extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  admin_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Members Table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. Bookings Table (Anonymous submission leads that get processed by admins)
CREATE TABLE IF NOT EXISTS bookings (
  book_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  book_type VARCHAR(50) NOT NULL, -- 'DAILY', 'WEEKLY', 'MONTHLY'
  cost NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING' NOT NULL, -- 'PENDING', 'COMPLETED', 'CANCELLED'
  date_booked TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  processed_by UUID REFERENCES admins(id) ON DELETE SET NULL
);

-- 4. Active Memberships Table (Tracks current valid window)
CREATE TABLE IF NOT EXISTS active_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID UNIQUE NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  membership_type VARCHAR(50) NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL
);

-- 5. Renewals Table (Historical ledger of payments/extensions)
CREATE TABLE IF NOT EXISTS renewals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  amount_paid NUMERIC(10, 2) NOT NULL,
  previous_end_date TIMESTAMPTZ,
  new_end_date TIMESTAMPTZ NOT NULL,
  renewed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Indices for performance optimization
CREATE INDEX IF NOT EXISTS idx_bookings_member ON bookings(member_id);
CREATE INDEX IF NOT EXISTS idx_memberships_member ON active_memberships(member_id);
CREATE INDEX IF NOT EXISTS idx_renewals_member ON renewals(member_id);
