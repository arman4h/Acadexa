-- Run this SQL in your Supabase SQL Editor
-- If tables already exist, drop them first and recreate with RLS policies

DROP TABLE IF EXISTS contribution CASCADE;
DROP TABLE IF EXISTS resource CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS admin_credential CASCADE;
DROP TABLE IF EXISTS admin_user CASCADE;

CREATE TABLE course (
  id BIGSERIAL PRIMARY KEY,
  trimester INTEGER NOT NULL CHECK (trimester >= 1 AND trimester <= 12),
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE resource (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT REFERENCES course(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  author TEXT,
  contributor_name TEXT,
  contributor_url TEXT
);

CREATE TABLE contribution (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT REFERENCES course(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  author TEXT,
  contributor_name TEXT,
  contributor_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admin_user (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admin_credential (
  id BIGSERIAL PRIMARY KEY,
  admin_user_id BIGINT NOT NULL REFERENCES admin_user(id) ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE activity_log (
  id BIGSERIAL PRIMARY KEY,
  actor_id BIGINT REFERENCES admin_user(id) ON DELETE SET NULL,
  actor_username TEXT NOT NULL,
  actor_role TEXT NOT NULL CHECK (actor_role IN ('super_admin', 'admin')),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies

ALTER TABLE course ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credential ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on resource table if they exist
DROP POLICY IF EXISTS "Public read access for resources" ON resource;
DROP POLICY IF EXISTS "Allow all inserts for resources" ON resource;
DROP POLICY IF EXISTS "Allow all updates for resources" ON resource;
DROP POLICY IF EXISTS "Allow all deletes for resources" ON resource;

CREATE POLICY "Public read access for resources"
  ON resource FOR SELECT
  USING (true);

CREATE POLICY "Allow all inserts for resources"
  ON resource FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all updates for resources"
  ON resource FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all deletes for resources"
  ON resource FOR DELETE
  USING (true);

-- Course policies
DROP POLICY IF EXISTS "Public read access for courses" ON course;
DROP POLICY IF EXISTS "Allow all inserts for courses" ON course;
DROP POLICY IF EXISTS "Allow all updates for courses" ON course;
DROP POLICY IF EXISTS "Allow all deletes for courses" ON course;

CREATE POLICY "Public read access for courses"
  ON course FOR SELECT USING (true);

CREATE POLICY "Allow all inserts for courses"
  ON course FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all updates for courses"
  ON course FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow all deletes for courses"
  ON course FOR DELETE USING (true);

-- Contribution policies
DROP POLICY IF EXISTS "Public read access for contributions" ON contribution;
DROP POLICY IF EXISTS "Allow all inserts for contributions" ON contribution;
DROP POLICY IF EXISTS "Allow all updates for contributions" ON contribution;
DROP POLICY IF EXISTS "Allow all deletes for contributions" ON contribution;

CREATE POLICY "Public read access for contributions"
  ON contribution FOR SELECT USING (true);

CREATE POLICY "Allow all inserts for contributions"
  ON contribution FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all updates for contributions"
  ON contribution FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow all deletes for contributions"
  ON contribution FOR DELETE USING (true);

-- Admin policies
DROP POLICY IF EXISTS "Admin read access" ON admin_user;
DROP POLICY IF EXISTS "Admin write access" ON admin_user;
DROP POLICY IF EXISTS "Credential access" ON admin_credential;
DROP POLICY IF EXISTS "Activity log read access" ON activity_log;
DROP POLICY IF EXISTS "Activity log write access" ON activity_log;

CREATE POLICY "Admin read access"
  ON admin_user FOR SELECT USING (true);

CREATE POLICY "Admin write access"
  ON admin_user FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Credential access"
  ON admin_credential FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Activity log read access"
  ON activity_log FOR SELECT USING (true);

CREATE POLICY "Activity log write access"
  ON activity_log FOR INSERT WITH CHECK (true);
