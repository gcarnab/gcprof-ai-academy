SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict L1AVLYjtZaaRoBbw2KZpYPOT5FhFeMgpKp7sVi125wegxtec2zw8J3cdIuPN2H7

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."custom_oauth_providers" ("id", "provider_type", "identifier", "name", "client_id", "client_secret", "acceptable_client_ids", "scopes", "pkce_enabled", "attribute_mapping", "authorization_params", "enabled", "email_optional", "issuer", "discovery_url", "skip_nonce_check", "cached_discovery", "discovery_cached_at", "authorization_url", "token_url", "userinfo_url", "jwks_uri", "created_at", "updated_at", "custom_claims_allowlist") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type", "token_endpoint_auth_method") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid", "last_webauthn_challenge_data") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at", "nonce") FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_client_states" ("id", "provider_type", "code_verifier", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_challenges" ("id", "user_id", "challenge_type", "session_data", "created_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_credentials" ("id", "user_id", "credential_id", "public_key", "attestation_type", "aaguid", "sign_count", "transports", "backup_eligible", "backed_up", "friendly_name", "created_at", "updated_at", "last_used_at") FROM stdin;
\.


--
-- Data for Name: academy_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."academy_classes" ("id", "slug", "name", "description", "created_at") FROM stdin;
838cfa24-0b23-4e15-b145-c55241f2768c	classi-prime	Classi PRIME	Tutte le Classi PRIME	2026-07-02 15:57:32.53134+00
a0c182a7-4074-4e8f-801b-9ad08fa768f9	classi-seconde	Classi SECONDE	Tutte le Classi SECONDE	2026-07-02 17:17:31.504538+00
517057c0-c200-461c-876a-7851ba5b4afa	classi-terze	Classi TERZE	Tutte le Classi TERZE	2026-07-02 17:17:51.312151+00
018cd1bb-1118-412e-8ed1-a80bb65844cd	classi-quarte	Classi QUARTE	Tutte le Classi QUARTE	2026-07-02 17:18:15.845418+00
145d5c33-6355-4f94-b3bd-10a8890b500c	classi-quinte	Classi QUINTE	Tutte le Classi QUINTE	2026-07-17 20:41:52.090617+00
\.


--
-- Data for Name: course_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_categories" ("id", "name", "slug", "created_at") FROM stdin;
e9c5e245-9f9d-4f29-862b-065310f953ba	Informatica	informatica	2026-07-02 15:41:30.589847+00
f35860fa-e4fe-4a01-a2c0-f574a8c0f32d	Finance	finance	2026-07-02 17:15:44.871679+00
310deb17-3656-47b1-8a56-118e678ccc36	Blockchain	blockchain	2026-07-02 17:15:53.964651+00
67e906af-8693-4606-b3de-46d983984999	AI	ai	2026-07-03 11:14:52.218665+00
e1d86054-2b29-4aa8-86ce-39214c49dbec	Programmazione	programmazione	2026-07-05 17:21:16.654031+00
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."courses" ("id", "slug", "title", "description", "created_at", "updated_at", "category", "difficulty", "teacher", "estimated_hours", "cover_image", "published", "allowed_classes") FROM stdin;
233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	testquiz	TEST_QUIZ	TEST_QUIZ	2026-07-13 06:09:57.542368+00	2026-07-13 06:09:57.542368+00	AI	Facile	Prof. G. Carnabuci	50	\N	t	{}
\.


--
-- Data for Name: course_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_classes" ("course_id", "class_id", "assigned_at") FROM stdin;
233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-13 06:38:41.337504+00
233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-15 12:22:10.788308+00
233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:42:13.431373+00
233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 21:20:38.338769+00
233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 21:20:47.941202+00
\.


--
-- Data for Name: course_modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_modules" ("id", "course_id", "title", "order_index", "created_at") FROM stdin;
0d8028ab-662c-4354-a0c3-a91aa9f35013	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	TEST	1	2026-07-13 14:21:45.787026+00
\.


--
-- Data for Name: course_lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_lessons" ("id", "module_id", "title", "slug", "video_url", "content", "order_index", "created_at", "content_type", "duration", "external_url") FROM stdin;
66c63c48-5830-4bf5-8ccd-2247b844807b	0d8028ab-662c-4354-a0c3-a91aa9f35013	Video	video	https://youtu.be/ThGskUBzPEg?si=KFa3YH7HjnRVLQpb		1	2026-07-13 18:14:48.784001+00	video	15	https://youtu.be/ThGskUBzPEg?si=KFa3YH7HjnRVLQpb
301d7bed-384b-4bb6-a6e3-105b3a6ad1cb	0d8028ab-662c-4354-a0c3-a91aa9f35013	doc	doc	\N		2	2026-07-13 18:35:45.853061+00	document	15	https://docs.google.com/document/d/1IYRkwlDgsNHONYzCmgf53uJRVngg6S7RzSABPNpzeDM/edit?usp=drive_link
59fba529-f8cf-47cb-8a8f-0194d3a539c3	0d8028ab-662c-4354-a0c3-a91aa9f35013	md	md	\N	---\ntitle: "Fondamenti di Machine Learning e Intelligenza Artificiale"\ndescription: "Un quiz di verifica completo per il primo modulo del corso."\npenalty_enabled: true\nnegative_mark: 0.25\n---\n\n# Q1\nQual è l'obiettivo principale del Machine Learning?\n- [ ] A) Creare interfacce grafiche utente veloci.\n- [x] B) Permettere alle macchine di apprendere dai dati senza essere programmate esplicitamente.\n- [ ] C) Gestire in modo sicuro l'indicizzazione di database relazionali.\n- [ ] D) Ottimizzare il consumo energetico dell'hardware.\n\n# Q2\nCosa rappresenta il termine "Overfitting" in un modello predittivo?\n- [x] A) Quando un modello si adatta troppo ai dati di training e fallisce sui dati nuovi.\n- [ ] B) Quando l'algoritmo impiega troppo tempo per terminare l'esecuzione.\n- [ ] C) Una saturazione dello spazio di archiviazione sul server cloud.\n- [ ] D) Un errore dovuto alla mancanza di feature numeriche.\n\n# Q3\nQuale tipo di apprendimento prevede l'uso di dati di addestramento già etichettati?\n- [x] A) Apprendimento Supervisionato\n- [ ] B) Apprendimento Non Supervisionato\n- [ ] C) Apprendimento per Rinforzo\n- [ ] D) Clustering K-Means\n\n# Q4\nL'algoritmo K-Means è un esempio tipico di quale categoria?\n- [ ] A) Classificazione Supervisionata\n- [ ] B) Regressione Lineare\n- [ ] C) Ottimizzazione Connessa\n- [x] D) Apprendimento Non Supervisionato\n\n# Q5\nQuale metrica misura la percentuale di predizioni corrette sul totale delle predizioni?\n- [x] A) Accuracy (Accuratezza)\n- [ ] B) Learning Rate\n- [ ] C) Loss Function\n- [ ] D) Mean Squared Error\n\n# Q6\nCosa si intende per "Dataset di Validation"?\n- [ ] A) I dati utilizzati per il deployment finale in produzione.\n- [ ] B) Il set di dati usato esclusivamente per fare il backup del modello.\n- [x] C) Un set di dati usato per sintonizzare gli iperparametri durante l'addestramento.\n- [ ] D) I dati corrotti scartati dal data cleaning.\n\n# Q7\nChe cos'è il "Learning Rate" (tasso di apprendimento) in una rete neurale?\n- [x] A) Un iperparametro che definisce la dimensione del passo nell'ottimizzazione del gradiente.\n- [ ] B) La velocità di calcolo della scheda grafica (GPU).\n- [ ] C) Il tempo totale richiesto per completare una singola epoca.\n- [ ] D) Il numero di nodi presenti nel layer di input.\n\n# Q8\nQuale delle seguenti opzioni descrive meglio l'Apprendimento per Rinforzo?\n- [ ] A) Un addestramento basato solo sulla rimozione dei dati duplicati.\n- [ ] B) Un sistema che mappa input e output tramite tabelle statiche di lookup.\n- [x] C) Un agente che impara a compiere azioni in un ambiente per massimizzare una ricompensa.\n- [ ] D) La compilazione ottimizzata di un albero di decisione binario.\n\n# OPEN\nDescrivi brevemente la differenza tra una feature e una label nel contesto del Machine Learning supervisionato, fornendo un esempio pratico basato sulla previsione del prezzo di una casa.	3	2026-07-13 18:37:13.160828+00	markdown	15	
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("id", "first_name", "last_name", "display_name", "role", "status", "created_at", "updated_at", "email", "password_hash", "avatar_url", "total_minutes_active", "user_type") FROM stdin;
08be3132-7d36-46c3-9d31-2b1fd0b48d83	Giuseppe	Carnabuci	Prof. Carnabuci	admin	active	2026-07-02 15:39:26.487928+00	2026-07-17 21:24:34.701+00	admin@gcprof-academy.com	$2b$10$GAhB.B3Ht67g1kNu9e939OpnNh6gUMJ1apWvFYHJMXOy55fj4Px8q	https://vaokzyznazkcqjpbbkgr.supabase.co/storage/v1/object/public/avatars/uploads/08be3132-7d36-46c3-9d31-2b1fd0b48d83-1783066842958.png	4	ADMIN
e5c47463-3c4f-4d68-9698-d255b6905dd9	Peppe EXT	Peppe EXT	Peppe EXT Peppe EXT	student	active	2026-07-17 14:39:56.524191+00	2026-07-17 15:44:00.557+00	giuseppe.carnabuci@gmail.com	$2b$10$Z29ajWL5qiRz8lN6.yBEdOIzSQ7fGAWiYvgzsweDQjF.gZ0kTmhdG	\N	0	EXTERNAL_STUDENT
388a12d4-86bb-437e-ade8-9212f4ed71a2	Alessandro	Fontana	Alessandro Fontana	student	active	2026-06-23 13:30:46.987+00	2026-07-17 20:20:11.473+00	alessandro.fontana.14730@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	315	SCHOOL_STUDENT
5067820d-8e28-4b39-93bb-6f27327f4262	Elena	Romano	Elena Romano	student	active	2026-06-25 01:01:03.254+00	2026-07-17 20:20:11.473+00	elena.romano.14731@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	74	SCHOOL_STUDENT
115b5c08-a367-4d62-9b47-7ebf158481c5	Sofia	Conti	Sofia Conti	student	active	2026-07-03 02:31:34.938+00	2026-07-17 20:20:11.473+00	sofia.conti.14732@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	109	SCHOOL_STUDENT
e04943c0-03e6-40b7-8455-b0e4fd9f8ea2	Giulia	Rossi	Giulia Rossi	student	active	2026-06-18 07:06:44.943+00	2026-07-17 20:20:11.473+00	giulia.rossi.14733@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	475	SCHOOL_STUDENT
89b4c1ea-1015-4bd3-b8e3-fd8afa1a2fb3	Elena	Fontana	Elena Fontana	student	active	2026-07-10 00:48:12.133+00	2026-07-17 20:20:11.473+00	elena.fontana.14734@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	209	SCHOOL_STUDENT
3dd1e8aa-605b-4250-8bbf-3e92015fbbca	Sofia	Ricci	Sofia Ricci	student	active	2026-06-29 11:40:57.026+00	2026-07-17 20:20:11.473+00	sofia.ricci.14735@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	60	SCHOOL_STUDENT
cd4acb0c-a1e2-4625-9d07-ae7bab9f0a92	Giulia	Fontana	Giulia Fontana	student	active	2026-07-07 16:24:17.197+00	2026-07-17 20:20:11.473+00	giulia.fontana.14736@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	52	SCHOOL_STUDENT
4b17d8c6-9f7f-4150-95de-b4854c54981f	Diana	Costa	Diana Costa	student	active	2026-06-28 02:29:54.23+00	2026-07-17 20:20:11.473+00	diana.costa.14737@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	212	SCHOOL_STUDENT
31d853d8-b119-4c71-b3c2-bbd0ab6b2c52	Leonardo	Fontana	Leonardo Fontana	student	active	2026-06-28 21:19:00.19+00	2026-07-17 20:20:11.473+00	leonardo.fontana.14738@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	228	SCHOOL_STUDENT
4ee2130d-9529-433d-927b-45aa4296cf7c	Riccardo	Bruno	Riccardo Bruno	student	active	2026-07-12 13:10:33.079+00	2026-07-17 20:20:11.473+00	riccardo.bruno.14739@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	234	SCHOOL_STUDENT
b8f2d508-9975-4f55-8ba5-78298f3fc790	Giulia	Bruno	Giulia Bruno	student	active	2026-07-04 05:53:28.368+00	2026-07-17 20:20:11.473+00	giulia.bruno.147310@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	455	SCHOOL_STUDENT
61cb7379-03d2-4d44-967e-589c4d683902	Beatrice	Rossi	Beatrice Rossi	student	active	2026-07-14 11:42:50.03+00	2026-07-17 20:20:11.473+00	beatrice.rossi.147311@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	363	SCHOOL_STUDENT
276d099a-7787-4e64-a499-676e032b2d3c	Claudio	Conti	Claudio Conti	student	active	2026-06-18 00:00:23.858+00	2026-07-17 20:20:11.474+00	claudio.conti.147412@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	254	SCHOOL_STUDENT
705b6cee-06d8-4502-bb9c-07c3bdc43fad	Riccardo	Bianchi	Riccardo Bianchi	student	active	2026-07-13 13:43:59.679+00	2026-07-17 20:20:11.474+00	riccardo.bianchi.147413@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	368	SCHOOL_STUDENT
4a508fb1-6273-4b30-ae95-99de271c5eab	Claudio	Gallo	Claudio Gallo	student	active	2026-06-20 14:20:02.026+00	2026-07-17 20:20:11.474+00	claudio.gallo.147414@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	121	SCHOOL_STUDENT
3a896c73-acb0-4d7a-bc23-3023aefa8de2	Beatrice	Bruno	Beatrice Bruno	student	active	2026-07-08 00:55:42.58+00	2026-07-17 20:20:11.474+00	beatrice.bruno.147415@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	333	SCHOOL_STUDENT
39e82fdd-d868-4266-a2d5-906ac771c4a1	Diana	Ricci	Diana Ricci	student	active	2026-07-11 20:38:52.333+00	2026-07-17 20:20:11.474+00	diana.ricci.147416@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	35	SCHOOL_STUDENT
aeda85df-fba2-448b-ba7d-b0411f617361	Diana	Ferrari	Diana Ferrari	student	active	2026-07-16 15:01:53.552+00	2026-07-17 20:20:11.474+00	diana.ferrari.147417@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	455	SCHOOL_STUDENT
59702fb8-a0cd-407b-a46a-5e143f244997	Marco	Bianchi	Marco Bianchi	student	active	2026-07-09 19:42:17.124+00	2026-07-17 20:20:11.474+00	marco.bianchi.147418@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	98	SCHOOL_STUDENT
5246374a-eac8-4387-a8ab-5e027b87ebee	Giulia	Costa	Giulia Costa	student	active	2026-06-25 03:12:10.71+00	2026-07-17 20:20:11.474+00	giulia.costa.147419@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	71	SCHOOL_STUDENT
4b879a88-057c-401b-8e67-a42b71e1191e	Giulia	Bruno	Giulia Bruno	student	active	2026-06-23 02:56:41.231+00	2026-07-17 20:20:11.474+00	giulia.bruno.147420@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	461	SCHOOL_STUDENT
36560b87-10f5-4bde-96a5-7d76d0e14941	Elena	Ferrari	Elena Ferrari	student	active	2026-06-20 23:50:27.847+00	2026-07-17 20:20:11.474+00	elena.ferrari.147421@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	370	SCHOOL_STUDENT
f6c1b634-8e05-4d08-aad5-10be1a6e3bc6	Claudio	Rossi	Claudio Rossi	student	active	2026-06-30 16:29:15.63+00	2026-07-17 20:20:11.474+00	claudio.rossi.147422@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	141	SCHOOL_STUDENT
7fc21e1f-8a49-45b0-8fe9-8b5471e884b5	Riccardo	Russo	Riccardo Russo	student	active	2026-07-05 01:34:09.394+00	2026-07-17 20:20:11.474+00	riccardo.russo.147423@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	71	SCHOOL_STUDENT
00b287a5-cf10-429f-8d66-fee7ed804cb8	Elena	Fontana	Elena Fontana	student	active	2026-07-17 02:00:32.583+00	2026-07-17 20:20:11.474+00	elena.fontana.147424@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	186	SCHOOL_STUDENT
980cffc7-adce-48ea-826e-228325b04f9e	Diana	Ricci	Diana Ricci	student	active	2026-07-15 03:24:28.407+00	2026-07-17 20:20:11.474+00	diana.ricci.147425@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	301	SCHOOL_STUDENT
e1df555b-7672-44d8-9288-6f501436ea06	Francesco	Rossi	Francesco Rossi	student	active	2026-07-02 21:30:08.244+00	2026-07-17 20:20:11.474+00	francesco.rossi.147426@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	198	SCHOOL_STUDENT
0dd51177-d2b1-48be-80cd-4024b8b538ce	Alessandro	Gallo	Alessandro Gallo	student	active	2026-07-01 10:25:04.665+00	2026-07-17 20:20:11.474+00	alessandro.gallo.147427@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	87	SCHOOL_STUDENT
8c383c54-227e-476d-8a3a-b4971f87c995	Claudio	Russo	Claudio Russo	student	active	2026-07-15 13:21:30.994+00	2026-07-17 20:20:11.474+00	claudio.russo.147428@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	222	SCHOOL_STUDENT
17a6c30d-a047-48e7-9036-b8fff19d05bd	Alessandro	Ricci	Alessandro Ricci	student	active	2026-07-06 03:28:45.105+00	2026-07-17 20:20:11.474+00	alessandro.ricci.147429@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	115	SCHOOL_STUDENT
19f1e233-109f-45d2-a617-3dacc3404e27	Claudio	Ferrari	Claudio Ferrari	student	active	2026-06-18 17:26:35.999+00	2026-07-17 20:20:11.474+00	claudio.ferrari.147430@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	162	SCHOOL_STUDENT
dfee8771-3374-4d61-bc4b-dd6451b35827	Francesco	Ferrari	Francesco Ferrari	student	active	2026-07-05 07:03:02.678+00	2026-07-17 20:20:11.474+00	francesco.ferrari.147431@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	359	SCHOOL_STUDENT
81e3e7d7-ce8f-43d5-b995-4206a86ede74	Giulia	Bianchi	Giulia Bianchi	student	active	2026-07-12 11:10:38.035+00	2026-07-17 20:20:11.474+00	giulia.bianchi.147432@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	356	SCHOOL_STUDENT
552082c3-c24b-46d4-9c97-105dd08c2580	Diana	Fontana	Diana Fontana	student	active	2026-06-29 06:33:17.393+00	2026-07-17 20:20:11.474+00	diana.fontana.147433@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	75	SCHOOL_STUDENT
e3ed489e-d171-46e6-adb9-02ff03c1296e	Elena	Ferrari	Elena Ferrari	student	active	2026-06-29 23:29:24.011+00	2026-07-17 20:20:11.474+00	elena.ferrari.147434@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	369	SCHOOL_STUDENT
866a31f4-a1f9-41cb-84dc-5c2c919a587d	Diana	Ricci	Diana Ricci	student	active	2026-07-17 19:35:12.736+00	2026-07-17 20:20:11.474+00	diana.ricci.147435@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	402	SCHOOL_STUDENT
3aeefc71-5132-4304-be3c-54ee07409532	Sofia	Costa	Sofia Costa	student	active	2026-07-13 02:38:02.29+00	2026-07-17 20:20:11.474+00	sofia.costa.147436@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	370	SCHOOL_STUDENT
1659f602-1407-404d-82dc-d26323de00ac	Diana	Conti	Diana Conti	student	active	2026-07-12 06:31:16.49+00	2026-07-17 20:20:11.474+00	diana.conti.147437@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	458	SCHOOL_STUDENT
14b5139c-02df-4c32-9a6c-7db32d2eb4cc	Beatrice	Ferrari	Beatrice Ferrari	student	active	2026-06-18 19:30:39.913+00	2026-07-17 20:20:11.474+00	beatrice.ferrari.147438@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	432	SCHOOL_STUDENT
94db2a87-c4ec-426b-a8ce-1fd009eba2bc	Diana	Costa	Diana Costa	student	active	2026-06-20 05:24:12.981+00	2026-07-17 20:20:11.474+00	diana.costa.147439@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	98	SCHOOL_STUDENT
7aedc5c5-29d1-4419-bc7a-9dfb7c3bd316	Claudio	Rossi	Claudio Rossi	student	active	2026-07-11 03:07:19.589+00	2026-07-17 20:20:11.474+00	claudio.rossi.147440@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	421	SCHOOL_STUDENT
ceabfe3f-4311-472e-9100-1aa59216ee8e	Elena	Rossi	Elena Rossi	student	active	2026-07-05 06:26:04.622+00	2026-07-17 20:20:11.474+00	elena.rossi.147441@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	160	SCHOOL_STUDENT
8c17aefd-92fe-44e4-a20d-54304e2bf29c	Marco	Fontana	Marco Fontana	student	active	2026-06-29 20:02:55.244+00	2026-07-17 20:20:11.474+00	marco.fontana.147442@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	425	SCHOOL_STUDENT
74fd5cb7-bf47-48d1-b6dc-30570c138b03	Beatrice	Fontana	Beatrice Fontana	student	active	2026-06-22 21:49:57.758+00	2026-07-17 20:20:11.474+00	beatrice.fontana.147443@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	362	SCHOOL_STUDENT
acacab4d-639c-436f-9c9e-83e0451745e6	Diana	Bruno	Diana Bruno	student	active	2026-06-22 22:59:46.284+00	2026-07-17 20:20:11.474+00	diana.bruno.147444@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	42	SCHOOL_STUDENT
0994e4af-1284-4b9e-822d-8cdea942215f	Diana	Fontana	Diana Fontana	student	active	2026-07-17 00:18:14.4+00	2026-07-17 20:20:11.474+00	diana.fontana.147445@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	416	SCHOOL_STUDENT
7c8a47c1-ca46-4129-9351-7bbb48fed577	Diana	Bianchi	Diana Bianchi	student	active	2026-07-16 19:19:14.928+00	2026-07-17 20:20:11.474+00	diana.bianchi.147446@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	239	SCHOOL_STUDENT
34148bd4-d1eb-48f1-b592-74df18b640ef	Giulia	Romano	Giulia Romano	student	active	2026-06-30 03:54:22.771+00	2026-07-17 20:20:11.474+00	giulia.romano.147447@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	384	SCHOOL_STUDENT
4e4bfbd9-7fc5-4b35-a4ff-9f16fd225713	Giulia	Romano	Giulia Romano	student	active	2026-07-04 08:53:26.671+00	2026-07-17 20:20:11.474+00	giulia.romano.147448@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	291	SCHOOL_STUDENT
aeb5833c-c05e-4535-820b-dbf6e1ad5b3a	Diana	Ferrari	Diana Ferrari	student	active	2026-07-02 08:01:47.379+00	2026-07-17 20:20:11.474+00	diana.ferrari.147449@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	474	SCHOOL_STUDENT
3d14a552-520d-40f8-a331-b98e4546a1ba	Leonardo	Russo	Leonardo Russo	student	active	2026-07-07 23:45:37.826+00	2026-07-17 20:37:51.124+00	leonardo.russo.11240@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	33	SCHOOL_STUDENT
c46b50cc-e3b9-4f5e-975f-038abb5e8750	Francesco	Esposito	Francesco Esposito	student	active	2026-07-09 04:51:43.986+00	2026-07-17 20:37:51.124+00	francesco.esposito.11241@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	341	SCHOOL_STUDENT
1d6da114-2ebf-437c-934f-bf72688b84e1	Leonardo	Fontana	Leonardo Fontana	student	active	2026-07-05 05:30:12.71+00	2026-07-17 20:37:51.124+00	leonardo.fontana.11242@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	412	SCHOOL_STUDENT
dc21fa2d-02c2-48fd-ab64-75a8288f0312	Elena	Romano	Elena Romano	student	active	2026-07-08 00:02:36.481+00	2026-07-17 20:37:51.124+00	elena.romano.11243@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	331	SCHOOL_STUDENT
7c2df191-2335-485c-8440-6255c53cac42	Marco	Ricci	Marco Ricci	student	active	2026-06-26 21:55:44.105+00	2026-07-17 20:37:51.124+00	marco.ricci.11244@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	153	SCHOOL_STUDENT
16240dde-0ebd-46c5-93e0-84bc3e218c64	Diana	Ferrari	Diana Ferrari	student	active	2026-07-15 06:36:46.647+00	2026-07-17 20:37:51.124+00	diana.ferrari.11245@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	168	SCHOOL_STUDENT
e28aaba8-4a95-4066-95d9-9bee7c0c4f14	Beatrice	Fontana	Beatrice Fontana	student	active	2026-06-21 20:17:21.561+00	2026-07-17 20:37:51.124+00	beatrice.fontana.11246@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	140	SCHOOL_STUDENT
d5374bcf-6acb-485e-a013-54a9b8cb5b85	Sofia	Conti	Sofia Conti	student	active	2026-07-04 16:10:00.488+00	2026-07-17 20:37:51.124+00	sofia.conti.11247@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	388	SCHOOL_STUDENT
95d09a02-c9e3-4643-a0b3-fbf4ac79ecc6	Leonardo	Ricci	Leonardo Ricci	student	active	2026-07-08 12:13:45.275+00	2026-07-17 20:37:51.124+00	leonardo.ricci.11248@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	312	SCHOOL_STUDENT
af4c5ea8-9f4f-4fb0-9da6-d723e9ca9697	Leonardo	Esposito	Leonardo Esposito	student	active	2026-07-17 13:40:16.56+00	2026-07-17 20:37:51.124+00	leonardo.esposito.11249@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	48	SCHOOL_STUDENT
0b8122b9-f0f9-49ef-9d2a-53ce20f93d24	Riccardo	Conti	Riccardo Conti	student	active	2026-06-30 02:19:08.538+00	2026-07-17 20:37:51.685+00	riccardo.conti.16850@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	454	SCHOOL_STUDENT
bd6b746f-28fd-4230-b487-2b21d37e7a03	Alessandro	Ricci	Alessandro Ricci	student	active	2026-07-04 20:58:01.024+00	2026-07-17 20:37:51.685+00	alessandro.ricci.16851@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	319	SCHOOL_STUDENT
8755d3e9-e975-4242-83ff-9eac8541e7f3	Martina	Ricci	Martina Ricci	student	active	2026-06-22 09:05:21.379+00	2026-07-17 20:37:51.685+00	martina.ricci.16852@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	435	SCHOOL_STUDENT
63391b7a-c226-4f1c-aa85-4118fdb66f2a	Claudio	Russo	Claudio Russo	student	active	2026-07-14 02:04:36.55+00	2026-07-17 20:37:51.685+00	claudio.russo.16853@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	123	SCHOOL_STUDENT
e99e7175-2c6b-4509-bd77-ddd9f9381f02	Claudio	Costa	Claudio Costa	student	active	2026-07-13 00:12:12.366+00	2026-07-17 20:37:51.685+00	claudio.costa.16854@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	156	SCHOOL_STUDENT
f3037cc9-7f4f-4474-b6cb-281a3fd5e06f	Claudio	Russo	Claudio Russo	student	active	2026-07-17 19:30:35.627+00	2026-07-17 20:37:51.685+00	claudio.russo.16855@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	128	SCHOOL_STUDENT
eb3d50ad-8bf6-4926-871d-fd5ed2d28ffd	Riccardo	Rossi	Riccardo Rossi	student	active	2026-07-08 04:27:47.291+00	2026-07-17 20:37:51.685+00	riccardo.rossi.16856@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	200	SCHOOL_STUDENT
ba9fd638-27c4-49e7-a053-d18760caec1a	Riccardo	Russo	Riccardo Russo	student	active	2026-07-03 13:17:55.991+00	2026-07-17 20:37:51.685+00	riccardo.russo.16857@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	144	SCHOOL_STUDENT
5e08c20c-9d47-4ebc-a2c7-4a1a9d32b5d6	Claudio	Conti	Claudio Conti	student	active	2026-06-29 01:07:29.368+00	2026-07-17 20:37:51.685+00	claudio.conti.16858@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	296	SCHOOL_STUDENT
a4b3b595-0a05-48e7-a833-accfb3bba5a2	Elena	Bruno	Elena Bruno	student	active	2026-06-27 03:34:01.572+00	2026-07-17 20:37:51.685+00	elena.bruno.16859@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	29	SCHOOL_STUDENT
52721a2f-c989-47df-acd8-5ea98fca7f0a	Martina	Esposito	Martina Esposito	student	active	2026-06-29 13:22:05.281+00	2026-07-17 20:37:52.268+00	martina.esposito.22680@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	428	SCHOOL_STUDENT
ec37ea0a-d13d-4bc0-baad-a49ec2068f65	Elena	Ricci	Elena Ricci	student	active	2026-07-04 07:44:15.233+00	2026-07-17 20:37:52.268+00	elena.ricci.22681@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	186	SCHOOL_STUDENT
855e961e-c716-455f-8b7b-8a2fca15c118	Diana	Bruno	Diana Bruno	student	active	2026-07-11 01:03:17.359+00	2026-07-17 20:37:52.268+00	diana.bruno.22682@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	422	SCHOOL_STUDENT
0db0fdc9-c6d0-4472-ba5e-2aa36170b999	Elena	Fontana	Elena Fontana	student	active	2026-07-02 15:19:14.299+00	2026-07-17 20:37:52.268+00	elena.fontana.22683@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	261	SCHOOL_STUDENT
8813e5ae-1d21-4576-8e28-4216cbe3601e	Martina	Russo	Martina Russo	student	active	2026-06-24 06:31:34.558+00	2026-07-17 20:37:52.268+00	martina.russo.22684@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	195	SCHOOL_STUDENT
a991f5bc-2d24-4e4f-a26a-1e68f974dd77	Francesco	Russo	Francesco Russo	student	active	2026-07-04 22:04:57.365+00	2026-07-17 20:37:52.268+00	francesco.russo.22685@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	416	SCHOOL_STUDENT
6f6bb3df-7e53-4c27-8c34-5c5664e80643	Marco	Fontana	Marco Fontana	student	active	2026-07-01 06:51:50.554+00	2026-07-17 20:37:52.269+00	marco.fontana.22696@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	108	SCHOOL_STUDENT
914a2be2-b7af-4b3c-8b0b-d36e6e4471f1	Francesco	Gallo	Francesco Gallo	student	active	2026-07-07 17:14:57.242+00	2026-07-17 20:37:52.269+00	francesco.gallo.22697@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	32	SCHOOL_STUDENT
c9d5c1d3-5358-435f-b659-0c1e5506892c	Giulia	Bianchi	Giulia Bianchi	student	active	2026-06-25 16:59:28.837+00	2026-07-17 20:37:52.269+00	giulia.bianchi.22698@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	187	SCHOOL_STUDENT
4c265f82-96bc-43e1-82ed-fb6cfcc86c46	Diana	Bianchi	Diana Bianchi	student	active	2026-06-22 03:10:59.049+00	2026-07-17 20:37:52.269+00	diana.bianchi.22699@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	103	SCHOOL_STUDENT
aa8f9461-b8bd-4eb8-a8b7-09ff4e654db4	Beatrice	Esposito	Beatrice Esposito	student	active	2026-07-04 21:43:59.943+00	2026-07-17 20:37:52.738+00	beatrice.esposito.27380@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	259	SCHOOL_STUDENT
b809db09-3c05-45de-888d-614440253281	Diana	Conti	Diana Conti	student	active	2026-07-07 12:19:47.429+00	2026-07-17 20:37:52.738+00	diana.conti.27381@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	309	SCHOOL_STUDENT
8ecbf7a9-b606-4524-824b-261576a333b2	Giulia	Ferrari	Giulia Ferrari	student	active	2026-06-22 18:19:59.313+00	2026-07-17 20:37:52.738+00	giulia.ferrari.27382@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	292	SCHOOL_STUDENT
6e440d86-4918-43f2-8b9b-5bf0b25c8b84	Francesco	Fontana	Francesco Fontana	student	active	2026-06-21 21:14:42.852+00	2026-07-17 20:37:52.738+00	francesco.fontana.27383@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	128	SCHOOL_STUDENT
5059ad26-250c-4d50-8b85-1855ac4d02d7	Francesco	Gallo	Francesco Gallo	student	active	2026-07-11 04:18:51.485+00	2026-07-17 20:37:52.738+00	francesco.gallo.27384@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	151	SCHOOL_STUDENT
ca53a804-b171-4b96-a28e-f78ff449aa23	Francesco	Rossi	Francesco Rossi	student	active	2026-06-30 10:59:49.972+00	2026-07-17 20:37:52.738+00	francesco.rossi.27385@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	278	SCHOOL_STUDENT
0adc1619-3c16-43e1-819a-27e1cc88b3ef	Marco	Bruno	Marco Bruno	student	active	2026-07-15 09:12:33.909+00	2026-07-17 20:37:52.738+00	marco.bruno.27386@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	161	SCHOOL_STUDENT
c7f2a141-8e2c-4577-9b42-205b7d4d672c	Leonardo	Conti	Leonardo Conti	student	active	2026-06-29 03:26:45.757+00	2026-07-17 20:37:52.738+00	leonardo.conti.27387@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	66	SCHOOL_STUDENT
5f43067c-2ed6-4d66-9189-bfa814864f11	Alessandro	Bianchi	Alessandro Bianchi	student	active	2026-07-16 09:11:29.515+00	2026-07-17 20:37:52.739+00	alessandro.bianchi.27388@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	128	SCHOOL_STUDENT
4b237d7f-d37e-449b-9dd4-80a7da5eb83f	Elena	Russo	Elena Russo	student	active	2026-07-10 06:02:46.178+00	2026-07-17 20:37:52.739+00	elena.russo.27399@gcprof-test.com	/mUoa8ngNSSPE0A.oO/a3LKs8WmSABscJhlW7O0enGlMrqpL.	\N	115	SCHOOL_STUDENT
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quizzes" ("id", "title", "description", "status", "penalty_enabled", "negative_mark", "max_score", "created_by", "created_at", "updated_at", "passing_score") FROM stdin;
71e55eca-e273-41a6-8143-b15df93ec35d	Conoscenze di Base sull'Intelligenza Artificiale	Quiz introduttivo per verificare le principali nozioni di base sull'Intelligenza Artificiale.	active	t	0.25	10.00	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-15 10:31:04.962073+00	2026-07-15 10:31:55.754+00	60.00
9a99cbcf-97eb-44e8-841d-5d0d09985917	Conoscenze di Base del Linguaggio Python	Quiz introduttivo per verificare le principali nozioni fondamentali del linguaggio Python per studenti principianti.	active	t	0.25	10.00	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-15 14:20:28.653097+00	2026-07-15 14:21:10.536+00	60.00
\.


--
-- Data for Name: course_quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_quizzes" ("course_id", "quiz_id") FROM stdin;
\.


--
-- Data for Name: document_configs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."document_configs" ("id", "label", "file_path", "is_active", "updated_at") FROM stdin;
html	Slide HTML	/showcase/index.html	t	2026-07-07 19:08:05.7+00
pdf	Documento PDF	/docs/gcprof-academy-showcase.pdf	t	2026-07-07 19:14:52.544+00
google_slides	Google Slides	https://docs.google.com/presentation/d/1H-9sSJykMteHWcKBKxsnozzYSOBWhbJ10_cBTuo-sPY/preview	t	2026-07-07 19:28:17.897+00
google_sheet	Google Sheets	https://docs.google.com/spreadsheets/d/1mQ86Hez67apQqteKgAMCMd9Ysa_LsAeILcZcmZGYkFA/preview	t	2026-07-07 19:30:35.336+00
google_doc	Google Docs	https://docs.google.com/document/d/19bILcE6pEW4NbhRRdFo9UruIHD02h6ARwomJFhsXeII/preview	t	2026-07-07 19:32:24.333+00
markdown	Documentazione (.md)	https://vaokzyznazkcqjpbbkgr.supabase.co/storage/v1/object/public/contents/markdown_1783589211702.md	t	2026-07-09 09:26:56.678+00
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."lessons" ("id", "module_id", "title", "duration", "content_type", "youtube_url", "google_drive_url", "quiz_id", "sort_order", "created_at") FROM stdin;
\.


--
-- Data for Name: mail_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."mail_logs" ("id", "template_key", "recipient", "subject", "status", "provider", "provider_id", "error_message", "created_at") FROM stdin;
\.


--
-- Data for Name: mail_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."mail_settings" ("id", "value", "updated_at") FROM stdin;
PRIMARY_COLOR	#2563eb	2026-07-04 11:16:36.96365+00
SECONDARY_COLOR	#1e293b	2026-07-04 11:16:36.96365+00
ACADEMY_NAME	GCPROF-ACADEMY	2026-07-04 15:42:10.161772+00
MAIL_FROM_EMAIL	info@gcprof-academy.com	2026-07-04 15:42:33.568845+00
MAIL_FROM_NAME	GCPROF-ACADEMY	2026-07-04 15:42:41.539782+00
MAIL_REPLY_TO	info@gcprof-academy.com	2026-07-04 15:42:53.24029+00
\.


--
-- Data for Name: mail_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."mail_templates" ("id", "template_key", "name", "description", "subject", "title_override", "body_text_override", "enabled", "version", "created_at", "updated_at", "updated_by") FROM stdin;
4f6a34cb-5f9f-44af-9d1e-9d9ca498e0ef	PASSWORD_RESET	Recupero Password	Inviata durante il reset password.	 {{academy_name}} Recupera la tua password	Reset Password	Hai richiesto il recupero della password.\r\n\r\nUtilizza il link sottostante.	t	1	2026-07-04 11:16:49.297209+00	2026-07-05 13:29:03.278105+00	\N
eb967192-476a-485f-88a8-91863e6071bb	CONTACT_REPLY	Risposta Contatti	Risposta automatica del form Contatti.	 {{academy_name}} Abbiamo ricevuto il tuo messaggio	Grazie per averci contattato	Ti risponderemo nel più breve tempo possibile.	t	1	2026-07-04 11:16:49.297209+00	2026-07-05 13:29:17.842118+00	\N
d3bca8b6-93d8-47c3-8182-57a5e325783f	WELCOME	Email di Benvenuto	Inviata dopo la registrazione.	 {{academy_name}} Benvenuto sulla piattaforma di E-Learning del Prof. Giuseppe Carnabuci	Benvenuto!	Ciao {{first_name}},\r\n\r\nsiamo felici di averti nella nostra Academy.	t	1	2026-07-04 11:16:49.297209+00	2026-07-05 13:29:21.713849+00	\N
060a7d90-d767-4090-82cd-5cd152708b50	SUPPORT	Supporto Studenti	Inviato per supporto studenti	{{academy_name}} Scusa per il disagio provvederemo al più presto a risolvere il problema!	Supporto Studenti	Ciao {{first_name}}, risolveremo il problema al più presto!	t	1	2026-07-06 09:18:41.068016+00	2026-07-06 09:18:41.068016+00	\N
5b174126-7974-4472-a658-ca874d0ee4f7	QUIZ_GRADED	Notifica Correzione Quiz	Notifica correzione quiz	Risultati quiz: {{quiz_title}}	Il tuo quiz è stato corretto	Ciao {{first_name}} il tuo quiz "{{quiz_title}}" è stato corretto. Hai ottenuto {{score}} punti su {{max_score}}.	t	1	2026-07-15 15:18:53.19338+00	2026-07-15 16:09:03.643358+00	\N
9a7cf8ef-f47b-4047-bd22-a70585dd1eb0	QUIZ_SUBMITTED	Notifica Sottomissione Quiz	Notifica consegna quiz	Ricezione quiz: {{quiz_title}}	Quiz inviato con successo!	Ciao {{first_name}} abbiamo ricevuto il tuo quiz "{{quiz_title}}". Il docente provvederà alla correzione a breve.	t	1	2026-07-15 15:18:53.19338+00	2026-07-15 16:09:10.075429+00	\N
fa2fd706-518b-445d-b7cf-0e81632ad142	ADMIN_NEW_REGISTRATION	Notifica nuovo studente registrato	Invia una email all amministratore quando un nuovo studente completa la registrazione.	Nuovo studente registrato su GCPROF AI Academy	Nuova registrazione studente	È stato registrato un nuovo studente sulla piattaforma.\r\n\r\nNome:\r\n{{display_name}}\r\n\r\nEmail:\r\n{{email}}\r\n\r\nClasse:\r\n{{class_name}}\r\n\r\nStato account:\r\n{{status}}\r\n\r\nData registrazione:\r\n{{created_at}}\r\n	t	1	2026-07-16 20:02:04.038716+00	2026-07-16 20:13:53.383417+00	\N
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."password_reset_tokens" ("id", "user_id", "token", "expires_at", "used", "created_at") FROM stdin;
\.


--
-- Data for Name: profile_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profile_classes" ("profile_id", "class_id", "assigned_at") FROM stdin;
388a12d4-86bb-437e-ade8-9212f4ed71a2	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.473+00
5067820d-8e28-4b39-93bb-6f27327f4262	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.473+00
e04943c0-03e6-40b7-8455-b0e4fd9f8ea2	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.473+00
3dd1e8aa-605b-4250-8bbf-3e92015fbbca	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.473+00
4b17d8c6-9f7f-4150-95de-b4854c54981f	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.473+00
31d853d8-b119-4c71-b3c2-bbd0ab6b2c52	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.473+00
276d099a-7787-4e64-a499-676e032b2d3c	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
4a508fb1-6273-4b30-ae95-99de271c5eab	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
5246374a-eac8-4387-a8ab-5e027b87ebee	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
4b879a88-057c-401b-8e67-a42b71e1191e	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
36560b87-10f5-4bde-96a5-7d76d0e14941	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
19f1e233-109f-45d2-a617-3dacc3404e27	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
552082c3-c24b-46d4-9c97-105dd08c2580	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
14b5139c-02df-4c32-9a6c-7db32d2eb4cc	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
94db2a87-c4ec-426b-a8ce-1fd009eba2bc	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
8c17aefd-92fe-44e4-a20d-54304e2bf29c	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
74fd5cb7-bf47-48d1-b6dc-30570c138b03	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
acacab4d-639c-436f-9c9e-83e0451745e6	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:20:11.474+00
7c2df191-2335-485c-8440-6255c53cac42	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:37:51.124+00
e28aaba8-4a95-4066-95d9-9bee7c0c4f14	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-17 20:37:51.124+00
0b8122b9-f0f9-49ef-9d2a-53ce20f93d24	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
bd6b746f-28fd-4230-b487-2b21d37e7a03	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
8755d3e9-e975-4242-83ff-9eac8541e7f3	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
63391b7a-c226-4f1c-aa85-4118fdb66f2a	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
e99e7175-2c6b-4509-bd77-ddd9f9381f02	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
f3037cc9-7f4f-4474-b6cb-281a3fd5e06f	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
eb3d50ad-8bf6-4926-871d-fd5ed2d28ffd	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
ba9fd638-27c4-49e7-a053-d18760caec1a	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
5e08c20c-9d47-4ebc-a2c7-4a1a9d32b5d6	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
a4b3b595-0a05-48e7-a833-accfb3bba5a2	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:37:51.685+00
52721a2f-c989-47df-acd8-5ea98fca7f0a	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.268+00
ec37ea0a-d13d-4bc0-baad-a49ec2068f65	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.268+00
855e961e-c716-455f-8b7b-8a2fca15c118	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.268+00
0db0fdc9-c6d0-4472-ba5e-2aa36170b999	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.268+00
8813e5ae-1d21-4576-8e28-4216cbe3601e	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.268+00
a991f5bc-2d24-4e4f-a26a-1e68f974dd77	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.269+00
6f6bb3df-7e53-4c27-8c34-5c5664e80643	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.269+00
914a2be2-b7af-4b3c-8b0b-d36e6e4471f1	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.269+00
c9d5c1d3-5358-435f-b659-0c1e5506892c	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.269+00
4c265f82-96bc-43e1-82ed-fb6cfcc86c46	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:37:52.269+00
aa8f9461-b8bd-4eb8-a8b7-09ff4e654db4	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
b809db09-3c05-45de-888d-614440253281	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
8ecbf7a9-b606-4524-824b-261576a333b2	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
6e440d86-4918-43f2-8b9b-5bf0b25c8b84	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
5059ad26-250c-4d50-8b85-1855ac4d02d7	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
ca53a804-b171-4b96-a28e-f78ff449aa23	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
0adc1619-3c16-43e1-819a-27e1cc88b3ef	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
c7f2a141-8e2c-4577-9b42-205b7d4d672c	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.738+00
5f43067c-2ed6-4d66-9189-bfa814864f11	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.739+00
4b237d7f-d37e-449b-9dd4-80a7da5eb83f	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:37:52.739+00
866a31f4-a1f9-41cb-84dc-5c2c919a587d	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
af4c5ea8-9f4f-4fb0-9da6-d723e9ca9697	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
00b287a5-cf10-429f-8d66-fee7ed804cb8	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
0994e4af-1284-4b9e-822d-8cdea942215f	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
7c8a47c1-ca46-4129-9351-7bbb48fed577	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
aeda85df-fba2-448b-ba7d-b0411f617361	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
8c383c54-227e-476d-8a3a-b4971f87c995	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
16240dde-0ebd-46c5-93e0-84bc3e218c64	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
980cffc7-adce-48ea-826e-228325b04f9e	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
61cb7379-03d2-4d44-967e-589c4d683902	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-17 20:39:52.444827+00
705b6cee-06d8-4502-bb9c-07c3bdc43fad	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
3aeefc71-5132-4304-be3c-54ee07409532	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
4ee2130d-9529-433d-927b-45aa4296cf7c	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
81e3e7d7-ce8f-43d5-b995-4206a86ede74	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
1659f602-1407-404d-82dc-d26323de00ac	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
39e82fdd-d868-4266-a2d5-906ac771c4a1	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
7aedc5c5-29d1-4419-bc7a-9dfb7c3bd316	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
89b4c1ea-1015-4bd3-b8e3-fd8afa1a2fb3	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
59702fb8-a0cd-407b-a46a-5e143f244997	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
c46b50cc-e3b9-4f5e-975f-038abb5e8750	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-17 20:40:30.673617+00
95d09a02-c9e3-4643-a0b3-fbf4ac79ecc6	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
3a896c73-acb0-4d7a-bc23-3023aefa8de2	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
dc21fa2d-02c2-48fd-ab64-75a8288f0312	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
3d14a552-520d-40f8-a331-b98e4546a1ba	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
cd4acb0c-a1e2-4625-9d07-ae7bab9f0a92	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
17a6c30d-a047-48e7-9036-b8fff19d05bd	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
dfee8771-3374-4d61-bc4b-dd6451b35827	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
ceabfe3f-4311-472e-9100-1aa59216ee8e	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
1d6da114-2ebf-437c-934f-bf72688b84e1	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
7fc21e1f-8a49-45b0-8fe9-8b5471e884b5	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-17 20:40:44.249175+00
d5374bcf-6acb-485e-a013-54a9b8cb5b85	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
4e4bfbd9-7fc5-4b35-a4ff-9f16fd225713	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
b8f2d508-9975-4f55-8ba5-78298f3fc790	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
115b5c08-a367-4d62-9b47-7ebf158481c5	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
e1df555b-7672-44d8-9288-6f501436ea06	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
aeb5833c-c05e-4535-820b-dbf6e1ad5b3a	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
0dd51177-d2b1-48be-80cd-4024b8b538ce	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
f6c1b634-8e05-4d08-aad5-10be1a6e3bc6	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
34148bd4-d1eb-48f1-b592-74df18b640ef	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
e3ed489e-d171-46e6-adb9-02ff03c1296e	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-17 20:43:45.220238+00
\.


--
-- Data for Name: profile_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profile_courses" ("profile_id", "course_id", "enrolled_at", "status", "approved_at", "approved_by", "updated_at") FROM stdin;
e5c47463-3c4f-4d68-9698-d255b6905dd9	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 14:39:56.722753+00	active	\N	\N	2026-07-17 15:59:19.205+00
388a12d4-86bb-437e-ade8-9212f4ed71a2	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
5067820d-8e28-4b39-93bb-6f27327f4262	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
115b5c08-a367-4d62-9b47-7ebf158481c5	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
e04943c0-03e6-40b7-8455-b0e4fd9f8ea2	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
89b4c1ea-1015-4bd3-b8e3-fd8afa1a2fb3	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
3dd1e8aa-605b-4250-8bbf-3e92015fbbca	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
cd4acb0c-a1e2-4625-9d07-ae7bab9f0a92	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
4b17d8c6-9f7f-4150-95de-b4854c54981f	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
31d853d8-b119-4c71-b3c2-bbd0ab6b2c52	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
4ee2130d-9529-433d-927b-45aa4296cf7c	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
b8f2d508-9975-4f55-8ba5-78298f3fc790	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
61cb7379-03d2-4d44-967e-589c4d683902	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
276d099a-7787-4e64-a499-676e032b2d3c	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
705b6cee-06d8-4502-bb9c-07c3bdc43fad	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
4a508fb1-6273-4b30-ae95-99de271c5eab	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
3a896c73-acb0-4d7a-bc23-3023aefa8de2	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
39e82fdd-d868-4266-a2d5-906ac771c4a1	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
aeda85df-fba2-448b-ba7d-b0411f617361	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
59702fb8-a0cd-407b-a46a-5e143f244997	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
5246374a-eac8-4387-a8ab-5e027b87ebee	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
4b879a88-057c-401b-8e67-a42b71e1191e	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
36560b87-10f5-4bde-96a5-7d76d0e14941	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
f6c1b634-8e05-4d08-aad5-10be1a6e3bc6	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
7fc21e1f-8a49-45b0-8fe9-8b5471e884b5	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
00b287a5-cf10-429f-8d66-fee7ed804cb8	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
980cffc7-adce-48ea-826e-228325b04f9e	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
e1df555b-7672-44d8-9288-6f501436ea06	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
0dd51177-d2b1-48be-80cd-4024b8b538ce	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
8c383c54-227e-476d-8a3a-b4971f87c995	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
17a6c30d-a047-48e7-9036-b8fff19d05bd	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
19f1e233-109f-45d2-a617-3dacc3404e27	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
dfee8771-3374-4d61-bc4b-dd6451b35827	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
81e3e7d7-ce8f-43d5-b995-4206a86ede74	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
552082c3-c24b-46d4-9c97-105dd08c2580	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
e3ed489e-d171-46e6-adb9-02ff03c1296e	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
866a31f4-a1f9-41cb-84dc-5c2c919a587d	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
3aeefc71-5132-4304-be3c-54ee07409532	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
1659f602-1407-404d-82dc-d26323de00ac	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
14b5139c-02df-4c32-9a6c-7db32d2eb4cc	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
94db2a87-c4ec-426b-a8ce-1fd009eba2bc	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
7aedc5c5-29d1-4419-bc7a-9dfb7c3bd316	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
ceabfe3f-4311-472e-9100-1aa59216ee8e	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
8c17aefd-92fe-44e4-a20d-54304e2bf29c	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
74fd5cb7-bf47-48d1-b6dc-30570c138b03	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
acacab4d-639c-436f-9c9e-83e0451745e6	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
0994e4af-1284-4b9e-822d-8cdea942215f	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
7c8a47c1-ca46-4129-9351-7bbb48fed577	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
34148bd4-d1eb-48f1-b592-74df18b640ef	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
4e4bfbd9-7fc5-4b35-a4ff-9f16fd225713	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
aeb5833c-c05e-4535-820b-dbf6e1ad5b3a	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:20:11.256224+00	pending	\N	\N	2026-07-17 20:20:11.256224+00
3d14a552-520d-40f8-a331-b98e4546a1ba	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
c46b50cc-e3b9-4f5e-975f-038abb5e8750	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
1d6da114-2ebf-437c-934f-bf72688b84e1	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
dc21fa2d-02c2-48fd-ab64-75a8288f0312	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
7c2df191-2335-485c-8440-6255c53cac42	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
16240dde-0ebd-46c5-93e0-84bc3e218c64	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
e28aaba8-4a95-4066-95d9-9bee7c0c4f14	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
d5374bcf-6acb-485e-a013-54a9b8cb5b85	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
95d09a02-c9e3-4643-a0b3-fbf4ac79ecc6	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
af4c5ea8-9f4f-4fb0-9da6-d723e9ca9697	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:50.754782+00	pending	\N	\N	2026-07-17 20:37:50.754782+00
52721a2f-c989-47df-acd8-5ea98fca7f0a	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
ec37ea0a-d13d-4bc0-baad-a49ec2068f65	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
855e961e-c716-455f-8b7b-8a2fca15c118	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
0db0fdc9-c6d0-4472-ba5e-2aa36170b999	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
8813e5ae-1d21-4576-8e28-4216cbe3601e	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
a991f5bc-2d24-4e4f-a26a-1e68f974dd77	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
6f6bb3df-7e53-4c27-8c34-5c5664e80643	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
914a2be2-b7af-4b3c-8b0b-d36e6e4471f1	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
c9d5c1d3-5358-435f-b659-0c1e5506892c	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
4c265f82-96bc-43e1-82ed-fb6cfcc86c46	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 20:37:51.911367+00	pending	\N	\N	2026-07-17 20:37:51.911367+00
aa8f9461-b8bd-4eb8-a8b7-09ff4e654db4	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
b809db09-3c05-45de-888d-614440253281	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
8ecbf7a9-b606-4524-824b-261576a333b2	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
6e440d86-4918-43f2-8b9b-5bf0b25c8b84	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
5059ad26-250c-4d50-8b85-1855ac4d02d7	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
ca53a804-b171-4b96-a28e-f78ff449aa23	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
0adc1619-3c16-43e1-819a-27e1cc88b3ef	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
c7f2a141-8e2c-4577-9b42-205b7d4d672c	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
5f43067c-2ed6-4d66-9189-bfa814864f11	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
4b237d7f-d37e-449b-9dd4-80a7da5eb83f	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:38.338769+00	pending	\N	\N	2026-07-17 21:20:38.338769+00
0b8122b9-f0f9-49ef-9d2a-53ce20f93d24	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
bd6b746f-28fd-4230-b487-2b21d37e7a03	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
8755d3e9-e975-4242-83ff-9eac8541e7f3	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
63391b7a-c226-4f1c-aa85-4118fdb66f2a	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
e99e7175-2c6b-4509-bd77-ddd9f9381f02	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
f3037cc9-7f4f-4474-b6cb-281a3fd5e06f	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
eb3d50ad-8bf6-4926-871d-fd5ed2d28ffd	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
ba9fd638-27c4-49e7-a053-d18760caec1a	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
5e08c20c-9d47-4ebc-a2c7-4a1a9d32b5d6	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
a4b3b595-0a05-48e7-a833-accfb3bba5a2	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-17 21:20:47.941202+00	pending	\N	\N	2026-07-17 21:20:47.941202+00
\.


--
-- Data for Name: profile_lessons_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profile_lessons_progress" ("profile_id", "lesson_id", "course_id", "is_completed", "minutes_watched", "last_accessed_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: quiz_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_attempts" ("id", "quiz_id", "student_id", "started_at", "completed_at", "auto_score", "teacher_score", "final_score", "status", "created_at") FROM stdin;
83f90a5c-138e-4509-beca-438f7de5b251	71e55eca-e273-41a6-8143-b15df93ec35d	e5c47463-3c4f-4d68-9698-d255b6905dd9	2026-07-17 15:16:32.747248+00	2026-07-17 15:16:34.264+00	3.00	3.0	6.00	graded	2026-07-17 15:16:32.747248+00
\.


--
-- Data for Name: quiz_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_questions" ("id", "quiz_id", "type", "order_index", "text", "points", "created_at") FROM stdin;
ddcb1277-ecf3-4d31-8938-c6217f5fdbee	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	1	Che cosa si intende per Intelligenza Artificiale (IA)?	0.50	2026-07-15 10:31:05.067048+00
9fe8a9f1-0045-4fa1-8ea2-c6610fa34c25	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	2	Quale tra i seguenti è un esempio di applicazione dell'Intelligenza Artificiale?	0.50	2026-07-15 10:31:05.23513+00
6c068e81-75fe-4013-b3b4-2479cc0a4020	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	3	Perché i dati sono importanti nell'Intelligenza Artificiale?	0.50	2026-07-15 10:31:05.38101+00
4f50aeab-b7a0-4106-a3fc-0dc147be0eb7	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	4	Quale tra questi termini indica un programma in grado di generare testi, immagini o altri contenuti?	0.50	2026-07-15 10:31:05.519141+00
2051d371-4727-4bb7-90be-718b201591ff	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	5	Che cos'è un algoritmo?	0.50	2026-07-15 10:31:05.653152+00
172f8306-35e1-47fa-b419-46262039754d	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	6	Quale delle seguenti affermazioni descrive meglio un chatbot basato sull'IA?	0.50	2026-07-15 10:31:05.780752+00
0610ad7a-5089-4c2e-8fbe-87f8adb8eafb	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	7	Quale comportamento rappresenta un uso responsabile dell'Intelligenza Artificiale?	0.50	2026-07-15 10:31:05.923627+00
4d2c38c5-c1ae-4265-b744-4fe06c781186	71e55eca-e273-41a6-8143-b15df93ec35d	multiple_choice	8	Quale delle seguenti affermazioni è corretta?	0.50	2026-07-15 10:31:06.100806+00
7618d877-d818-4977-864e-0ef4fae6aadf	71e55eca-e273-41a6-8143-b15df93ec35d	open_ended	9	Spiega con parole tue che cos'è l'Intelligenza Artificiale e descrivi un esempio di utilizzo nella vita quotidiana, indicando almeno un vantaggio e una possibile limitazione del suo impiego.	6.00	2026-07-15 10:31:06.266568+00
dd01bb65-2a63-4bb5-b666-88d6c03aeaab	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	1	Che cos'è Python?	0.50	2026-07-15 14:20:28.932733+00
585313a1-05cc-4fe0-80d7-4c40a1b599b8	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	2	Quale funzione viene utilizzata in Python per visualizzare un messaggio sullo schermo?	0.50	2026-07-15 14:20:29.390492+00
3d919136-a5ea-403d-9d98-aaaee40a89f4	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	3	Che cosa rappresenta una variabile in Python?	0.50	2026-07-15 14:20:29.987168+00
401920b4-bbba-44dd-85e4-42183fa91685	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	4	Quale dei seguenti è un tipo di dato fondamentale in Python?	0.50	2026-07-15 14:20:30.578564+00
9e84929b-79f4-43ea-9281-4a46c5a025ca	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	5	Quale simbolo viene utilizzato in Python per inserire un commento nel codice?	0.50	2026-07-15 14:20:31.121937+00
878e5760-2e21-4ac8-b61e-0345e7e2e0c6	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	6	Quale risultato produce il seguente codice Python? nome = "Anna" print(nome)	0.50	2026-07-15 14:20:31.66411+00
d298451d-8a41-4a8c-a25b-bff184688a8f	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	7	Quale funzione permette di acquisire un valore inserito dall'utente tramite tastiera?	0.50	2026-07-15 14:20:32.227207+00
215d6b1a-39ab-49ff-addf-a72d541199ca	9a99cbcf-97eb-44e8-841d-5d0d09985917	multiple_choice	8	A cosa serve un'istruzione condizionale if in Python?	0.50	2026-07-15 14:20:32.853002+00
14a7ea36-3a71-4580-9a53-af56a0b60d0c	9a99cbcf-97eb-44e8-841d-5d0d09985917	open_ended	9	Spiega brevemente che cos'è Python e descrivi un semplice esempio di programma che utilizza una variabile, la funzione print() e la funzione input() per acquisire un dato dall'utente.	6.00	2026-07-15 14:20:33.236019+00
\.


--
-- Data for Name: quiz_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_options" ("id", "question_id", "text", "is_correct") FROM stdin;
5338d9c4-848f-4fac-9083-32863fc7566b	ddcb1277-ecf3-4d31-8938-c6217f5fdbee	Un insieme di componenti hardware per aumentare la velocità del computer.	f
e4f4ea91-f7f8-403b-8a92-27021c8cc030	ddcb1277-ecf3-4d31-8938-c6217f5fdbee	Una disciplina dell'informatica che sviluppa sistemi capaci di svolgere compiti che richiedono intelligenza umana.	t
8ad5907b-e777-4eb9-95ef-1b3869f0383d	ddcb1277-ecf3-4d31-8938-c6217f5fdbee	Un sistema operativo progettato per il cloud computing.	f
c9d68567-7808-46cf-bd5d-fd575876c30c	ddcb1277-ecf3-4d31-8938-c6217f5fdbee	Un linguaggio di programmazione per creare videogiochi.	f
2e607f87-8de3-4bef-8f6a-fbca34f28b95	9fe8a9f1-0045-4fa1-8ea2-c6610fa34c25	Un cavo Ethernet.	f
f53ac7c1-ad66-4290-a2c8-20f6b11603a2	9fe8a9f1-0045-4fa1-8ea2-c6610fa34c25	Una tastiera meccanica.	f
fa6b5874-6627-4370-b0f2-5af8e11a5155	9fe8a9f1-0045-4fa1-8ea2-c6610fa34c25	Un assistente vocale che risponde alle domande dell'utente.	t
41d84a99-971f-4636-b209-804a36f42b63	9fe8a9f1-0045-4fa1-8ea2-c6610fa34c25	Un monitor ad alta risoluzione.	f
72bd1989-c48a-45b2-a158-cf24aa75b8d1	6c068e81-75fe-4013-b3b4-2479cc0a4020	Servono esclusivamente per aumentare la memoria del computer.	f
b0bfed0e-5285-493d-be6e-f1d19e1371c5	6c068e81-75fe-4013-b3b4-2479cc0a4020	Consentono di migliorare la velocità della connessione Internet.	f
f1aba369-7596-4ab1-a88b-79f4c76bf176	6c068e81-75fe-4013-b3b4-2479cc0a4020	Permettono ai modelli di apprendere e prendere decisioni.	t
c0d5727e-9248-4b20-9cb5-f777ec420404	6c068e81-75fe-4013-b3b4-2479cc0a4020	Eliminano completamente la necessità di programmare.	f
02742361-f966-429a-85c2-6e375a51954e	4f50aeab-b7a0-4106-a3fc-0dc147be0eb7	Database relazionale.	f
48201a9c-160d-4a77-ae62-1aeeae99a7db	4f50aeab-b7a0-4106-a3fc-0dc147be0eb7	Intelligenza Artificiale Generativa.	t
b28ed992-eeaa-4182-bed8-d69f11214ee5	4f50aeab-b7a0-4106-a3fc-0dc147be0eb7	Firewall.	f
8b135bf8-49d7-42cb-b99a-69174d380eb1	4f50aeab-b7a0-4106-a3fc-0dc147be0eb7	Sistema Embedded.	f
3c5fc9f3-54e2-4a1d-975c-b45456b11fa6	2051d371-4727-4bb7-90be-718b201591ff	Un componente elettronico del processore.	f
55db32ec-4f46-47e4-94da-5682edd04920	2051d371-4727-4bb7-90be-718b201591ff	Una sequenza ordinata di istruzioni per risolvere un problema.	t
23ce7fdc-3cd6-4296-afbf-aab0a9d83c48	2051d371-4727-4bb7-90be-718b201591ff	Un tipo di memoria RAM.	f
427fdb1c-ef95-487e-97ea-bfa4e9b8554e	2051d371-4727-4bb7-90be-718b201591ff	Un linguaggio di markup.	f
f9f13afe-a380-4730-89c7-881d3186b3ec	172f8306-35e1-47fa-b419-46262039754d	È un programma utilizzato esclusivamente per comprimere file.	f
76ecc452-1885-4c72-85e5-614477cd9e46	172f8306-35e1-47fa-b419-46262039754d	È un software che gestisce solo database aziendali.	f
129c5dfc-8eb5-4b30-ad36-145150b9e62a	172f8306-35e1-47fa-b419-46262039754d	È un'applicazione che può comprendere e generare risposte in linguaggio naturale.	t
9a88855f-07b8-4b98-b24b-bd674126e07b	172f8306-35e1-47fa-b419-46262039754d	È un antivirus specializzato nella rimozione dei malware.	f
012b2a47-45bd-4c5c-8f63-c5d7eff2776e	0610ad7a-5089-4c2e-8fbe-87f8adb8eafb	Considerare sempre corrette tutte le risposte dell'IA.	f
806ca008-19ba-464f-8101-956a0b5cc3b8	0610ad7a-5089-4c2e-8fbe-87f8adb8eafb	Copiare integralmente qualsiasi contenuto generato senza verificarlo.	f
c5b01d35-6c04-487c-a81f-f7124a408c03	0610ad7a-5089-4c2e-8fbe-87f8adb8eafb	Controllare e verificare le informazioni prodotte dall'IA prima di utilizzarle.	t
c10bb945-2aea-4885-938e-20c304577c36	0610ad7a-5089-4c2e-8fbe-87f8adb8eafb	Utilizzare l'IA per diffondere informazioni false.	f
a0bdbfc5-737a-40eb-a9b6-bd2672bf65be	4d2c38c5-c1ae-4265-b744-4fe06c781186	L'Intelligenza Artificiale sostituisce sempre completamente l'essere umano.	f
bc562ec0-0a2f-4564-b196-e16b5f01982e	4d2c38c5-c1ae-4265-b744-4fe06c781186	L'IA può prendere decisioni perfette in qualsiasi situazione.	f
32b55599-95bd-437d-98c1-b4b343cd59b1	4d2c38c5-c1ae-4265-b744-4fe06c781186	L'IA funziona senza dati e senza algoritmi.	f
2c3b8b9a-b020-4f4f-9f0f-4ce4f074511e	4d2c38c5-c1ae-4265-b744-4fe06c781186	L'IA è uno strumento che supporta le persone nello svolgimento di molti compiti, ma presenta anche dei limiti.	t
3914e8ac-5be3-43e2-852b-c6740bdddcf7	dd01bb65-2a63-4bb5-b666-88d6c03aeaab	Un sistema operativo utilizzato nei computer.	f
9fa2e5ac-3b9a-4d91-8ae1-d5cc60c73ac9	dd01bb65-2a63-4bb5-b666-88d6c03aeaab	Un linguaggio di programmazione ad alto livello utilizzato per creare software, analizzare dati e sviluppare applicazioni.	t
ed5a3a5f-43a2-4a0c-b7bc-646c5ff5f86b	dd01bb65-2a63-4bb5-b666-88d6c03aeaab	Un programma per la gestione dei file del computer.	f
1f0c9995-9542-4809-9f57-d8729a2b9ff8	dd01bb65-2a63-4bb5-b666-88d6c03aeaab	Un componente hardware presente nella scheda madre.	f
de4c6e64-8e0c-4dd7-91a5-1e415773405f	585313a1-05cc-4fe0-80d7-4c40a1b599b8	print()	t
b0dd2da7-1d5a-47e6-b132-85854d5f710f	585313a1-05cc-4fe0-80d7-4c40a1b599b8	display()	f
4293fe63-9db9-48b3-8323-d156da442a61	585313a1-05cc-4fe0-80d7-4c40a1b599b8	show()	f
31825b8a-6807-494c-9459-fbf0cc40a3be	585313a1-05cc-4fe0-80d7-4c40a1b599b8	output()	f
585929a6-9b52-4eaa-9886-5e2a043021a6	3d919136-a5ea-403d-9d98-aaaee40a89f4	Un errore che impedisce l'esecuzione del programma.	f
96d04b1f-237b-4ca2-b424-d248a49b15d5	3d919136-a5ea-403d-9d98-aaaee40a89f4	Un contenitore utilizzato per memorizzare un valore che può essere modificato durante l'esecuzione del programma.	t
b788a0d2-4ad7-44c8-986d-145decfeaf52	3d919136-a5ea-403d-9d98-aaaee40a89f4	Un dispositivo hardware collegato al computer.	f
f8dcb8c7-7176-4671-a5db-3c8e1be5ebc3	3d919136-a5ea-403d-9d98-aaaee40a89f4	Un programma già pronto installato nel sistema operativo.	f
6f33bb2f-ebf3-482e-a1a6-6ee3e2efae04	401920b4-bbba-44dd-85e4-42183fa91685	Computer	f
ab704438-e5b6-440b-a334-bc40cc1fa8b0	401920b4-bbba-44dd-85e4-42183fa91685	Browser	f
5b739406-fc5f-4586-9795-10c6124f3b5d	401920b4-bbba-44dd-85e4-42183fa91685	Stringa (str)	t
d7f7eced-071d-4c79-9e38-fca0b0079898	401920b4-bbba-44dd-85e4-42183fa91685	Stampante	f
3a449eb4-40fc-438b-a141-f7fe5b132926	9e84929b-79f4-43ea-9281-4a46c5a025ca	//	f
3c98ac11-62f6-4ec7-bce4-2481a9569b55	9e84929b-79f4-43ea-9281-4a46c5a025ca	#	t
b5a61b61-1679-4c69-a267-3e1d0dd3d64c	9e84929b-79f4-43ea-9281-4a46c5a025ca	<!-- -->	f
8d715edc-3407-4a6c-bd5f-562cca9fd7af	9e84929b-79f4-43ea-9281-4a46c5a025ca	**	f
3b94cbaa-b60e-4797-a563-dad4f13d63a6	878e5760-2e21-4ac8-b61e-0345e7e2e0c6	Visualizza la parola Anna sullo schermo.	t
13909c15-88bb-4943-8477-3eb73c9e469d	878e5760-2e21-4ac8-b61e-0345e7e2e0c6	Cancella il contenuto della variabile nome.	f
44fa8084-5c05-4679-8ef8-d344170c3520	878e5760-2e21-4ac8-b61e-0345e7e2e0c6	Crea una nuova variabile chiamata print.	f
2e1ab6d7-dd4f-4a50-96fc-d106dab9f843	878e5760-2e21-4ac8-b61e-0345e7e2e0c6	Genera sempre un errore di esecuzione.	f
6b41ce09-fce2-4d77-bf56-d2af014611f4	d298451d-8a41-4a8c-a25b-bff184688a8f	input()	t
6ee1626e-15ef-479b-b5df-d8b85b440534	d298451d-8a41-4a8c-a25b-bff184688a8f	enter()	f
c00f8f8f-e805-41d6-a9a1-789aa0470dea	d298451d-8a41-4a8c-a25b-bff184688a8f	read()	f
2f771c74-95f0-46ca-b7e8-168d18e2718d	d298451d-8a41-4a8c-a25b-bff184688a8f	scan()	f
c8381609-5909-4275-93d1-c1de9ab6495a	215d6b1a-39ab-49ff-addf-a72d541199ca	A installare automaticamente nuovi programmi.	f
5fcde017-1529-4695-a424-c54a50e7b1af	215d6b1a-39ab-49ff-addf-a72d541199ca	A creare una copia del sistema operativo.	f
7499ec84-a6af-4a05-83a8-c6beaaebb06b	215d6b1a-39ab-49ff-addf-a72d541199ca	A eseguire determinate istruzioni solo quando una condizione è verificata.	t
aabb4d71-ffa3-4d10-a0c5-62add9332449	215d6b1a-39ab-49ff-addf-a72d541199ca	A eliminare tutte le variabili presenti nella memoria.	f
\.


--
-- Data for Name: quiz_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_answers" ("id", "attempt_id", "question_id", "selected_option_id", "open_answer_text", "is_correct", "score", "created_at") FROM stdin;
41cf76cf-609e-4577-9853-63b099fa29a0	83f90a5c-138e-4509-beca-438f7de5b251	ddcb1277-ecf3-4d31-8938-c6217f5fdbee	5338d9c4-848f-4fac-9083-32863fc7566b	\N	f	0.00	2026-07-17 15:16:32.866071+00
01cfb909-0d1d-4304-b9df-ff00755d1115	83f90a5c-138e-4509-beca-438f7de5b251	9fe8a9f1-0045-4fa1-8ea2-c6610fa34c25	2e607f87-8de3-4bef-8f6a-fbca34f28b95	\N	f	0.00	2026-07-17 15:16:32.866071+00
1af184ba-ead8-4b04-a1b0-91eb6746c22f	83f90a5c-138e-4509-beca-438f7de5b251	6c068e81-75fe-4013-b3b4-2479cc0a4020	72bd1989-c48a-45b2-a158-cf24aa75b8d1	\N	f	0.00	2026-07-17 15:16:32.866071+00
f11ccf6a-58f3-4ac9-8a2c-39809e65f6da	83f90a5c-138e-4509-beca-438f7de5b251	4f50aeab-b7a0-4106-a3fc-0dc147be0eb7	02742361-f966-429a-85c2-6e375a51954e	\N	f	0.00	2026-07-17 15:16:32.866071+00
21ced61e-d17f-49de-87b1-72b1fe02379b	83f90a5c-138e-4509-beca-438f7de5b251	2051d371-4727-4bb7-90be-718b201591ff	55db32ec-4f46-47e4-94da-5682edd04920	\N	t	0.50	2026-07-17 15:16:32.866071+00
e8e4bb41-70e0-4c5a-b5a4-a7b5d28a153a	83f90a5c-138e-4509-beca-438f7de5b251	172f8306-35e1-47fa-b419-46262039754d	129c5dfc-8eb5-4b30-ad36-145150b9e62a	\N	t	0.50	2026-07-17 15:16:32.866071+00
91f7fae6-8f88-4861-afe5-5e5fb80b778b	83f90a5c-138e-4509-beca-438f7de5b251	0610ad7a-5089-4c2e-8fbe-87f8adb8eafb	c5b01d35-6c04-487c-a81f-f7124a408c03	\N	t	0.50	2026-07-17 15:16:32.866071+00
246c70a2-e678-464b-a510-5a210d1d1074	83f90a5c-138e-4509-beca-438f7de5b251	4d2c38c5-c1ae-4265-b744-4fe06c781186	2c3b8b9a-b020-4f4f-9f0f-4ce4f074511e	\N	t	0.50	2026-07-17 15:16:32.866071+00
8bcdd920-9e0f-41e3-a1fd-23f46b1df9d5	83f90a5c-138e-4509-beca-438f7de5b251	7618d877-d818-4977-864e-0ef4fae6aadf	\N	aaaaa	t	3.00	2026-07-17 15:16:32.866071+00
\.


--
-- Data for Name: quiz_assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_assignments" ("id", "quiz_id", "course_id", "assigned_at", "due_at", "is_visible") FROM stdin;
0b5aa974-0c70-46a5-8f63-c61a82cb8610	71e55eca-e273-41a6-8143-b15df93ec35d	233e9b23-a9b2-4b25-bb24-a86c2c3eb63e	2026-07-15 16:53:22.218992+00	\N	t
\.


--
-- Data for Name: quiz_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_reviews" ("id", "attempt_id", "teacher_id", "question_id", "score", "comment", "reviewed_at") FROM stdin;
84752588-48dc-4f9b-a6a1-2d7b5dd7ddf3	83f90a5c-138e-4509-beca-438f7de5b251	08be3132-7d36-46c3-9d31-2b1fd0b48d83	7618d877-d818-4977-864e-0ef4fae6aadf	3.0	\N	2026-07-17 15:17:22.898821+00
\.


--
-- Data for Name: user_page_views; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."user_page_views" ("id", "profile_id", "path", "course_slug", "lesson_slug", "viewed_at") FROM stdin;
555ab011-e443-4c4e-bdc1-7be69b35be25	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-09 07:41:07.3+00
da90d07c-4776-4010-96ea-9c006794e057	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-09 07:41:16.679+00
ed57a626-db03-40ac-b668-34c0fb54d14f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/contacts	\N	\N	2026-07-09 07:41:27.799+00
c88d3f44-90bd-4b06-bfdf-e32e2a520818	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 07:41:31.597+00
c1989cbb-5909-4204-82fa-9e656e43efcd	e5c47463-3c4f-4d68-9698-d255b6905dd9	/login	\N	\N	2026-07-17 14:40:08.906+00
435ff479-e725-4c1a-90b4-2c35d9e86174	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:25:20.905+00
04eee092-92fb-428d-913c-5d6b2102f22c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 19:54:45.854+00
84cdeb8c-d912-4e9a-8cbf-e28bfabc48fc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-09 08:11:20.504+00
afb4ae36-2f5d-4228-b559-eb0ca385486d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:12:09.574+00
c0a8dcac-e64e-40cd-afcf-5602befb4c3f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:20:21.306+00
ba6cc18c-7018-49bd-a05a-1243fcc7c2a6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:20:31.046+00
e7bbe943-7731-4d0a-b5d5-04ac9fe1a7e8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:24:05.368+00
13f19389-5a4d-4e39-856d-dc5e3ced2b4c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:31:34.623+00
52e575f0-ab0b-454c-ba3c-c140ab0433ac	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:37:56.454+00
f1c9e1cd-dfde-430f-b8a4-8e0e827b3a24	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:39:24.652+00
a270c317-4657-4242-a2e1-f5dcf2008974	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:40:29.903+00
d9927c19-6b82-4026-a861-44425f799891	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-09 08:58:06.225+00
3987e267-68ec-405d-a647-55edb14777e2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 08:58:10.088+00
a554e626-a31d-46f5-a215-49d0389e50cc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:01:04.893+00
73b45522-f4b9-469a-b3cc-2aad8fafe0ed	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-09 09:08:32.198+00
3eaf7eb5-9584-4e7b-9ae7-6d7289092033	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:08:35.069+00
f0d1d2e7-fd34-474f-bdad-4783095189e0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:09:09.784+00
bd686893-480b-4681-b1f7-642bfb0492fd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:09:14.349+00
6d9497f8-e9ad-4ae2-892f-3e227a1e88e7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:09:48.947+00
1121a4b9-6144-4be9-9e8c-134d4aac8b7f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:10:48.26+00
5cfebad4-767f-4f3a-9cc4-0e4f102e75af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:12:12.231+00
17876f29-4f7f-4267-9457-c2d1fd99939f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:13:53.666+00
451c2d68-cfaf-4d86-bf15-4c761c196e09	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:18:36.763+00
758bf618-a81a-49da-a7fd-9741bd6ea98a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:19:06.568+00
31cd39ea-33c4-480f-a274-6cf7ddd04a6d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:21:52.512+00
ecd58e6a-ffea-4e42-8e99-f04a1772932c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:23:31.866+00
bc403005-431d-4950-a68c-35d0aa93de17	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:24:50.937+00
ccf735c8-01f2-474c-b47f-2246ffc566db	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:26:36.05+00
d055a848-eff1-411c-9d03-8bb029381e79	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:26:39.493+00
e4e7b2bf-8baf-4543-bc0d-c35bfe79f20a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-09 09:27:18.803+00
0a7f68b5-8610-40ca-ba7b-644b5122c84f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 09:27:22.89+00
e02c906b-a118-48a1-97e9-021c9b894de9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:27:25.351+00
27f9f83c-85c7-4b13-ad83-398e43d7c607	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-09 09:29:56.697+00
90ae95da-b3a5-4336-af85-6e70ca465087	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:29:58.664+00
d0a7c719-f39b-4eac-afa8-789b6a4cfde1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-09 09:30:19.914+00
47b5980d-4ff2-4aef-95d6-ff719d375afe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-09 10:02:35.966+00
259b243b-9235-4e4c-9e5a-09471311bcd2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 10:02:51.584+00
67675ac6-92b2-4a9d-9b78-c79afc686f8f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses-v2	\N	\N	2026-07-11 14:31:15.364+00
2959efe2-b30c-4b50-8151-09bdc7a6c73f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 14:31:24.512+00
3d7d0e76-fa26-48b7-9e01-c2057894adda	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/contacts	\N	\N	2026-07-11 14:31:27.69+00
b2d9b592-a2d6-4dfd-a571-5e566181e004	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 14:31:31.841+00
0398d630-5fff-4f1b-a0e7-219d4328888d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/profile	\N	\N	2026-07-11 14:31:35.853+00
866d9008-f6f7-43ac-b1ac-759387c4980b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses-v2	\N	\N	2026-07-11 14:31:37.335+00
377eea4a-09bf-4f99-ac51-5d047ffe141a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-11 14:32:16.387+00
896fc55b-7d7a-4c80-ba1f-5f0af3d028f4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/3ceeab1a-4f23-4bbf-a55d-9c91fc4dfb46/lessons/373b550f-f611-428a-8240-8e95cac0b7e4	python-1	373b550f-f611-428a-8240-8e95cac0b7e4	2026-07-11 14:32:26.965+00
3840672d-d8c8-4241-aecb-4bbbc47c4f1b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-11 14:32:34.22+00
3d1820d9-d144-4c2c-aa3d-9866a3150e64	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 14:32:44.872+00
ff659318-4f9a-4956-8cfd-b2ab8667e7eb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-11 14:32:48.375+00
100cc7b4-348b-4b4f-aff7-3d339a267537	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-11 14:38:11.361+00
82e7b48c-2071-4a87-b0f3-48495d0e7cdb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 14:42:11.235+00
615d3d4b-38c3-4c2a-b3f7-53ca0722126f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-11 14:42:15.866+00
acd94729-6718-4a35-af09-fe5bf2880b87	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 14:42:24.272+00
6d81aa39-41a3-4ae1-8bc0-4c9ad5c46141	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 14:42:26.627+00
657a769d-a448-4c96-9a3a-326ad33ef6f2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-11 14:42:29.477+00
701c53e3-db5e-4798-97d1-ed77733b85af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 14:43:04.066+00
5bc61022-954b-453b-b45b-9e27f51432da	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 14:43:20.745+00
ead99b38-e3b4-402f-a144-708e9019f203	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-11 15:26:25.962+00
c79aab79-24e4-48f4-bc3b-d65fdec82ddb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 15:26:40.215+00
4e024677-c72d-4e41-a7e1-b35ed4d26abe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 15:32:04.625+00
7614b03e-bdb6-41a1-ac80-c5ccc60a8871	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 15:32:07.576+00
9383ba0f-f4ae-4790-acd7-dcd62535ea21	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 15:40:57.229+00
e5442458-78d3-407b-a9dd-09c30ce45792	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 15:44:46.178+00
9987f9a0-b3c0-4e1c-932d-9aea86a55c31	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 15:52:38.881+00
d60d5e99-1b2e-4bcf-b7fc-5383ec971573	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving	problem-solving	\N	2026-07-11 15:52:44.133+00
8f978ff0-fde7-43f0-8244-2705372f7467	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving/modules/fedbefba-6f62-4c9a-be9a-564ccc677a1e/lessons/00373401-0d05-44b2-9e31-5708e647103f	problem-solving	00373401-0d05-44b2-9e31-5708e647103f	2026-07-11 15:52:47.695+00
732fa9ab-3d31-4847-8dc3-65b8b00c4420	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-11 19:33:06.835+00
1641a549-0e03-4f30-81f5-782ff6b037b5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 19:33:10.99+00
35e984d1-d930-4433-9deb-7be0548a6161	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 19:43:16.712+00
2e4f7304-3dd9-42bf-87a4-d6d82cb401e5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:07:20.388+00
31e30ab3-7ef0-4317-b687-a33e098d6af4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:10:46.973+00
1ea96ac1-c2cd-4b92-aee9-2a71db003bb3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-11 20:18:32.748+00
a07a9c6d-55f9-4f36-b469-40db43d829da	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:18:36.655+00
8bda5219-295a-47b4-a19d-9cdc1811df64	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:20:59.583+00
4a793a6d-ebb0-4f2d-b15b-3adc8aaa4d8e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:24:37.469+00
86d2d5cf-3899-4ad3-860f-f33e07585d24	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:27:18.549+00
1d5c6608-c033-4b02-91e0-5c2ee9078917	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:27:48.345+00
68bb4617-8589-4734-a301-7734776e7eea	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:28:40.064+00
7add4158-6526-42a4-b800-9dc45f02a3ce	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:29:09.44+00
a3134b5f-a33d-46e6-95e1-319a05e73ed6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:33:20.261+00
14c959d8-9716-4e0d-8ee7-f5fe683e6ac7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:33:32.634+00
acf2b962-6749-4ab5-b8e1-8ec2e8e7919e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:33:37.102+00
821a04df-acd1-42ca-bca1-e3a9083c2600	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:33:44.63+00
9bf21376-eec2-40a5-b863-4dfe212adc9b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:36:22.56+00
f1baaebc-e34c-4626-8e36-a091c7e79899	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:36:32.863+00
712182f2-b31c-46b0-a21f-2d9112c8a72e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:38:57.31+00
3bf7b086-6785-43f0-9389-fb9d73bfcc96	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:50:59.415+00
3df301e8-a658-4950-8ba7-d5318fca9073	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:51:07.396+00
1165e6b0-fd4d-47cc-8364-7f7a3126e4e1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:51:48.423+00
fb4bd326-8a2e-430a-b8c4-9b6d9e70db71	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:51:52.909+00
cab0d6d5-361a-402a-b4ec-f71b842644c7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 20:52:28.603+00
ff72e6f0-9019-47e8-a65f-b15be4e38129	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving	problem-solving	\N	2026-07-11 20:52:31.921+00
f282e0b9-ae5f-4c1a-b694-3e1b25e9261c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving/modules/fedbefba-6f62-4c9a-be9a-564ccc677a1e/lessons/00373401-0d05-44b2-9e31-5708e647103f	problem-solving	00373401-0d05-44b2-9e31-5708e647103f	2026-07-11 20:52:37.342+00
e09a81f7-5fac-4042-aeda-236773c3540e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving	problem-solving	\N	2026-07-11 20:52:40.607+00
828a9cb4-b159-4bdb-bb25-7e31da0c2077	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving	problem-solving	\N	2026-07-11 20:59:28.056+00
45174c14-349a-490d-a01e-c18f48065658	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 20:59:33.284+00
3c6d5aae-fa02-47eb-bf92-71460afc2350	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 20:59:44.08+00
f516d93e-c65d-4f82-8315-49d51117c3b2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 20:59:52.865+00
51167f9d-6947-4d1a-b72d-80b4f883aa1e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 21:00:05.843+00
0e9311d9-1e7c-4894-b3ec-c122e5e39ad2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-11 21:00:12.577+00
6316bfcb-c4a4-48ba-b125-244d74e05c50	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/modules/5860688c-a341-4125-a08d-49d4af50e922/lessons/8b417a80-aae6-42a2-8a4c-1094bbbccc9a	ai-1	8b417a80-aae6-42a2-8a4c-1094bbbccc9a	2026-07-11 21:00:20.531+00
0201f8a9-9183-42f5-b975-258750dccaec	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-11 21:00:30.241+00
389384f5-e7aa-4456-b537-c4f51bd846b7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/modules/5860688c-a341-4125-a08d-49d4af50e922/lessons/8b417a80-aae6-42a2-8a4c-1094bbbccc9a	ai-1	8b417a80-aae6-42a2-8a4c-1094bbbccc9a	2026-07-11 21:00:32.114+00
7c492274-00fd-4e8f-9231-4056a4a795bb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-11 21:00:36.574+00
4d9112f9-d60e-4ea4-b6d4-e5291c3467c1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-11 21:00:47.037+00
7ee38c0e-961c-4986-af76-9d4914e0f499	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-11 21:01:18.303+00
06e05fd3-5fb2-419e-9208-8da0b805b402	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-11 21:02:15.365+00
9741257b-3c7a-49bb-b0d1-4a7a0d11c472	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-11 21:02:18.997+00
4ba9d51a-aff2-4c69-9a46-8398edd168f4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 12:11:26.403+00
2107fc9a-d2e3-4606-bf87-51fe271205fc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 12:11:32.665+00
5286787a-6ea3-4e3f-a9e3-ca2670273e7e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-12 12:23:22.173+00
431013e9-1de8-4d4b-9f27-74a99867c115	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-12 12:34:08.952+00
7da7a5ef-bc1f-4917-b25b-7b178fb6aafe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-12 12:37:24.084+00
bbb2de76-4eb1-488e-922c-67cd687b1b05	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 12:38:22.634+00
19c81be6-d47f-4338-87e8-782879c2d87f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 12:38:28.279+00
cc0b52d2-896d-4c6e-9d04-afd2c9131dd9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 12:41:38.217+00
62a29651-7d52-4433-8d35-a75e97f88f58	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f99915d2-a8d6-4d86-ab12-67c31603c168/analytics	\N	\N	2026-07-12 12:42:02.071+00
b944019c-bfd4-44bc-a92b-4c57ea74e8fa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 12:42:06.36+00
247e55bb-99a3-4fbf-8f1b-69baced6ea09	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 12:42:09.509+00
9cf1a028-5fb1-46b4-9b98-790754993451	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 12:42:24.197+00
6a1a543b-9052-432a-a7fb-6b7b9580846f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 12:42:27.776+00
c7e0a91c-e7e1-43ec-83b0-b91e88a6bfd8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 12:42:34.11+00
46b53371-0f1b-4fda-8ab6-200fa45b487f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 12:47:37.962+00
f6d2462f-fd51-46cc-b3ae-52bab8d3b038	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 12:47:41.248+00
b2fc4689-6ae9-4859-a846-359e3520e5b5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 12:57:30.063+00
2f7d5006-2154-4e8c-947c-aa6eed38f343	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 12:57:50.031+00
0cbf80cb-5bfe-41e3-b05e-84377fb73b9f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 12:57:58.768+00
1f420915-a27e-48cb-814f-f3df040a7b12	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 12:58:08.707+00
9babf9fa-6df3-4f9d-b93a-b9361d88eda9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 12:58:12.51+00
328821d7-405c-434a-a821-fdfa4d83a171	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 12:59:50.323+00
5a89ca89-bba1-4d4a-9764-2190434d8db5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 13:00:59.995+00
79bb1266-7e89-47b3-a458-69c26224de26	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 13:01:42.967+00
008cf218-d600-4042-bf97-6e6f97a3f89e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 13:01:45.956+00
8a755bb3-bfbb-4a30-a680-910d4d37f5ac	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 13:02:05.952+00
7f4b3d00-b4b0-4611-b054-f9b4b723c55f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 13:06:30.223+00
5350b388-1d12-4e28-9a18-018ce0c00237	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 13:06:34.585+00
5a7a2b5f-5c47-41b0-9a6c-8a32a8c25a4e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 13:14:00.619+00
ac8c72ae-d17c-40c9-be53-cb136d591099	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 13:14:03.249+00
9e9f5913-65cf-4280-ba7d-78cb0b9ec37a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 13:14:37.233+00
918bb6f0-5fb8-4f9c-9bbe-f257819a0dac	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 13:16:49.815+00
e40b0a7f-4cfa-4ab3-a1c2-d7bbcb4cdc85	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 13:16:56.231+00
54159b03-63d8-4c78-b048-978dc47ec65b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 13:55:08.405+00
c7f6ff26-6330-431d-8111-92f4c0e23c45	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 13:55:10.048+00
38ccdfbe-b84c-4a16-ae18-028932933452	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 13:55:13.013+00
6f7554b7-9dff-45dd-970b-2eabeb55c068	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 13:55:20.681+00
01074640-591b-49a8-b547-679eb29d60bb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 13:56:43.669+00
f2008f6b-4e6f-4e35-a6b1-70072f6936bd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 14:05:00.13+00
755aa12f-5e80-4da3-bbe8-decf13fa1277	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:05:05.572+00
53f696e5-3ee0-4fe8-a526-cbffa2e2b1ea	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:07:48.043+00
06d03e5b-c690-4fa6-9ed9-a7e94d7b0725	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 14:07:49.274+00
ae0a478b-24c9-472e-ac76-412d47333da1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:07:51.349+00
1d36e4e0-aeed-4b29-aabf-1ff5ca7c2efa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 14:11:16.068+00
18658418-926a-4f48-8509-097912233b19	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 14:11:18.281+00
6196b771-2353-41f5-942e-b2a4ba3bb3b4	e5c47463-3c4f-4d68-9698-d255b6905dd9	/dashboard	\N	\N	2026-07-17 14:40:09.584+00
288ef8e1-9fb3-4aca-ab17-b6df6d0785e2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:35:05.569+00
aa7d1e9c-4b77-447f-804f-4eb63cca19a9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 19:54:50.082+00
569bf857-e94f-4210-a2d0-678f78af4785	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 14:11:23.064+00
a69062f7-0a8e-4cb5-84fb-4afc1ccdbb1f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:11:27.521+00
df923ce2-71b6-4b2c-a4ff-f9425e4dd291	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:13:42.456+00
da606992-fd6b-4f47-a840-1b1bf1bfe71a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 14:13:44.141+00
d53a45b0-911e-4fb5-b55c-002f6c7ba177	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:13:45.803+00
165b9eb0-e1e8-4ea0-9fd4-9dbee81088b7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:17:46.582+00
8c6a17ae-b81c-4fe5-9fa6-fc1f6784627c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 14:37:07.578+00
a60fc3ba-419e-41f3-ab59-3e04b4686b2f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 14:46:44.165+00
0fc9455f-4381-4af0-9995-a79a2d88ba0f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/contacts	\N	\N	2026-07-12 14:48:36.774+00
f7f95ecc-3e0f-44cd-9c72-740d2ae9c6fd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 14:48:40.858+00
a94dd29c-fcf7-4506-82dc-01376c81ae6f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 14:48:48.975+00
e33c48d3-91ab-4977-844e-98e163460be7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/modules/983bc244-a1e0-4d3c-8c4d-5cb693303371/lessons/e791e3f7-cdc3-466a-81f3-081a1708d4a4	informatica-1	e791e3f7-cdc3-466a-81f3-081a1708d4a4	2026-07-12 14:49:01.829+00
81063252-d418-4f9e-a715-58f03b41f7bc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 14:49:15.955+00
576edaa9-60b5-4902-8625-c0835b0c11b6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 14:49:21.673+00
6d4a59eb-ea54-44ff-87c4-dd8243e6198c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 14:49:29.982+00
7449489e-e116-4624-9a99-d1296dff3cd4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 14:57:39.149+00
bbfb96d2-3b4a-40c0-902b-4b018495ffa1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 14:57:51.507+00
b293b6e1-83b1-4427-96b1-4fb07d57fdfc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 14:57:57.002+00
51176ae8-4f0a-45c3-ae3e-1cb2206a33b6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 14:58:15.867+00
8c65e356-2b84-4f2d-8315-31f2e526b7bf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 15:22:09.635+00
a21bb08f-3ee2-4604-8d97-fa8317ce7a13	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	ai-1	\N	2026-07-12 15:22:12.133+00
25809235-eeb7-4431-ba58-a457e8411cc5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-12 15:26:22.192+00
79b3b036-fd49-4d03-b24c-022649fc4609	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 15:26:25.391+00
416467b3-5406-4c24-a4dd-624be60f57d5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 15:26:31.776+00
4965ee37-be29-4491-aab5-7f0c67a5e902	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 15:36:08.001+00
a94bc8db-375a-4df5-a434-8bf9471bb49b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 15:55:52.831+00
be7fdfe3-a072-4291-acd9-1a4ad2737446	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 15:56:21.249+00
552d4c33-3b92-44c7-819d-30cae04810d2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 15:56:37.257+00
534c23fe-8c66-42dc-97bb-d1ae52d1ed53	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 15:56:54.406+00
d649797e-1be7-470f-9a4a-cc94e72430b8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 15:56:59.653+00
601ba9e7-1fe5-4411-9027-200ce9748700	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	informatica-1	\N	2026-07-12 15:57:26.858+00
3a3effa0-6859-482e-8dc1-f8f02952fe96	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 15:57:32.661+00
0d4738c9-bba5-403b-aea8-f8de8cef76c3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 16:05:22.963+00
8042acb7-fe96-421e-a392-6fb80ab9fd23	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 16:07:06.802+00
5adc3ea9-4a8c-4133-a872-19925825e825	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 16:07:15.839+00
a3c8b4bb-6dc2-4fae-a009-c565b88b3a98	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 16:07:19.996+00
87bb79f4-1db9-45e5-bc66-e49298e44401	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 16:07:31.449+00
fa3f51ee-e43c-42cf-a550-a3fa404cca77	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	informatica-1	\N	2026-07-12 16:07:34.641+00
433e743d-1997-4fe8-9c84-f734ec0b84fa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 16:07:40.104+00
97a37b0e-a4e5-4615-990f-4db7a7bab672	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 16:18:31.007+00
cfcb0e2e-786e-440e-8db9-cf775c0a7067	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-12 16:18:32.609+00
bd8dc4a5-e801-403f-899e-2d783b2636c5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 16:18:37.18+00
33db47e4-c9fa-4879-a339-5154e5037eb5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/quizzes/07a5cb8d-9287-4180-a66e-725f1716e734	informatica-1	\N	2026-07-12 16:18:41.357+00
7bd87351-f7a3-49d5-9ebd-9ed33746c540	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 16:19:18.428+00
2448b9fd-b737-4c33-aeb1-0a5ca90ad94e	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz	testquiz	\N	2026-07-17 14:40:25.676+00
0962ca65-3cfa-40fb-95a7-6e59515b0ad5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:35:14.738+00
85ef85f7-65a3-4322-adc9-8208083c0637	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:01:38.112+00
e95a290a-2f27-436c-baad-710893638c01	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-12 16:21:33.567+00
6fe4e1be-99ef-4abb-afef-9db2e3f196f7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-12 16:21:39.879+00
2aab58e8-44f3-4972-b33e-40189408ff7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 16:21:42.079+00
66b59475-4ded-43f6-a825-8d38d8e60829	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 16:22:14.997+00
fffbc9a4-6aae-484d-bba1-045fd796d861	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 17:12:47.691+00
6ac1804b-6e81-404d-a462-03a6690b8b1e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 17:12:51.391+00
2098e4e4-5657-422d-b4d0-e42ac64cfb65	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:13:02.974+00
b40fc89c-3c3b-45d4-9093-28d2836c73c6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 17:15:37.659+00
06323152-fdc8-4fba-bf1f-7564608a074c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 17:15:41.089+00
b99f1669-5670-4f18-9562-ef40875fc788	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:15:48.439+00
168d5956-6cd8-4634-8778-e6f268643eae	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 17:47:26.956+00
fee98e13-016d-4061-be58-0e77fb52a403	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 17:47:34.93+00
6d719f33-0048-4257-8122-cf8149460021	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:47:47.994+00
5f51b07a-4e32-4e1f-b01d-ba8462b27142	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/correction	\N	\N	2026-07-12 17:47:54.402+00
6f8593d0-9eb1-4382-9dfb-b1cf1557b004	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:48:27.511+00
7202e90a-74cb-4a9d-b819-f5b199a421b0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/review	\N	\N	2026-07-12 17:48:30.993+00
11b7c48f-bf84-40cb-84e2-089e257153cc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 17:49:34.724+00
eb853454-b358-4d55-ae31-92c90325d838	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:49:38.974+00
8fc7d834-c48c-41e9-97fb-f1b9e8491624	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/review	\N	\N	2026-07-12 17:49:50.413+00
f98f5c2b-17a5-4bc3-9a5c-2929ab2f1d6c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-13 06:09:08.709+00
07944806-0288-4583-adbe-c5125c52567e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 06:09:21.64+00
100b05d6-c966-42ba-8714-09f192a13669	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 06:09:58.993+00
773e2d72-9dbc-4f50-92dc-43f7d7dd3a03	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 06:16:41.814+00
5b1bda89-c9a3-4ad6-a461-383a26266299	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 06:17:27.432+00
6aae4e1b-74d2-4378-addb-96aa7d439e38	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 06:29:11.881+00
9d6e0194-4f30-45f1-a6ba-708a40e8f840	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 06:29:16.549+00
6992e289-673b-436c-9fde-5ccf480337f8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/f4e43d77-9545-4f1d-b936-42b1d581dada	testquiz	\N	2026-07-13 06:29:33.552+00
58efbe6a-1edd-479d-99f3-42eaf07c8322	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 06:37:35.948+00
d3fac438-d6cf-4815-b95a-2951fbb73eda	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 06:37:40.594+00
60bcccc5-3e06-4513-8c29-5f8c7fc807d2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 06:37:52.834+00
1d684e78-29c2-42e8-9c01-25fec8dba961	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 06:37:56.09+00
e3ba6bc3-c8a3-4ca6-ae7e-de399b87f496	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 14:40:36.026+00
54848d43-7bd9-477f-931d-20ddadbdba99	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:35:18.728+00
e62f91e5-b359-4d6b-9fe8-bd2b81ee9629	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:01:48.27+00
07690978-c6c4-462c-9316-807509985412	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 06:38:26.752+00
94a33729-1895-46df-a71e-339e9935cd89	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 06:38:29+00
1d7761ad-671e-417f-a38a-8c3878ac0e80	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 07:02:07.424+00
a57faa2c-e3be-40cf-9725-eb2c0a9a40cb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 07:02:11.788+00
892f5788-7376-41ad-b5ba-834d0a17ba1e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 07:02:16.78+00
d0879914-025c-448c-b2ff-0d0a905df1b7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/review	\N	\N	2026-07-13 07:02:29.801+00
0789d90c-54dd-4b19-b36e-5cf51a0dc950	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 07:02:36.535+00
86ef1267-b682-4e64-9d0b-3af91f802e48	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 07:02:39.434+00
f627126f-49d6-440f-a7d7-d82e52d56d93	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 07:02:42.34+00
0135d428-49fa-4ee3-b4e1-d24d9f580b18	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/f4e43d77-9545-4f1d-b936-42b1d581dada	testquiz	\N	2026-07-13 07:02:45.621+00
e96fc009-9215-4858-81ad-512b5704d349	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 07:23:31.014+00
3864cbd2-d12d-4bf0-ab1b-20bfb9f09916	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 07:23:36.166+00
d58340d0-e940-4f2d-8bb4-df8003847261	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 07:23:40.312+00
c36ad2a9-d5e5-49a3-aeb9-34f664c1d292	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 07:23:43.743+00
58fbcc76-1229-416b-aaf2-c17977abc3f7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 07:23:46.648+00
3d7bdb2e-df5f-4823-ae1c-fc63c0ca5267	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/f4e43d77-9545-4f1d-b936-42b1d581dada	testquiz	\N	2026-07-13 07:23:48.2+00
8772ad76-d869-46da-8e8c-ac2c22fdf1d6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 07:46:43.541+00
2c4fe4b1-65ad-4df0-9005-8e77590132c7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/f4e43d77-9545-4f1d-b936-42b1d581dada	testquiz	\N	2026-07-13 07:47:01.031+00
f93ef4c9-6b66-407f-8bde-3579b9d774cb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 07:49:02.524+00
1166255e-0976-42f9-882e-bb2f86801665	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-13 10:38:18.562+00
6178b90e-261f-4596-bcee-6ccb1b7ffbe7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 10:38:23.526+00
a4de3299-aecf-4399-b4cd-50bfcfb85287	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:38:31.377+00
add74e57-644b-466b-a192-1c8489acdc0a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/review	\N	\N	2026-07-13 10:38:44.052+00
4a9fb47d-5fb2-48e2-9247-c23bedd402fe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/login	\N	\N	2026-07-13 10:39:22.578+00
a9ba3263-9f1c-4de7-91c9-ea0e578b803f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/login	\N	\N	2026-07-13 10:39:24.759+00
05a8460e-f061-4a48-87b7-dd88a8477a32	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 10:39:25.148+00
e2a0df18-b960-4887-8c87-a88991297cfc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 10:39:28.386+00
172fba9f-279b-4176-b80c-577846ddf916	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 10:39:29.909+00
7bddd738-a34c-4db0-8834-c1d7be5a2a33	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:40:17.9+00
78511654-fd84-4a17-9f07-4604971e798f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 10:42:23.396+00
3140c839-0808-4925-9531-553f647b1b62	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:43:15.609+00
53181398-2832-444d-8601-9f12636fa600	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/review	\N	\N	2026-07-13 10:44:48.177+00
febcd347-c293-4417-a2a7-bc08636bd31b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:44:55.71+00
a8ad5218-fbe0-409f-a349-190b04952ce4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/review	\N	\N	2026-07-13 10:45:12.052+00
eb3833c5-c30f-4b0d-bafb-7d7e8c5292d6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:45:14.913+00
44d8a2eb-d031-49a4-8de4-e5c0a4122838	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/review	\N	\N	2026-07-13 10:45:24.216+00
28ca6ea3-f32b-4ed7-bdec-9857886db214	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:46:00.123+00
f546cbee-b833-4e1c-8cd8-49bc390d738e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 10:48:00.033+00
b82ed0c6-6922-4302-a37e-4e6a4e71473a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 10:48:48.984+00
c771ec6e-454c-4ae5-b14a-6876e4c275e8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:48:52.753+00
1474255b-a179-453e-b322-24c005cb2269	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/review	\N	\N	2026-07-13 10:48:59.703+00
28719137-5582-4ea7-bff6-ac106aee900f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 10:49:27.953+00
86682911-a673-4921-8dae-ef6a37abef66	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/f4e43d77-9545-4f1d-b936-42b1d581dada/analytics	\N	\N	2026-07-13 11:06:49.243+00
ca1adba6-4fc3-456b-a33e-17e3e03ee754	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 11:06:57.961+00
2f2bafbd-b1b9-4def-aa6b-f55faf1442fc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/84252bd3-430a-4a4d-834e-ac83a9b19c08/analytics	\N	\N	2026-07-13 11:13:35.62+00
d777f957-e1c2-40ea-85b9-02cdf9df2b8f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 11:13:59.588+00
4212d4ea-8035-47ad-90b2-1b19dcbf093b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:14:03.558+00
a45191cb-0da9-4e63-a50a-79c063b3bc8f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:19:38.037+00
31e1fb25-426c-469a-b7de-21733fc425fb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:19:40.489+00
aa3a5a27-053f-4c13-af03-7c7e8243ac5c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 11:20:21.107+00
85d58739-e6f6-4a84-8629-f952ecff8e66	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 11:20:36.125+00
3910efd4-46c8-4f8a-9a37-3c31ce1b0bf8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 11:20:38.186+00
022a4b9e-7b6e-4216-974d-c5630d7ce147	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 11:20:47.846+00
1cb85db5-9593-4298-ae14-48a8c780ccb8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 11:21:59.309+00
c5415a10-19ed-4649-81fd-51fd601648de	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 11:22:01.725+00
8cc009f8-a1da-4311-b81d-b3d9d1b2d344	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 11:22:04.233+00
60ee451b-0258-4865-9641-330d28ded461	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:22:07.212+00
98db09fe-cf3f-45fe-8716-de5a936d66e8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:23:10.397+00
87b370f0-7fdc-4e31-bc6e-77a03f05ce8d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 11:23:29.81+00
9f85c39c-e0b0-4ff4-8887-6c18ff6c287d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 11:23:36.617+00
cb1ab51c-3cf4-4847-9b6c-5509be15c8f1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 11:23:41.514+00
936a0bc4-a75d-45ff-a658-e05faa495ab1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:23:45.365+00
d30006b0-f850-4f27-8501-4957d9a955b5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:25:17.666+00
f4af4c71-e1d4-4dc3-9480-630423d9f944	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:40:36.679+00
56c8f8de-c787-4f44-acd4-b9ec2a8576b3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:38:05.722+00
0ee582ba-b1f1-449e-90bb-6ae6761656e9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 11:27:05.356+00
384a1477-40c7-4f76-98ef-b048fa97d235	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 12:28:10.496+00
616fdff5-1f0e-4843-a262-e8d8d231150f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 12:28:13.181+00
0d5caf2e-356a-4126-aaac-2713c06fca84	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:10:45.985+00
db349302-5827-4a13-a33d-6f8ecd5ba4da	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 12:28:40.15+00
2de82a03-582b-4154-be4b-49bafbfb57a0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/854bdf01-ff5d-498d-ac0d-7d685cd741f1	testquiz	\N	2026-07-13 12:28:43.843+00
041b6b31-cf01-404e-bb30-5d55124771bb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 12:29:12.643+00
619696a1-0873-43a7-b9e2-1402d1dbfa6f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 12:29:20.146+00
5cf9c067-84c9-4e5d-8301-6eff9dc8f262	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 12:29:25.713+00
0949aba5-e0e8-41d1-8ce4-4f6aa58082b7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-13 12:29:32.353+00
cbe8dbca-1152-4ee2-8fd8-0fa8e8b24780	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 12:29:42.264+00
19f46d6c-9195-41eb-bf95-9c7f550b1885	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-13 12:39:05.693+00
edd699ee-6f27-4804-b5d4-fb64ba46fd35	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 12:39:06.133+00
85290414-3962-4ff5-875d-75273d0bf185	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 12:51:50.685+00
cbc2768c-8cf9-4acb-ba01-5b4fd8ddec9a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 12:56:00.632+00
203719c0-c004-4296-8ea6-71113a205434	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 12:56:11.961+00
506ade87-e5c5-4a7d-9d13-3f6757d91cc9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 12:56:16.868+00
402000d2-59ed-4e67-87a6-78f9904f9738	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 13:04:59.925+00
b1d83578-7e26-4f89-a3a9-9d9fcac8473a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 13:07:05.402+00
5567a5ac-d0b2-430a-90c8-95f4defc5dae	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 13:07:24.831+00
4e7f6b09-53ce-406c-9d2b-586d24ba96eb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 13:13:55.02+00
d716d3d7-08f9-48a9-bb7e-0c90653611e6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:30.864+00
289d19b5-3045-45c5-b152-217ecba1e49a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:33.306+00
3cdcb0e8-42c8-4924-b1fb-22930539655e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:34.425+00
c5c60515-c05c-4cfc-b67e-159825f64857	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:35.57+00
ba2338cc-c610-4d47-a44b-b95c6c3e5c32	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:27:31.358+00
9f4ca514-76c0-4cea-aabf-339537aa3f7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:27:33.132+00
e938a1fb-9ed1-44f4-8e87-9f7d4a13c665	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:46:52.45+00
ccb4e46e-4d1c-4e4f-82bc-086c4c4e2343	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:47:12.593+00
ddee570b-0b60-44c1-8461-28c4998b6d4e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:47:14.464+00
d6465a1e-a22a-4846-851d-93ea62bb804b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/854bdf01-ff5d-498d-ac0d-7d685cd741f1	testquiz	\N	2026-07-13 13:47:19.819+00
bb557928-00ee-48e5-942b-bf354be1f4fd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:47:22.303+00
27969c9c-7cf9-4da1-a8d9-524e34b4e4fa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-13 13:54:10.023+00
a242d998-ffa5-4d30-9b62-b1c638a911a9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 13:54:11.441+00
75db7708-274d-4c60-8144-c7a0664d1ed8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:54:13.695+00
5a45d52e-548e-442c-b786-29a0a8321d76	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving	problem-solving	\N	2026-07-13 13:54:45.128+00
e525bec5-5136-4688-9db7-66d7ca866c1c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 13:54:48.951+00
61d3b388-1e75-4c00-a2a8-ffd62d9ea8b7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 13:58:07.823+00
17858295-3fac-4846-8b72-b8bcbfd9e148	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 14:02:47.712+00
d5284dfa-0e2a-4417-bcb3-226e3b0eabd5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 14:03:15.232+00
406c1c2e-2708-40c1-933c-2cceb9d019c6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving	problem-solving	\N	2026-07-13 14:03:17.858+00
38bcd894-4050-4973-af24-bc6caa63664d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving/modules/fedbefba-6f62-4c9a-be9a-564ccc677a1e/lessons/bb528b46-e89a-4246-bd19-675ea3064221	problem-solving	bb528b46-e89a-4246-bd19-675ea3064221	2026-07-13 14:03:20.951+00
892b30e7-5bf6-4be1-8669-39aa951fb5b4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving	problem-solving	\N	2026-07-13 14:03:35.459+00
8fe5c011-6a88-4a6c-8ada-06a8934414af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 14:03:38.991+00
c58e1c7b-cdef-462f-afce-12a070cabde6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 14:03:45.616+00
4e752a06-97ac-413a-97f0-f35c67a53da1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 14:03:50.486+00
bd6a4ed1-be08-423f-b7c4-9cd1fa8b5e21	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-13 14:03:52.714+00
579501a9-cf80-42d0-b63f-128468fd8c05	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/2273c8cc-76b7-4c13-9f5f-b7a97b280e82/lessons/3f8a731d-738c-40dc-8842-cf8d7297e30b	python-1	3f8a731d-738c-40dc-8842-cf8d7297e30b	2026-07-13 14:03:54.433+00
247cf8fd-c405-4a4e-be08-077e831f29f4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-13 14:04:02.184+00
443a87a2-dd8e-437c-b446-535988135c9e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/00778d2d-48a8-46d0-938f-b5c52d7bddf1/lessons/d97b238b-865c-484f-8157-ddceabfdce7a	python-1	d97b238b-865c-484f-8157-ddceabfdce7a	2026-07-13 14:04:05.897+00
558dac1b-8786-4b30-b85d-317de90c539f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-13 14:04:08.101+00
47939ca0-b595-459b-8ba7-6c9525bcb805	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-13 14:20:46.139+00
fec483cc-1224-4f5e-aeb7-3708e9a2e90b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/2273c8cc-76b7-4c13-9f5f-b7a97b280e82/lessons/3f8a731d-738c-40dc-8842-cf8d7297e30b	python-1	3f8a731d-738c-40dc-8842-cf8d7297e30b	2026-07-13 14:20:49.692+00
4e94f91d-683d-4a8b-b7ac-de2e256dab11	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/2273c8cc-76b7-4c13-9f5f-b7a97b280e82/lessons/a504ae1b-12cf-4098-a134-74be4d65feb2	python-1	a504ae1b-12cf-4098-a134-74be4d65feb2	2026-07-13 14:20:56.916+00
fdbdfcb6-5579-4848-85a7-6639e238f591	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 14:21:11.49+00
76532509-939f-4935-a365-def804e1421e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-13 14:21:13.901+00
99d1756f-49d5-4bf1-90bc-ecf7a856612e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/2273c8cc-76b7-4c13-9f5f-b7a97b280e82/lessons/3f8a731d-738c-40dc-8842-cf8d7297e30b	python-1	3f8a731d-738c-40dc-8842-cf8d7297e30b	2026-07-13 14:21:21.233+00
ab6f3a0b-2f8f-416a-8b27-c0cdb864f78c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 14:21:30.463+00
dfe350c0-2a53-4ae8-b28c-2f30e5249ec8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-13 18:11:44.779+00
ed0acd94-ccf7-4e63-bcbe-6a35d8fb0218	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/2273c8cc-76b7-4c13-9f5f-b7a97b280e82/lessons/3f8a731d-738c-40dc-8842-cf8d7297e30b	python-1	3f8a731d-738c-40dc-8842-cf8d7297e30b	2026-07-13 18:11:49.214+00
5dd46ded-4ac2-4294-b850-e88373cc1713	e5c47463-3c4f-4d68-9698-d255b6905dd9	/	\N	\N	2026-07-17 14:41:45.212+00
6e9d6a36-cd70-441e-8c7a-b0955d91aef9	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz	testquiz	\N	2026-07-17 14:41:50.495+00
24287571-97b0-4eb7-8e05-617f6e332b5c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:38:25.982+00
6bf4126c-92df-47fa-add3-0c00273fbd9c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:16:25.833+00
8b772f6f-1c78-49f2-8bc1-b7f06aed2e6a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/modules/983bc244-a1e0-4d3c-8c4d-5cb693303371/lessons/e791e3f7-cdc3-466a-81f3-081a1708d4a4	informatica-1	e791e3f7-cdc3-466a-81f3-081a1708d4a4	2026-07-13 18:13:32.503+00
66fdfbd9-80d8-4052-995f-9160533fd525	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:13:37.129+00
25839043-d8bf-46d2-bb1b-cf114d69d712	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:13:42.203+00
b7fcd5ab-cbd3-4d82-803b-f6944a53d1b1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:13:46.805+00
6592fd68-0a66-4102-8857-0073094be182	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:13:50.422+00
8bdaa924-0f1d-4ccb-8e2e-f216d2033089	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:13:55.281+00
6eccfe5e-312a-4160-881f-1cc976f9788b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:13:59.533+00
d15856cf-ef5a-47f4-a6c8-feafc7baeacf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:14:03.587+00
32944ce1-3cc3-4dc6-8bf1-cdd3c6d99908	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 18:14:54.692+00
6fc1341d-2b5a-42c2-a5c9-0deabd970bf5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:14:56.882+00
216dfc93-94cd-4b59-8d22-0b52e1a2db99	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/66c63c48-5830-4bf5-8ccd-2247b844807b	testquiz	66c63c48-5830-4bf5-8ccd-2247b844807b	2026-07-13 18:14:58.817+00
ed100154-d786-4018-ab8f-28a38e95105d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/66c63c48-5830-4bf5-8ccd-2247b844807b	testquiz	66c63c48-5830-4bf5-8ccd-2247b844807b	2026-07-13 18:33:02.553+00
723d8e2b-5292-4042-aeb7-bbfba66bb9cd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/66c63c48-5830-4bf5-8ccd-2247b844807b	testquiz	66c63c48-5830-4bf5-8ccd-2247b844807b	2026-07-13 18:33:11.905+00
ab77a716-2355-4f30-a460-21d9da7219a6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:33:25.961+00
2a512581-0350-44bb-b791-98ca05f7fd41	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/66c63c48-5830-4bf5-8ccd-2247b844807b	testquiz	66c63c48-5830-4bf5-8ccd-2247b844807b	2026-07-13 18:33:28.464+00
9dde780f-0dbe-4370-9aaf-038594d2073d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:34:40.887+00
f65f7aec-9d8d-4f18-af30-239524f926e7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:34:52.178+00
313f3bf6-c329-4970-ade2-52952824d410	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 18:35:49.866+00
266f08db-f7b3-4978-98ef-ae04d1a9d877	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:35:51.688+00
4ea1c167-9e9a-4d03-96b7-152a1d1e8aad	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/301d7bed-384b-4bb6-a6e3-105b3a6ad1cb	testquiz	301d7bed-384b-4bb6-a6e3-105b3a6ad1cb	2026-07-13 18:35:53.351+00
ae31f235-e577-47e5-9140-18ed067da06d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:36:03.509+00
f0fb6f32-9cdd-47b6-b21d-c55752beb383	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:36:07.658+00
08cc7ac4-9880-48e5-97f6-05c87a705e6c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 18:37:17.094+00
34138b18-5460-4870-97c7-704a172c36aa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:37:18.965+00
887f6cef-2242-4edc-8438-874df11d78c8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/59fba529-f8cf-47cb-8a8f-0194d3a539c3	testquiz	59fba529-f8cf-47cb-8a8f-0194d3a539c3	2026-07-13 18:37:21.302+00
e88575cf-4a0f-45cd-b2da-ffec8988eb33	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:37:30.395+00
dbc27eac-d06f-4701-97b6-dfb1a0e02c5d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:37:33.267+00
b26cd93d-fe26-4750-8df1-9a4eb9e231c2	e5c47463-3c4f-4d68-9698-d255b6905dd9	/dashboard	\N	\N	2026-07-17 14:41:45.995+00
24de9afb-75e9-4dd6-8b56-094d8a9161f7	e5c47463-3c4f-4d68-9698-d255b6905dd9	/	\N	\N	2026-07-17 15:42:51.615+00
8c5d19cd-2e1d-40c8-842d-c374cd5ecfa8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:43:44.252+00
5e3d540e-3dc7-4b5c-b282-4974d81b7390	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:17:55.083+00
ff6a4650-7758-422f-bb3b-73351a91740f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 18:39:51.437+00
2c5da527-3b33-4b07-9694-3e6d99833159	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:38:57.313+00
cb2743ff-af64-45d8-aa00-ac81d40298d3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:38:59.618+00
c0fa231a-3432-4bf1-8fd6-9f9c3daaea17	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 18:39:09.472+00
572b50c3-12e6-459a-8771-01f3c181b35d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-13 18:39:20.058+00
e8ca0a49-2098-4645-a166-77071c5098a0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:39:53.46+00
75cd638f-6934-41b4-8f57-8e8abfd81823	e5c47463-3c4f-4d68-9698-d255b6905dd9	/	\N	\N	2026-07-17 14:43:48.573+00
fa6f4253-5b1a-455a-9af3-aec5e42f7a2c	e5c47463-3c4f-4d68-9698-d255b6905dd9	/dashboard	\N	\N	2026-07-17 15:42:53.111+00
fe8ad8a7-bd79-4ea3-a1ec-b9ab611d436a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:43:02.64+00
58a303b0-ac9e-43e7-860b-5954be3a8685	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/66c63c48-5830-4bf5-8ccd-2247b844807b	testquiz	66c63c48-5830-4bf5-8ccd-2247b844807b	2026-07-17 15:44:08.901+00
f69ced11-d7b7-458d-a420-12df5c1532b1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:36:10.967+00
7f755ac8-8216-4b43-9a3b-1f71c8e74835	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 18:39:42.304+00
6634c9b9-d15c-4826-93e6-bf7617b359de	e5c47463-3c4f-4d68-9698-d255b6905dd9	/dashboard	\N	\N	2026-07-17 14:43:49.397+00
bce47aaa-c858-4c30-a823-2cd219ca4b49	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 14:43:58.518+00
87827957-aa50-4a39-8f1e-ffc17df2976a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:43:03.212+00
c653e99a-c37c-4181-980d-9a33339e4d0d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:43:44.818+00
5f6847e3-436e-49f7-a009-eb8a9c0cf7d8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:42:06.893+00
b8918110-c9d4-45ea-8d6c-b9ba668052ac	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:43:59.199+00
5cc22e6d-e388-4dff-8b2d-5e5d5a784f68	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-14 07:57:22.796+00
a114c5fe-c494-439f-819d-b625de2b7290	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 07:57:25.382+00
0a13f14b-2b3d-4d3c-b864-e390304cc212	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 07:57:28.121+00
0fe71103-4f55-4627-9c41-5d6f4e7516a2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/854bdf01-ff5d-498d-ac0d-7d685cd741f1	testquiz	\N	2026-07-14 07:57:35.095+00
762c721c-d737-44e7-83b8-df78eecfb969	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 07:57:38.88+00
ed79031d-ddcf-424b-ac53-6a65a2b025a7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 07:57:46.187+00
6e4671a1-7419-4c7e-8e97-63e23737926e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 07:57:59.192+00
976b528c-30ed-4565-a9d1-0709dae95ccd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 07:58:14.573+00
86c714b1-ec9d-4847-8fb2-6b017dff9d60	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 07:58:18.917+00
0e631900-715d-41b9-9fdc-dce8ed64865d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/854bdf01-ff5d-498d-ac0d-7d685cd741f1	testquiz	\N	2026-07-14 07:58:21.116+00
569bdbad-15e3-440b-935a-e507a82e35f8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 07:59:15.505+00
68ebcbec-78f4-4082-a6a4-3f71aede8e87	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 07:59:18.593+00
2e089222-6095-4e6e-a660-1b8404cf7848	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 07:59:22.948+00
094a7796-af7e-486e-b4a9-a9acee25db4b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 07:59:39.023+00
f6e85209-33b5-40ff-a022-46ce9e0513fe	e5c47463-3c4f-4d68-9698-d255b6905dd9	/	\N	\N	2026-07-17 15:44:01.753+00
565a8f28-cc6c-4101-896e-b328302a5560	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz	testquiz	\N	2026-07-17 15:44:04.244+00
b5d7785e-6a6f-468a-bf8b-1931ad59334e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:42:54.617+00
ea8abafc-efda-417c-afef-ff5dec0e7f6f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 08:20:50.217+00
871097e6-3c44-4a5d-9ecf-e339a5a09df7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:20:51.496+00
f919fd1e-bdef-4167-bac8-b6e37df3ab04	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 08:22:40.914+00
fd883d27-6edd-42a5-aab0-1be553f342f1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:22:43.151+00
0d571275-5f45-4a84-8d65-01677766c843	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:22:49.385+00
95144f9b-6d9f-4634-88eb-a47ff1baeeb7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 08:22:58.563+00
1738c125-fe4f-43e7-9de4-bde5abd867db	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:23:15.071+00
b8cdbe66-332d-4d1f-8680-10b5b7c96e46	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin	\N	\N	2026-07-14 08:31:21.353+00
22be8f24-e7e4-454d-931e-4d4027d17397	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:32:28.123+00
43830c39-a955-4205-8570-6e2043cab62e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin	\N	\N	2026-07-14 08:32:31.288+00
79c53bf6-8dfd-4f8a-9363-7ee0f9d666f6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin	\N	\N	2026-07-14 08:32:45.331+00
b75b2d5f-b371-4781-bbd6-5cd4ea4a9a0c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:32:48.83+00
48b69007-e44c-43b3-88b9-ca454ee3a86f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:32:53.787+00
509b666b-fb4b-47ac-b8d3-cccd283792a0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:33:00.976+00
a0bc6697-92d4-4674-8687-8ee7f6ceb5f9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:33:14.689+00
3c7fa06c-f290-44df-a09c-83b050f52af7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:33:29.836+00
89da2d3e-3b54-44b7-8b75-135b42173255	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:33:51.937+00
18147954-080f-4bfa-90a5-b128aa1700d2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:33:55.152+00
9fb52ca9-ceef-4e91-9d6d-18d1ac29e686	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:33:59.426+00
ca546781-e551-4806-9608-75f6dedd9014	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:34:01.695+00
dc2f49b9-dea0-49c9-beaa-18c23fcceffa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:37:46.393+00
51d0c17c-f983-4690-858e-c865012c92ab	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:39:42.419+00
f6d3c220-f03c-4146-b842-22cdcb98afe0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:42:56.535+00
a7703f04-8db9-4861-9691-73948d3f48b9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:51:31.032+00
484713da-311e-4d2c-b0c6-09610bf2c3ef	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 08:55:17.168+00
9cfeaf40-c40c-4330-a6a5-cfd2ffc8d9c6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:00:04.492+00
b18b1f7a-d790-4dab-adc3-c42a61aa44d6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 09:00:58.958+00
55c5cacf-d499-492e-bce3-5ef03100d1fd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:01:04.941+00
16f06176-8db4-404c-b994-ddc4687fa870	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:02:31.133+00
a1d715e4-a231-4a3b-a790-098f0784ad89	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:03:02.421+00
f6a5482a-fd53-4b79-a66d-50939e05b0a4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-14 09:03:39.235+00
2cafb00a-f207-40fd-8633-589d04bb7c22	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 09:03:41.772+00
cf07d97d-dd4e-4dab-83dd-958e98e307d6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 09:05:29.244+00
de6bff24-4887-4d10-9b41-5214c38c9172	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 09:05:30.898+00
63eeed48-ff01-4a49-8c10-e2aeb22afba4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:05:41.156+00
120a5c86-f428-4e5d-84b9-0f9cd25f67b2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:09:25.263+00
d710cfc3-8f1a-4289-b34c-79e6bc0ccfd7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:09:36.76+00
9e6eaf41-f5a8-46af-b979-702d2ba3e21d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:13:21.589+00
290fbdf0-01f7-4ff4-8333-6407d067d6ad	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:13:24.303+00
d156c46c-cd34-4821-b00a-b574bffd3ddc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:13:55.068+00
c270d6e6-301e-49de-b1be-98c0512a650d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:16:38.967+00
ef82141a-ca86-4ad0-a6a2-d52a5300d864	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-14 09:27:42.653+00
ee59fcf5-f796-462e-8c0d-1f4cdc23d60b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 09:27:45.535+00
33e35833-687b-4ca8-86bb-3f5cb211eecb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 09:27:53.3+00
6faac10a-ca7a-43b1-94b4-6e6a9b4c4770	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-14 16:41:24.498+00
02e6fb7e-ead2-4268-a502-92530d9211b1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 16:41:30.464+00
aa79ac7c-3c53-4eab-9bee-3a8164aad5dd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 16:41:42.229+00
7bfd9e39-6fa9-4d9e-8a11-a59173f34c3c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 16:42:00.304+00
58bfef69-0528-40be-8bf6-f8ce4887b1a3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 17:04:38.77+00
ccc6cec5-3011-438d-963b-c760443aff9e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:04:52.303+00
a09f4e86-8da8-421d-b4c5-4f7424e07458	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 17:05:08.953+00
dd87f0be-3037-49b7-80d7-70743b42199d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 17:05:50.359+00
362893d4-4ea0-43ec-8528-e20a494fcd9d	e5c47463-3c4f-4d68-9698-d255b6905dd9	/	\N	\N	2026-07-17 14:45:39.614+00
5f7f96c1-c150-48ba-8e3a-f2d78b2579ad	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz	testquiz	\N	2026-07-17 14:45:41.672+00
a16df2d4-f105-43e0-85b2-98995b4f6b9c	e5c47463-3c4f-4d68-9698-d255b6905dd9	/dashboard	\N	\N	2026-07-17 15:44:01.536+00
c2029188-3af6-4d12-8c6c-03cab92d8990	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 21:07:29.995+00
9be3eba2-7efb-4c66-baa6-dd065004a2fc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:05:21.409+00
8ea2c28b-8c7c-4d25-85b0-50c33a8fb892	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:05:42.864+00
749a9cac-b1c2-41e2-8d9e-8b8aa05cc9eb	e5c47463-3c4f-4d68-9698-d255b6905dd9	/dashboard	\N	\N	2026-07-17 14:45:40.468+00
6a1391d5-9ee8-4e7c-acdb-04b51bbd4100	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:45:06.838+00
4b18d177-9625-4bab-86c6-f503c972387a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 21:20:26.077+00
f0e9c85e-f0de-4cde-835b-365439cb0340	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 17:05:26.259+00
33609977-2bc4-4696-902a-7073cdbd6d5f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:05:47.402+00
8db3b36e-f52f-4fff-9a5f-1fe6cc6004a4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 17:34:11.727+00
c5133165-fa20-4576-87f3-959bbd138d74	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 17:34:15.734+00
495bb6b1-d082-47a2-870c-6230902d5236	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:34:21.536+00
2739d37c-b362-48a8-bff9-0fc025b26294	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:34:27.761+00
68d50151-bf82-4945-9ff4-c394ed3351a6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 17:34:30.411+00
9956147a-8c8d-47d0-9d4b-a9987df65c9c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:34:34.219+00
6bb327da-204c-44c6-9caa-d0537acac34c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:37:28.217+00
bcbaa3d9-27ad-4a22-8c13-b2950af2e05d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-14 17:37:30.382+00
bd84e3d7-3168-4715-86a1-1ba493952c4c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:37:32.587+00
691b234f-5b5e-4d21-afa4-751f99e11402	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:37:35.892+00
ea843986-3b72-4a31-aebb-7d347bde4944	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:42:42.98+00
5f3ed62e-d8bc-467f-9ffe-853e17a12a0d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/48ba1199-728a-49b7-9f31-7ca31f76ebbb/analytics	\N	\N	2026-07-14 17:43:08.593+00
f46aba82-f235-440b-8d75-eaaf0325bd9c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:43:19.804+00
0a66d82c-fafd-4e03-8094-847cf30b4208	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 17:43:29.066+00
09f8ab04-ac46-4252-b0db-b82b3671a74f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 17:43:32.226+00
87937ea2-6621-4170-a052-18fdb419d944	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/48ba1199-728a-49b7-9f31-7ca31f76ebbb	testquiz	\N	2026-07-14 17:43:37.493+00
74a149c2-9510-4109-a166-91065cc635d8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 17:45:12.786+00
845171f7-6daa-44b1-95a0-e2f822eaca84	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:45:16.221+00
a4b8cef7-a90b-46ac-8115-e7eef4f3eb8c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/48ba1199-728a-49b7-9f31-7ca31f76ebbb/analytics	\N	\N	2026-07-14 17:45:22.043+00
7a93ecb2-aef1-4b32-af53-31feaca8866b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/48ba1199-728a-49b7-9f31-7ca31f76ebbb/review	\N	\N	2026-07-14 17:45:36.649+00
f8e82e0d-e9bd-4aa6-916a-a8aabefee846	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/48ba1199-728a-49b7-9f31-7ca31f76ebbb/analytics	\N	\N	2026-07-14 17:46:01.226+00
564f7656-382a-4436-ade8-f790e998c9d7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/48ba1199-728a-49b7-9f31-7ca31f76ebbb/analytics	\N	\N	2026-07-14 17:54:48.293+00
9805ef6b-01bf-4ff9-9767-9db97e44b180	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:55:02.234+00
a9dad643-abe9-4d49-a709-7e8fce1252df	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/b0459159-2dbe-43ca-a89f-7b80680cdc48/analytics	\N	\N	2026-07-14 17:58:00.039+00
27ff44a8-03c8-4eab-b0ca-408e8456fb0c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 17:58:08.052+00
86438e01-19c9-4064-b388-e45d19350c7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 17:58:10.801+00
e9f26311-d4a1-4f1a-b45b-75922300f82a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/b0459159-2dbe-43ca-a89f-7b80680cdc48	testquiz	\N	2026-07-14 17:58:15.474+00
46ddb386-f328-4fa5-8aa7-f3f3fc25219b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 17:59:38.395+00
db082c70-ca19-40bd-b26b-6395765e7df2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:59:41.335+00
2efd43ec-01d2-41ee-b7a1-664584504a6a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/b0459159-2dbe-43ca-a89f-7b80680cdc48/analytics	\N	\N	2026-07-14 17:59:46.725+00
168c144d-ee9f-4e97-8e16-3d2b8acedc1c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/b0459159-2dbe-43ca-a89f-7b80680cdc48/review	\N	\N	2026-07-14 18:00:01.896+00
1185339d-d707-427c-816e-c487338a3f33	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/b0459159-2dbe-43ca-a89f-7b80680cdc48/analytics	\N	\N	2026-07-14 18:00:13.627+00
840f5034-30d4-4d68-b22a-335e076e598d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/b0459159-2dbe-43ca-a89f-7b80680cdc48/analytics	\N	\N	2026-07-14 18:12:10.569+00
c152ae9f-e079-4246-8c9d-8bae183d4d51	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 18:15:32.81+00
94c24a89-fff0-482c-a682-c7416784c862	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/analytics	\N	\N	2026-07-14 18:18:53.531+00
3bd01911-4561-4920-bf11-154c9fd2ebb2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 18:19:12.544+00
00055104-670a-45a0-ab8c-ac6c8f3ed2a4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 18:19:15.275+00
1f194df1-ce4a-42a4-83e6-c6860c425565	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/4839a34d-b56b-4fcd-a379-12c852070958	testquiz	\N	2026-07-14 18:19:21.317+00
ecdc78f8-1392-4d31-bc46-f3d3aa23f425	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 18:20:02.6+00
bd94f19a-7608-48a4-ab83-4e2578cf9c27	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 18:38:29.128+00
bf0bb177-f4b9-412a-8a9e-17c2b5515265	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/analytics	\N	\N	2026-07-14 18:38:35.4+00
46e0bf31-54dc-4b2d-932f-9a7a50f1042e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/analytics	\N	\N	2026-07-14 18:39:41.747+00
a1b38ed0-474b-4386-a4dc-d4e3b1632fd2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-14 18:39:45.935+00
69f7e96d-94ff-45cd-a87c-03f883af6373	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 18:39:47.879+00
968f6d95-5c63-4bd8-a0be-e0e688967763	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/4839a34d-b56b-4fcd-a379-12c852070958	testquiz	\N	2026-07-14 18:39:50.548+00
9a823f73-ef88-4a42-b311-c0c5628bf102	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 18:44:02.555+00
b08df5ad-062a-4950-9081-b5486e4250df	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 18:44:05.162+00
0b448f77-a9e0-432b-bd9d-14ae8e7c30cf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/analytics	\N	\N	2026-07-14 18:44:10.789+00
691ee64c-669e-4f02-98fc-62a180389472	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/review	\N	\N	2026-07-14 18:44:18.124+00
acb533a2-6954-4956-842c-280f2cc98ea8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/analytics	\N	\N	2026-07-14 18:44:35.843+00
573b4c0d-4caf-456c-ba8f-bf94f47bedf9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 18:44:39.361+00
6305022a-d834-4dc3-b716-7736ce3677f4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 07:17:51.636+00
36e1df67-ac13-4a40-8e7d-2cd3a349c597	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 07:17:57.812+00
efbec719-1771-4586-a012-78dfa80f308b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/analytics	\N	\N	2026-07-15 07:18:05.049+00
9fc2a200-7912-4107-b561-1faa8907b8ec	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/review	\N	\N	2026-07-15 07:18:10.888+00
5d8381e6-d88e-4b83-a7c3-683cbfb75025	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/4839a34d-b56b-4fcd-a379-12c852070958/analytics	\N	\N	2026-07-15 07:18:35.719+00
65f07a39-1748-41ab-b405-fd5693fa5937	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz	testquiz	\N	2026-07-17 15:13:27.196+00
4609553f-858c-4d56-867b-5b2300ff8e36	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:45:07.466+00
0ff53f3f-915d-4f73-98d2-9f2870ccfbcb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 07:19:12.235+00
90de60d7-5aca-4500-9007-efdfaa0fa284	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 07:19:17.637+00
6a136bd7-ed93-441d-848b-67622b19be6d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 21:24:37.543+00
ed1a7b74-e371-413d-83e5-d8135b5c1dfe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 10:26:47.323+00
256c70ea-f373-492e-88e1-0c5a86f676f0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 10:26:53.027+00
259670b0-9a2e-4dab-b4f2-7de4dce38aac	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 10:29:21.542+00
9155081d-9397-4a5c-88a4-cd85d606b868	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 10:29:58.83+00
b1323292-f3df-4eee-b935-54f92ca5adfa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/modules/0d8028ab-662c-4354-a0c3-a91aa9f35013/lessons/66c63c48-5830-4bf5-8ccd-2247b844807b	testquiz	66c63c48-5830-4bf5-8ccd-2247b844807b	2026-07-15 10:29:27.211+00
bbe44d1b-3a39-4554-b03d-c3465a8b122f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:32:21.781+00
8227172b-eaa5-48e5-957c-5997bb0c09e4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 10:32:30.98+00
584da700-a80e-4b97-bd18-fefb2ef891a1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 10:32:35.103+00
b1626a1f-910f-4b33-b432-b69c9285d75b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 10:33:15.198+00
9adf606d-349d-4432-b06e-b18845d337fa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz/quizzes/71e55eca-e273-41a6-8143-b15df93ec35d	testquiz	\N	2026-07-15 10:33:22.603+00
f6ce72a2-d147-4e3b-82f3-25877d38cf5a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 10:33:24.576+00
06ef2867-c419-4a7b-a40c-69c1f06b388e	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz	testquiz	\N	2026-07-17 15:16:02.136+00
313cd872-be9a-44ee-841d-c00be3b34fed	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz/quizzes/71e55eca-e273-41a6-8143-b15df93ec35d	testquiz	\N	2026-07-17 15:16:09.633+00
3acc0e68-2be5-4b24-9124-af8d09747d6b	e5c47463-3c4f-4d68-9698-d255b6905dd9	/courses/testquiz	testquiz	\N	2026-07-17 15:16:43.865+00
a7632c30-4765-44f4-bb67-fd54fc835a61	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:16:52.41+00
3b02ca97-45d4-49f5-90fe-c12245d1502f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 10:35:07.82+00
2c1419e5-f291-42c1-8f27-782f170d63eb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 10:35:09.198+00
ab37d2aa-03ee-4e28-89f3-366313401780	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:38:37.41+00
4653579e-6c07-40e0-a99d-7330b08f29fb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 10:38:42.261+00
3b6c517a-024a-49ba-9f7d-909489afaf72	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:40:12.366+00
ecc89567-3a00-49be-8081-7fdb32b8c0e3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 10:40:31.101+00
91d4f813-33cc-4769-b853-ab604a63eecd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 10:46:46.954+00
ac22a743-d282-465d-920d-57198e72d4d9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 10:46:51.849+00
a309bfce-f980-4ee0-89c5-965b1109594e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:50:04.962+00
eede55a6-583c-4022-a7c9-5f839d9c0977	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 10:50:10.113+00
0677ebc5-e5bd-42d3-8db3-58bf50f8b25d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 10:51:36.38+00
72368ecf-56cd-43f9-9eee-2795ae85db1c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:52:35.895+00
fd4ac3ed-28b5-4699-9c79-7c42c442dde3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 10:53:48.547+00
4a9ffc6e-4c88-4df4-9a95-b5828b96e808	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 10:53:51.281+00
f7a3fef4-8ca2-4efd-851c-db5d71d3e5fe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:53:55.707+00
84a65797-f7a7-4c1c-ba43-a1af2e0d8393	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:56:28.481+00
f1347ab4-2c43-47cc-808f-a74901679cb6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 10:56:32.706+00
29a2b012-5f07-487a-a1e8-5b1b4e171d3c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 10:56:47.759+00
f02470d6-529e-4daf-814e-eee4c9d49c1a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:01:20.54+00
3272c690-616b-4096-af96-f1afc9a15e5e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:01:22.874+00
48c7786b-a372-4ec8-8187-594b82dbc6c7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:01:26.464+00
dff3a3fe-322d-4b5e-b2c4-6334ba7fa681	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:01:41.781+00
dc410cb1-af1a-4668-a456-ef0d7506ca74	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:01:46.731+00
ea51beda-1bb7-4798-b104-2468b7694b60	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:02:04.739+00
6a0cc408-37af-49f5-afee-a9bf9c3aa63a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:02:08.779+00
a47ec2ed-6624-48a4-8dcc-81acc32a08ab	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:02:36.162+00
3badc647-679a-4968-a7a9-a7bfb355f96b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:06:41.478+00
35c90712-3a96-4a90-b000-c51030fbc023	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:06:43.622+00
e7ef0e8f-0111-44ba-9619-fa4284c64cc6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:07:05.356+00
72d8a7ae-3b7d-447c-a99a-d5fada3a614d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:07:08.253+00
b758e051-9f3b-4c8e-8b82-e94c597c0c7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:07:51.597+00
57f52ca8-6a2b-480b-af7b-e032528a55a2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 11:08:32.031+00
089a2909-b17e-41e6-821f-5a19ad1be6e1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 11:08:36.2+00
b3013be9-f38e-478b-ac68-4ca2d5b838f5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:09:36.608+00
f57ba8fb-916a-462e-b3a6-c5fc162df340	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:09:40.528+00
89c70c27-baac-447e-9fd8-8614e522ff3f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:18:25.98+00
bd7e3866-90c5-4ddc-b8b6-5cfd63e84cc1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 11:52:05.632+00
c6587db2-303c-4912-99d6-655ecc06d48c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 11:52:09.919+00
ef2973b5-a9f4-46a2-934f-78dbe293cee1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:52:14.659+00
e6aaff58-78fc-4a9e-a3b0-bfec9e470f0d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:52:20.103+00
dc28404a-c8a2-4cd6-8e3a-ad40cd8cc7b9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 11:52:46.571+00
3e510c2b-9d8e-43ba-a04e-2b06910abaed	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 11:54:06.015+00
7f654dd2-8c70-491e-ac69-dc549810a064	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 12:00:19.143+00
5856987e-b32a-46d2-a95f-4dded3e583fc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 12:00:22.341+00
7f23b1a3-6803-4666-a583-53fe9afb40c7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 12:02:54.499+00
b801f4eb-adc2-4a0b-8af7-a790a0dfebf6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 12:13:32.4+00
8980fb36-ffdb-4aa3-b831-c2ac59ca8f5e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 12:13:35.054+00
14f80f03-0806-4acc-be9f-0e2771b2e29c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 12:17:47.004+00
42c5159c-4920-46b3-9e92-cdbbb78e8faa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 12:17:52.059+00
5a0b96d3-5eb0-4c54-aadb-1e05c787fbba	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:16:54.894+00
d8227a80-8467-4a69-b14d-7170b705d3ed	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-17 15:17:32.788+00
3a7c8da0-2fa3-4b70-84d3-f731a44bc5ae	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 12:20:48.089+00
0b4d0870-b31a-49de-aad6-e42e39a79670	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 12:20:49.945+00
6a07d978-1761-4202-8208-dadc42144f58	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 12:22:20.125+00
09bb79cc-aa1c-495d-95f5-c10c37deb487	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:57:05.365+00
4dbbdb27-346c-4aca-b8a3-b7738d61a9fd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 21:24:39.708+00
c1ea225e-4af5-4a11-a842-68d0c618eeee	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-17 15:17:04.379+00
7af802de-cc03-456c-827d-f0bc77ff9b0e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-17 15:17:13.467+00
ca751d6f-32be-405f-b7b7-cc62605598af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:58:54.919+00
4339c329-5972-4d81-968f-7aa326576e04	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-17 21:25:26.764+00
b26a5c41-2ac6-496e-93a9-dcf08b19af8b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 14:19:44.94+00
c06f46a3-c09f-400f-9a66-64f7c003cf0f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 14:19:47.597+00
9c9f18e2-e8b2-4007-bb85-fc8f36675ae6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 14:20:09.473+00
e01afb41-848d-4db4-820b-4d0fc91e5ca0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 14:20:13.359+00
b2fae15f-0dce-47c9-95c8-0cc306e9064a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/analytics	\N	\N	2026-07-15 14:20:39.914+00
42ad3eda-1384-4b82-841f-374bf41920c4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 14:20:51.111+00
ff04aa5c-3f56-4ce2-a5d6-83fd51161698	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 14:20:55.175+00
0072d54f-3971-4866-b718-a8fd99dec16d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 14:21:04.309+00
6d750c0e-0e0d-4310-a6e5-77b7697f2f49	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-15 14:31:50.743+00
2da014cf-d0d6-42ba-916f-7aa75dcd6821	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-15 14:31:55.22+00
ff2bd435-00af-4d82-82ae-b21899824b88	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 14:32:04.123+00
8e3ffca2-b7df-4db7-9762-b8a6eb459543	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 14:32:15.134+00
d61b26d6-9a18-43ce-a601-125b8b94accd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 14:32:20.144+00
407bf0d7-7287-45bf-823a-15894f0d481c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 14:33:59.626+00
51bb71dd-7f8e-4201-b2b1-ee26bb981cb8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 14:34:11.409+00
3fa35662-caa3-458d-89ee-828489c700ad	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/analytics	\N	\N	2026-07-15 14:34:14.866+00
b400bd37-0ef8-4f21-8d8e-806bbed82210	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/review	\N	\N	2026-07-15 14:34:19.877+00
fe4036e1-e93b-49f9-8bfa-26e0eec9b51b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/analytics	\N	\N	2026-07-15 14:35:22.672+00
cb7cfe17-326b-4cd3-8bda-4b90f9ae29c4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 15:21:53.905+00
baaa7099-39c9-415f-be25-85a28fdbae9e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 15:21:58.004+00
491357e3-3157-432d-9690-63ec64135b5d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 15:22:40.753+00
577b56c8-db26-4f8c-8f5f-aff12c6caaba	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 15:52:00.997+00
c826838a-3416-483f-beb2-c5bf9efdf0d4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 15:52:42.073+00
01f54690-7506-4f3e-9e9e-c144fd51ed9f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/analytics	\N	\N	2026-07-15 16:09:41.973+00
46a4b89c-4acd-4cf2-9ec0-85edaff48be5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 16:26:18.325+00
a50ede30-b5ab-44ee-9504-5aaa1589780a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 16:26:19.884+00
5e003445-64ff-4f19-8fba-e0769fef2e98	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:26:25.982+00
f67fa703-dc33-4df8-a4ca-30dd154643ab	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 16:26:33.523+00
4e198225-ab30-474a-b357-b513751f480d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:37:11.242+00
99dcb740-38e8-4eec-87cf-53857507872c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-17 15:25:06.502+00
4d6f2b7a-69a4-4e6e-af09-f70ecd6efc12	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 16:22:45.194+00
5e3d18d7-45fb-4a3f-8927-f46b49469a11	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-17 21:25:36.333+00
ca811907-ac95-428c-b050-9c5be67ed2d0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 16:38:48.172+00
96a975d1-d4d3-40fd-a983-e2b202a6a18f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 16:38:49.866+00
e22ebbe5-7ffc-4ef5-9ff0-19c517b5857e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:38:54.245+00
e329c823-dc60-45a5-a16a-783d2ea72633	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 16:38:58.355+00
74940963-fe24-4511-a5f1-4dba885447db	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 16:42:42.974+00
f7fe26d5-0508-4aa7-882d-13f227f8219b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:52:16.414+00
7baa9e47-6612-47a7-a89b-7045276b3622	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 16:52:25.337+00
01f63d88-9778-4eca-80fc-7a0906d43c42	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/analytics	\N	\N	2026-07-15 16:52:29.253+00
baecd56e-cf1c-46fb-90b4-e0d52acc374d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 16:53:02.23+00
bc1427f1-2154-4a53-a785-b5bb8d7eb0f6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 16:53:04.085+00
c90716e9-1aa6-455c-8bd5-db1609e6286d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:53:17.587+00
017f92d9-19a4-49e8-a45d-20870d03abd5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 16:55:06.409+00
282c41b8-11e5-423d-acf6-044f1758ed5f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 16:57:35.103+00
0ecd8f0f-65e9-4136-bb1b-5b27679b57f0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:57:40.484+00
0c525408-5db6-491c-89eb-b21139e0e2fd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 16:57:43.862+00
4f16ef5f-5693-40f8-adb9-a2194027ff3b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:59:10.069+00
dadb4a7e-5b19-419f-beb2-e76cd84923fb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 06:31:27.265+00
06c5c19e-bac9-4e24-9bf2-1849792c2f26	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 06:31:36.656+00
757ae812-a255-4684-9d3f-5d3ab496dd33	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/analytics	\N	\N	2026-07-16 06:31:43.597+00
fe12c11c-2196-4e65-aacc-1cc01883023f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 06:31:46.856+00
8017a485-1c19-4dbd-8cf0-038744da8be9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-16 06:31:48.129+00
13b1fdd2-5305-4f1d-a485-9d83ae151f98	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 06:31:51.942+00
c0abfc79-ab15-4e6a-9b2c-efbca77ac405	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-16 06:33:53.619+00
1a9fa055-f82a-48e3-8b20-6892fcb2cf39	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 06:33:57.503+00
8624ca08-f06a-42e1-9f44-8b477d097a34	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-16 06:34:05.421+00
f1c0a1f0-0e8e-4a81-b81d-f1f7a7ce1195	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-16 06:34:17.076+00
e38c0948-91ea-4581-9b62-9a46bdba4f50	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-16 06:39:20.432+00
1c1df224-2fa3-41f2-897f-0d0123f2c79c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 06:39:22.857+00
9f52e837-1232-4b02-a9fe-706f0808b487	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 07:34:52.193+00
d5d96570-64fe-42d6-a4e1-140e07ad20ab	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/auth/register	\N	\N	2026-07-16 07:35:13.358+00
25ecb75b-f0f8-4ee0-aa6a-2f6e8acd55d2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-16 07:35:17.079+00
da2c24a0-836f-4344-8e05-f9bff40912d9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 12:27:45.708+00
4d1ce296-d781-4416-a8c0-5a3743d73f6a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 12:28:10.633+00
aec8cc2a-c46e-4485-93e3-64f7058e9dc4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/contacts	\N	\N	2026-07-16 12:28:27.798+00
42087c89-0a00-4358-b359-cd8dfc35a610	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-16 12:28:32.337+00
3afc74d0-d7f1-4dca-b360-6dd1e1d0451b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/profile	\N	\N	2026-07-16 12:28:36.41+00
9c662e20-c6b1-419e-b780-5c63567c2e7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 12:30:55.384+00
e4b9c468-e07f-4a01-b8a4-d2853ba5bd53	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/students	\N	\N	2026-07-16 12:31:09.807+00
c2d299d7-530e-40cb-a030-2d6cdeed6fcd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 12:31:14.133+00
a0bbc397-8396-41a6-b035-ecdee1e54c38	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 12:36:14.069+00
56b8fe65-3dad-4c57-8e9f-dae6505860cf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 12:36:18.169+00
b89bfd2f-24dd-431f-9784-2a961f994510	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-16 12:36:28.977+00
fa529890-2ede-4a30-9805-346e26e192df	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/profile	\N	\N	2026-07-16 12:36:32.535+00
e9bbcf60-f9ad-4435-9430-05a31bb35448	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/profile	\N	\N	2026-07-16 14:58:02.962+00
91552378-e7c1-489b-b4f5-a71d6a9a089f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 14:58:11.544+00
f0d14a0e-71ee-4da7-a67f-f18337fbd61f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-16 14:58:35.3+00
62dfa855-bde3-43b1-b353-2eac574d5e53	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-16 14:58:37.92+00
d70145c2-ba7f-46d1-9dd7-cb23262eebc0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 14:58:40.312+00
1fe2b6fd-5f10-441a-a9b6-636c0f9c9c58	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 15:06:58.511+00
19e299e2-a5db-40e9-8420-2c0cf8b73295	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 15:07:36.789+00
c66c1ea3-3864-433b-a995-31d043efbe2b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/profile	\N	\N	2026-07-16 15:09:06.092+00
2d5634be-e7e7-4556-a732-79d275d8ac48	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/profile	\N	\N	2026-07-16 15:09:11.851+00
b345ed5f-4e86-4742-8ea4-284c13170869	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 15:09:12.326+00
b425ad57-5e15-4ee8-ba31-0bc5ebed402e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 15:09:22.814+00
bf99949c-33f8-4003-99e7-83dfa2fff402	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 15:11:05.014+00
8b67123b-0b0b-4091-a635-d6345402df17	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 15:11:05.573+00
8e2a8e15-8d02-4d68-8663-9d9ed9f334c0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 15:11:22.067+00
8cb5d560-eeb3-4068-b21c-089cad8d8184	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 15:11:48.364+00
acefc19c-4338-45fd-9527-660c49ec781d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 15:11:52.138+00
ad07ca12-15a0-4fcd-819e-13f67a4ce14d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 15:11:55.212+00
eacfcb9a-1483-4651-9474-e8c4c9c3bda7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-17 15:25:09.946+00
ab93a5fb-cd06-4dbb-bbee-967efe475495	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:25:20.414+00
331e24e5-a72a-43e5-80f9-3e703e094488	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 15:13:45.971+00
28ac9fee-eaa7-4696-ab2a-301177a97497	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 15:13:47+00
374f4a88-6637-4c58-9b22-2797dc61f038	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 16:29:36.396+00
dde52b30-22f1-4258-8cf5-56989d086739	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 21:23:51.715+00
7d219e5c-0298-427f-a8d5-fd34bd0c1ef9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 21:23:54.511+00
daccb365-8788-48e3-8b1f-5f64fcdf3e79	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 09:29:34.598+00
2c1e1dcb-8873-4b82-9be8-45645db4677b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 09:29:37.733+00
cbad22d6-8b95-4418-9fca-73d17862b638	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 09:54:51.593+00
2b5e5045-b123-477d-922a-9e49c117f0af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 09:54:59.035+00
5fbc6d57-ab93-40b7-9b11-dd7d94c66e4c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 09:59:35.604+00
92326a9c-bda5-4ee6-a300-1d777a143b90	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 10:13:25.035+00
2f9f5af8-5f25-4ed9-8a39-d1c05d1b1046	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:13:28.234+00
0463ee81-009e-4820-a793-6e19830c22ee	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-17 10:14:07.051+00
3b969adc-7882-4e70-8907-2337814c093d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 10:18:21.867+00
acf6a2e4-ace1-4d20-80db-9e7752df4129	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:18:22.922+00
e9ce7d44-7a71-4170-a4fc-90e3610b6e7b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:18:29.158+00
c06372d2-d588-47c5-82a3-159978a47324	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:18:33.803+00
5b11fa48-e9f8-475f-89e1-87ad3e947805	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:19:10.507+00
8a06cff9-307b-48a3-b30b-5214a34cc119	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:19:41.279+00
269d4531-1281-4b24-8ec5-661447baa870	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:20:37.21+00
d326a8f4-6ee8-4299-a04d-cd6c61e71112	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 10:48:16.904+00
3e757e8f-13ff-4690-9d7b-24769c973af7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 14:17:49.668+00
f04183b6-aee5-4f42-9670-3e7815a45960	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:17:52.707+00
91898c6e-c43a-4335-a786-77cf463784ff	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:27:41.399+00
b4fd302e-ffb3-47fc-99f8-a017a298c82a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:32:30.291+00
ad4b65d2-3aaa-43ce-8b33-0941cf315ee3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:34:09.272+00
28b08bdd-109b-4d39-aa61-618010d09ad7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:34:26.127+00
b06689cd-1165-4851-9c43-d9a3f498c2a6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:35:27.907+00
e9fb9c64-57b7-42c4-9eb8-776abcfe8fbb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:35:30.111+00
8e1203cf-fbef-4a8d-9a9c-12365099248d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:35:36.262+00
252be505-9432-414d-a1b9-7826f89f9fce	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:36:54.568+00
6431a7f1-6e60-4c05-881a-a76419a71559	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 14:38:01.55+00
ce0a971b-bc5f-47fd-b492-09d4414e6bcf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:38:02.133+00
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."user_sessions" ("id", "profile_id", "login_at", "logout_at", "session_duration_seconds", "ip_address", "user_agent", "created_at") FROM stdin;
13b263af-e6df-4f53-a62e-c5312c6f8beb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-17 21:24:36.243+00	2026-07-17 21:25:42.915+00	66	156.146.62.37	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-17 21:24:36.475622+00
a07f386a-0395-45a1-9b8c-14e33dfe4f14	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-17 19:54:45.562+00	2026-07-17 21:24:35.943+00	5390	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-17 19:54:45.155719+00
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
certificates	certificates	\N	2026-06-24 14:19:59.587854+00	2026-06-24 14:19:59.587854+00	t	f	\N	\N	\N	STANDARD
avatars	avatars	\N	2026-07-03 08:04:41.984459+00	2026-07-03 08:04:41.984459+00	t	f	1048576	{image/png,image/jpg,image/gif,image/jpeg}	\N	STANDARD
contents	contents	\N	2026-07-09 09:17:40.624862+00	2026-07-09 09:17:40.624862+00	t	f	1048576	{text/markdown}	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_analytics" ("name", "type", "format", "created_at", "updated_at", "id", "deleted_at") FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_vectors" ("id", "type", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
f3ffa8d8-9569-44ab-9446-66b1795d41c6	avatars	uploads/08be3132-7d36-46c3-9d31-2b1fd0b48d83-1783065934565.png	\N	2026-07-03 08:05:36.310268+00	2026-07-03 08:05:36.310268+00	2026-07-03 08:05:36.310268+00	{"eTag": "\\"bfde10d0fa644f4eda64a2f234cc905a\\"", "size": 126283, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-03T08:05:37.000Z", "contentLength": 126283, "httpStatusCode": 200}	e76326fb-df9e-47b8-9b68-b20924f6a62d	\N	{}
50364739-6d8c-4938-88a6-24a7421d440c	avatars	uploads/08be3132-7d36-46c3-9d31-2b1fd0b48d83-1783066842958.png	\N	2026-07-03 08:20:41.471247+00	2026-07-03 08:20:41.471247+00	2026-07-03 08:20:41.471247+00	{"eTag": "\\"e2a626f73860747c5c9a3745b7781223\\"", "size": 9081, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-03T08:20:42.000Z", "contentLength": 9081, "httpStatusCode": 200}	243c5d11-2595-4784-ad53-00c70cf6c261	\N	{}
539798ff-62f7-4dff-a6c9-2ecd4207eaf5	avatars	uploads/dac6bbb7-74f3-4931-ab1a-6cfb7dc50bf7-1783067034367.png	\N	2026-07-03 08:23:53.238902+00	2026-07-03 08:23:53.238902+00	2026-07-03 08:23:53.238902+00	{"eTag": "\\"0cdf0230225cc5396b1fd4ffd18abb61\\"", "size": 381365, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-03T08:23:54.000Z", "contentLength": 381365, "httpStatusCode": 200}	223e688a-63a8-44b6-a358-1a0661b84776	\N	{}
15e4c63e-a4cf-4e1b-bf9f-cf866637e996	avatars	uploads/2e9c8798-82ad-444c-b1cd-99f84f06865f-1783079922738.png	\N	2026-07-03 11:58:41.281394+00	2026-07-03 11:58:41.281394+00	2026-07-03 11:58:41.281394+00	{"eTag": "\\"19cd24e0888da4903e90430c533f4905\\"", "size": 47137, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-03T11:58:42.000Z", "contentLength": 47137, "httpStatusCode": 200}	df91e79c-32a6-4083-a797-1c368f063c8b	\N	{}
ca664346-1436-4abe-a064-54f31212d6ba	avatars	uploads/93085a69-755d-400b-b4fc-be70487a48d7-1783257883229.jpg	\N	2026-07-05 13:24:43.620721+00	2026-07-05 13:24:43.620721+00	2026-07-05 13:24:43.620721+00	{"eTag": "\\"47cca22dd42be2f2ca2bbb151d0ad1cc\\"", "size": 240500, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T13:24:44.000Z", "contentLength": 240500, "httpStatusCode": 200}	313ca1c8-cbde-458b-ad5f-2a64ca7143cd	\N	{}
b2a127b4-0f4c-40e7-bb09-4399303621c2	avatars	uploads/dac6bbb7-74f3-4931-ab1a-6cfb7dc50bf7-1783257906756.jpg	\N	2026-07-05 13:25:07.118812+00	2026-07-05 13:25:07.118812+00	2026-07-05 13:25:07.118812+00	{"eTag": "\\"8b6c3689adbf2242a5dafe4c6a42ba8e\\"", "size": 128217, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T13:25:08.000Z", "contentLength": 128217, "httpStatusCode": 200}	14c6254a-ae26-48fa-bd2f-255e41203cad	\N	{}
b21fd7f7-5983-409f-87f1-5bb876985cb3	avatars	uploads/14ae5268-7de3-4113-ae5e-ac0e449a4dee-1783257924361.jpg	\N	2026-07-05 13:25:24.791094+00	2026-07-05 13:25:24.791094+00	2026-07-05 13:25:24.791094+00	{"eTag": "\\"ec70cd90009867e6cd0962c09db521bc\\"", "size": 274780, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T13:25:25.000Z", "contentLength": 274780, "httpStatusCode": 200}	6fbbe28e-3ca7-4d87-b5c3-4ed8cb4b49b1	\N	{}
6ae4f2ae-758b-4537-8fe1-897cb59d8c0c	avatars	uploads/29cc9e7c-3aca-4c21-b45e-f4935c780dd9-1783257966866.jpg	\N	2026-07-05 13:26:07.546704+00	2026-07-05 13:26:07.546704+00	2026-07-05 13:26:07.546704+00	{"eTag": "\\"271d3f3066e7ae3b4fbf464ac4f59054\\"", "size": 360216, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-05T13:26:08.000Z", "contentLength": 360216, "httpStatusCode": 200}	d1f30584-cfe1-46f8-9443-0a887bd90ae3	\N	{}
5426cb52-6ab0-401e-b8a1-44ff6084fdd6	avatars	uploads/cc421283-06af-41de-a08b-4c3adf39f65c-1783409817434.png	\N	2026-07-07 07:36:57.853403+00	2026-07-07 07:36:57.853403+00	2026-07-07 07:36:57.853403+00	{"eTag": "\\"d224bd1c1765245cba9b5f0ce6753eae\\"", "size": 66475, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-07T07:36:58.000Z", "contentLength": 66475, "httpStatusCode": 200}	0a3e06b5-c00b-4769-9ce5-4910523abbf4	\N	{}
198c27d4-65ea-42bd-bf55-854b2c92ad66	avatars	uploads/f7cd70e7-a2c4-4f82-86d8-366d066068db-1783409883619.png	\N	2026-07-07 07:38:04.021022+00	2026-07-07 07:38:04.021022+00	2026-07-07 07:38:04.021022+00	{"eTag": "\\"0cdf0230225cc5396b1fd4ffd18abb61\\"", "size": 381365, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-07T07:38:04.000Z", "contentLength": 381365, "httpStatusCode": 200}	5ea1e84d-fc14-4844-8f18-32d96d87be1e	\N	{}
8d528e09-5ddf-403e-a8d5-5935077559ef	contents	markdown_1783589211702.md	\N	2026-07-09 09:26:52.009986+00	2026-07-09 09:26:52.009986+00	2026-07-09 09:26:52.009986+00	{"eTag": "\\"37cccb614bdd1dd9fcd505e890d4f3cf\\"", "size": 4000, "mimetype": "text/markdown", "cacheControl": "max-age=3600", "lastModified": "2026-07-09T09:26:52.000Z", "contentLength": 4000, "httpStatusCode": 200}	e121c04b-c110-44a4-8d9b-e770173883a4	\N	{}
d74cfe57-4df7-4935-9cda-e0656637dd80	avatars	uploads/aa15a466-8705-476f-9f0b-b42ff653401a-1784213827731.png	\N	2026-07-16 14:57:08.24008+00	2026-07-16 14:57:08.24008+00	2026-07-16 14:57:08.24008+00	{"eTag": "\\"6e55e9b1cdb16a1526649c944323bf93\\"", "size": 264456, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-16T14:57:09.000Z", "contentLength": 264456, "httpStatusCode": 200}	47c0dd45-67a8-4c6b-bc07-06b91c71c3e1	\N	{}
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata", "metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."vector_indexes" ("id", "name", "bucket_id", "data_type", "dimension", "distance_metric", "metadata_configuration", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict L1AVLYjtZaaRoBbw2KZpYPOT5FhFeMgpKp7sVi125wegxtec2zw8J3cdIuPN2H7

RESET ALL;
