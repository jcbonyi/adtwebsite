-- ADT Insurance Customer Portal Schema
-- Run in Supabase SQL Editor

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies
CREATE TABLE IF NOT EXISTS policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  product TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  insurer TEXT,
  status TEXT DEFAULT 'active',
  premium DECIMAL,
  start_date DATE,
  expiry_date DATE,
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own policies" ON policies FOR SELECT USING (auth.uid() = user_id);

-- Claims
CREATE TABLE IF NOT EXISTS claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  policy_id UUID REFERENCES policies(id),
  claim_number TEXT NOT NULL UNIQUE,
  incident_type TEXT,
  incident_date DATE,
  status TEXT DEFAULT 'submitted',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own claims" ON claims FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own claims" ON claims FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Claim updates
CREATE TABLE IF NOT EXISTS claim_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  claim_id UUID REFERENCES claims(id) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE claim_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own claim updates" ON claim_updates FOR SELECT
  USING (EXISTS (SELECT 1 FROM claims WHERE claims.id = claim_updates.claim_id AND claims.user_id = auth.uid()));

-- Knowledge base vectors (for RAG)
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS knowledge_embeddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
