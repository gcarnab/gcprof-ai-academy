-- =============================================================================
-- GCPROF AI ACADEMY
-- FEATURE PAYMENTS
-- =============================================================================
--
-- File........: payments_schema.sql
-- Parte.......: 1/4
-- Database....: PostgreSQL / Supabase
-- Architettura: Clean Architecture + Domain Driven Design
-- Compatibilità: PostgreSQL 15+
--
-- DESCRIZIONE
-- -----------------------------------------------------------------------------
-- Questo script introduce la nuova feature Payments senza modificare la logica
-- esistente dell'applicazione.
--
-- Tutte le tabelle sono additive.
--
-- L'unica tabella esistente modificata è:
--
--     courses
--
-- che viene estesa con le informazioni commerciali.
--
-- L'abilitazione ai corsi continuerà ad utilizzare la tabella:
--
--     profile_courses
--
-- garantendo la totale retrocompatibilità con la piattaforma esistente.
--
-- =============================================================================

BEGIN;

-- =============================================================================
-- ENUM TYPES
-- =============================================================================

DO $$
BEGIN
    CREATE TYPE public.order_status_enum AS ENUM
    (
        'PENDING',
        'CHECKOUT_CREATED',
        'PAYMENT_PROCESSING',
        'PAID',
        'FULFILLED',
        'FAILED',
        'EXPIRED',
        'CANCELLED',
        'REFUNDED'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

------------------------------------------------------------

DO $$
BEGIN
    CREATE TYPE public.payment_status_enum AS ENUM
    (
        'CREATED',
        'AUTHORIZED',
        'CAPTURED',
        'FAILED',
        'REFUNDED'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

------------------------------------------------------------

DO $$
BEGIN
    CREATE TYPE public.discount_type_enum AS ENUM
    (
        'PERCENTAGE',
        'FIXED'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

------------------------------------------------------------

DO $$
BEGIN
    CREATE TYPE public.payment_provider_enum AS ENUM
    (
        'STRIPE',
        'PAYPAL',
        'MOLLIE'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

------------------------------------------------------------

DO $$
BEGIN
    CREATE TYPE public.currency_enum AS ENUM
    (
        'EUR',
        'USD',
        'GBP'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

------------------------------------------------------------

DO $$
BEGIN
    CREATE TYPE public.cart_status_enum AS ENUM
    (
        'ACTIVE',
        'CHECKOUT',
        'ABANDONED',
        'EXPIRED'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

-- =============================================================================
-- ESTENSIONE TABELLA COURSES
-- =============================================================================

ALTER TABLE public.courses

ADD COLUMN IF NOT EXISTS price NUMERIC(10,2)
DEFAULT 0.00
NOT NULL,

ADD COLUMN IF NOT EXISTS currency public.currency_enum
DEFAULT 'EUR'
NOT NULL,

ADD COLUMN IF NOT EXISTS is_paid BOOLEAN
DEFAULT FALSE
NOT NULL,

ADD COLUMN IF NOT EXISTS stripe_product_id TEXT,

ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;

COMMENT ON COLUMN public.courses.price
IS 'Prezzo del corso';

COMMENT ON COLUMN public.courses.currency
IS 'Valuta del corso';

COMMENT ON COLUMN public.courses.is_paid
IS 'TRUE se il corso è acquistabile';

COMMENT ON COLUMN public.courses.stripe_product_id
IS 'Stripe Product ID';

COMMENT ON COLUMN public.courses.stripe_price_id
IS 'Stripe Price ID';

-- =============================================================================
-- SHOPPING CARTS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.shopping_carts
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    status public.cart_status_enum
        DEFAULT 'ACTIVE'
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    updated_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    CONSTRAINT uq_cart_profile
        UNIQUE(profile_id)
);

COMMENT ON TABLE public.shopping_carts
IS 'Carrello persistente dello studente';

------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.shopping_cart_items
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    cart_id UUID NOT NULL
        REFERENCES public.shopping_carts(id)
        ON DELETE CASCADE,

    course_id UUID NOT NULL
        REFERENCES public.courses(id)
        ON DELETE CASCADE,

    unit_price NUMERIC(10,2)
        NOT NULL,

    quantity INTEGER
        DEFAULT 1
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    updated_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    CONSTRAINT uq_cart_course
        UNIQUE(cart_id, course_id)
);

COMMENT ON TABLE public.shopping_cart_items
IS 'Snapshot dei corsi presenti nel carrello';

-- =============================================================================
-- COUPONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.coupons
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    code VARCHAR(50)
        NOT NULL
        UNIQUE,

    description TEXT,

    discount_type public.discount_type_enum
        NOT NULL,

    discount_value NUMERIC(10,2)
        NOT NULL,

    valid_from TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    valid_to TIMESTAMPTZ,

    max_redemptions INTEGER,

    current_redemptions INTEGER
        DEFAULT 0
        NOT NULL,

    is_active BOOLEAN
        DEFAULT TRUE
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    updated_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL
);

COMMENT ON TABLE public.coupons
IS 'Coupon promozionali';

-- =============================================================================
-- PAYMENT SETTINGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.payment_settings
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    provider public.payment_provider_enum
        DEFAULT 'STRIPE'
        NOT NULL,

    sandbox_enabled BOOLEAN
        DEFAULT TRUE
        NOT NULL,

    default_currency public.currency_enum
        DEFAULT 'EUR'
        NOT NULL,

    vat_percentage NUMERIC(5,2)
        DEFAULT 0.00
        NOT NULL,

    allow_coupons BOOLEAN
        DEFAULT TRUE
        NOT NULL,

    academy_country VARCHAR(2)
        DEFAULT 'IT'
        NOT NULL,

    checkout_session_expire_minutes INTEGER
        DEFAULT 30
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    updated_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL
);

COMMENT ON TABLE public.payment_settings
IS 'Configurazione funzionale della feature Payments';

COMMENT ON COLUMN public.payment_settings.provider
IS 'Provider attualmente attivo';

COMMENT ON COLUMN public.payment_settings.sandbox_enabled
IS 'TRUE = ambiente di test';

COMMENT ON COLUMN public.payment_settings.default_currency
IS 'Valuta predefinita';

COMMENT ON COLUMN public.payment_settings.vat_percentage
IS 'IVA applicata agli ordini';

COMMENT ON COLUMN public.payment_settings.allow_coupons
IS 'Abilita/disabilita i coupon';

COMMENT ON COLUMN public.payment_settings.checkout_session_expire_minutes
IS 'Durata massima della checkout session';

-- =============================================================================
-- GCPROF AI ACADEMY
-- FEATURE PAYMENTS
-- payments_schema.sql
--
-- PART 2 / 4
--
-- Contenuto:
--   - ORDERS
--   - ORDER_ITEMS
--   - COUPON_REDEMPTIONS
--   - PAYMENTS
--   - PAYMENT_LOGS
-- =============================================================================

-- =============================================================================
-- ORDERS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.orders
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    order_number VARCHAR(50)
        NOT NULL
        UNIQUE,

    profile_id UUID
        NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE RESTRICT,

    status public.order_status_enum
        DEFAULT 'PENDING'
        NOT NULL,

    subtotal NUMERIC(10,2)
        DEFAULT 0.00
        NOT NULL,

    discount NUMERIC(10,2)
        DEFAULT 0.00
        NOT NULL,

    tax NUMERIC(10,2)
        DEFAULT 0.00
        NOT NULL,

    total NUMERIC(10,2)
        DEFAULT 0.00
        NOT NULL,

    currency public.currency_enum
        DEFAULT 'EUR'
        NOT NULL,

    payment_provider public.payment_provider_enum
        DEFAULT 'STRIPE'
        NOT NULL,

    payment_provider_order_id TEXT,

    coupon_id UUID
        REFERENCES public.coupons(id)
        ON DELETE SET NULL,

    metadata JSONB
        DEFAULT '{}'::jsonb
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    updated_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL
);

COMMENT ON TABLE public.orders
IS 'Ordini generati dal checkout';

COMMENT ON COLUMN public.orders.order_number
IS 'Numero ordine leggibile (es. ORD-2026-000001)';

COMMENT ON COLUMN public.orders.payment_provider_order_id
IS 'Identificativo restituito dal provider';

COMMENT ON COLUMN public.orders.metadata
IS 'Informazioni aggiuntive (browser, IP, user agent, note...)';

-- =============================================================================
-- ORDER ITEMS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.order_items
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    order_id UUID
        NOT NULL
        REFERENCES public.orders(id)
        ON DELETE CASCADE,

    course_id UUID
        NOT NULL
        REFERENCES public.courses(id)
        ON DELETE RESTRICT,

    course_title_snapshot TEXT
        NOT NULL,

    unit_price NUMERIC(10,2)
        NOT NULL,

    quantity INTEGER
        DEFAULT 1
        NOT NULL,

    line_total NUMERIC(10,2)
        NOT NULL,

    metadata JSONB
        DEFAULT '{}'::jsonb
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL
);

COMMENT ON TABLE public.order_items
IS 'Snapshot dei corsi acquistati';

COMMENT ON COLUMN public.order_items.course_title_snapshot
IS 'Titolo del corso al momento dell''acquisto';

COMMENT ON COLUMN public.order_items.metadata
IS 'Snapshot estendibile del corso';

-- =============================================================================
-- COUPON REDEMPTIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.coupon_redemptions
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    coupon_id UUID
        NOT NULL
        REFERENCES public.coupons(id)
        ON DELETE RESTRICT,

    profile_id UUID
        NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE RESTRICT,

    order_id UUID
        NOT NULL
        REFERENCES public.orders(id)
        ON DELETE CASCADE,

    redeemed_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    CONSTRAINT uq_coupon_order
        UNIQUE(coupon_id, order_id)
);

COMMENT ON TABLE public.coupon_redemptions
IS 'Storico utilizzo coupon';

-- =============================================================================
-- PAYMENTS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.payments
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    order_id UUID
        NOT NULL
        REFERENCES public.orders(id)
        ON DELETE CASCADE,

    provider public.payment_provider_enum
        DEFAULT 'STRIPE'
        NOT NULL,

    provider_payment_id TEXT
        UNIQUE,

    provider_checkout_session_id TEXT
        UNIQUE,

    provider_event_id TEXT,

    status public.payment_status_enum
        DEFAULT 'CREATED'
        NOT NULL,

    amount NUMERIC(10,2)
        NOT NULL,

    currency public.currency_enum
        DEFAULT 'EUR'
        NOT NULL,

    transaction_reference TEXT,

    failure_reason TEXT,

    paid_at TIMESTAMPTZ,

    raw_response JSONB
        DEFAULT '{}'::jsonb
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL,

    updated_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL
);

COMMENT ON TABLE public.payments
IS 'Transazioni economiche';

COMMENT ON COLUMN public.payments.provider_payment_id
IS 'Payment Intent / Charge ID';

COMMENT ON COLUMN public.payments.provider_checkout_session_id
IS 'Checkout Session ID';

COMMENT ON COLUMN public.payments.provider_event_id
IS 'Ultimo evento webhook associato';

COMMENT ON COLUMN public.payments.failure_reason
IS 'Motivo dell''eventuale fallimento';

COMMENT ON COLUMN public.payments.raw_response
IS 'Payload completo restituito dal provider';

-- =============================================================================
-- PAYMENT LOGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.payment_logs
(
    id UUID PRIMARY KEY
        DEFAULT gen_random_uuid(),

    provider public.payment_provider_enum
        DEFAULT 'STRIPE'
        NOT NULL,

    provider_event_id TEXT
        UNIQUE,

    event VARCHAR(120)
        NOT NULL,

    payload JSONB
        DEFAULT '{}'::jsonb
        NOT NULL,

    processed BOOLEAN
        DEFAULT FALSE
        NOT NULL,

    processed_at TIMESTAMPTZ,

    error TEXT,

    created_at TIMESTAMPTZ
        DEFAULT NOW()
        NOT NULL
);

COMMENT ON TABLE public.payment_logs
IS 'Audit trail dei webhook ricevuti';

COMMENT ON COLUMN public.payment_logs.provider_event_id
IS 'Evento univoco del provider';

COMMENT ON COLUMN public.payment_logs.processed
IS 'TRUE se il webhook è stato elaborato';

COMMENT ON COLUMN public.payment_logs.processed_at
IS 'Timestamp di elaborazione';

COMMENT ON COLUMN public.payment_logs.payload
IS 'Payload originale ricevuto dal provider';


-- =============================================================================
-- GCPROF AI ACADEMY
-- FEATURE PAYMENTS
-- payments_schema.sql
--
-- PART 3 / 4
--
-- Contenuto:
--   - PERFORMANCE INDEXES
--   - FUNCTIONS
--   - TRIGGERS
--   - HELPERS
-- =============================================================================


-- =============================================================================
-- PERFORMANCE INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_shopping_carts_profile
ON public.shopping_carts(profile_id);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart
ON public.shopping_cart_items(cart_id);

CREATE INDEX IF NOT EXISTS idx_cart_items_course
ON public.shopping_cart_items(course_id);

------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_orders_profile
ON public.orders(profile_id);

CREATE INDEX IF NOT EXISTS idx_orders_status
ON public.orders(status);

CREATE INDEX IF NOT EXISTS idx_orders_created
ON public.orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_number
ON public.orders(order_number);

------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_order_items_order
ON public.order_items(order_id);

CREATE INDEX IF NOT EXISTS idx_order_items_course
ON public.order_items(course_id);

------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_payments_order
ON public.payments(order_id);

CREATE INDEX IF NOT EXISTS idx_payments_status
ON public.payments(status);

CREATE INDEX IF NOT EXISTS idx_payments_checkout
ON public.payments(provider_checkout_session_id);

CREATE INDEX IF NOT EXISTS idx_payments_provider_payment
ON public.payments(provider_payment_id);

CREATE INDEX IF NOT EXISTS idx_payments_provider_event
ON public.payments(provider_event_id);

------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_coupon_code
ON public.coupons(code);

CREATE INDEX IF NOT EXISTS idx_coupon_active
ON public.coupons(is_active);

------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_coupon
ON public.coupon_redemptions(coupon_id);

CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_profile
ON public.coupon_redemptions(profile_id);

------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_payment_logs_processed
ON public.payment_logs(processed);

CREATE INDEX IF NOT EXISTS idx_payment_logs_event
ON public.payment_logs(provider_event_id);

CREATE INDEX IF NOT EXISTS idx_payment_logs_created
ON public.payment_logs(created_at DESC);


-- =============================================================================
-- GENERIC UPDATED_AT FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.fn_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS
$$
BEGIN

    NEW.updated_at := NOW();

    RETURN NEW;

END;
$$;


-- =============================================================================
-- UPDATED_AT TRIGGERS
-- =============================================================================

DROP TRIGGER IF EXISTS trg_cart_updated_at
ON public.shopping_carts;

CREATE TRIGGER trg_cart_updated_at

BEFORE UPDATE

ON public.shopping_carts

FOR EACH ROW

EXECUTE FUNCTION public.fn_set_updated_at();

------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_cart_items_updated_at
ON public.shopping_cart_items;

CREATE TRIGGER trg_cart_items_updated_at

BEFORE UPDATE

ON public.shopping_cart_items

FOR EACH ROW

EXECUTE FUNCTION public.fn_set_updated_at();

------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_coupon_updated_at
ON public.coupons;

CREATE TRIGGER trg_coupon_updated_at

BEFORE UPDATE

ON public.coupons

FOR EACH ROW

EXECUTE FUNCTION public.fn_set_updated_at();

------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_payment_settings_updated_at
ON public.payment_settings;

CREATE TRIGGER trg_payment_settings_updated_at

BEFORE UPDATE

ON public.payment_settings

FOR EACH ROW

EXECUTE FUNCTION public.fn_set_updated_at();

------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_orders_updated_at
ON public.orders;

CREATE TRIGGER trg_orders_updated_at

BEFORE UPDATE

ON public.orders

FOR EACH ROW

EXECUTE FUNCTION public.fn_set_updated_at();

------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_payments_updated_at
ON public.payments;

CREATE TRIGGER trg_payments_updated_at

BEFORE UPDATE

ON public.payments

FOR EACH ROW

EXECUTE FUNCTION public.fn_set_updated_at();


-- =============================================================================
-- ORDER NUMBER GENERATOR
-- =============================================================================

CREATE SEQUENCE IF NOT EXISTS public.order_number_seq
START WITH 1
INCREMENT BY 1;

------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.fn_generate_order_number()
RETURNS trigger
LANGUAGE plpgsql
AS
$$
BEGIN

    IF NEW.order_number IS NULL
    THEN

        NEW.order_number :=
            'ORD-' ||
            TO_CHAR(NOW(),'YYYY') ||
            '-' ||
            LPAD(nextval('public.order_number_seq')::TEXT,6,'0');

    END IF;

    RETURN NEW;

END;
$$;


DROP TRIGGER IF EXISTS trg_generate_order_number
ON public.orders;

CREATE TRIGGER trg_generate_order_number

BEFORE INSERT

ON public.orders

FOR EACH ROW

EXECUTE FUNCTION public.fn_generate_order_number();


-- =============================================================================
-- PAYMENT STATUS SYNCHRONIZATION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.fn_sync_order_status()
RETURNS trigger
LANGUAGE plpgsql
AS
$$
BEGIN

    IF NEW.status = 'CAPTURED'
    THEN

        UPDATE public.orders

        SET

            status='PAID'

        WHERE

            id=NEW.order_id;

    END IF;

    RETURN NEW;

END;
$$;


DROP TRIGGER IF EXISTS trg_sync_order_status
ON public.payments;

CREATE TRIGGER trg_sync_order_status

AFTER UPDATE OF status

ON public.payments

FOR EACH ROW

WHEN (OLD.status IS DISTINCT FROM NEW.status)

EXECUTE FUNCTION public.fn_sync_order_status();


-- =============================================================================
-- WEBHOOK DUPLICATE PROTECTION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.fn_prevent_duplicate_webhook()
RETURNS trigger
LANGUAGE plpgsql
AS
$$
BEGIN

    IF EXISTS
    (
        SELECT 1

        FROM public.payment_logs

        WHERE provider_event_id = NEW.provider_event_id
    )
    THEN

        RAISE EXCEPTION
        'Webhook event already processed: %',
        NEW.provider_event_id;

    END IF;

    RETURN NEW;

END;
$$;


DROP TRIGGER IF EXISTS trg_prevent_duplicate_webhook
ON public.payment_logs;

CREATE TRIGGER trg_prevent_duplicate_webhook

BEFORE INSERT

ON public.payment_logs

FOR EACH ROW

EXECUTE FUNCTION public.fn_prevent_duplicate_webhook();


-- =============================================================================
-- NOTE
-- =============================================================================
--
-- La logica applicativa NON viene implementata nel database.
--
-- In particolare NON vengono creati trigger che:
--
--     - iscrivono automaticamente ai corsi
--     - modificano profile_courses
--     - inviano email
--     - applicano coupon
--     - svuotano il carrello
--
-- Tutte queste operazioni saranno eseguite dal codice
-- TypeScript tramite:
--
-- EnrollmentService
-- PaymentService
-- CheckoutService
-- Logger
--
-- mantenendo la Clean Architecture.
--
-- =============================================================================

-- =============================================================================
-- GCPROF AI ACADEMY
-- FEATURE PAYMENTS
-- payments_schema.sql
--
-- PART 4 / 4
--
-- Contenuto:
--   - RLS
--   - Policies
--   - Seed iniziale
--   - Commit
-- =============================================================================


-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE public.shopping_carts
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.shopping_cart_items
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.coupons
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.payment_settings
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.orders
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.order_items
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.coupon_redemptions
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.payments
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.payment_logs
ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- ADMIN POLICIES
-- =============================================================================

CREATE POLICY "payments_admin_shopping_carts"

ON public.shopping_carts

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_cart_items"

ON public.shopping_cart_items

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id = auth.uid()
        AND p.role='admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_orders"

ON public.orders

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id=auth.uid()
        AND p.role='admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_order_items"

ON public.order_items

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id=auth.uid()
        AND p.role='admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_payments"

ON public.payments

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id=auth.uid()
        AND p.role='admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_logs"

ON public.payment_logs

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id=auth.uid()
        AND p.role='admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_coupons"

ON public.coupons

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id=auth.uid()
        AND p.role='admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_coupon_redemptions"

ON public.coupon_redemptions

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id=auth.uid()
        AND p.role='admin'
    )
);

------------------------------------------------------------

CREATE POLICY "payments_admin_settings"

ON public.payment_settings

FOR ALL

TO authenticated

USING
(
    EXISTS
    (
        SELECT 1
        FROM public.profiles p
        WHERE p.id=auth.uid()
        AND p.role='admin'
    )
);


-- =============================================================================
-- STUDENT POLICIES
-- =============================================================================

CREATE POLICY "student_cart"

ON public.shopping_carts

FOR ALL

TO authenticated

USING
(
    profile_id = auth.uid()
)

WITH CHECK
(
    profile_id = auth.uid()
);

------------------------------------------------------------

CREATE POLICY "student_cart_items"

ON public.shopping_cart_items

FOR ALL

TO authenticated

USING
(
EXISTS
(
SELECT 1

FROM public.shopping_carts c

WHERE

c.id=shopping_cart_items.cart_id

AND

c.profile_id=auth.uid()
)
);

------------------------------------------------------------

CREATE POLICY "student_orders"

ON public.orders

FOR SELECT

TO authenticated

USING
(
profile_id=auth.uid()
);

------------------------------------------------------------

CREATE POLICY "student_order_items"

ON public.order_items

FOR SELECT

TO authenticated

USING
(
EXISTS
(
SELECT 1

FROM public.orders o

WHERE

o.id=order_items.order_id

AND

o.profile_id=auth.uid()
)
);

------------------------------------------------------------

CREATE POLICY "student_coupon_redemptions"

ON public.coupon_redemptions

FOR SELECT

TO authenticated

USING
(
profile_id=auth.uid()
);

------------------------------------------------------------

CREATE POLICY "student_payments"

ON public.payments

FOR SELECT

TO authenticated

USING
(
EXISTS
(
SELECT 1

FROM public.orders o

WHERE

o.id=payments.order_id

AND

o.profile_id=auth.uid()
)
);


-- =============================================================================
-- DEFAULT PAYMENT SETTINGS
-- =============================================================================

INSERT INTO public.payment_settings
(
provider,
sandbox_enabled,
default_currency,
vat_percentage,
allow_coupons,
academy_country,
checkout_session_expire_minutes
)

SELECT

'STRIPE',

TRUE,

'EUR',

0.00,

TRUE,

'IT',

30

WHERE NOT EXISTS
(
SELECT 1

FROM public.payment_settings
);


-- =============================================================================
-- FINAL NOTES
-- =============================================================================
--
-- Le chiavi segrete NON vengono salvate nel database.
--
-- Rimangono esclusivamente nel file:
--
-- .env
--
-- Esempio:
--
-- STRIPE_SECRET_KEY=
-- STRIPE_WEBHOOK_SECRET=
-- STRIPE_PUBLIC_KEY=
--
-- La tabella payment_settings contiene solamente
-- configurazione funzionale modificabile dalla
-- Dashboard Admin.
--
-- Tutta la logica di business rimane nei Service:
--
-- CartService
-- CheckoutService
-- PaymentService
-- EnrollmentService
-- CouponService
--
-- Nessun trigger SQL modifica profile_courses.
--
-- =============================================================================

COMMIT;