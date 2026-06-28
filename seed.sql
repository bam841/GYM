-- seed.sql
-- Dummy data for testing the Gym Management System locally

-- 1. Seed Default Admin Account
-- Locally, we use 'admin123' as password hash for simple testing verification
INSERT INTO admins (id, email, password_hash, admin_name)
VALUES (
  'a0000000-0000-0000-0000-000000000001', 
  'admin@gymkotofitness.com', 
  'admin123', 
  'Coach Marco'
)
ON CONFLICT (email) DO NOTHING;

-- 2. Seed Default Members
INSERT INTO members (id, name, phone_number)
VALUES 
  ('d0000000-0000-0000-0000-000000000001', 'Juan Dela Cruz', '+63 917 123 4567'),
  ('d0000000-0000-0000-0000-000000000002', 'Maria Clara', '+63 918 765 4321'),
  ('d0000000-0000-0000-0000-000000000003', 'Jose Rizal', '+63 919 999 8888')
ON CONFLICT (phone_number) DO NOTHING;

-- 3. Seed Default Bookings
INSERT INTO bookings (book_id, member_id, book_type, cost, status, date_booked)
VALUES
  (
    'b0000000-0000-0000-0000-000000000001', 
    'd0000000-0000-0000-0000-000000000001', 
    'MONTHLY_BASIC', 
    800.00, 
    'COMPLETED', 
    CURRENT_TIMESTAMP - INTERVAL '10 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000002', 
    'd0000000-0000-0000-0000-000000000002', 
    'WEEKLY_TREADMILL', 
    500.00, 
    'PENDING', 
    CURRENT_TIMESTAMP - INTERVAL '2 days'
  ),
  (
    'b0000000-0000-0000-0000-000000000003', 
    'd0000000-0000-0000-0000-000000000003', 
    'DAILY_BASIC', 
    100.00, 
    'COMPLETED', 
    CURRENT_TIMESTAMP - INTERVAL '1 day'
  )
ON CONFLICT (book_id) DO NOTHING;

-- 4. Seed Active Memberships for completed monthly members
INSERT INTO active_memberships (member_id, membership_type, start_date, end_date)
VALUES
  (
    'd0000000-0000-0000-0000-000000000001', 
    'MONTHLY_BASIC', 
    CURRENT_TIMESTAMP - INTERVAL '10 days', 
    CURRENT_TIMESTAMP + INTERVAL '20 days'
  )
ON CONFLICT (member_id) DO NOTHING;
