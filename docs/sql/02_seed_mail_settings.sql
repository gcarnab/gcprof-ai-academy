INSERT INTO public.mail_settings (id, value)
VALUES ('MAIL_FROM_NAME', 'GCPROF AI Academy'),
    (
        'MAIL_FROM_EMAIL',
        'noreply@gcprof-ai-academy.it'
    ),
    ('MAIL_REPLY_TO', 'support@gcprof-ai-academy.it'),
    ('ACADEMY_NAME', 'GCPROF AI Academy'),
    ('PRIMARY_COLOR', '#2563eb'),
    ('SECONDARY_COLOR', '#1e293b') ON CONFLICT (id) DO NOTHING;