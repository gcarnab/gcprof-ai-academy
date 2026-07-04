-- ============================================================
-- GCPROF AI Academy
-- Mail Center V1
-- ============================================================
-- ============================================================
-- TABLE: mail_settings
-- Configurazione globale del sistema di posta
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mail_settings (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.mail_settings ENABLE ROW LEVEL SECURITY;
-- ============================================================
-- TABLE: mail_templates
-- Configurazione dei template email
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mail_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_key TEXT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    subject VARCHAR(255) NOT NULL,
    title_override VARCHAR(255),
    body_text_override TEXT,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES public.profiles(id) ON DELETE
    SET NULL
);
ALTER TABLE public.mail_templates ENABLE ROW LEVEL SECURITY;
-- ============================================================
-- TABLE: mail_logs
-- Storico invii
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mail_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_key TEXT NOT NULL,
    recipient TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT NOT NULL,
    provider TEXT NOT NULL DEFAULT 'RESEND',
    provider_id TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.mail_logs ENABLE ROW LEVEL SECURITY;
-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_mail_templates_key ON public.mail_templates(template_key);
CREATE INDEX IF NOT EXISTS idx_mail_logs_template ON public.mail_logs(template_key);
CREATE INDEX IF NOT EXISTS idx_mail_logs_recipient ON public.mail_logs(recipient);
CREATE INDEX IF NOT EXISTS idx_mail_logs_created ON public.mail_logs(created_at DESC);
-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS trigger AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_mail_settings_updated_at ON public.mail_settings;
CREATE TRIGGER trg_mail_settings_updated_at BEFORE
UPDATE ON public.mail_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS trg_mail_templates_updated_at ON public.mail_templates;
CREATE TRIGGER trg_mail_templates_updated_at BEFORE
UPDATE ON public.mail_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
-- ============================================================
-- RLS POLICIES
-- ============================================================
CREATE POLICY "Admin Full Access Mail Settings" ON public.mail_settings FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid()
            AND role = 'admin'
    )
);
CREATE POLICY "Admin Full Access Mail Templates" ON public.mail_templates FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid()
            AND role = 'admin'
    )
);
CREATE POLICY "Admin Full Access Mail Logs" ON public.mail_logs FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid()
            AND role = 'admin'
    )
);