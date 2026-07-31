Agisci come un Esperto Senior Software Architect specializzato in Next.js, React e Clean Architecture. Dobbiamo riprendere il refactoring Enterprise v2 dell'applicazione "gcprof-ai-academy". Stiamo lavorando al progetto "GCPROF Academy", una piattaforma LMS avanzata basata su Next.js (App Router, TypeScript, Turbopack) e Supabase (Auth, PostgreSQL, RLS).
Di seguito trovi il contesto completo, lo schema del database e la struttura del progetto "gcprof-ai-academy". 
Il tuo compito è assorbire queste informazioni e attendere le mie prossime istruzioni operative per continuare lo sviluppo.

### 1. PANORAMICA DEL PROGETTO

Il progetto è una piattaforma LMS ("gcprof-ai-academy") per la gestione di corsi, moduli e lezioni multimediali, con un controllo degli accessi granulare basato sulle classi scolastiche. L'applicazione utilizza Next.js con Server Actions e Supabase come backend. utilizza github e Vercel per il deploy ed un dominio su cloudflare gcprof-academy.com 

### 📂 2. FILE SYSTEM TREE DEL PROGETTO

Questo è il tree aggiornato della struttura del progetto su cui stiamo lavorando:
   

### 💾 SCRIPT SQL AGGIORNATI DEL DATABASE (SUPABASE)

## Table `academy_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `slug` | `text` |  Unique |
| `name` | `text` |  |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `academy_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `slug` | `text` |  Unique |
| `name` | `text` |  |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `profiles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `first_name` | `varchar` |  Nullable |
| `last_name` | `varchar` |  Nullable |
| `display_name` | `varchar` |  Nullable |
| `role` | `varchar` |  |
| `status` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `email` | `text` |  Nullable Unique |
| `password_hash` | `text` |  Nullable |
| `avatar_url` | `text` |  Nullable |
| `total_minutes_active` | `int4` |  |
| `user_type` | `varchar` |  |
| `school_track` | `text` |  Nullable |
| `school_section` | `text` |  Nullable |
| `total_xp` | `int4` |  Nullable |
| `current_level` | `int4` |  Nullable |

## Table `profile_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `profile_id` | `uuid` | Primary |
| `class_id` | `uuid` | Primary |
| `assigned_at` | `timestamptz` |  |

## Table `courses`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `slug` | `varchar` |  Unique |
| `title` | `varchar` |  |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `category` | `varchar` |  Nullable |
| `difficulty` | `varchar` |  Nullable |
| `teacher` | `varchar` |  Nullable |
| `estimated_hours` | `int4` |  Nullable |
| `cover_image` | `text` |  Nullable |
| `published` | `bool` |  Nullable |
| `allowed_classes` | `_text` |  |
| `price` | `numeric` |  |
| `currency` | `currency_enum` |  |
| `is_paid` | `bool` |  |
| `stripe_product_id` | `text` |  Nullable |
| `stripe_price_id` | `text` |  Nullable |

## Table `course_modules`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `course_id` | `uuid` |  Nullable |
| `title` | `varchar` |  |
| `order_index` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `is_preview` | `bool` |  |
| `module_code` | `varchar` |  |

## Table `course_lessons`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `module_id` | `uuid` |  Nullable |
| `title` | `varchar` |  |
| `slug` | `varchar` |  |
| `video_url` | `text` |  Nullable |
| `content` | `text` |  Nullable |
| `order_index` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `content_type` | `varchar` |  Nullable |
| `duration` | `int4` |  Nullable |
| `external_url` | `text` |  Nullable |

## Table `course_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `course_id` | `uuid` | Primary |
| `class_id` | `uuid` | Primary |
| `assigned_at` | `timestamptz` |  |

## Table `course_categories`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `varchar` |  Unique |
| `slug` | `varchar` |  Unique |
| `created_at` | `timestamptz` |  |

## Table `document_configs`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `label` | `text` |  |
| `file_path` | `text` |  |
| `is_active` | `bool` |  Nullable |
| `updated_at` | `timestamptz` |  |

## Table `profile_courses`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `profile_id` | `uuid` | Primary |
| `course_id` | `uuid` | Primary |
| `enrolled_at` | `timestamptz` |  |
| `status` | `varchar` |  |
| `approved_at` | `timestamptz` |  Nullable |
| `approved_by` | `uuid` |  Nullable |
| `updated_at` | `timestamptz` |  |

## Table `mail_settings`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `value` | `text` |  |
| `updated_at` | `timestamptz` |  |

## Table `mail_templates`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `template_key` | `text` |  Unique |
| `name` | `varchar` |  |
| `description` | `text` |  Nullable |
| `subject` | `varchar` |  |
| `title_override` | `varchar` |  Nullable |
| `body_text_override` | `text` |  Nullable |
| `enabled` | `bool` |  |
| `version` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `updated_by` | `uuid` |  Nullable |

## Table `mail_logs`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `template_key` | `text` |  |
| `recipient` | `text` |  |
| `subject` | `text` |  |
| `status` | `text` |  |
| `provider` | `text` |  |
| `provider_id` | `text` |  Nullable |
| `error_message` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `password_reset_tokens`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `user_id` | `uuid` |  |
| `token` | `text` |  Unique |
| `expires_at` | `timestamp` |  |
| `used` | `bool` |  |
| `created_at` | `timestamp` |  |

## Table `profile_lessons_progress`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `profile_id` | `uuid` | Primary |
| `lesson_id` | `uuid` | Primary |
| `course_id` | `uuid` |  Nullable |
| `is_completed` | `bool` |  |
| `minutes_watched` | `int4` |  |
| `last_accessed_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `completed_at` | `timestamptz` |  Nullable |

## Table `user_sessions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  |
| `login_at` | `timestamptz` |  |
| `logout_at` | `timestamptz` |  Nullable |
| `session_duration_seconds` | `int4` |  Nullable |
| `ip_address` | `text` |  Nullable |
| `user_agent` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `user_page_views`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  Nullable |
| `path` | `text` |  |
| `course_slug` | `text` |  Nullable |
| `lesson_slug` | `text` |  Nullable |
| `viewed_at` | `timestamptz` |  |

## Table `quizzes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `varchar` |  |
| `description` | `text` |  Nullable |
| `status` | `quiz_status` |  |
| `penalty_enabled` | `bool` |  |
| `negative_mark` | `numeric` |  |
| `max_score` | `numeric` |  |
| `created_by` | `uuid` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `passing_score` | `numeric` |  |

## Table `quiz_questions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `quiz_id` | `uuid` |  |
| `type` | `question_type` |  |
| `order_index` | `int4` |  |
| `text` | `text` |  |
| `points` | `numeric` |  |
| `created_at` | `timestamptz` |  |

## Table `quiz_options`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `question_id` | `uuid` |  |
| `text` | `text` |  |
| `is_correct` | `bool` |  |

## Table `course_quizzes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `course_id` | `uuid` | Primary |
| `quiz_id` | `uuid` | Primary |

## Table `quiz_attempts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `quiz_id` | `uuid` |  |
| `student_id` | `uuid` |  |
| `started_at` | `timestamptz` |  |
| `completed_at` | `timestamptz` |  Nullable |
| `auto_score` | `numeric` |  |
| `teacher_score` | `numeric` |  |
| `final_score` | `numeric` |  |
| `status` | `attempt_status` |  |
| `created_at` | `timestamptz` |  |
| `xp_awarded` | `bool` |  Nullable |

## Table `quiz_answers`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `attempt_id` | `uuid` |  |
| `question_id` | `uuid` |  |
| `selected_option_id` | `uuid` |  Nullable |
| `open_answer_text` | `text` |  Nullable |
| `is_correct` | `bool` |  Nullable |
| `score` | `numeric` |  |
| `created_at` | `timestamptz` |  |

## Table `quiz_reviews`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `attempt_id` | `uuid` |  |
| `teacher_id` | `uuid` |  Nullable |
| `question_id` | `uuid` |  |
| `score` | `numeric` |  |
| `comment` | `text` |  Nullable |
| `reviewed_at` | `timestamptz` |  |

## Table `lessons`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `module_id` | `uuid` |  |
| `title` | `text` |  |
| `duration` | `int4` |  |
| `content_type` | `text` |  |
| `youtube_url` | `text` |  Nullable |
| `google_drive_url` | `text` |  Nullable |
| `quiz_id` | `uuid` |  Nullable |
| `sort_order` | `int4` |  |
| `created_at` | `timestamptz` |  |

## Table `quiz_assignments`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `quiz_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `assigned_at` | `timestamptz` |  |
| `due_at` | `timestamptz` |  Nullable |
| `is_visible` | `bool` |  |

## Table `resources`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `text` |  |
| `description` | `text` |  |
| `url` | `text` |  |
| `provider` | `text` |  Nullable |
| `type` | `text` |  |
| `typeVariant` | `text` |  |
| `rating` | `int2` |  Nullable |
| `tags` | `_text` |  |
| `language` | `text` |  |
| `is_visible` | `bool` |  |
| `created_at` | `timestamptz` |  |

## Table `shopping_carts`

Carrello persistente dello studente

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  Unique |
| `status` | `cart_status_enum` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `shopping_cart_items`

Snapshot dei corsi presenti nel carrello

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `cart_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `unit_price` | `numeric` |  |
| `quantity` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `coupons`

Coupon promozionali

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `code` | `varchar` |  Unique |
| `description` | `text` |  Nullable |
| `discount_type` | `discount_type_enum` |  |
| `discount_value` | `numeric` |  |
| `valid_from` | `timestamptz` |  |
| `valid_to` | `timestamptz` |  Nullable |
| `max_redemptions` | `int4` |  Nullable |
| `current_redemptions` | `int4` |  |
| `is_active` | `bool` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `payment_settings`

Configurazione funzionale della feature Payments

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `provider` | `payment_provider_enum` |  |
| `sandbox_enabled` | `bool` |  |
| `default_currency` | `currency_enum` |  |
| `vat_percentage` | `numeric` |  |
| `allow_coupons` | `bool` |  |
| `academy_country` | `varchar` |  |
| `checkout_session_expire_minutes` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `orders`

Ordini generati dal checkout

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_number` | `varchar` |  Unique |
| `profile_id` | `uuid` |  |
| `status` | `order_status_enum` |  |
| `subtotal` | `numeric` |  |
| `discount` | `numeric` |  |
| `tax` | `numeric` |  |
| `total` | `numeric` |  |
| `currency` | `currency_enum` |  |
| `payment_provider` | `payment_provider_enum` |  |
| `payment_provider_order_id` | `text` |  Nullable |
| `coupon_id` | `uuid` |  Nullable |
| `metadata` | `jsonb` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `order_items`

Snapshot dei corsi acquistati

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `course_title_snapshot` | `text` |  |
| `unit_price` | `numeric` |  |
| `quantity` | `int4` |  |
| `line_total` | `numeric` |  |
| `metadata` | `jsonb` |  |
| `created_at` | `timestamptz` |  |

## Table `coupon_redemptions`

Storico utilizzo coupon

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `coupon_id` | `uuid` |  |
| `profile_id` | `uuid` |  |
| `order_id` | `uuid` |  |
| `redeemed_at` | `timestamptz` |  |

## Table `payments`

Transazioni economiche

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_id` | `uuid` |  |
| `provider` | `payment_provider_enum` |  |
| `provider_payment_id` | `text` |  Nullable Unique |
| `provider_checkout_session_id` | `text` |  Nullable Unique |
| `provider_event_id` | `text` |  Nullable |
| `status` | `payment_status_enum` |  |
| `amount` | `numeric` |  |
| `currency` | `currency_enum` |  |
| `transaction_reference` | `text` |  Nullable |
| `failure_reason` | `text` |  Nullable |
| `paid_at` | `timestamptz` |  Nullable |
| `raw_response` | `jsonb` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `payment_logs`

Audit trail dei webhook ricevuti

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `provider` | `payment_provider_enum` |  |
| `provider_event_id` | `text` |  Nullable Unique |
| `event` | `varchar` |  |
| `payload` | `jsonb` |  |
| `processed` | `bool` |  |
| `processed_at` | `timestamptz` |  Nullable |
| `error` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `system_settings`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `key` | `varchar` | Primary |
| `value` | `text` |  |
| `description` | `text` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `badges`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `code` | `varchar` |  Unique |
| `title` | `varchar` |  |
| `description` | `text` |  Nullable |
| `icon` | `varchar` |  |
| `xp_reward` | `int4` |  |
| `created_at` | `timestamptz` |  Nullable |
| `badge_type` | `varchar` |  |

## Table `user_badges`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  |
| `badge_id` | `uuid` |  |
| `awarded_at` | `timestamptz` |  Nullable |
| `course_id` | `uuid` |  Nullable |
| `quiz_id` | `uuid` |  Nullable |

## Table `user_course_stats`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `course_xp` | `int4` |  |
| `course_level` | `int4` |  |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `profile_course_xp`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `user_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `xp` | `int4` |  |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Custom Types / Enums

### `quiz_status`

`draft` | `active`

### `question_type`

`multiple_choice` | `open_ended`

### `attempt_status`

`submitted` | `graded`

### `order_status_enum`

`PENDING` | `CHECKOUT_CREATED` | `PAYMENT_PROCESSING` | `PAID` | `FULFILLED` | `FAILED` | `EXPIRED` | `CANCELLED` | `REFUNDED`

### `payment_status_enum`

`CREATED` | `AUTHORIZED` | `CAPTURED` | `FAILED` | `REFUNDED`

### `discount_type_enum`

`PERCENTAGE` | `FIXED`

### `payment_provider_enum`

`STRIPE` | `PAYPAL` | `MOLLIE`

### `currency_enum`

`EUR` | `USD` | `GBP`

### `cart_status_enum`

`ACTIVE` | `CHECKOUT` | `ABANDONED` | `EXPIRED`

## RLS Policies

### `courses`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Corsi leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale corsi` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `course_modules`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Moduli leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale moduli` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `course_lessons`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Lezioni leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale lezioni` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `course_classes`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Assegnazioni leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale assegnazioni` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `mail_settings`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Admin Full Access Mail Settings` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `mail_templates`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Admin Full Access Mail Templates` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `mail_logs`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Admin Full Access Mail Logs` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `user_page_views`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Gli utenti iscritti possono tracciare le proprie visite` | INSERT | public | PERMISSIVE | — | `(auth.uid() = profile_id)` |
| `Gli Admin possono leggere tutte le metriche` | SELECT | public | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `resources`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Public profiles are viewable by everyone.` | SELECT | public | PERMISSIVE | `(is_visible = true)` | — |
| `Admins can do everything` | ALL | public | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `shopping_carts`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_cart` | ALL | authenticated | PERMISSIVE | `(profile_id = auth.uid())` | `(profile_id = auth.uid())` |
| `payments_admin_shopping_carts` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `shopping_cart_items`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_cart_items` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM shopping_carts c   WHERE ((c.id = shopping_cart_items.cart_id) AND (c.profile_id = auth.uid()))))` | — |
| `payments_admin_cart_items` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `orders`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_orders` | SELECT | authenticated | PERMISSIVE | `(profile_id = auth.uid())` | — |
| `payments_admin_orders` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `order_items`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_order_items` | SELECT | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM orders o   WHERE ((o.id = order_items.order_id) AND (o.profile_id = auth.uid()))))` | — |
| `payments_admin_order_items` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `coupon_redemptions`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_coupon_redemptions` | SELECT | authenticated | PERMISSIVE | `(profile_id = auth.uid())` | — |
| `payments_admin_coupon_redemptions` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `payments`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_payments` | SELECT | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM orders o   WHERE ((o.id = payments.order_id) AND (o.profile_id = auth.uid()))))` | — |
| `payments_admin_payments` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `payment_logs`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `payments_admin_logs` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `coupons`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `payments_admin_coupons` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `payment_settings`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `payments_admin_settings` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `profile_courses`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Utenti possono leggere le proprie iscrizioni` | SELECT | public | PERMISSIVE | `(auth.uid() = profile_id)` | — |
| `Service role può gestire tutte le iscrizioni` | ALL | public | PERMISSIVE | `true` | — |

### `profile_lessons_progress`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Utenti gestiscono proprio progresso lezioni` | ALL | authenticated | PERMISSIVE | `(auth.uid() = profile_id)` | `(auth.uid() = profile_id)` |
| `Admin lettura totale progressi lezioni` | SELECT | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `profile_course_xp`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Permetti lettura agli utenti autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
