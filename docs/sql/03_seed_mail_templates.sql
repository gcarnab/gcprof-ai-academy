INSERT INTO public.mail_templates (
        template_key,
        name,
        description,
        subject,
        title_override,
        body_text_override
    )
VALUES (
        'WELCOME',
        'Email di Benvenuto',
        'Inviata dopo la registrazione.',
        'Benvenuto su {{academy_name}}',
        'Benvenuto!',
        'Ciao {{first_name}},

siamo felici di averti nella nostra Academy.'
    ),
    (
        'PASSWORD_RESET',
        'Recupero Password',
        'Inviata durante il reset password.',
        'Recupera la tua password',
        'Reset Password',
        'Hai richiesto il recupero della password.

Utilizza il link sottostante.'
    ),
    (
        'CONTACT_REPLY',
        'Risposta Contatti',
        'Risposta automatica del form Contatti.',
        'Abbiamo ricevuto il tuo messaggio',
        'Grazie per averci contattato',
        'Ti risponderemo nel più breve tempo possibile.'
    ) ON CONFLICT (template_key) DO NOTHING;