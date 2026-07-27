SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict hHqIM8wgc5JCWMxfsNQfd4QFZpvQycMfewbhHbSWcR0VGz9HJmKJCpbe7cYO7wt

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
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."coupons" ("id", "code", "description", "discount_type", "discount_value", "valid_from", "valid_to", "max_redemptions", "current_redemptions", "is_active", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("id", "first_name", "last_name", "display_name", "role", "status", "created_at", "updated_at", "email", "password_hash", "avatar_url", "total_minutes_active", "user_type", "school_track", "school_section") FROM stdin;
71be76b7-b2f4-4b8b-8216-a9fa45ab347b	Martina	Costa	Martina Costa	student	active	2026-07-09 12:27:45.014+00	2026-07-21 09:59:11.754+00	martina.costa.17540@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	103	EXTERNAL_STUDENT	\N	\N
1db651fd-fe09-4911-9cb9-543534d2588c	Diana	Rossi	Diana Rossi	student	active	2026-07-13 15:37:03.18+00	2026-07-21 09:59:11.754+00	diana.rossi.17541@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	33	EXTERNAL_STUDENT	\N	\N
dfa6a4d3-6bec-43a4-aa1e-db38d477d783	Elena	Conti	Elena Conti	student	active	2026-07-10 21:48:15.048+00	2026-07-21 09:59:11.754+00	elena.conti.17542@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	370	SCHOOL_STUDENT	CHI	B
3cb4e26d-2d55-4741-9e09-20da1a96bece	Diana	Bruno	Diana Bruno	student	active	2026-07-11 10:52:14.879+00	2026-07-21 09:59:11.754+00	diana.bruno.17543@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	73	SCHOOL_STUDENT	CHI	A
e93cbdf4-74f5-4bf6-a6bc-ab95ae75e4e2	Marco	Bianchi	Marco Bianchi	student	active	2026-07-09 15:41:50.744+00	2026-07-21 09:59:11.754+00	marco.bianchi.17544@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	166	SCHOOL_STUDENT	MMC	B
6ce0f33f-0908-4568-bd7e-8e00a11e3172	Alessandro	Fontana	Alessandro Fontana	student	active	2026-06-28 02:07:23.917+00	2026-07-21 09:59:11.755+00	alessandro.fontana.17555@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	62	SCHOOL_STUDENT	INF	E
d3dc15f2-7674-45cd-a0d6-5cbbb8b4f0ff	Claudio	Bianchi	Claudio Bianchi	student	active	2026-06-30 17:40:18.032+00	2026-07-21 09:59:11.755+00	claudio.bianchi.17556@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	134	EXTERNAL_STUDENT	\N	\N
89d060ae-ca11-486d-a888-27b80655f2d0	Leonardo	Conti	Leonardo Conti	student	active	2026-06-27 03:21:07.161+00	2026-07-21 09:59:11.755+00	leonardo.conti.17557@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	300	SCHOOL_STUDENT	AFM	A
c1444bd6-d403-4f91-a476-254aad0951a4	Sofia	Costa	Sofia Costa	student	active	2026-06-30 05:49:37.449+00	2026-07-21 09:59:11.755+00	sofia.costa.17558@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	286	SCHOOL_STUDENT	MMC	E
69073512-cedf-4e92-b108-bfddf49fd7f0	Martina	Costa	Martina Costa	student	active	2026-06-29 04:19:56.995+00	2026-07-21 09:59:11.755+00	martina.costa.17559@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	333	SCHOOL_STUDENT	AFM	E
e07e3a8f-2023-46fc-824c-fbf697209aab	Claudio	Gallo	Claudio Gallo	student	active	2026-06-30 07:28:09.342+00	2026-07-21 09:59:11.755+00	claudio.gallo.175510@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	326	EXTERNAL_STUDENT	\N	\N
10f05016-2dd7-469b-b70d-3b746854064e	Alessandro	Fontana	Alessandro Fontana	student	active	2026-07-12 16:57:23.374+00	2026-07-21 09:59:11.755+00	alessandro.fontana.175511@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	28	SCHOOL_STUDENT	LSA	A
38452999-4c0b-45d8-835c-331a2ba61d0e	Marco	Bianchi	Marco Bianchi	student	active	2026-07-13 08:45:24.918+00	2026-07-21 09:59:11.755+00	marco.bianchi.175512@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	221	SCHOOL_STUDENT	RIM	C
63027211-6c39-4013-952b-5882b02285ac	Leonardo	Rossi	Leonardo Rossi	student	active	2026-07-05 12:23:31.744+00	2026-07-21 09:59:11.755+00	leonardo.rossi.175513@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	365	SCHOOL_STUDENT	INF	A
3b305a50-e194-4ded-857b-a87e7dee560c	Diana	Ricci	Diana Ricci	student	active	2026-07-10 02:02:19.858+00	2026-07-21 09:59:11.755+00	diana.ricci.175514@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	474	SCHOOL_STUDENT	AFM	E
608666d2-f3b6-41f6-8746-bc7be277d8da	Martina	Bianchi	Martina Bianchi	student	active	2026-07-19 04:37:22.472+00	2026-07-21 09:59:11.755+00	martina.bianchi.175515@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	220	SCHOOL_STUDENT	CHI	A
fa2ce395-9e85-4331-bae6-c61fbc5b5733	Marco	Bruno	Marco Bruno	student	active	2026-07-11 06:59:06.204+00	2026-07-21 09:59:11.755+00	marco.bruno.175516@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	259	SCHOOL_STUDENT	MMC	E
27ec38c7-5325-45e9-9e32-f49d0c832f31	Marco	Gallo	Marco Gallo	student	active	2026-07-10 12:26:22.302+00	2026-07-21 09:59:11.755+00	marco.gallo.175517@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	410	SCHOOL_STUDENT	RIM	E
41ece4d2-4b62-445b-a3e8-7048b5c3f753	Marco	Russo	Marco Russo	student	active	2026-07-20 02:49:04.107+00	2026-07-21 09:59:11.755+00	marco.russo.175518@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	279	SCHOOL_STUDENT	CHI	A
468c26d6-c3a7-4e0e-960b-7c24788af757	Diana	Rossi	Diana Rossi	student	active	2026-07-15 06:21:14.204+00	2026-07-21 09:59:11.755+00	diana.rossi.175519@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	277	SCHOOL_STUDENT	RIM	B
6e232992-2721-4601-9361-a047d5cba6ca	Claudio	Gallo	Claudio Gallo	student	active	2026-06-29 10:30:35.021+00	2026-07-21 09:59:11.755+00	claudio.gallo.175520@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	445	SCHOOL_STUDENT	MMC	C
54bd426e-eddb-48e0-82f9-28de3e05ff86	Leonardo	Bianchi	Leonardo Bianchi	student	active	2026-07-06 04:46:36.321+00	2026-07-21 09:59:11.755+00	leonardo.bianchi.175521@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	145	SCHOOL_STUDENT	CHI	C
da1f5d3c-0762-48df-b9e1-b189c897ffb1	Marco	Costa	Marco Costa	student	active	2026-07-12 09:02:33.757+00	2026-07-21 09:59:11.755+00	marco.costa.175522@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	460	SCHOOL_STUDENT	INF	E
7a03ea83-1b45-456c-91e0-3aa7eb4d3e2b	Marco	Rossi	Marco Rossi	student	active	2026-07-13 03:18:46.548+00	2026-07-21 09:59:11.755+00	marco.rossi.175523@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	338	EXTERNAL_STUDENT	\N	\N
b855cea3-de67-4c93-8d14-c5eef2ff6eb7	Alessandro	Romano	Alessandro Romano	student	active	2026-06-30 23:02:31.732+00	2026-07-21 09:59:11.755+00	alessandro.romano.175524@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	310	SCHOOL_STUDENT	LSA	D
83dcd8ae-81f3-48f9-9d2a-542030157d18	Francesco	Bruno	Francesco Bruno	student	active	2026-07-06 22:48:10.805+00	2026-07-21 09:59:12.049+00	francesco.bruno.20490@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	273	SCHOOL_STUDENT	INF	D
141a9dcc-249b-4503-98ef-d0e4d6a77f61	Marco	Bianchi	Marco Bianchi	student	active	2026-06-23 17:52:46.246+00	2026-07-21 09:59:12.049+00	marco.bianchi.20491@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	30	SCHOOL_STUDENT	INF	B
d079a378-0a89-4a20-b349-d0a45a36df7d	Claudio	Bruno	Claudio Bruno	student	active	2026-06-25 13:02:49.176+00	2026-07-21 09:59:12.049+00	claudio.bruno.20492@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	255	SCHOOL_STUDENT	MMC	A
bdd201a7-69b1-4d3c-bf2c-91fe7d7625ba	Francesco	Bruno	Francesco Bruno	student	active	2026-06-25 21:33:52.441+00	2026-07-21 09:59:12.049+00	francesco.bruno.20493@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	256	SCHOOL_STUDENT	AFM	A
e948ca2a-a167-4713-b28b-56ac1b655348	Beatrice	Gallo	Beatrice Gallo	student	active	2026-07-15 03:03:30.741+00	2026-07-21 09:59:12.049+00	beatrice.gallo.20494@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	342	SCHOOL_STUDENT	AFM	A
f3a2d85d-37cf-4b07-a3a6-fd962fc50f28	Elena	Bruno	Elena Bruno	student	active	2026-07-04 06:21:08.643+00	2026-07-21 09:59:12.049+00	elena.bruno.20495@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	403	SCHOOL_STUDENT	RIM	E
4a7ba88d-8b74-4fd4-bc3e-c5e4c49aa825	Leonardo	Russo	Leonardo Russo	student	active	2026-06-24 22:34:23.854+00	2026-07-21 09:59:12.049+00	leonardo.russo.20496@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	232	SCHOOL_STUDENT	LSA	E
0bc5071e-23f9-4afe-879c-32aa71c51282	Giulia	Costa	Giulia Costa	student	active	2026-06-30 13:56:09.778+00	2026-07-21 09:59:12.049+00	giulia.costa.20497@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	317	SCHOOL_STUDENT	AFM	B
1c9ed5c4-3574-453d-b3eb-07d05cde4458	Sofia	Conti	Sofia Conti	student	active	2026-07-13 07:20:40.073+00	2026-07-21 09:59:12.049+00	sofia.conti.20498@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	271	EXTERNAL_STUDENT	\N	\N
b02ea654-251c-4633-887a-a72f9fc02a53	Beatrice	Conti	Beatrice Conti	student	active	2026-07-06 02:38:59.722+00	2026-07-21 09:59:12.049+00	beatrice.conti.20499@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	316	SCHOOL_STUDENT	RIM	E
91651f30-503d-4c76-b40d-1462766fe6b6	Alessandro	Ferrari	Alessandro Ferrari	student	active	2026-07-19 05:03:03.292+00	2026-07-21 09:59:12.049+00	alessandro.ferrari.204910@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	424	SCHOOL_STUDENT	LSA	B
e077b785-a1fa-4c4f-916f-c2284479e9e2	Beatrice	Ricci	Beatrice Ricci	student	active	2026-07-04 21:29:26.299+00	2026-07-21 09:59:12.049+00	beatrice.ricci.204911@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	303	SCHOOL_STUDENT	MMC	A
f71e75df-ce1c-4b85-a55b-8c794a2225bb	Martina	Costa	Martina Costa	student	active	2026-07-17 04:39:38.066+00	2026-07-21 09:59:12.049+00	martina.costa.204912@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	268	SCHOOL_STUDENT	AFM	E
d825b61c-7d17-4731-890a-f9729d09c481	Francesco	Esposito	Francesco Esposito	student	active	2026-06-24 15:41:44.994+00	2026-07-21 09:59:12.049+00	francesco.esposito.204913@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	381	SCHOOL_STUDENT	CHI	C
bf08beee-f12e-4822-a5df-a847d73f8ac7	Elena	Romano	Elena Romano	student	active	2026-06-21 15:13:12.405+00	2026-07-21 09:59:12.049+00	elena.romano.204914@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	272	SCHOOL_STUDENT	LSA	D
79f5f845-9cd7-4e0d-aa08-9c0e97d291c7	Diana	Rossi	Diana Rossi	student	active	2026-07-05 13:22:18.54+00	2026-07-21 09:59:12.049+00	diana.rossi.204915@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	452	EXTERNAL_STUDENT	\N	\N
c31f1ca5-7401-46c4-b392-ddbfdd629107	Leonardo	Rossi	Leonardo Rossi	student	active	2026-07-18 22:44:17.128+00	2026-07-21 09:59:12.049+00	leonardo.rossi.204916@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	252	SCHOOL_STUDENT	MMC	A
d001d3dc-342c-4ac2-98e0-33ac1fea31aa	Elena	Rossi	Elena Rossi	student	active	2026-06-30 18:46:48.751+00	2026-07-21 09:59:12.049+00	elena.rossi.204917@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	161	EXTERNAL_STUDENT	\N	\N
8be0331e-95ff-498e-99e4-a17e9fc31c25	Diana	Gallo	Diana Gallo	student	active	2026-07-20 10:28:35.717+00	2026-07-21 09:59:12.049+00	diana.gallo.204918@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	473	SCHOOL_STUDENT	CHI	B
a1400dd0-9712-45d4-bb01-d70e01316691	Beatrice	Conti	Beatrice Conti	student	active	2026-07-09 02:01:10.635+00	2026-07-21 09:59:12.049+00	beatrice.conti.204919@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	240	SCHOOL_STUDENT	CHI	A
b91f6432-2066-48aa-b1df-91ddf61979e7	Alessandro	Costa	Alessandro Costa	student	active	2026-07-09 10:24:28.646+00	2026-07-21 09:59:12.049+00	alessandro.costa.204920@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	97	SCHOOL_STUDENT	MMC	A
21053734-d0d6-410c-a2ee-8010c89a0772	Martina	Costa	Martina Costa	student	active	2026-07-18 10:33:58.809+00	2026-07-21 09:59:12.049+00	martina.costa.204921@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	69	SCHOOL_STUDENT	LSA	A
863b903f-82b4-4ad6-9df0-2d32314e8d9f	Francesco	Gallo	Francesco Gallo	student	active	2026-06-27 04:02:38.88+00	2026-07-21 09:59:12.049+00	francesco.gallo.204922@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	57	SCHOOL_STUDENT	MMC	C
e2f3e367-a30e-4a2d-854f-9353042a17b2	Elena	Ricci	Elena Ricci	student	active	2026-07-17 21:48:24.996+00	2026-07-21 09:59:12.049+00	elena.ricci.204923@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	18	EXTERNAL_STUDENT	\N	\N
2c207e4c-9e2d-446d-a2f6-172e922403f4	Leonardo	Ferrari	Leonardo Ferrari	student	active	2026-07-06 14:23:18.665+00	2026-07-21 09:59:12.049+00	leonardo.ferrari.204924@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	426	SCHOOL_STUDENT	MMC	A
d6ea185b-f6b4-49fd-867b-030e6d0604c0	Martina	Russo	Martina Russo	student	active	2026-07-02 04:31:56.818+00	2026-07-21 09:59:12.426+00	martina.russo.24260@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	54	SCHOOL_STUDENT	LSA	C
ce482338-4851-4023-aa6b-296e5ebe00fc	Giulia	Costa	Giulia Costa	student	active	2026-06-23 08:36:55.991+00	2026-07-21 09:59:12.426+00	giulia.costa.24261@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	283	SCHOOL_STUDENT	RIM	C
a2aa8997-24da-4ed4-9bd2-a279fec090c5	Claudio	Bruno	Claudio Bruno	student	active	2026-07-18 14:50:00.509+00	2026-07-21 09:59:12.426+00	claudio.bruno.24262@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	428	SCHOOL_STUDENT	RIM	D
716765eb-af66-4eef-97a6-c7ae549fe07b	Leonardo	Bruno	Leonardo Bruno	student	active	2026-06-29 07:21:54.248+00	2026-07-21 09:59:12.426+00	leonardo.bruno.24263@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	155	SCHOOL_STUDENT	CHI	D
aa16d3a7-3d8c-41a9-ad9f-438172a623ec	Francesco	Romano	Francesco Romano	student	active	2026-06-23 04:03:43.136+00	2026-07-21 09:59:12.426+00	francesco.romano.24264@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	74	SCHOOL_STUDENT	INF	E
116986c5-ba67-4845-84d5-3d10dfaaaf3b	Alessandro	Gallo	Alessandro Gallo	student	active	2026-06-23 14:35:23.156+00	2026-07-21 09:59:12.426+00	alessandro.gallo.24265@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	361	SCHOOL_STUDENT	CHI	C
653b5518-8485-4168-bcae-2a26d97475e0	Beatrice	Conti	Beatrice Conti	student	active	2026-07-11 19:18:06.713+00	2026-07-21 09:59:12.426+00	beatrice.conti.24266@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	441	SCHOOL_STUDENT	MMC	B
1db25eda-361b-49de-a814-fbca7c85fd04	Francesco	Ferrari	Francesco Ferrari	student	active	2026-07-13 06:53:17.843+00	2026-07-21 09:59:12.426+00	francesco.ferrari.24267@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	295	SCHOOL_STUDENT	CHI	C
1f2754d2-38b7-400e-983f-8183a5d70034	Claudio	Costa	Claudio Costa	student	active	2026-07-11 17:05:00.546+00	2026-07-21 09:59:12.426+00	claudio.costa.24268@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	180	SCHOOL_STUDENT	LSA	A
40ebe309-365f-4571-bd79-adcc14cf9d05	Leonardo	Ricci	Leonardo Ricci	student	active	2026-07-12 21:05:11.509+00	2026-07-21 09:59:12.426+00	leonardo.ricci.24269@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	131	SCHOOL_STUDENT	MMC	A
951b3e8a-1a0f-4b02-b964-0b028558c458	Alessandro	Russo	Alessandro Russo	student	active	2026-07-11 01:44:46.839+00	2026-07-21 09:59:12.426+00	alessandro.russo.242610@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	295	EXTERNAL_STUDENT	\N	\N
14dd184b-4eb5-4343-ac28-dd4dd830d2b7	Beatrice	Costa	Beatrice Costa	student	active	2026-07-02 14:43:17.867+00	2026-07-21 09:59:12.426+00	beatrice.costa.242611@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	263	SCHOOL_STUDENT	RIM	D
605fba82-600f-40b8-85af-e768eaf9a2e9	Elena	Romano	Elena Romano	student	active	2026-07-03 02:46:48.613+00	2026-07-21 09:59:12.426+00	elena.romano.242612@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	42	SCHOOL_STUDENT	RIM	D
dacde977-be1b-4368-85ea-68249f886de8	Marco	Fontana	Marco Fontana	student	active	2026-06-23 09:16:52.631+00	2026-07-21 09:59:12.426+00	marco.fontana.242613@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	289	SCHOOL_STUDENT	INF	D
59b2e469-be34-4c56-95ed-3720dece2018	Leonardo	Ferrari	Leonardo Ferrari	student	active	2026-07-05 17:25:35.485+00	2026-07-21 09:59:12.426+00	leonardo.ferrari.242614@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	245	SCHOOL_STUDENT	MMC	B
444463df-bdf3-4b6e-91ba-199dc6c4cf7a	Elena	Romano	Elena Romano	student	active	2026-06-23 00:30:51.154+00	2026-07-21 09:59:12.426+00	elena.romano.242615@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	475	SCHOOL_STUDENT	AFM	C
d12a5041-273f-4257-b1b1-549d1b3cbb56	Martina	Ricci	Martina Ricci	student	active	2026-07-15 17:14:38.99+00	2026-07-21 09:59:12.426+00	martina.ricci.242616@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	175	SCHOOL_STUDENT	RIM	C
38c57b50-3858-4801-a792-40ee87100bf7	Beatrice	Costa	Beatrice Costa	student	active	2026-06-30 14:36:12.669+00	2026-07-21 09:59:12.426+00	beatrice.costa.242617@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	329	EXTERNAL_STUDENT	\N	\N
7a6f7a61-cf03-43ea-8f94-5d79ba9a1951	Leonardo	Conti	Leonardo Conti	student	active	2026-06-30 17:48:51.682+00	2026-07-21 09:59:12.426+00	leonardo.conti.242618@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	183	SCHOOL_STUDENT	AFM	E
dde0039d-46a0-4409-9bf3-c9e8e1efdb3b	Sofia	Ricci	Sofia Ricci	student	active	2026-06-24 16:00:08.684+00	2026-07-21 09:59:12.426+00	sofia.ricci.242619@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	103	SCHOOL_STUDENT	INF	E
f7b77c39-0d4c-4516-8e71-d3e426da1da9	Alessandro	Bianchi	Alessandro Bianchi	student	active	2026-06-23 06:46:29.072+00	2026-07-21 09:59:12.426+00	alessandro.bianchi.242620@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	319	SCHOOL_STUDENT	MMC	A
76eb6383-4817-4026-97f6-4fa00bdbcd4e	Riccardo	Ricci	Riccardo Ricci	student	active	2026-06-22 21:24:05.898+00	2026-07-21 09:59:12.426+00	riccardo.ricci.242621@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	115	EXTERNAL_STUDENT	\N	\N
3e791412-c973-4721-aa2d-27f8783a0cf7	Alessandro	Gallo	Alessandro Gallo	student	active	2026-07-07 00:00:11.765+00	2026-07-21 09:59:12.426+00	alessandro.gallo.242622@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	221	SCHOOL_STUDENT	CHI	B
2e107706-a7ec-4d9e-b7cf-5ac8a1996eb3	Francesco	Gallo	Francesco Gallo	student	active	2026-06-23 19:51:43.96+00	2026-07-21 09:59:12.426+00	francesco.gallo.242623@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	465	SCHOOL_STUDENT	CHI	B
19a34c3b-30b0-4450-9793-08c82a40bb28	Francesco	Gallo	Francesco Gallo	student	active	2026-07-02 16:22:13.78+00	2026-07-21 09:59:12.426+00	francesco.gallo.242624@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	476	EXTERNAL_STUDENT	\N	\N
db9d7a4a-f5e7-4758-a24b-0a93038df15d	Beatrice	Ferrari	Beatrice Ferrari	student	active	2026-07-14 14:24:27.01+00	2026-07-21 09:59:12.807+00	beatrice.ferrari.28070@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	444	SCHOOL_STUDENT	CHI	A
6c7ef871-6dd6-4bb0-8060-4bbde9c173cc	Leonardo	Ricci	Leonardo Ricci	student	active	2026-06-26 01:41:31.328+00	2026-07-21 09:59:12.807+00	leonardo.ricci.28071@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	187	SCHOOL_STUDENT	CHI	C
6865a4ab-e67a-4f8c-9e2a-cd954d4ebebc	Elena	Costa	Elena Costa	student	active	2026-07-12 03:33:18.808+00	2026-07-21 09:59:12.807+00	elena.costa.28072@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	269	EXTERNAL_STUDENT	\N	\N
dd697b4a-52ee-4771-b352-192780ea6ca5	Francesco	Russo	Francesco Russo	student	active	2026-07-06 08:04:47.281+00	2026-07-21 09:59:12.807+00	francesco.russo.28073@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	447	SCHOOL_STUDENT	AFM	E
a5a1f1cd-c9d4-49b7-88bb-8b052d54c81b	Diana	Rossi	Diana Rossi	student	active	2026-07-05 19:33:27.631+00	2026-07-21 09:59:12.807+00	diana.rossi.28074@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	415	SCHOOL_STUDENT	AFM	C
e829a31b-b645-4acb-91e2-eeb2513dff60	Francesco	Gallo	Francesco Gallo	student	active	2026-07-16 11:32:03.136+00	2026-07-21 09:59:12.807+00	francesco.gallo.28075@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	171	SCHOOL_STUDENT	INF	A
6329a6d7-153d-4a3c-a303-fb1ce8277374	Sofia	Conti	Sofia Conti	student	active	2026-06-28 07:58:00.801+00	2026-07-21 09:59:12.807+00	sofia.conti.28076@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	17	SCHOOL_STUDENT	INF	A
e9ef9401-edd7-47fa-98cc-3982f1c7fa44	Marco	Russo	Marco Russo	student	active	2026-07-08 04:04:42.692+00	2026-07-21 09:59:12.807+00	marco.russo.28077@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	337	SCHOOL_STUDENT	CHI	D
38b7a44d-d449-430e-89b1-40e0c952954c	Sofia	Ricci	Sofia Ricci	student	active	2026-07-20 18:42:41.015+00	2026-07-21 09:59:12.807+00	sofia.ricci.28078@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	335	EXTERNAL_STUDENT	\N	\N
926ac1ae-001b-490e-b951-483f21e79cc2	Beatrice	Russo	Beatrice Russo	student	active	2026-06-30 06:18:21.427+00	2026-07-21 09:59:12.807+00	beatrice.russo.28079@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	85	EXTERNAL_STUDENT	\N	\N
ad0662ee-4b55-42fd-b858-00bb3f5766fa	Claudio	Esposito	Claudio Esposito	student	active	2026-07-11 01:48:50.26+00	2026-07-21 09:59:12.807+00	claudio.esposito.280710@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	186	EXTERNAL_STUDENT	\N	\N
d3282d57-f12c-4f13-9093-ff4c8db8f89f	Diana	Ricci	Diana Ricci	student	active	2026-06-26 15:09:00.773+00	2026-07-21 09:59:12.807+00	diana.ricci.280711@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	411	EXTERNAL_STUDENT	\N	\N
216cc140-5c0e-4c4c-b638-b795bb61684a	Francesco	Bianchi	Francesco Bianchi	student	active	2026-06-30 05:33:23.911+00	2026-07-21 09:59:12.807+00	francesco.bianchi.280712@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	430	SCHOOL_STUDENT	RIM	D
51b5234f-67a8-465b-9526-f60090b51d32	Francesco	Ricci	Francesco Ricci	student	active	2026-07-07 16:14:23.335+00	2026-07-21 09:59:12.807+00	francesco.ricci.280714@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	350	SCHOOL_STUDENT	MMC	A
f419cfc5-d356-425c-a999-749d7ce14f8d	Marco	Esposito	Marco Esposito	student	active	2026-07-18 23:39:48.937+00	2026-07-21 09:59:12.807+00	marco.esposito.280715@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	423	SCHOOL_STUDENT	LSA	E
f052751d-c9f1-4505-be2a-0c67c87e979c	Marco	Fontana	Marco Fontana	student	active	2026-07-02 07:58:50.299+00	2026-07-21 09:59:12.807+00	marco.fontana.280716@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	469	SCHOOL_STUDENT	RIM	C
351c28d7-e3fb-437f-af56-3dc7c12483aa	Elena	Esposito	Elena Esposito	student	active	2026-06-29 09:01:44.969+00	2026-07-21 09:59:12.807+00	elena.esposito.280717@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	227	SCHOOL_STUDENT	CHI	D
355e9289-8464-45f5-8f72-664ce07e79cc	Riccardo	Russo	Riccardo Russo	student	active	2026-07-10 07:04:41.756+00	2026-07-21 09:59:12.807+00	riccardo.russo.280718@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	361	SCHOOL_STUDENT	CHI	B
98acbcdb-7576-4612-bef2-2e160c6858cb	Elena	Rossi	Elena Rossi	student	active	2026-07-19 07:47:00.085+00	2026-07-21 09:59:12.807+00	elena.rossi.280719@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	325	SCHOOL_STUDENT	RIM	D
536dd36d-0180-44d8-baed-d24fa982dc0a	Elena	Bruno	Elena Bruno	student	active	2026-06-28 12:10:58.774+00	2026-07-21 09:59:12.807+00	elena.bruno.280720@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	75	SCHOOL_STUDENT	MMC	A
9a6bd77e-ddc3-44f4-b4fb-7c8980c19de2	Francesco	Ferrari	Francesco Ferrari	student	active	2026-07-04 07:24:47.824+00	2026-07-21 09:59:12.807+00	francesco.ferrari.280721@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	298	SCHOOL_STUDENT	MMC	A
b3520c22-b761-4cbf-911c-591c85ec05c4	Elena	Gallo	Elena Gallo	student	active	2026-07-18 03:41:08.636+00	2026-07-21 09:59:12.807+00	elena.gallo.280722@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	279	SCHOOL_STUDENT	INF	D
6b97804b-3daa-4085-9320-e819d73a1013	Beatrice	Bianchi	Beatrice Bianchi	student	active	2026-07-09 11:34:45.494+00	2026-07-21 09:59:12.807+00	beatrice.bianchi.280723@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	162	SCHOOL_STUDENT	MMC	E
3c6dc1ec-23f9-47b7-bd26-93c48cc0950d	Claudio	Bianchi	Claudio Bianchi	student	active	2026-06-22 02:48:02.248+00	2026-07-21 09:59:12.807+00	claudio.bianchi.280724@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	172	SCHOOL_STUDENT	AFM	A
6c5e3103-842c-421e-82cb-982c9a6870a1	Riccardo	Fontana	Riccardo Fontana	student	active	2026-07-02 05:06:41.942+00	2026-07-21 09:59:13.174+00	riccardo.fontana.31740@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	419	SCHOOL_STUDENT	RIM	B
9972f640-d8bd-4675-89ea-f1e08f993600	Beatrice	Bruno	Beatrice Bruno	student	active	2026-07-01 03:05:42.645+00	2026-07-21 09:59:13.174+00	beatrice.bruno.31741@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	149	SCHOOL_STUDENT	MMC	E
82586405-0d26-42c1-9345-7dafac96fb95	Diana	Russo	Diana Russo	student	active	2026-07-16 17:20:04.12+00	2026-07-21 09:59:13.174+00	diana.russo.31742@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	407	EXTERNAL_STUDENT	\N	\N
fad5a884-c433-49d1-8910-55133c0cfdd7	Diana	Gallo	Diana Gallo	student	active	2026-07-07 21:12:16.89+00	2026-07-21 09:59:13.174+00	diana.gallo.31743@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	209	SCHOOL_STUDENT	RIM	C
396d06ab-5c2d-4dd2-90f3-6390338521ce	Leonardo	Rossi	Leonardo Rossi	student	active	2026-07-14 13:50:14.05+00	2026-07-21 09:59:13.174+00	leonardo.rossi.31744@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	318	SCHOOL_STUDENT	AFM	E
088ce537-6fe5-4953-b4b2-89a9b8019a87	Francesco	Conti	Francesco Conti	student	active	2026-07-12 13:09:35.631+00	2026-07-21 09:59:13.174+00	francesco.conti.31745@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	157	SCHOOL_STUDENT	RIM	B
c51c8467-e7c7-48c5-9818-491241fd56e4	Alessandro	Gallo	Alessandro Gallo	student	active	2026-07-07 10:52:18+00	2026-07-21 09:59:13.174+00	alessandro.gallo.31746@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	267	SCHOOL_STUDENT	MMC	D
856e1aa3-a540-42b1-a630-7fc43b6a14dd	Diana	Esposito	Diana Esposito	student	active	2026-07-11 02:03:00.034+00	2026-07-21 09:59:13.174+00	diana.esposito.31747@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	362	SCHOOL_STUDENT	RIM	B
9c7cb300-a205-421f-8acd-577da4316e97	Francesco	Bruno	Francesco Bruno	student	active	2026-06-27 22:29:48.319+00	2026-07-21 09:59:13.174+00	francesco.bruno.31748@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	193	EXTERNAL_STUDENT	\N	\N
2ed3871e-ad40-4986-86b8-8c2182f1cd38	Martina	Ferrari	Martina Ferrari	student	active	2026-07-01 02:15:50.07+00	2026-07-21 09:59:13.174+00	martina.ferrari.31749@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	254	SCHOOL_STUDENT	INF	C
fd169c33-cd8b-4a0d-98bf-71c89183caa2	Sofia	Russo	Sofia Russo	student	active	2026-07-18 01:22:09.383+00	2026-07-21 09:59:13.174+00	sofia.russo.317410@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	416	SCHOOL_STUDENT	LSA	A
14738291-039b-45c0-aa4d-7bb84c52ba83	Francesco	Esposito	Francesco Esposito	student	active	2026-07-04 04:45:21.448+00	2026-07-21 09:59:13.174+00	francesco.esposito.317411@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	414	EXTERNAL_STUDENT	\N	\N
1a586b04-b4d0-4d04-a609-add62c61c6a1	Beatrice	Romano	Beatrice Romano	student	active	2026-07-03 17:06:40.154+00	2026-07-21 09:59:13.174+00	beatrice.romano.317412@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	161	SCHOOL_STUDENT	LSA	B
0f925aec-48ff-4ac0-8ead-453877b803e8	Riccardo	Romano	Riccardo Romano	student	active	2026-07-08 23:06:18.921+00	2026-07-21 09:59:13.174+00	riccardo.romano.317413@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	86	SCHOOL_STUDENT	AFM	A
7efbf899-2bea-431c-8295-55abb970f7b1	Giulia	Ferrari	Giulia Ferrari	student	active	2026-07-16 22:30:05.071+00	2026-07-21 09:59:13.174+00	giulia.ferrari.317414@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	319	SCHOOL_STUDENT	INF	A
d8104ca9-dc1b-452f-8882-08280fe5dad4	Alessandro	Gallo	Alessandro Gallo	student	active	2026-06-23 07:05:14.62+00	2026-07-21 09:59:13.174+00	alessandro.gallo.317415@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	132	SCHOOL_STUDENT	AFM	A
4349a895-f0b5-47a9-b4b2-f212837d23b9	Diana	Esposito	Diana Esposito	student	active	2026-07-11 22:57:15.52+00	2026-07-21 09:59:13.174+00	diana.esposito.317416@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	145	EXTERNAL_STUDENT	\N	\N
5f6258ac-7089-45b5-b1e4-638178418d4c	Elena	Conti	Elena Conti	student	active	2026-07-09 11:54:48.932+00	2026-07-21 09:59:13.174+00	elena.conti.317417@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	137	SCHOOL_STUDENT	LSA	B
b1f7eaf7-864f-428b-a271-556fb79103eb	Beatrice	Ricci	Beatrice Ricci	student	active	2026-07-15 10:03:57.203+00	2026-07-21 09:59:13.174+00	beatrice.ricci.317418@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	289	SCHOOL_STUDENT	CHI	C
110ce348-0c00-49eb-8aad-d368db2acec8	Claudio	Ricci	Claudio Ricci	student	active	2026-07-18 02:40:57.414+00	2026-07-21 09:59:13.174+00	claudio.ricci.317419@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	454	SCHOOL_STUDENT	INF	B
df869064-0813-445b-a81c-a7646f13b67a	Giulia	Esposito	Giulia Esposito	student	active	2026-07-03 15:19:26.614+00	2026-07-21 09:59:13.175+00	giulia.esposito.317520@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	31	SCHOOL_STUDENT	LSA	D
aa21a03a-8987-40f6-865f-60290d066887	Elena	Costa	Elena Costa	student	active	2026-07-13 06:49:05.172+00	2026-07-21 09:59:13.175+00	elena.costa.317521@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	373	SCHOOL_STUDENT	AFM	A
2f3c234b-859a-4608-8611-95e24cee4bcc	Giulia	Bruno	Giulia Bruno	student	active	2026-07-03 15:11:29.066+00	2026-07-21 09:59:13.175+00	giulia.bruno.317522@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	344	SCHOOL_STUDENT	CHI	D
be82a5f2-d4c8-4796-9a1a-de52109c4e81	Giulia	Bianchi	Giulia Bianchi	student	active	2026-07-18 01:00:17.788+00	2026-07-21 09:59:13.175+00	giulia.bianchi.317523@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	455	EXTERNAL_STUDENT	\N	\N
18f2ee76-85c0-47d2-957c-8984de6ed7bd	Diana	Conti	Diana Conti	student	active	2026-07-01 11:45:26.653+00	2026-07-21 09:59:13.175+00	diana.conti.317524@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	61	EXTERNAL_STUDENT	\N	\N
e1170f55-acc0-428d-8c58-86230d366687	Francesco	Conti	Francesco Conti	student	active	2026-07-20 20:49:02.281+00	2026-07-21 14:53:25.826+00	francesco.conti.280713@gcprof-test.com	$2a$12$gawqtXsKhlnJDqGldNAJYuyWKXHv8UWkwHElKKF8tG8lB1cyHUDTa	\N	135	EXTERNAL_STUDENT	\N	\N
3da0e5b9-ff82-4850-b194-9b3c6034536b	PEPPE	INTERNO	PEPPE INTERNO	student	active	2026-07-21 19:55:56.012758+00	2026-07-21 20:59:26.509+00	carnabuci.giuseppe@ismonnet.eu	$2b$10$pumU8bkEWrGeKAn4/PcpE.iPj.TzyTD45RfxmSf6OTpoC5RO7im4u	\N	0	SCHOOL_STUDENT	INF	A
ccc07580-f37b-42e3-93e8-9680099fbebe	PEPPE	ESTERNO	PEPPE ESTERNO	student	active	2026-07-21 20:09:49.898815+00	2026-07-22 14:47:04.917+00	giuscar74@gmail.com	$2b$10$hRtcYRy/gUyerppvJFkdqe4BGTJeylvaPQ3vTgTMzB1vscB7m70My	\N	2	EXTERNAL_STUDENT	\N	\N
08be3132-7d36-46c3-9d31-2b1fd0b48d83	Giuseppe	Carnabuci	Prof. Carnabuci	admin	active	2026-07-02 15:39:26.487928+00	2026-07-22 18:36:18.028+00	admin@gcprof-academy.com	$2b$10$GAhB.B3Ht67g1kNu9e939OpnNh6gUMJ1apWvFYHJMXOy55fj4Px8q	https://vaokzyznazkcqjpbbkgr.supabase.co/storage/v1/object/public/avatars/uploads/08be3132-7d36-46c3-9d31-2b1fd0b48d83-1783066842958.png	7	ADMIN	\N	\N
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."orders" ("id", "order_number", "profile_id", "status", "subtotal", "discount", "tax", "total", "currency", "payment_provider", "payment_provider_order_id", "coupon_id", "metadata", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: coupon_redemptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."coupon_redemptions" ("id", "coupon_id", "profile_id", "order_id", "redeemed_at") FROM stdin;
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
c3650390-9c69-4d31-b3b0-08dc88e2bd1f	Quiz	quiz	2026-07-18 14:23:47.121626+00
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."courses" ("id", "slug", "title", "description", "created_at", "updated_at", "category", "difficulty", "teacher", "estimated_hours", "cover_image", "published", "allowed_classes", "price", "currency", "is_paid", "stripe_product_id", "stripe_price_id") FROM stdin;
6a5c3c32-2d8e-44b3-9940-62a508b44fa9	web-programming-1	Web Programming 1°	Corso introduttivo alla programmazione web con HTML, CSS e JavaScript per creare siti web moderni e interattivi.	2026-07-18 14:14:01.147446+00	2026-07-20 12:32:39.153454+00	Programmazione	Facile	Prof. G. Carnabuci	50	/courses/gcprof-ai-academy_logo_01.png	t	{}	0.00	EUR	f	\N	\N
755949a6-6f22-4608-a071-9b01a0aa8a2b	problem-solving-1	Problem Solving 1°	Corso introduttivo al Problem Solving per sviluppare il pensiero logico e affrontare problemi con metodo ed efficacia.	2026-07-18 16:45:58.122278+00	2026-07-20 12:47:01.465211+00	Informatica	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
a51c9e3e-4dbf-4a21-bcc0-1e2d1a95d21f	blockchain-1	Blockchain 1°	Corso introduttivo alla Blockchain per comprenderne principi, funzionamento, applicazioni e tecnologie principali.	2026-07-18 17:05:33.965721+00	2026-07-20 15:55:53.339536+00	Blockchain	Intermedio	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
326e1451-18ff-4745-89dd-4cbc574752f0	ai-1	AI 1°	Corso base di Intelligenza Artificiale per comprendere tecnologie, applicazioni e potenzialità dell'IA moderna	2026-07-18 17:04:11.922764+00	2026-07-20 15:56:16.382177+00	AI	Intermedio	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
996bde3b-c8d1-4ec3-941e-e9317980a5f0	oop-1	OOP 1°	Corso introduttivo alla programmazione orientata agli oggetti (OOP): classi, oggetti, ereditarietà e principi fondamentali.	2026-07-18 16:43:14.332862+00	2026-07-22 10:35:10.083519+00	Programmazione	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
a978285b-b408-4e16-85a2-97503741ab99	database-1	Database 1°	Corso introduttivo sui Database: struttura, gestione dei dati, tabelle, relazioni e principali linguaggi di interrogazione.	2026-07-18 16:49:59.856405+00	2026-07-22 10:39:07.866551+00	Informatica	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
8ba792dc-39a6-4ca8-a3b7-96385a8259a0	finance-1	Finance 1°	Corso introduttivo di Educazione Finanziaria per comprendere risparmio, gestione del denaro, investimenti e scelte consapevoli.	2026-07-18 16:54:35.80799+00	2026-07-22 10:41:08.165624+00	Finance	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
3ad21296-0fd0-4fae-beca-65bc2ed7cad0	informatica-2	Informatica 2°	Corso di Informatica per le classi SECONDE	2026-07-18 14:10:41.049177+00	2026-07-18 14:52:55.124414+00	Informatica	Facile	Prof. G. Carnabuci	50	/courses/gcprof-ai-academy_logo_info_02.png	t	{}	0.00	EUR	f	\N	\N
e5efed14-cf07-4530-916a-1a1d3f43822a	informatica-1	Informatica 1°	Corso di Informatica per le classi PRIME	2026-07-18 13:14:04.278671+00	2026-07-18 14:53:34.92378+00	Informatica	Facile	Prof. G. Carnabuci	50	/courses/gcprof-ai-academy_logo_info_01.png	t	{}	0.00	EUR	f	\N	\N
08532251-557e-4194-82d6-6af2ed6874c2	informatica-3	Informatica 3°	Corso di Informatica per le classi TERZE	2026-07-18 14:54:35.308326+00	2026-07-18 14:54:35.308326+00	Informatica	Intermedio	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
eb25ef9d-33c6-4d06-8f80-4bd91414f10a	informatica-4	Informatica 4°	Corso di Informatica per le classi QUARTE	2026-07-18 14:55:06.003735+00	2026-07-18 14:55:06.003735+00	Informatica	Avanzato	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
92150e94-b8fc-46a0-8f60-f8bf05d30f39	informatica-5	Informatica 5°	Corso di Informatica per le classi QUINTE	2026-07-18 14:55:28.883002+00	2026-07-18 14:55:28.883002+00	Informatica	Avanzato	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
92903de9-0cae-4077-ae07-c6e962ba5c02	quiz-1	QUIZ 1°	Modulo quiz per le classi PRIME	2026-07-18 16:27:29.49672+00	2026-07-18 16:27:29.49672+00	Quiz	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
4b50b95b-df75-4145-8ed0-9eb56c4af59f	quiz-2	QUIZ 2°	Modulo quiz per le classi SECONDE	2026-07-18 16:29:46.705001+00	2026-07-18 16:29:46.705001+00	Quiz	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
c373ac19-8fdd-4e21-81cc-6f39561baf1f	quiz-3	QUIZ 3°	Modulo quiz per le classi TERZE	2026-07-18 16:30:14.642317+00	2026-07-18 16:30:14.642317+00	Quiz	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
9a994b87-2319-4f58-a117-e3fab27f7f79	quiz-4	QUIZ 4°	Modulo quiz per le classi QUARTE	2026-07-18 16:30:40.72482+00	2026-07-18 16:30:40.72482+00	Quiz	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	quiz-5	QUIZ 5°	Modulo quiz per le classi QUINTE	2026-07-18 16:30:57.496041+00	2026-07-18 16:30:57.496041+00	Quiz	Facile	Prof. G. Carnabuci	50	\N	t	{}	0.00	EUR	f	\N	\N
dfec57c5-eb5a-4acb-94a6-a3d6e2075083	python-1	Python 1°	Corso introduttivo a Python per imparare sintassi, variabili, strutture di controllo, funzioni e programmazione di base.	2026-07-18 14:00:59.979987+00	2026-07-19 12:58:32.391338+00	Programmazione	Facile	Prof. G. Carnabuci	50	/courses/gcprof-ai-academy_logo_01.png	t	{}	0.00	EUR	f	\N	\N
\.


--
-- Data for Name: course_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_classes" ("course_id", "class_id", "assigned_at") FROM stdin;
e5efed14-cf07-4530-916a-1a1d3f43822a	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-18 13:45:33.720861+00
dfec57c5-eb5a-4acb-94a6-a3d6e2075083	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-18 14:01:10.754657+00
dfec57c5-eb5a-4acb-94a6-a3d6e2075083	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-18 14:11:02.822589+00
3ad21296-0fd0-4fae-beca-65bc2ed7cad0	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-18 14:11:09.169561+00
6a5c3c32-2d8e-44b3-9940-62a508b44fa9	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-18 14:14:11.613238+00
08532251-557e-4194-82d6-6af2ed6874c2	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-18 14:55:42.279215+00
eb25ef9d-33c6-4d06-8f80-4bd91414f10a	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-18 14:55:47.805829+00
92150e94-b8fc-46a0-8f60-f8bf05d30f39	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-18 14:55:53.610701+00
92903de9-0cae-4077-ae07-c6e962ba5c02	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-18 16:31:08.003662+00
4b50b95b-df75-4145-8ed0-9eb56c4af59f	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-18 16:31:18.501656+00
c373ac19-8fdd-4e21-81cc-6f39561baf1f	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-18 16:31:24.296374+00
9a994b87-2319-4f58-a117-e3fab27f7f79	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-18 16:31:29.452866+00
f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-18 16:31:38.363805+00
996bde3b-c8d1-4ec3-941e-e9317980a5f0	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-18 16:43:30.593576+00
755949a6-6f22-4608-a071-9b01a0aa8a2b	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-18 16:47:38.47786+00
755949a6-6f22-4608-a071-9b01a0aa8a2b	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-18 16:47:45.942015+00
755949a6-6f22-4608-a071-9b01a0aa8a2b	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-18 16:47:51.795117+00
755949a6-6f22-4608-a071-9b01a0aa8a2b	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-18 16:47:57.902455+00
755949a6-6f22-4608-a071-9b01a0aa8a2b	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-18 16:48:04.74784+00
a978285b-b408-4e16-85a2-97503741ab99	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-18 16:50:11.766432+00
\.


--
-- Data for Name: course_modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_modules" ("id", "course_id", "title", "order_index", "created_at", "is_preview") FROM stdin;
b972b733-03cd-4cc3-ae67-2fe4f33af4b5	e5efed14-cf07-4530-916a-1a1d3f43822a	VIDEO	2	2026-07-18 13:47:15.151368+00	f
844a247f-dacd-48c5-960b-ccfa70cf0026	e5efed14-cf07-4530-916a-1a1d3f43822a	DIDATTICA	1	2026-07-18 13:14:28.810219+00	f
b99800bd-ee0d-42ed-956f-59694058ff47	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	DIDATTICA	1	2026-07-18 14:11:17.985668+00	f
70991b5c-ece6-489d-a163-3409b33a0fce	08532251-557e-4194-82d6-6af2ed6874c2	DIDATTICA	1	2026-07-18 14:56:11.072397+00	f
53c77913-d762-4f7d-993d-78a42ceb995e	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	DIDATTICA	1	2026-07-18 14:56:26.543451+00	f
9401ac91-40c8-4326-a164-772a93666695	92150e94-b8fc-46a0-8f60-f8bf05d30f39	DIDATTICA	1	2026-07-18 14:56:36.891165+00	f
d4c96bb2-e80b-4ead-a569-86e791beb3ba	755949a6-6f22-4608-a071-9b01a0aa8a2b	DIDATTICA	2	2026-07-18 16:46:12.65734+00	f
1bab9807-78a9-4bb1-9d02-52eb993ab831	755949a6-6f22-4608-a071-9b01a0aa8a2b	Problem Solving Preview	1	2026-07-21 20:54:24.191954+00	t
735b2e36-50fe-41d3-ab9a-601d0dcd0563	a51c9e3e-4dbf-4a21-bcc0-1e2d1a95d21f	Blockchain Course Preview	1	2026-07-21 21:24:54.894805+00	t
008fd2cd-3ac8-4379-babb-e326e99c8172	a51c9e3e-4dbf-4a21-bcc0-1e2d1a95d21f	DIDATTICA	2	2026-07-18 17:05:42.474315+00	f
b4cfe8e8-8b9f-4c64-9f9f-76af9ae87906	a51c9e3e-4dbf-4a21-bcc0-1e2d1a95d21f	VIDEO	3	2026-07-18 17:05:48.829297+00	f
104629f4-f5d7-49f9-ab40-275864593f05	326e1451-18ff-4745-89dd-4cbc574752f0	AI Course Preview	1	2026-07-22 07:39:20.096613+00	t
82a15093-20d7-4cbb-892b-a1920485d756	326e1451-18ff-4745-89dd-4cbc574752f0	DIDATTICA	2	2026-07-18 17:04:22.55167+00	f
54ae0b18-3208-4d83-ae20-42225401a73b	326e1451-18ff-4745-89dd-4cbc574752f0	VIDEO	3	2026-07-18 17:04:30.394566+00	f
ed4ce04e-1a39-44c6-857e-1baeeef10461	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	DIDATTICA	2	2026-07-18 14:14:26.567268+00	f
0340d4c9-cc6d-4149-9736-608a6f7001c1	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	VIDEO	3	2026-07-18 14:15:51.051387+00	f
d73ff3cc-9b4c-47f0-a001-4984e3a2f1b7	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	Web Programming Course Preview	1	2026-07-22 07:42:28.100897+00	t
e6718169-84f6-4f62-9d4c-44cd7ca954f2	8ba792dc-39a6-4ca8-a3b7-96385a8259a0	Finance Course Preview	1	2026-07-22 07:39:38.495072+00	t
ef22d24e-02df-4587-a56d-db1917a8d0e3	8ba792dc-39a6-4ca8-a3b7-96385a8259a0	DIDATTICA	2	2026-07-18 16:55:04.983802+00	f
c5ede590-c3ff-46fd-9290-823c7eb9b20f	8ba792dc-39a6-4ca8-a3b7-96385a8259a0	VIDEO	3	2026-07-18 16:57:21.037906+00	f
15940690-567a-4a47-a43d-dcd8ea90379b	a978285b-b408-4e16-85a2-97503741ab99	DIDATTICA	2	2026-07-18 16:50:24.377301+00	f
57524f96-6aa9-4d90-8bec-4a5fc4ca73e7	a978285b-b408-4e16-85a2-97503741ab99	Database Course Preview	1	2026-07-22 07:39:56.008146+00	t
22ff1322-2316-4cba-9626-668c84ec1d59	a978285b-b408-4e16-85a2-97503741ab99	VIDEO	3	2026-07-18 16:51:36.958465+00	f
7b9a496a-069d-47a3-a9d7-7aabf6547cba	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	Python Course Preview	1	2026-07-22 07:42:55.210664+00	t
44648729-fb08-472a-91d4-d2b6dae29738	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	DIDATTICA	2	2026-07-18 14:02:39.390023+00	f
02f6cd13-c3d2-4556-b85b-6993ffac4eae	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	VIDEO	3	2026-07-18 14:02:54.945869+00	f
289b267f-fc51-496b-b682-68ee74a5f990	996bde3b-c8d1-4ec3-941e-e9317980a5f0	DIDATTICA	2	2026-07-18 16:43:41.1622+00	f
25cc123e-37ab-4a09-9354-e4723812817b	996bde3b-c8d1-4ec3-941e-e9317980a5f0	OOP Course Preview	1	2026-07-22 07:40:19.409793+00	t
\.


--
-- Data for Name: course_lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_lessons" ("id", "module_id", "title", "slug", "video_url", "content", "order_index", "created_at", "content_type", "duration", "external_url") FROM stdin;
ace8663d-42c4-46cb-86fd-64221ff7eb6b	844a247f-dacd-48c5-960b-ccfa70cf0026	GUIDA LSA	guida-lsa	\N		1	2026-07-18 13:14:54.277555+00	document	15	https://docs.google.com/document/d/1C6E-r8kusgvMhoRriN78nJ6E6K0rTCGJrLa734vGAvY/edit?usp=sharing
e141188a-5200-4e4a-bda9-e71e1abfb944	844a247f-dacd-48c5-960b-ccfa70cf0026	Tutorial Google Sheets	tutorial-google-sheets	\N		2	2026-07-18 13:54:52.456947+00	document	15	https://drive.google.com/file/d/13SvpQZ-E-motvCdUr42APKTzyhqCpEdG/view?usp=drive_link
a56b3a81-682f-45f2-9cbe-251223df3c1b	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 2: Sintassi e formule aritmetiche in Google Sheets	google-fogli-tutorial-2-sintassi-e-formule-aritmetiche-in-google-sheets	https://youtu.be/hTpOAIHYvvc?si=sBI7sKTcGEV0AlkA		2	2026-07-18 13:56:24.261357+00	video	15	https://youtu.be/hTpOAIHYvvc?si=sBI7sKTcGEV0AlkA
ad9b1c5b-8fde-407b-a3ae-6eca44ebee7c	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 3: Selezionare e gestire gli intervalli in Google Sheets	google-fogli-tutorial-3-selezionare-e-gestire-gli-intervalli-in-google-sheets	https://youtu.be/iUeB2vHHJL4?si=9zGL0R0Mf8JJ_GUW		3	2026-07-18 13:56:44.407737+00	video	15	https://youtu.be/iUeB2vHHJL4?si=9zGL0R0Mf8JJ_GUW
07644636-e422-4653-a3d9-71617d2c4573	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 4: Riempimento automatico di celle in Google Sheets	google-fogli-tutorial-4-riempimento-automatico-di-celle-in-google-sheets	https://youtu.be/0wz0DeQcxQM?si=TETaLD5ca0MkwgNn		4	2026-07-18 13:57:05.154568+00	video	15	https://youtu.be/0wz0DeQcxQM?si=TETaLD5ca0MkwgNn
10af0217-f01c-4e14-871f-42ad58ed089c	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 1: Le basi di Google Sheets e differenze da Excel	google-fogli-tutorial-1-le-basi-di-google-sheets-e-differenze-da-excel	https://youtu.be/DVi2dTn6nTc?si=CMTvhHQKdjfADRN4		1	2026-07-18 13:47:40.852251+00	video	15	https://youtu.be/DVi2dTn6nTc?si=CMTvhHQKdjfADRN4
d8fae2a6-5ddc-42d1-8993-9723db1b094b	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 5: Impara le operazioni essenziali su celle	google-fogli-tutorial-5-impara-le-operazioni-essenziali-su-celle	https://youtu.be/ezTOWqMXLwM?si=_wq2KzD6CoyHR9s8		5	2026-07-18 13:57:23.351975+00	video	15	https://youtu.be/ezTOWqMXLwM?si=_wq2KzD6CoyHR9s8
31b32ce3-204a-4bc0-8956-3bc42d39325d	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 6: Gestire righe e colonne in fogli di calcolo Google	google-fogli-tutorial-6-gestire-righe-e-colonne-in-fogli-di-calcolo-google	https://youtu.be/jvWrzG1GKYQ?si=AeSRj-N2Q9TvbPbA		6	2026-07-18 13:57:41.369633+00	video	15	https://youtu.be/jvWrzG1GKYQ?si=AeSRj-N2Q9TvbPbA
169fd281-11c2-4643-83d0-e77756a317a1	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 7: Riferimenti relativi e riferimenti assoluti e misti	google-fogli-tutorial-7-riferimenti-relativi-e-riferimenti-assoluti-e-misti	https://youtu.be/C0kD4hlfVIk?si=Yp11pyNeyvg68-Ib		7	2026-07-18 13:58:01.401778+00	video	15	https://youtu.be/C0kD4hlfVIk?si=Yp11pyNeyvg68-Ib
8682ed9c-4786-4014-9087-0d5bae19432e	b972b733-03cd-4cc3-ae67-2fe4f33af4b5	GOOGLE FOGLI tutorial 10: Formattazione condizionale in Google Sheets	google-fogli-tutorial-10-formattazione-condizionale-in-google-sheets	https://youtu.be/aQwkRn6WNGM?si=F4JfYU7Noi2MWHSX		8	2026-07-18 13:58:41.874313+00	video	15	https://youtu.be/aQwkRn6WNGM?si=F4JfYU7Noi2MWHSX
2a6b555f-1145-4aee-90aa-700c5219e954	44648729-fb08-472a-91d4-d2b6dae29738	Python Tutorial - Vol 01	python-tutorial---vol-01	\N		1	2026-07-18 14:03:50.537865+00	document	15	https://drive.google.com/file/d/13rao1DpUT6Lm6lDIHLen2nZIKmJfDmBG/view?usp=sharing
b89e4f04-fea6-40d6-9b69-9e914c8ffe61	44648729-fb08-472a-91d4-d2b6dae29738	Python Tutorial - Vol 02	python-tutorial---vol-02	\N		2	2026-07-18 14:04:20.276149+00	document	15	https://drive.google.com/file/d/138vE3tODVjD-hohECapG5b3Hay2Rz0n1/view?usp=drive_link
e4611b5f-5d29-4e51-9300-dfc8691424cb	44648729-fb08-472a-91d4-d2b6dae29738	Python Tutorial - Vol 03	python-tutorial---vol-03	\N		3	2026-07-18 14:04:56.703027+00	document	15	https://drive.google.com/file/d/13wJ5aId6UDW9pOP6iqPidXmL7-qS8Uo8/view?usp=drive_link
c90298a1-4d89-42c0-a1a2-d653a71b9ab2	02f6cd13-c3d2-4556-b85b-6993ffac4eae	01. INTRO E INSTALLAZIONE	01-intro-e-installazione	https://youtu.be/J3M4ZAVD9y8?si=YF0KDkiN6U28_la2		1	2026-07-18 14:05:49.193678+00	video	15	https://youtu.be/J3M4ZAVD9y8?si=YF0KDkiN6U28_la2
3124d29a-b5b4-454c-899c-cb7644eab7b9	02f6cd13-c3d2-4556-b85b-6993ffac4eae	02. VALORI E OPERATORI	02-valori-e-operatori	https://youtu.be/HVvaiMVyAi0?si=FOeUGgXeN4cLwxt5		2	2026-07-18 14:06:08.368932+00	video	15	https://youtu.be/HVvaiMVyAi0?si=FOeUGgXeN4cLwxt5
39af3460-f929-45a0-99d1-ff34e2d86fae	02f6cd13-c3d2-4556-b85b-6993ffac4eae	03. VARIABILI E STRINGHE	03-variabili-e-stringhe	https://youtu.be/eNZRzJQXZ0o?si=h4BmFHyTmGKzMtEa		3	2026-07-18 14:06:33.423523+00	video	15	https://youtu.be/eNZRzJQXZ0o?si=h4BmFHyTmGKzMtEa
4c83cc99-279d-4b72-a6e6-a2a2fd56ad4a	02f6cd13-c3d2-4556-b85b-6993ffac4eae	04. CONVERSIONI DI TIPO, PRINT E INPUT	04-conversioni-di-tipo-print-e-input	https://youtu.be/aiElE8gxw-k?si=w20JK351xqc_tH__		4	2026-07-18 14:06:51.228969+00	video	15	https://youtu.be/aiElE8gxw-k?si=w20JK351xqc_tH__
7b21b5a2-1ed3-473e-b5e1-7431deba5ffd	02f6cd13-c3d2-4556-b85b-6993ffac4eae	05. CONTROLLO DEL FLUSSO	05-controllo-del-flusso	https://youtu.be/B7fnoGiJMx0?si=NKa1jxr7T1YIdK3n		5	2026-07-18 14:07:10.361695+00	video	15	https://youtu.be/B7fnoGiJMx0?si=NKa1jxr7T1YIdK3n
c2b9df9a-d629-497a-aefa-fa590fd258ec	02f6cd13-c3d2-4556-b85b-6993ffac4eae	06. ISTRUZIONI IF, ELIF, ELSE	06-istruzioni-if-elif-else	https://youtu.be/RKMpg42a1g8?si=EzWTtS8BgZ8HqUw8		6	2026-07-18 14:07:27.354268+00	video	15	https://youtu.be/RKMpg42a1g8?si=EzWTtS8BgZ8HqUw8
b0607711-cbb2-4c3a-9d85-cc87f1fc8321	02f6cd13-c3d2-4556-b85b-6993ffac4eae	07. IL CICLO WHILE	07-il-ciclo-while	https://youtu.be/zAkjbLzii1s?si=UHnxQlY_zJgKn6Me		7	2026-07-18 14:07:46.241466+00	video	15	https://youtu.be/zAkjbLzii1s?si=UHnxQlY_zJgKn6Me
310141e6-e101-48ac-bd54-f340903f2f36	02f6cd13-c3d2-4556-b85b-6993ffac4eae	08. IL CICLO FOR	08-il-ciclo-for	https://youtu.be/pAty-2vxcJw?si=rp0NQKzYFQNn9RKX		8	2026-07-18 14:08:04.116304+00	video	15	https://youtu.be/pAty-2vxcJw?si=rp0NQKzYFQNn9RKX
a0705fa7-44bb-4ef7-979a-601307c8cd4a	02f6cd13-c3d2-4556-b85b-6993ffac4eae	09. LA STANDARD LIBRARY	09-la-standard-library	https://youtu.be/Ch17R9xnrKg?si=FZpVPKTqkc87B4sY		9	2026-07-18 14:08:21.026324+00	video	15	https://youtu.be/Ch17R9xnrKg?si=FZpVPKTqkc87B4sY
62486acd-1a40-48b4-ba4a-359f930831d3	02f6cd13-c3d2-4556-b85b-6993ffac4eae	11. LE FUNZIONI	11-le-funzioni	https://youtu.be/aDvv-ohp1D4?si=4YQy_KIjfkrCTYPV		10	2026-07-18 14:09:35.033218+00	video	15	https://youtu.be/aDvv-ohp1D4?si=4YQy_KIjfkrCTYPV
82005a0d-227a-4804-8dd4-1db3177bc56d	b99800bd-ee0d-42ed-956f-59694058ff47	GUIDA LSA	guida-lsa	\N		1	2026-07-18 14:11:41.599716+00	document	15	https://docs.google.com/document/d/1Usu1lT423ayJKMJBFBIPgi_6bO4TJC5S_Vc6ekd6Jqs/edit?usp=sharing
091a072a-3a86-4a66-b705-ea3816645df5	ed4ce04e-1a39-44c6-857e-1baeeef10461	HTML	html	\N		1	2026-07-18 14:15:16.475316+00	document	15	https://drive.google.com/file/d/15aRqrNkwHisoY1yVjADy4uc2OSEdboVP/view?usp=sharing
08f802f9-a080-4ca8-b820-6e08b19364bc	ed4ce04e-1a39-44c6-857e-1baeeef10461	CSS	css	\N		2	2026-07-18 14:15:43.709685+00	document	15	https://drive.google.com/file/d/16FU0uYDMsl3i7DH7XhAtlw308dPC4aUc/view?usp=sharing
7cd20878-125b-4250-a14e-7099fec3cc6b	0340d4c9-cc6d-4149-9736-608a6f7001c1	TUTORIAL RAPIDO HTML E CSS ITA	tutorial-rapido-html-e-css-ita	https://youtu.be/TxcJ2drr554?si=g2qc3pPTVNfuNx9d		1	2026-07-18 14:18:06.68962+00	video	15	https://youtu.be/TxcJ2drr554?si=g2qc3pPTVNfuNx9d
17ebf24d-54b4-4385-9a04-e82e9472fe02	0340d4c9-cc6d-4149-9736-608a6f7001c1	HTML5 Tutorial Italiano 01 - Come funziona html e installazione editor	html5-tutorial-italiano-01---come-funziona-html-e-installazione-editor	https://youtu.be/1C-ZbhVZ3sI?si=Q3tX0pcTVDbkyDxZ		2	2026-07-18 14:18:45.029877+00	video	15	https://youtu.be/1C-ZbhVZ3sI?si=Q3tX0pcTVDbkyDxZ
be0681bf-2605-4678-9513-2f3d1381bc19	0340d4c9-cc6d-4149-9736-608a6f7001c1	HTML5 Tutorial Italiano 02 - Sintassi di base: elementi, attributi, documento	html5-tutorial-italiano-02---sintassi-di-base-elementi-attributi-documento	https://youtu.be/YwyjQKpW2GM?si=I0NTOB4PNaZdAuNn		3	2026-07-18 14:19:13.334337+00	video	15	https://youtu.be/YwyjQKpW2GM?si=I0NTOB4PNaZdAuNn
23ec5a68-6a96-4f42-8e74-e1c3e763cd36	0340d4c9-cc6d-4149-9736-608a6f7001c1	HTML5 Tutorial Italiano 03 - Il tag HEAD nel dettaglio: metadati, includere css, favicon	html5-tutorial-italiano-03---il-tag-head-nel-dettaglio-metadati-includere-css-favicon	https://youtu.be/y8EfGG-5s3I?si=bFigxz8iOtPIBWDg		4	2026-07-18 14:19:37.607328+00	video	15	https://youtu.be/y8EfGG-5s3I?si=bFigxz8iOtPIBWDg
c4156392-4622-4974-8c36-dcd71b1cd533	0340d4c9-cc6d-4149-9736-608a6f7001c1	HTML5 Tutorial Italiano 04 - Fondamenti di testo in HTML: intestazioni, paragrafi e formattazione	html5-tutorial-italiano-04---fondamenti-di-testo-in-html-intestazioni-paragrafi-e-formattazione	https://youtu.be/rwRBb5HBD0g?si=c-XdL2IhJT8eWWKz		5	2026-07-18 14:20:00.52967+00	video	15	https://youtu.be/rwRBb5HBD0g?si=c-XdL2IhJT8eWWKz
cc81114f-89f4-4c3a-b1c6-05fc906de7b4	0340d4c9-cc6d-4149-9736-608a6f7001c1	HTML5 Tutorial Italiano 05 - Creiamo il nostro primo menu, Hyperlink, URL, percorsi	html5-tutorial-italiano-05---creiamo-il-nostro-primo-menu-hyperlink-url-percorsi	https://youtu.be/o7KPrUS31rg?si=ZxRKQZri7GSvZmbw		6	2026-07-18 14:20:25.449067+00	video	15	https://youtu.be/o7KPrUS31rg?si=ZxRKQZri7GSvZmbw
27f7d475-23e2-4087-a01d-653c0bd6994a	70991b5c-ece6-489d-a163-3409b33a0fce	GUIDA LSA	guida-lsa	\N		1	2026-07-18 16:39:53.644895+00	document	15	https://docs.google.com/document/d/1dDMLPTJZCAMVoirTMy5_UoH0js0VGq6B-73kjVU0bYY/edit?usp=sharing
d0e0bdbb-9583-4a43-af5c-e1f022325889	70991b5c-ece6-489d-a163-3409b33a0fce	GUIDA RIM	guida-rim	\N		2	2026-07-18 16:40:14.669876+00	document	15	https://docs.google.com/document/d/1HZRQ5PXwuHVVNPeGumLS6RtkJ7FE6Zp-zc0a555M3is/edit?usp=sharing
99faa893-5fe8-4001-ba87-f5814e31791d	44648729-fb08-472a-91d4-d2b6dae29738	Python Guide	python-guide	\N		4	2026-07-18 16:41:03.088472+00	document	15	https://docs.google.com/document/d/17NEdELpWsYZaxMv3atTdloxMJc2ECKu-T0EH1GTsUK0/edit?usp=sharing
ddfd060b-8dcf-4ba6-882a-e9e457e91e01	289b267f-fc51-496b-b682-68ee74a5f990	OOP Guide	oop-guide	\N		1	2026-07-18 16:43:59.521755+00	document	15	https://docs.google.com/document/d/1NAVIlyGExTqwqpILH8XCGuZzXIqsJNyOg07yTY4FCro/edit?usp=sharing
64cb0f4c-4123-485a-a2c6-0eadf9864131	d4c96bb2-e80b-4ead-a569-86e791beb3ba	Problem Solving Guide 01	problem-solving-guide-01	\N		1	2026-07-18 16:46:48.897807+00	document	15	https://docs.google.com/document/d/1QNM2Uok0JUubUTItiGT7Tjcj67iHJV3o8FJ9_v2mxEg/edit?usp=sharing
aef5415a-5bb6-4801-a12e-7ec9cd3ce2d1	53c77913-d762-4f7d-993d-78a42ceb995e	GUIDA RIM	guida-rim	\N		1	2026-07-18 16:49:04.719287+00	document	15	https://docs.google.com/document/d/1JUjLHugy7rLUmjdwvOikV6lAhhxnpBScioXtjiwwiP0/edit?usp=sharing
f056f02b-2b41-431d-b683-ed545e03f0a2	15940690-567a-4a47-a43d-dcd8ea90379b	DB Guide	db-guide	\N		1	2026-07-18 16:50:45.816074+00	document	15	https://docs.google.com/document/d/1vVFGoQFXfQVYyYOYoQ3KbbnPe9u1QgGK8YJ46i2kCrE/edit?usp=sharing
6502f03a-94e4-4fde-8a03-67df38247cf7	22ff1322-2316-4cba-9626-668c84ec1d59	Database: Panoramica Completa	database-panoramica-completa	https://youtu.be/SoE2qh1tlO8?si=SMxPSvbVzEoXk0yV		1	2026-07-18 16:51:54.433319+00	video	15	https://youtu.be/SoE2qh1tlO8?si=SMxPSvbVzEoXk0yV
cf29aedb-d0df-4675-b32c-5946f8d69280	22ff1322-2316-4cba-9626-668c84ec1d59	SQL Guida	sql-guida	https://youtu.be/6fLiMCMlw_c?si=dTsvtaTgxyvALg9y		2	2026-07-18 16:52:20.346124+00	video	15	https://youtu.be/6fLiMCMlw_c?si=dTsvtaTgxyvALg9y
472c8254-a3ec-40a2-934f-5effc3f54a54	22ff1322-2316-4cba-9626-668c84ec1d59	ACCESS	access	https://youtu.be/g0hYMSg7b8A?si=otrEHfGLxVBI2xTw		3	2026-07-18 16:52:41.747982+00	video	15	https://youtu.be/g0hYMSg7b8A?si=otrEHfGLxVBI2xTw
00939b67-4599-4943-ae9a-471d67738af3	ef22d24e-02df-4587-a56d-db1917a8d0e3	Finance Guide 01	finance-guide-01	\N		1	2026-07-18 16:55:19.366249+00	document	15	https://docs.google.com/document/d/1Vk89ab28cAp4coVUfobCM9J2C2_8arfI5GVuN8-QvqE/edit?usp=sharing
738a3e3d-a2cd-4461-8af0-6e3351b64196	ef22d24e-02df-4587-a56d-db1917a8d0e3	Finance Slides 01	finance-slides-01	\N		2	2026-07-18 16:56:00.824553+00	document	15	https://docs.google.com/presentation/d/1_2InzAV_FOb2eneaGkvhCUP0Inh9OjNxdxLTupOv1wk/edit?usp=sharing
8521753f-534f-4bbc-baa6-d43f42fa0bc3	c5ede590-c3ff-46fd-9290-823c7eb9b20f	GCPROF - Reddito e Pianificazione	gcprof-reddito-e-pianificazione	https://youtu.be/7b6upqYJXCA?si=iJjawMCDUFQyebt7		1	2026-07-18 16:57:36.03906+00	video	15	https://youtu.be/7b6upqYJXCA?si=iJjawMCDUFQyebt7
4180050d-a101-4386-b9ef-2ab6cd18d4c8	c5ede590-c3ff-46fd-9290-823c7eb9b20f	GCPROF - Capire il Denaro	gcprof---capire-il-denaro	https://youtu.be/DUWEReegvdc?si=0DHymnkvXl2RQ3LE		2	2026-07-18 16:58:19.64171+00	video	15	https://youtu.be/DUWEReegvdc?si=0DHymnkvXl2RQ3LE
ebd7404b-0212-43b9-89b2-43b5f16e2aef	c5ede590-c3ff-46fd-9290-823c7eb9b20f	Zucco - Economy	zucco---economy	https://youtu.be/eZmjlNSgB5w		3	2026-07-18 16:59:40.427294+00	video	15	https://youtu.be/eZmjlNSgB5w
b3c191b4-eb1f-4fa8-b51a-94feac458c4a	c5ede590-c3ff-46fd-9290-823c7eb9b20f	Ray Dalio - World Economy	ray-dalio---world-economy	https://youtu.be/MoGuH3JbMPw		4	2026-07-18 17:00:35.634177+00	video	15	https://youtu.be/MoGuH3JbMPw
2a6974a2-15e7-454d-86e9-b71e34b6a255	c5ede590-c3ff-46fd-9290-823c7eb9b20f	Ray Dalio - Changing World Order	ray-dalio---changing-world-order	https://youtu.be/MUpq9JP0m_g		5	2026-07-18 17:00:50.841213+00	video	15	https://youtu.be/MUpq9JP0m_g
a817f2e5-bdb4-4477-9e2e-a6d13488d388	c5ede590-c3ff-46fd-9290-823c7eb9b20f	Ray Dalio - Principles for Success	ray-dalio---principles-for-success	https://youtu.be/w9HiSsJjbF8		6	2026-07-18 17:01:07.540941+00	video	15	https://youtu.be/w9HiSsJjbF8
17d04b98-404d-436c-8e0d-150aca5d9123	c5ede590-c3ff-46fd-9290-823c7eb9b20f	GCPROF - CRYPTO - Il Futuro dei Soldi	gcprof---crypto---il-futuro-dei-soldi	https://youtu.be/I3tP3Xa7sX4?si=HF3t_3wl3SPv2UaI		7	2026-07-18 17:03:11.322824+00	video	15	https://youtu.be/I3tP3Xa7sX4?si=HF3t_3wl3SPv2UaI
4651b1fa-eea0-4eff-afe3-e1ec16d12d26	54ae0b18-3208-4d83-ae20-42225401a73b	GCPROF - AI - Dal Sogno alla Realtà	gcprof---ai---dal-sogno-alla-realt	https://youtu.be/Dg9dqNFQyps?si=aVtpczr56pKah1mb		1	2026-07-18 17:04:45.007933+00	video	15	https://youtu.be/Dg9dqNFQyps?si=aVtpczr56pKah1mb
28d964f4-abe6-46de-9c31-09d2c3283e86	b4cfe8e8-8b9f-4c64-9f9f-76af9ae87906	GCPROF - BLOCKCHAIN - La Rivoluzione della Fiducia	gcprof---blockchain---la-rivoluzione-della-fiducia	https://youtu.be/QhcNQmfnwmk?si=Gl4MLGB_-7IlyZb7		1	2026-07-18 17:06:05.589995+00	video	15	https://youtu.be/QhcNQmfnwmk?si=Gl4MLGB_-7IlyZb7
5ff29c2b-181a-4f5d-a254-365731d25dd3	b4cfe8e8-8b9f-4c64-9f9f-76af9ae87906	GCPROF - BLOCKCHAIN - Origini e Futuro	gcprof---blockchain---origini-e-futuro	https://youtu.be/eEVtnE-czqc?si=CGyX9xZGoirwd0Eu		2	2026-07-18 17:06:30.875667+00	video	15	https://youtu.be/eEVtnE-czqc?si=CGyX9xZGoirwd0Eu
d2f34ac5-4b0c-4d37-8369-4fba236575cb	008fd2cd-3ac8-4379-babb-e326e99c8172	Blackchain Guide 01	blackchain-guide-01	\N		1	2026-07-18 17:08:09.328926+00	document	15	https://drive.google.com/file/d/1kwbF_a4HO3tq-pvp0ls0Bzp9T6GOm_la/view?usp=sharing
5f4da030-d846-4004-bd0c-e245d25b77c0	44648729-fb08-472a-91d4-d2b6dae29738	Python Practice Guide MD	python-practice-guide-md	\N	# 🐍 Guida Completa a Python\n\n### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com\n\n### Ottimizzata per Google Colab · Aggiornata a Python 3.13/3.14\n\n---\n\n## Come usare questa guida\n\nOgni modulo è pensato per essere copiato **così com'è** in una cella di testo (Markdown) o di codice di Google Colab. I blocchi di codice sono eseguibili direttamente: apri un nuovo notebook, incolla, premi `Shift+Invio`.\n\n<a id="indice"></a>\n**Indice dei moduli**\n\n- [M0 — Introduzione a Python e ambiente di lavoro](#m0)\n- [M1 — Numeri e operatori](#m1)\n- [M2 — Variabili e stringhe](#m2)\n- [M3 — Conversioni di tipo, `print()` e `input()`](#m3)\n- [M4 — Controllo del flusso, algebra booleana, operatori di confronto](#m4)\n- [M5 — `if`, `elif`, `else`](#m5)\n- [M6 — Ciclo `while`, `break`, `continue`](#m6)\n- [M7 — Ciclo `for`, `range()`, `enumerate()`](#m7)\n- [Appendice — Riferimenti rapidi e cheat sheet](#appendice)\n\n---\n\n<a id="m0"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n## M0 — Introduzione a Python e ambiente di lavoro\n\n### 0.1 Cos'è Python\n\nPython è un linguaggio di programmazione **interpretato**, **ad alto livello** e **multi-paradigma**, creato da Guido van Rossum e rilasciato per la prima volta nel 1991. Ad oggi è uno dei linguaggi più diffusi al mondo, mantenuto dalla Python Software Foundation, con una release principale circa ogni anno (la serie attuale più recente è Python 3.13, con la 3.14 già disponibile e la 3.15 in sviluppo).\n\n**Perché è così popolare:**\n\n| Caratteristica | Descrizione |\n|---|---|\n| Leggibilità | Sintassi vicina al linguaggio naturale, basata sull'indentazione |\n| Versatilità | Web, data science, intelligenza artificiale, automazione, scripting, didattica |\n| Ecosistema | Migliaia di librerie (NumPy, Pandas, Django, PyTorch...) |\n| Comunità | Enorme, attiva, con documentazione ufficiale eccellente |\n\n**Caratteristiche tecniche principali:**\n\n1. **Multi-paradigma**: supporta programmazione procedurale, orientata agli oggetti e funzionale.\n2. **Tipizzazione dinamica**: non serve dichiarare il tipo di una variabile, viene dedotto a runtime.\n3. **Portabilità**: gira su Windows, macOS, Linux senza modifiche al codice.\n4. **Interattività**: puoi eseguire istruzioni una alla volta in una shell (REPL) o in notebook come Colab/Jupyter.\n5. **Interpretato**: il codice non va compilato manualmente; l'interprete CPython lo esegue direttamente (compilandolo internamente in bytecode).\n\n### 0.2 Ambienti di lavoro: perché Google Colab\n\nPer la didattica, l'ambiente scelto in questo corso è **Google Colab** (colab.research.google.com), un notebook Jupyter gratuito eseguito interamente nel cloud da Google. Vantaggi:\n\n- **Zero installazione**: basta un account Google, nessun setup locale.\n- **Celle miste**: testo Markdown e codice eseguibile nello stesso documento.\n- **Persistenza su Drive**: i notebook si salvano automaticamente su Google Drive.\n- **Hardware gratuito**: CPU (e GPU/TPU se servisse in futuro) senza costi.\n\nIn alternativa, per lavorare in locale, si può installare Python da [python.org](https://www.python.org/) e verificare l'installazione con:\n\n```bash\npython --version\n# oppure, su alcuni sistemi:\npython3 --version\n```\n\n### 0.3 Il tuo primo programma\n\n```python\n# Il classico "Hello, World!" — la prima riga che ogni programmatore scrive\nprint("Ciao, mondo!")\n```\n\nIn Colab: crea una nuova cella di codice, incolla la riga, premi `Shift+Invio`. L'output apparirà subito sotto la cella.\n\n---\n\n<a id="m1"></a>\n**⬆️[Torna all'Indice](#indice)**\n## M1 — Numeri e operatori\n\n### 1.1 I tipi numerici di Python\n\nPython distingue tre tipi numerici built-in:\n\n| Tipo | Descrizione | Esempio |\n|---|---|---|\n| `int` | Numeri interi, precisione illimitata (limitata solo dalla RAM) | `42`, `-7`, `10**100` |\n| `float` | Numeri in virgola mobile (standard IEEE 754, doppia precisione) | `3.14`, `-0.001` |\n| `complex` | Numeri complessi, parte reale + immaginaria (suffisso `j`) | `3 + 4j` |\n\n```python\nintero = 10\ndecimale = 3.14\ncomplesso = 2 + 3j\n\nprint("Intero:", intero, type(intero))\nprint("Decimale:", decimale, type(decimale))\nprint("Complesso:", complesso, type(complesso))\nprint("Parte reale:", complesso.real)\nprint("Parte immaginaria:", complesso.imag)\n```\n\n> 💡 **Nota moderna**: da Python 3.6 in poi puoi usare il carattere `_` come separatore delle migliaia per rendere leggibili i numeri grandi: `popolazione = 1_234_567` è equivalente a `1234567`.\n\n### 1.2 Operatori aritmetici\n\n| Operatore | Nome | Esempio | Risultato |\n|---|---|---|---|\n| `+` | Addizione | `5 + 3` | `8` |\n| `-` | Sottrazione | `10 - 2` | `8` |\n| `*` | Moltiplicazione | `4 * 7` | `28` |\n| `/` | Divisione (sempre float) | `15 / 3` | `5.0` |\n| `//` | Divisione intera (floor division) | `15 // 2` | `7` |\n| `%` | Modulo (resto della divisione) | `15 % 2` | `1` |\n| `**` | Potenza | `2 ** 3` | `8` |\n\n```python\nprint("Addizione:", 5 + 3)\nprint("Sottrazione:", 10 - 2)\nprint("Moltiplicazione:", 4 * 7)\nprint("Divisione:", 15 / 3)          # restituisce sempre un float\nprint("Divisione intera:", 15 // 2)   # tronca verso il basso\nprint("Modulo:", 15 % 2)\nprint("Potenza:", 2 ** 3)\nprint("Radice quadrata (potenza 0.5):", 16 ** 0.5)\n```\n\n⚠️ **Attenzione al floor con i negativi**: `//` arrotonda sempre verso il basso (verso `-∞`), non verso lo zero:\n\n```python\nprint(-7 // 2)   # -4, non -3!\nprint(-7 % 2)    # 1 (il segno del resto segue il divisore)\n```\n\n### 1.3 Operatori di confronto\n\nRestituiscono sempre un valore booleano (`True`/`False`):\n\n| Operatore | Significato | Esempio | Risultato |\n|---|---|---|---|\n| `==` | Uguale | `5 == 5` | `True` |\n| `!=` | Diverso | `5 != 3` | `True` |\n| `<` | Minore | `5 < 10` | `True` |\n| `>` | Maggiore | `10 > 5` | `True` |\n| `<=` | Minore o uguale | `5 <= 5` | `True` |\n| `>=` | Maggiore o uguale | `10 >= 10` | `True` |\n\nPython permette anche il **concatenamento** dei confronti, una comodità che molti altri linguaggi non hanno:\n\n```python\nx = 5\nprint(3 < x < 7)      # True, equivale a (3 < x) and (x < 7)\nprint(1 < x < 3)      # False\n```\n\n### 1.4 Operatori di assegnazione combinata\n\n```python\nz = 5\nz += 3   # equivale a z = z + 3  -> z diventa 8\nz -= 2   # z = z - 2             -> z diventa 6\nz *= 2   # z = z * 2             -> z diventa 12\nz /= 4   # z = z / 4             -> z diventa 3.0\nz //= 1  # divisione intera combinata\nz **= 2  # potenza combinata\nz %= 5   # modulo combinato\nprint(z)\n```\n\n### 1.5 Precedenza degli operatori (PEMDAS)\n\nL'ordine di valutazione, dal più al meno prioritario:\n\n1. **P**arentesi `( )`\n2. **E**sponenti `**`\n3. **M**oltiplicazione, **D**ivisione, **D**ivisione intera, Modulo `* / // %`\n4. **A**ddizione, **S**ottrazione `+ -`\n\n```python\nprint(2 + 3 * 4)     # 14 -> prima la moltiplicazione\nprint((2 + 3) * 4)   # 20 -> prima la parentesi\nprint(2 ** 3 ** 2)   # 512 -> ** è associativo a destra: 2 ** (3 ** 2)\n```\n\n### 1.6 Conversioni tra tipi numerici\n\n```python\nnumero_intero = 10\nnumero_decimale = float(numero_intero)   # 10.0 — int -> float, aggiunge precisione\nprint(numero_decimale)\n\nnumero_troncato = int(3.99)              # 3 — float -> int TRONCA (non arrotonda!)\nprint(numero_troncato)\n\nnumero_arrotondato = round(3.99)         # 4 — round() invece arrotonda correttamente\nprint(numero_arrotondato)\n\nnumero_complesso = complex(numero_intero)  # (10+0j)\nprint(numero_complesso)\n```\n\n> ⚠️ Errore comune: `int(3.99)` **non** arrotonda a 4, tronca a 3. Per arrotondare usa sempre `round()`.\n\n### 1.7 Il modulo `math` per operazioni avanzate\n\nPer operazioni matematiche più sofisticate della semplice aritmetica, la libreria standard offre il modulo `math`:\n\n```python\nimport math\n\nprint(math.sqrt(16))     # radice quadrata -> 4.0\nprint(math.floor(3.7))   # arrotonda per difetto -> 3\nprint(math.ceil(3.2))    # arrotonda per eccesso -> 4\nprint(math.pi)            # costante pi greco\nprint(math.pow(2, 10))    # potenza (restituisce sempre float)\n```\n\n---\n\n<a id="m2"></a>\n**⬆️[Torna all'Indice](#indice)**\n## M2 — Variabili e stringhe\n\n### 2.1 Variabili\n\nUna **variabile** è un nome simbolico associato a un valore in memoria. In Python non serve dichiarare il tipo: viene dedotto automaticamente al momento dell'assegnazione.\n\n```python\nx = 5\nnome = "Alice"\npi_greco = 3.14\n```\n\n**Regole per i nomi delle variabili:**\n\n1. Devono iniziare con una lettera o `_` (mai con una cifra).\n2. Possono contenere lettere, numeri e underscore (`_`).\n3. Non possono coincidere con parole riservate (`if`, `for`, `class`, `import`, ...).\n4. Sono **case-sensitive**: `eta` e `Eta` sono due variabili diverse.\n\n**Convenzioni di stile (PEP 8, lo standard ufficiale di stile Python):**\n\n- `snake_case` per variabili e funzioni: `numero_studenti`.\n- `PascalCase` per le classi: `StudenteLiceo`.\n- `MAIUSCOLO` per le costanti: `VELOCITA_LUCE = 299792458`.\n\n### 2.2 Dinamicità dei tipi\n\n```python\nx = 10          # x è int\nprint(type(x))\nx = "ciao"      # ora x è str — Python lo permette senza errori\nprint(type(x))\nx = 3.14        # ora x è float\nprint(type(x))\n```\n\nQuesta flessibilità è comoda ma va usata con giudizio: riassegnare tipi diversi alla stessa variabile può rendere il codice confuso. Buona pratica: usare nomi che riflettano il contenuto, e non "riciclare" variabili per scopi diversi.\n\n### 2.3 Le stringhe\n\nUna stringa (`str`) è una sequenza di caratteri, delimitata da apici singoli, doppi o tripli:\n\n```python\nsingola = 'Ciao'\ndoppia = "Ciao"\nmultilinea = """Questa è una stringa\nche occupa più righe"""\n```\n\n#### Immutabilità\n\nLe stringhe in Python sono **immutabili**: non si può modificare un carattere al loro interno. Ogni "modifica" in realtà crea una stringa nuova.\n\n```python\ns = "Python"\n# s[0] = "J"   # ❌ TypeError: 'str' object does not support item assignment\ns = "J" + s[1:]  # ✅ si crea una nuova stringa\nprint(s)  # "Jython"\n```\n\n#### Indicizzazione e slicing\n\nGli indici partono da `0`; gli indici negativi contano dalla fine.\n\n```python\ntesto = "Python"\nprint(testo[0])     # 'P' (primo carattere)\nprint(testo[-1])     # 'n' (ultimo carattere)\n\n# Slicing: testo[inizio:fine:passo] — 'fine' è ESCLUSO\nprint(testo[0:3])   # 'Pyt'\nprint(testo[:3])     # 'Pyt' (dall'inizio)\nprint(testo[3:])     # 'hon' (fino alla fine)\nprint(testo[::-1])   # 'nohtyP' (stringa invertita, passo -1)\nprint(testo[::2])    # 'Pto' (un carattere sì e uno no)\n```\n\n#### Concatenazione e ripetizione\n\n```python\nnome = "Alice"\nsaluto = "Ciao, " + nome\nprint(saluto)          # "Ciao, Alice"\n\neco = "echo! " * 3\nprint(eco)             # "echo! echo! echo! "\n```\n\n#### Escape character\n\n| Sequenza | Significato |\n|---|---|\n| `\\n` | Nuova riga |\n| `\\t` | Tabulazione |\n| `\\\\` | Barra rovesciata |\n| `\\'` , `\\"` | Apice dentro la stringa |\n\n```python\nmessaggio = "Ciao\\nMondo"   # va a capo\nprint(messaggio)\n```\n\n**Stringhe raw** (`r"..."`): ignorano gli escape, utili per percorsi Windows o espressioni regolari:\n\n```python\npercorso = r"C:\\Users\\Alice\\Documenti"\nprint(percorso)   # stampato esattamente come scritto\n```\n\n### 2.4 Interpolazione di stringhe: tre metodi a confronto\n\n```python\nnome = "Alice"\neta = 25\n\n# 1) Concatenazione con + (poco pratico, richiede conversioni manuali)\nprint("Ciao, " + nome + ". Hai " + str(eta) + " anni.")\n\n# 2) .format() (più leggibile, storicamente diffuso)\nprint("Ciao, {}. Hai {} anni.".format(nome, eta))\n\n# 3) f-string (Python 3.6+, oggi lo STANDARD raccomandato)\nprint(f"Ciao, {nome}. Hai {eta} anni.")\n\n# Le f-string supportano anche espressioni ed formattazione avanzata:\nprint(f"Tra un anno avrai {eta + 1} anni.")\nprezzo = 19.999\nprint(f"Prezzo: {prezzo:.2f} €")     # arrotonda a 2 decimali -> 20.00 €\nprint(f"{eta = }")                    # debug rapido -> "eta = 25" (Python 3.8+)\n```\n\n> 💡 Nella didattica moderna si raccomanda di usare **sempre le f-string** per nuovo codice: sono più leggibili, più veloci e supportano formattazione inline.\n\n### 2.5 Metodi utili delle stringhe\n\n| Metodo | Descrizione | Esempio |\n|---|---|---|\n| `len(s)` | Lunghezza | `len("Python")` → `6` |\n| `.lower()` | In minuscolo | `"HELLO".lower()` → `"hello"` |\n| `.upper()` | In maiuscolo | `"hello".upper()` → `"HELLO"` |\n| `.strip()` | Rimuove spazi iniziali/finali | `" hi ".strip()` → `"hi"` |\n| `.replace(a,b)` | Sostituisce occorrenze | `"ciao".replace("a","e")` → `"cieo"` |\n| `.split(sep)` | Divide in lista | `"a,b,c".split(",")` → `["a","b","c"]` |\n| `.join(iterabile)` | Unisce una lista in stringa | `",".join(["a","b"])` → `"a,b"` |\n| `.find(sub)` | Indice prima occorrenza (-1 se assente) | `"ciao".find("a")` → `2` |\n| `.startswith(s)` | Verifica prefisso | `"Python".startswith("Py")` → `True` |\n| `.endswith(s)` | Verifica suffisso | `"Python".endswith("on")` → `True` |\n| `.count(sub)` | Conta le occorrenze | `"banana".count("a")` → `3` |\n| `.isdigit()` | Verifica se è tutta numerica | `"123".isdigit()` → `True` |\n| `.title()` | Prima lettera maiuscola per parola | `"ciao mondo".title()` → `"Ciao Mondo"` |\n\n```python\nfrase = "  Programmare in Python è divertente!  "\nprint(frase.strip())\nprint(frase.strip().upper())\nparole = frase.strip().split(" ")\nprint(parole)\nprint(len(parole), "parole trovate")\nprint("-".join(parole))\n```\n\n---\n\n<a id="m3"></a>\n**⬆️[Torna all'Indice](#indice)**\n## M3 — Conversioni di tipo, `print()` e `input()`\n\n### 3.1 Conversione implicita (coercizione automatica)\n\nPython converte automaticamente i tipi quando non c'è perdita di informazione, ad esempio in operazioni miste `int`/`float`:\n\n```python\na = 10        # int\nb = 2.5       # float\nc = a + b     # Python converte 'a' in float per fare l'operazione\nprint(c)      # 12.5\nprint(type(c))  # <class 'float'>\n```\n\n### 3.2 Conversione esplicita\n\nRealizzata con funzioni built-in:\n\n| Funzione | Descrizione | Esempio |\n|---|---|---|\n| `int(x)` | Converte in intero (tronca i decimali) | `int(3.7)` → `3` |\n| `float(x)` | Converte in float | `float(3)` → `3.0` |\n| `str(x)` | Converte in stringa | `str(42)` → `"42"` |\n| `bool(x)` | Converte in booleano | `bool(0)` → `False` |\n| `list(x)` | Converte in lista | `list("abc")` → `['a','b','c']` |\n| `tuple(x)` | Converte in tupla | `tuple([1,2,3])` → `(1,2,3)` |\n| `set(x)` | Converte in insieme | `set("aab")` → `{'a','b'}` |\n\n```python\nnumero = "42"\nnumero_int = int(numero)       # da stringa a intero\nprint(numero_int + 10)         # 52\n```\n\n⚠️ **Errori di conversione**: se il dato non è compatibile, Python solleva un'eccezione:\n\n```python\n# print(int("3.14"))   # ValueError: invalid literal for int() with base 10: '3.14'\n# Per convertire "3.14" in intero serve un passaggio intermedio:\nprint(int(float("3.14")))   # 3\n```\n\n### 3.3 La funzione `print()`\n\n```python\nprint(valore1, valore2, sep=" ", end="\\n")\n```\n\n- `sep`: separatore tra i valori (default: spazio).\n- `end`: cosa stampare alla fine (default: newline).\n\n```python\nprint("Ciao", "Mondo", sep="-", end="!\\n")   # Ciao-Mondo!\n\nlista = [1, 2, 3]\nprint("Lista:", lista)   # stampa direttamente strutture complesse\n\nrisultato = 42\nprint(f"Il risultato è: {risultato}")   # f-string, il metodo consigliato oggi\n```\n\n### 3.4 La funzione `input()`\n\n`input()` raccoglie dati da tastiera **sempre come stringa**, anche se l'utente digita un numero.\n\n```python\nnome = input("Come ti chiami? ")\nprint(f"Ciao, {nome}!")\n\neta = int(input("Quanti anni hai? "))   # conversione esplicita necessaria!\nprint(f"L'anno prossimo avrai {eta + 1} anni.")\n```\n\n⚠️ Se l'utente inserisce del testo non numerico dove ci si aspetta un numero, `int()` genera un `ValueError`.\n\n### 3.5 Validazione degli input con `try` / `except`\n\n```python\ntry:\n    numero = int(input("Inserisci un numero intero: "))\n    print(f"Hai inserito {numero}.")\nexcept ValueError:\n    print("Errore: devi inserire un numero intero valido.")\n```\n\nPer richiedere input finché non è valido, si combina con un ciclo `while` (vedi Modulo 6):\n\n```python\nwhile True:\n    valore = input("Inserisci un numero: ")\n    if valore.isdigit():\n        numero = int(valore)\n        print(f"Numero valido: {numero}")\n        break\n    else:\n        print("Non è un numero valido, riprova.")\n```\n\n### 3.6 Sintesi delle best practice\n\n1. **Converti sempre** l'output di `input()` prima di fare calcoli.\n2. **Messaggi chiari**: guida l'utente su cosa inserire (es. "Inserisci un numero intero: ").\n3. **Gestisci gli errori** con `try/except` per evitare che il programma si blocchi.\n4. **Formatta l'output** con f-string per messaggi leggibili.\n\n---\n\n<a id="m4"></a>\n**⬆️[Torna all'Indice](#indice)**\n## M4 — Controllo del flusso, algebra booleana, operatori di confronto\n\n### 4.1 Cos'è il controllo del flusso\n\nIl controllo del flusso permette a un programma di **decidere** quale codice eseguire e **quante volte** ripeterlo, in base a condizioni logiche. I costrutti principali sono:\n\n1. **Condizionali** (`if`, `elif`, `else`) → Modulo 5\n2. **Cicli** (`while`, `for`) → Moduli 6 e 7\n\n### 4.2 Algebra booleana\n\nPython valuta le condizioni secondo la logica booleana classica: ogni condizione produce `True` o `False`.\n\n**Valori "falsy" (considerati `False` in un contesto booleano):**\n\n```python\n# False, 0, 0.0, "" (stringa vuota), [] (lista vuota),\n# {} (dizionario vuoto), set() (insieme vuoto), None\n\nif []:\n    print("Non viene mai eseguito")   # lista vuota è falsy\nelse:\n    print("Questo viene eseguito")\n```\n\nTutto il resto (numeri diversi da zero, stringhe non vuote, liste con elementi...) è considerato "truthy" (equivalente a `True`).\n\n### 4.3 Operatori logici\n\n| Operatore | Descrizione | Esempio |\n|---|---|---|\n| `and` | Vero se entrambe le condizioni sono vere | `True and False` → `False` |\n| `or` | Vero se almeno una condizione è vera | `True or False` → `True` |\n| `not` | Inverte il valore booleano | `not True` → `False` |\n\n```python\nx, y = 10, 5\nif x > 5 and y < 10:\n    print("Condizione soddisfatta")\n\n# Verifica di condizioni multiple senza ripetere la variabile:\nif 5 < x < 15:   # equivalente a (x > 5 and x < 15)\n    print("x è compreso tra 5 e 15")\n```\n\n### 4.4 Operatori di confronto (riepilogo)\n\n| Operatore | Descrizione | Esempio | Risultato |\n|---|---|---|---|\n| `==` | Uguale | `5 == 5` | `True` |\n| `!=` | Diverso | `5 != 3` | `True` |\n| `<` | Minore | `3 < 5` | `True` |\n| `<=` | Minore o uguale | `5 <= 5` | `True` |\n| `>` | Maggiore | `7 > 3` | `True` |\n| `>=` | Maggiore o uguale | `7 >= 7` | `True` |\n| `is` | Identità (stesso oggetto in memoria) | `x is y` | dipende |\n| `in` | Appartenenza a una sequenza | `"a" in "ciao"` | `True` |\n\n```python\nprint(5 == "5")   # False: tipi diversi (int vs str), Python non li considera uguali\n\na = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)   # True: stesso contenuto\nprint(a is b)   # False: sono due oggetti distinti in memoria\nc = a\nprint(a is c)   # True: c punta allo stesso oggetto di a\n```\n\n> 💡 **Regola pratica**: usa `==` per confrontare i *valori*, usa `is` solo per confrontare l'*identità* (tipicamente con `None`: `if variabile is None:`).\n\n### 4.5 Precedenza tra operatori logici e di confronto\n\nDal più al meno prioritario:\n\n1. Parentesi `( )`\n2. Operatori di confronto (`<`, `>`, `==`, `!=`, ...)\n3. Operatori logici: `not` → `and` → `or`\n\n```python\nx, y = 10, 5\nif not (x > 5 and y < 10):\n    print("Non soddisfa la condizione")\nelse:\n    print("Soddisfa la condizione")\n```\n\n### 4.6 Valutazione a corto circuito (short-circuit evaluation)\n\nPython interrompe la valutazione appena il risultato è determinato:\n\n- Con `and`: se la prima condizione è `False`, la seconda non viene nemmeno valutata.\n- Con `or`: se la prima condizione è `True`, la seconda non viene valutata.\n\n```python\nx = 0\nif x != 0 and 10 / x > 2:   # la seconda parte non viene mai eseguita: niente ZeroDivisionError\n    print("Non genera errore")\nelse:\n    print("Condizione falsa, divisione evitata")\n```\n\nQuesto comportamento è molto utile per scrivere codice sicuro, ad esempio controllare che un oggetto non sia `None` prima di usarlo:\n\n```python\ndati = None\nif dati is not None and len(dati) > 0:\n    print("Ci sono dati")\nelse:\n    print("Nessun dato disponibile")\n```\n\n### 4.7 Espressioni condizionali inline (operatore ternario)\n\n```python\nx = 10\nmessaggio = "Positivo" if x > 0 else "Negativo"\nprint(messaggio)\n```\n\n### 4.8 Pattern matching con `match` (Python 3.10+)\n\nPer condizioni multiple su un singolo valore, `match` è un'alternativa più leggibile a lunghe catene `if/elif`:\n\n```python\nx = 42\nmatch x:\n    case 1:\n        print("Uno")\n    case 42:\n        print("La risposta alla vita, l'universo e tutto quanto")\n    case _:\n        print("Altro valore")\n```\n\n`match` supporta anche pattern più complessi (liste, classi, guardie condizionali):\n\n```python\npunto = (0, 5)\nmatch punto:\n    case (0, 0):\n        print("Origine")\n    case (0, y):\n        print(f"Sull'asse y, altezza {y}")\n    case (x, 0):\n        print(f"Sull'asse x, larghezza {x}")\n    case (x, y) if x == y:\n        print("Sulla bisettrice")\n    case _:\n        print("Punto generico")\n```\n\n### 4.9 Best practice\n\n1. Preferisci condizioni semplici e leggibili a espressioni contorte.\n2. Evita `if condizione == True:` — scrivi direttamente `if condizione:`.\n3. Usa parentesi per chiarire la precedenza anche quando non strettamente necessarie, se migliora la leggibilità.\n4. Sfrutta lo short-circuit per evitare errori (es. accessi a `None`, divisioni per zero).\n\n---\n\n<a id="m5"></a>\n**⬆️[Torna all'Indice](#indice)**\n## M5 — Istruzioni `if`, `elif`, `else`\n\n### 5.1 Struttura di base\n\n```python\nif condizione1:\n    ...  # eseguito se condizione1 è vera\nelif condizione2:\n    ...  # eseguito se condizione1 è falsa ma condizione2 è vera\nelse:\n    ...  # eseguito se nessuna condizione precedente è vera\n```\n\nLe condizioni sono valutate **in ordine**: appena una risulta vera, il blocco corrispondente viene eseguito e tutte le successive vengono ignorate.\n\n### 5.2 `if` semplice\n\n```python\nx = 10\nif x > 5:\n    print("x è maggiore di 5")\n```\n\n### 5.3 `elif`: condizioni multiple\n\nPuoi avere quanti `elif` vuoi; ognuno viene valutato solo se tutti i precedenti sono falsi.\n\n```python\nx = 10\nif x > 15:\n    print("x è maggiore di 15")\nelif x > 5:\n    print("x è maggiore di 5 ma non di 15")\nelse:\n    print("x è 5 o meno")\n```\n\n### 5.4 `else`: il caso residuo\n\n`else` è opzionale e va sempre per ultimo:\n\n```python\nx = 3\nif x > 5:\n    print("x è maggiore di 5")\nelse:\n    print("x non è maggiore di 5")\n```\n\n### 5.5 Esempio completo — fasce d'età\n\n```python\neta = 25\nif eta < 18:\n    categoria = "Minorenne"\nelif eta < 65:\n    categoria = "Adulto"\nelse:\n    categoria = "Anziano"\nprint(f"Categoria: {categoria}")\n```\n\n### 5.6 Condizioni nidificate\n\n```python\nx = 10\nif x > 0:\n    if x % 2 == 0:\n        print("x è positivo e pari")\n    else:\n        print("x è positivo e dispari")\nelse:\n    print("x è negativo o nullo")\n```\n\n⚠️ Nidificazioni troppo profonde rendono il codice difficile da leggere. Meglio spezzare in funzioni o "appiattire" la logica con `elif`.\n\n### 5.7 Operatore ternario (ripasso)\n\n```python\nx = 10\nmessaggio = "Positivo" if x > 0 else "Negativo"\nprint(messaggio)\n```\n\n### 5.8 Best practice\n\n1. **Leggibilità prima di tutto**: usa variabili intermedie per condizioni complesse.\n\n    ```python\n    is_pari = (x % 2 == 0)\n    if is_pari:\n        print("x è pari")\n    ```\n\n2. **Evita nidificazioni profonde**: preferisci `elif`, o restituisci subito il risultato in una funzione (*early return*):\n\n    ```python\n    def valuta_eta(eta):\n        if eta < 18:\n            return "Minorenne"\n        if eta < 65:\n            return "Adulto"\n        return "Anziano"\n\n    print(valuta_eta(30))\n    ```\n\n3. **Copri tutti i casi possibili**: aggiungi sempre un `else` (o un controllo esplicito) per gli input inattesi.\n4. **Rispetta l'indentazione**: in Python è obbligatoria e definisce i blocchi di codice (di norma 4 spazi).\n5. Per condizioni multiple su un singolo valore, valuta se `match` (Modulo 4.8) è più leggibile di una lunga catena `elif`.\n\n### 5.9 Differenze rispetto ad altri linguaggi\n\n- Python **non ha `switch`** in senso classico; il pattern matching (`match`, dal 3.10) ne è l'equivalente moderno.\n- **Nessuna graffa `{}`**: i blocchi sono delimitati dall'indentazione, non da parentesi.\n- Corto circuito automatico in `and`/`or` (vedi Modulo 4.6).\n\n---\n\n<a id="m6"></a>\n**⬆️[Torna all'Indice](#indice)**\n## M6 — Ciclo `while`, istruzioni `break` e `continue`\n\n### 6.1 Sintassi di base\n\n```python\nwhile condizione:\n    ...  # eseguito finché la condizione resta vera\n```\n\nAd ogni iterazione la condizione viene rivalutata: se `True` il blocco viene eseguito, se `False` il ciclo termina.\n\n```python\nx = 0\nwhile x < 5:\n    print(x)\n    x += 1   # fondamentale: senza questo, il ciclo non termina mai!\n```\n\n### 6.2 Cicli infiniti\n\n```python\n# while True:\n#     print("Questo ciclo non finisce mai da solo")\n```\n\nUn ciclo infinito è utile solo se combinato con un `break` che lo interrompe in base a una condizione interna (tipico pattern per menu interattivi, server, giochi):\n\n```python\ncontatore = 0\nwhile True:\n    print(f"Iterazione {contatore}")\n    contatore += 1\n    if contatore == 3:\n        break   # esce dal ciclo infinito\n```\n\n### 6.3 `break`: uscita anticipata\n\n`break` interrompe **immediatamente** il ciclo più vicino, saltando alla prima riga dopo il ciclo.\n\n```python\nnumeri = [1, 2, 3, 4, 5, 6]\ncerca = 4\nindice = 0\nwhile indice < len(numeri):\n    if numeri[indice] == cerca:\n        print("Trovato!")\n        break\n    indice += 1\n```\n\n### 6.4 `continue`: salta all'iterazione successiva\n\n`continue` interrompe solo l'iterazione corrente e passa alla successiva, senza uscire dal ciclo.\n\n```python\nnumeri = [1, 2, 3, 4, 5, 6]\nfor numero in numeri:\n    if numero % 2 == 0:\n        continue   # salta la stampa per i numeri pari\n    print(numero)   # stampa solo i dispari: 1, 3, 5\n```\n\n### 6.5 Condizioni composte\n\n```python\nx, y = 0, 10\nwhile x < 5 and y > 5:\n    print(f"x: {x}, y: {y}")\n    x += 1\n    y -= 1\n```\n\n### 6.6 Evitare cicli infiniti indesiderati\n\n```python\nx = 0\nwhile x < 5:\n    if x == 3:\n        break\n    print(x)\n    x += 1\n```\n\nRegola d'oro: **verifica sempre che la variabile che controlla la condizione venga modificata dentro il ciclo**, altrimenti il ciclo non terminerà mai.\n\n### 6.7 La clausola `else` nei cicli (funzionalità poco nota ma utile)\n\nIn Python, sia `while` che `for` possono avere una clausola `else`, eseguita solo se il ciclo termina **senza** un `break`:\n\n```python\nnumeri = [1, 3, 5, 7]\ncerca = 4\nindice = 0\nwhile indice < len(numeri):\n    if numeri[indice] == cerca:\n        print("Trovato!")\n        break\n    indice += 1\nelse:\n    print("Valore non presente nella lista")   # eseguito perché non c'è stato break\n```\n\n### 6.8 Complessità e prestazioni\n\n- La complessità temporale di un ciclo `while` dipende dal numero di iterazioni necessarie a rendere falsa la condizione: se sono `n`, la complessità è `O(n)`.\n- Un ciclo la cui condizione non viene mai aggiornata correttamente può bloccare il programma indefinitamente: è uno degli errori più comuni per chi inizia a programmare.\n\n### 6.9 Best practice\n\n1. **Aggiorna sempre** la condizione di uscita all'interno del ciclo.\n2. Usa `break` per uscite anticipate, `continue` per saltare casi particolari.\n3. Mantieni i cicli `while` semplici; evita nidificazioni eccessive.\n4. Se il numero di iterazioni è **noto a priori**, preferisci `for` (Modulo 7): è più leggibile e meno soggetto a errori.\n\n### 6.10 `while` vs `for`: quando usare cosa\n\n| Situazione | Costrutto consigliato |\n|---|---|\n| Non conosci il numero di iterazioni in anticipo (dipende da una condizione dinamica) | `while` |\n| Devi iterare su una sequenza nota (lista, stringa, range) | `for` |\n\n---\n\n<a id="m7"></a>\n**⬆️[Torna all'Indice](#indice)**\n## M7 — Ciclo `for`, funzione `range()`, `enumerate()`\n\n### 7.1 Sintassi di base\n\n```python\nfor elemento in sequenza:\n    ...  # eseguito per ogni elemento della sequenza\n```\n\n`sequenza` può essere una lista, tupla, stringa, dizionario, `range()` o qualunque oggetto iterabile.\n\n```python\nnumeri = [1, 2, 3, 4, 5]\nfor numero in numeri:\n    print(numero)\n```\n\n### 7.2 Iterare su liste, stringhe, tuple\n\n```python\nfrutta = ["mela", "banana", "ciliegia"]\nfor item in frutta:\n    print(item)\n\nparola = "Python"\nfor lettera in parola:\n    print(lettera)\n```\n\n### 7.3 La funzione `range()`\n\nGenera una sequenza di interi, tipicamente usata per ripetere un blocco un numero prefissato di volte.\n\n```python\nrange(stop)               # da 0 a stop-1\nrange(start, stop)        # da start a stop-1\nrange(start, stop, step)  # con passo personalizzato\n```\n\n```python\nfor i in range(5):        # 0, 1, 2, 3, 4\n    print(i)\n\nfor i in range(2, 10, 2): # 2, 4, 6, 8\n    print(i)\n\nfor i in range(10, 0, -1): # conto alla rovescia: 10, 9, ..., 1\n    print(i)\n```\n\n### 7.4 Cicli annidati\n\n```python\n# Tabellina di moltiplicazione da 1 a 5\nfor i in range(1, 6):\n    for j in range(1, 6):\n        print(f"{i} * {j} = {i * j}")\n```\n\n### 7.5 Iterare su indici: `range(len(...))` vs `enumerate()`\n\nMetodo classico (funzionale ma meno elegante):\n\n```python\nfrutta = ["mela", "banana", "ciliegia"]\nfor i in range(len(frutta)):\n    print(f"Indice {i}: {frutta[i]}")\n```\n\nMetodo consigliato con `enumerate()` — più leggibile e "pythonico":\n\n```python\nfor indice, elemento in enumerate(frutta):\n    print(f"Indice {indice}: {elemento}")\n\n# enumerate() accetta anche un parametro 'start' per iniziare da un numero diverso da 0\nfor indice, elemento in enumerate(frutta, start=1):\n    print(f"Posizione {indice}: {elemento}")\n```\n\n### 7.6 Iterare sui dizionari\n\n```python\ndizionario = {"a": 1, "b": 2, "c": 3}\n\nfor chiave in dizionario:                # itera sulle chiavi\n    print(chiave)\n\nfor valore in dizionario.values():        # itera sui valori\n    print(valore)\n\nfor chiave, valore in dizionario.items(): # itera su coppie chiave-valore\n    print(f"{chiave}: {valore}")\n```\n\n### 7.7 List comprehension: il ciclo `for` in forma compatta\n\nUna delle caratteristiche più distintive e moderne di Python: costruire una lista in un'unica riga.\n\n```python\nquadrati = [n ** 2 for n in range(10)]\nprint(quadrati)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n\n# Con condizione: solo i numeri pari\npari = [n for n in range(20) if n % 2 == 0]\nprint(pari)\n\n# Equivalente "esteso" con ciclo for classico, per confronto:\npari_v2 = []\nfor n in range(20):\n    if n % 2 == 0:\n        pari_v2.append(n)\nprint(pari_v2 == pari)   # True\n```\n\n> 💡 Le list comprehension sono più veloci e concise del corrispondente ciclo `for` con `.append()`, e sono lo standard "pythonico" per costruire liste derivate da altre sequenze.\n\n### 7.8 `zip()`: iterare su più sequenze in parallelo\n\n```python\nnomi = ["Alice", "Bruno", "Carla"]\nvoti = [8, 6, 9]\n\nfor nome, voto in zip(nomi, voti):\n    print(f"{nome}: {voto}")\n```\n\n### 7.9 Best practice\n\n1. Usa `for` quando conosci a priori la sequenza da percorrere.\n2. Usa `range()` per contare un numero fisso di ripetizioni.\n3. Preferisci `enumerate()` a `range(len(...))` quando servono sia indice che valore.\n4. Preferisci iterare direttamente sugli elementi piuttosto che sugli indici, quando l'indice non serve.\n5. Usa le list comprehension per trasformazioni semplici; per logiche complesse, un ciclo `for` classico resta più leggibile.\n\n### 7.10 `for` vs `while`: riepilogo finale\n\n| Costrutto | Quando usarlo |\n|---|---|\n| `for` | Sequenza nota o numero di iterazioni prevedibile |\n| `while` | Condizione dinamica, numero di iterazioni non noto a priori |\n\n---\n\n<a id="appendice"></a>\n**⬆️[Torna all'Indice](#indice)**\n## Appendice — Cheat sheet riassuntivo\n\n### Tipi di dato fondamentali\n\n```python\nint, float, complex   # numerici\nstr                    # testo\nbool                   # booleano (True/False)\nlist, tuple, dict, set # strutture dati (contenitori)\n```\n\n### Operatori — riepilogo generale\n\n| Categoria | Operatori |\n|---|---|\n| Aritmetici | `+  -  *  /  //  %  **` |\n| Confronto | `==  !=  <  >  <=  >=` |\n| Logici | `and  or  not` |\n| Identità | `is  is not` |\n| Appartenenza | `in  not in` |\n| Assegnazione combinata | `+=  -=  *=  /=  //=  %=  **=` |\n\n### Struttura tipica di un programma Python\n\n```python\n# 1. Import delle librerie necessarie\nimport math\n\n# 2. Acquisizione dati (eventuale input utente)\nn = int(input("Inserisci un numero: "))\n\n# 3. Elaborazione con controllo del flusso\nif n < 0:\n    print("Numero negativo, valore assoluto:", abs(n))\nelif n == 0:\n    print("Il numero è zero")\nelse:\n    radice = math.sqrt(n)\n    print(f"La radice quadrata di {n} è {radice:.2f}")\n\n# 4. Output dei risultati\nprint("Elaborazione completata.")\n```\n\n### Errori comuni da evitare\n\n| Errore | Perché succede | Come evitarlo |\n|---|---|---|\n| `ValueError` con `int(input(...))` | L'utente inserisce testo non numerico | Usa `try/except` |\n| Ciclo infinito | La condizione del `while` non cambia mai | Aggiorna sempre la variabile di controllo |\n| `TypeError` su stringhe | Si tenta di modificare un carattere: `s[0] = "x"` | Ricorda: le stringhe sono immutabili |\n| Confondere `/` e `//` | `/` restituisce sempre float | Usa `//` se serve un intero |\n| Confondere `==` e `is` | `is` confronta l'identità, non il valore | Usa `==` per confrontare i contenuti |\n| Indentazione inconsistente | Python usa l'indentazione per delimitare i blocchi | Usa sempre lo stesso numero di spazi (4 è lo standard) |\n\n### Note sulle versioni di Python\n\nQuesta guida è aggiornata alle versioni moderne del linguaggio (Python 3.10 – 3.14). In particolare vengono usate quando utile:\n\n- **f-string** (dalla 3.6) come metodo standard di formattazione.\n- **`match` / `case`** (dalla 3.10) come alternativa al pattern matching multiplo.\n- **Separatore `_` nei numeri** (dalla 3.6) per la leggibilità.\n- **`{variabile = }`** nelle f-string (dalla 3.8) per il debug rapido.\n\nPer approfondire ulteriormente, la documentazione ufficiale (in italiano) è disponibile su [docs.python.org/it/3](https://docs.python.org/it/3/).\n\n---\n\n*Fine della Guida Completa a Python — Prof. Giuseppe Carnabuci.*	5	2026-07-20 15:47:57.421143+00	markdown	15	
480371ea-8b85-4dcf-8543-2cdac3d4d32c	008fd2cd-3ac8-4379-babb-e326e99c8172	Blockchain Guide Full MD	blockchain-guide-full-md	\N	# ⛓️ Guida Completa alla Blockchain\n\n### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com\n\n### Ottimizzata per Google Colab · Aggiornata alle principali tecnologie Blockchain 2026\n\n---\n\n# Come usare questa guida\n\nOgni modulo è pensato per essere copiato **così com'è** in una cella di testo (Markdown) o di codice di Google Colab.\n\nLa guida segue un percorso didattico progressivo: si parte dai concetti fondamentali della Blockchain per arrivare alle principali piattaforme, agli Smart Contract e alle applicazioni nel mondo reale.\n\nNon sono richieste conoscenze pregresse di crittografia, economia o programmazione.\n\nOgni modulo contiene:\n\n- spiegazioni teoriche;\n- esempi pratici;\n- tabelle riassuntive;\n- schemi esplicativi;\n- approfondimenti;\n- curiosità;\n- riepilogo finale.\n\n---\n\n<a id="indice"></a>\n\n# Indice dei moduli\n\n- [M0 — Introduzione alla Blockchain](#m0)\n- [M1 — Il problema della fiducia](#m1)\n- [M2 — Registri distribuiti (Distributed Ledger)](#m2)\n- [M3 — Blocchi e Catena dei Blocchi](#m3)\n- [M4 — Hash crittografici](#m4)\n- [M5 — Crittografia a chiave pubblica e privata](#m5)\n- [M6 — Wallet e firme digitali](#m6)\n- [M7 — Le transazioni](#m7)\n- [M8 — Mining e Proof of Work](#m8)\n- [M9 — Proof of Stake](#m9)\n- [M10 — Bitcoin](#m10)\n- [M11 — Ethereum](#m11)\n- [M12 — Smart Contract](#m12)\n- [M13 — Token digitali](#m13)\n- [M14 — NFT](#m14)\n- [M15 — DeFi (Finanza Decentralizzata)](#m15)\n- [M16 — DAO (Organizzazioni Autonome Decentralizzate)](#m16)\n- [M17 — Layer 1 e Layer 2](#m17)\n- [M18 — Sicurezza della Blockchain](#m18)\n- [M19 — Scalabilità](#m19)\n- [M20 — Blockchain pubbliche, private e permissioned](#m20)\n- [M21 — Applicazioni della Blockchain](#m21)\n- [M22 — Vantaggi e limiti](#m22)\n- [Appendice — Glossario](#appendice)\n- [Appendice — Cheat Sheet](#cheatsheet)\n\n---\n\n<a id="m0"></a>\n**⬆️ [Torna all'Indice](#indice)**\n## M0 — Introduzione alla Blockchain\n\n### 0.1 Cos'è la Blockchain\n\nLa **Blockchain** è una tecnologia informatica che permette di registrare informazioni in modo **sicuro**, **distribuito**, **trasparente** e **immutabile**.\n\nIl termine deriva dall'inglese:\n\n> **Block** = blocco  \n> **Chain** = catena\n\nUna Blockchain è quindi una **catena di blocchi** collegati tra loro mediante algoritmi crittografici.\n\nOgni blocco contiene informazioni e un riferimento matematico al blocco precedente, formando una sequenza cronologica praticamente impossibile da alterare senza che l'intera rete se ne accorga.\n\n---\n\n### 0.2 Una definizione moderna\n\nUna Blockchain può essere definita come:\n\n> Un registro digitale distribuito, condiviso tra migliaia di nodi della rete, nel quale ogni operazione viene verificata tramite algoritmi crittografici e meccanismi di consenso.\n\nQuesta definizione racchiude quattro concetti fondamentali.\n\n| Concetto | Significato |\n|----------|-------------|\n| Registro | Memorizza dati e transazioni |\n| Distribuito | Esiste una copia su molti computer |\n| Crittografico | I dati sono protetti matematicamente |\n| Consenso | Tutta la rete concorda sulla validità delle operazioni |\n\n---\n\n### 0.3 Perché è nata\n\nPer secoli qualsiasi trasferimento di denaro o proprietà ha richiesto un intermediario fidato.\n\nTra questi possiamo citare:\n\n- banche;\n- notai;\n- governi;\n- camere di commercio;\n- registri catastali;\n- società finanziarie.\n\nQuesti enti hanno il compito di garantire la correttezza delle operazioni.\n\nLa Blockchain nasce con un obiettivo rivoluzionario:\n\n> permettere a persone che non si conoscono di effettuare transazioni sicure senza dover necessariamente affidarsi ad un'autorità centrale.\n\n---\n\n### 0.4 Un semplice esempio\n\nImmaginiamo che Mario debba inviare 100 € a Luca.\n\nNel sistema bancario tradizionale il flusso è il seguente.\n\n```\nMario\n   │\n   ▼\nBanca di Mario\n   │\n   ▼\nCircuito Bancario\n   │\n   ▼\nBanca di Luca\n   │\n   ▼\nLuca\n```\n\nLa banca verifica:\n\n- disponibilità del denaro;\n- identità del cliente;\n- autenticità dell'operazione;\n- registrazione del pagamento.\n\nCon una Blockchain il processo diventa molto diverso.\n\n```\nMario\n   │\n   ▼\nRete Blockchain\n   │\n   ▼\nLuca\n```\n\nLa verifica viene effettuata dall'intera rete di nodi e non da una singola banca.\n\n---\n\n### 0.5 Le caratteristiche fondamentali\n\nUna Blockchain moderna possiede generalmente le seguenti proprietà.\n\n| Caratteristica | Descrizione |\n|---------------|-------------|\n| Distribuita | Il registro è copiato su migliaia di computer |\n| Decentralizzata | Non esiste un server centrale |\n| Trasparente | Le transazioni possono essere verificate |\n| Immutabile | I dati non possono essere modificati facilmente |\n| Sicura | Utilizza crittografia avanzata |\n| Cronologica | Le informazioni sono ordinate temporalmente |\n\n---\n\n### 0.6 Dove viene utilizzata\n\nOggi la Blockchain viene utilizzata in numerosi settori.\n\nTra i principali troviamo:\n\n- finanza;\n- criptovalute;\n- supply chain;\n- sanità;\n- identità digitale;\n- certificazione documentale;\n- assicurazioni;\n- industria;\n- pubblica amministrazione;\n- Internet of Things.\n\n---\n\n### 0.7 Blockchain e Bitcoin non sono la stessa cosa\n\nUno degli errori più comuni consiste nel confondere Blockchain e Bitcoin.\n\nIn realtà:\n\n- **Blockchain** è una tecnologia.\n- **Bitcoin** è una delle applicazioni che utilizzano tale tecnologia.\n\nAllo stesso modo esistono molte altre Blockchain, tra cui:\n\n- Ethereum;\n- Solana;\n- Cardano;\n- Avalanche;\n- Polygon;\n- BNB Chain.\n\n---\n\n### 0.8 Un esempio intuitivo\n\nImmaginiamo un grande quaderno condiviso tra migliaia di persone.\n\nOgni pagina rappresenta un blocco.\n\nOgni nuova pagina contiene:\n\n- nuovi dati;\n- il riferimento alla pagina precedente;\n- una firma matematica della pagina precedente.\n\nSe qualcuno modifica una vecchia pagina, tutte le firme delle pagine successive diventano immediatamente non valide.\n\nQuesto rende evidente qualsiasi tentativo di manomissione.\n\n---\n\n### 0.9 Perché è considerata rivoluzionaria\n\nInternet ha rivoluzionato lo scambio di informazioni.\n\nLa Blockchain rivoluziona lo scambio di valore.\n\nGrazie a questa tecnologia diventa possibile trasferire:\n\n- denaro;\n- proprietà;\n- certificati;\n- identità digitali;\n- documenti;\n- diritti digitali.\n\nIl tutto senza la necessità di un'autorità centrale che controlli ogni operazione.\n\n---\n\n### 0.10 Concetti chiave\n\nAl termine di questo modulo dovresti conoscere i seguenti termini.\n\n| Termine | Significato |\n|----------|-------------|\n| Blockchain | Registro distribuito |\n| Nodo | Computer della rete |\n| Blocco | Insieme di dati e transazioni |\n| Hash | Impronta digitale di un blocco |\n| Consenso | Accordo della rete |\n| Decentralizzazione | Assenza di un'autorità centrale |\n\n---\n\n<a id="m1"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n## M1 — Il problema della fiducia\n\n### 1.1 La fiducia nella società\n\nOgni giorno compiamo centinaia di operazioni basate sulla fiducia.\n\nAd esempio:\n\n- effettuare un bonifico;\n- pagare con carta di credito;\n- acquistare online;\n- firmare un contratto;\n- registrare una proprietà.\n\nIn tutti questi casi ci affidiamo ad un intermediario che garantisce la correttezza dell'operazione.\n\n---\n\n### 1.2 Il ruolo degli intermediari\n\nGli intermediari svolgono funzioni essenziali.\n\nTra queste:\n\n- verificano l'identità delle persone;\n- controllano la disponibilità del denaro;\n- impediscono le frodi;\n- conservano i registri ufficiali;\n- certificano i trasferimenti di proprietà;\n- risolvono eventuali controversie.\n\nSenza questi soggetti il sistema economico tradizionale avrebbe enormi difficoltà a funzionare.\n\n---\n\n### 1.3 Gli svantaggi degli intermediari\n\nL'esistenza di un'autorità centrale comporta però alcuni limiti.\n\n| Problema | Conseguenza |\n|----------|-------------|\n| Commissioni | Costi aggiuntivi |\n| Tempi | Operazioni lente |\n| Centralizzazione | Punto singolo di guasto |\n| Controllo | Elevata concentrazione del potere |\n| Disponibilità | Possibili interruzioni del servizio |\n\n---\n\n### 1.4 Il problema del doppio pagamento\n\nUno dei problemi più importanti dell'informatica è il cosiddetto **Double Spending**.\n\nLa domanda è la seguente.\n\n> Come impedire che una persona utilizzi due volte lo stesso denaro digitale?\n\nAd esempio.\n\nMario possiede un solo Bitcoin.\n\nPotrebbe tentare di inviarlo contemporaneamente:\n\n- a Luca;\n- a Marco.\n\nQuale delle due transazioni deve essere considerata valida?\n\nLa soluzione a questo problema rappresenta una delle innovazioni fondamentali introdotte dalla Blockchain e sarà approfondita nei moduli successivi.\n\n---\n\n<a id="m2"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n## M2 — Registri distribuiti (Distributed Ledger)\n\n### 2.1 Cos'è un registro\n\nUn **registro** è un archivio nel quale vengono annotate informazioni in ordine cronologico.\n\nFin dall'antichità i registri sono stati utilizzati per conservare informazioni riguardanti:\n\n- proprietà;\n- contratti;\n- debiti;\n- crediti;\n- nascite;\n- matrimoni;\n- compravendite.\n\nAnche oggi moltissime organizzazioni utilizzano registri digitali.\n\nAd esempio:\n\n- banche;\n- comuni;\n- ospedali;\n- università;\n- aziende.\n\n---\n\n### 2.2 Registro centralizzato\n\nIl modello tradizionale prevede un unico archivio centrale.\n\n```\n               Registro Centrale\n                      │\n     ┌────────────────┼────────────────┐\n     │                │                │\n Cliente A       Cliente B       Cliente C\n```\n\nTutti gli utenti devono interrogare il medesimo server.\n\nQuesto approccio è semplice da gestire ma presenta alcuni limiti.\n\n---\n\n### 2.3 Limiti della centralizzazione\n\nQuando esiste un solo archivio possono verificarsi diversi problemi.\n\n| Problema | Conseguenza |\n|----------|-------------|\n| Guasto del server | Tutto il servizio si interrompe |\n| Attacco informatico | Possibile perdita dei dati |\n| Errore umano | Informazioni compromesse |\n| Censura | Alcuni dati possono essere nascosti |\n| Controllo centralizzato | Una sola organizzazione decide tutto |\n\nQuesto viene definito **Single Point of Failure**, cioè un punto unico il cui malfunzionamento compromette l'intero sistema.\n\n---\n\n### 2.4 Il registro distribuito\n\nLa Blockchain introduce un concetto completamente diverso.\n\nIl registro non viene conservato da un solo computer.\n\nOgni nodo della rete possiede una copia completa dello stesso registro.\n\n```\nNodo A  ◄────────────► Nodo B\n  ▲                        ▲\n  │                        │\n  ▼                        ▼\nNodo C ◄────────────► Nodo D\n```\n\nTutti i nodi collaborano continuamente per mantenere sincronizzate le informazioni.\n\n---\n\n### 2.5 Cos'è un Distributed Ledger\n\nUn **Distributed Ledger** (registro distribuito) è un archivio condiviso tra numerosi computer appartenenti ad una rete.\n\nOgni modifica viene propagata a tutti i partecipanti.\n\nIn questo modo ogni nodo conserva una copia aggiornata del registro.\n\nLe caratteristiche principali sono:\n\n- replica dei dati;\n- sincronizzazione continua;\n- assenza di un server centrale;\n- elevata disponibilità;\n- elevata affidabilità.\n\n---\n\n### 2.6 Blockchain e Distributed Ledger\n\nSpesso i due termini vengono confusi.\n\nNon sono però sinonimi.\n\n| Blockchain | Distributed Ledger |\n|-------------|--------------------|\n| È un particolare tipo di registro distribuito | È la categoria generale |\n| I dati sono organizzati in blocchi concatenati | I dati possono essere organizzati in modi differenti |\n| Utilizza hash per collegare i blocchi | Non necessariamente usa blocchi concatenati |\n\nPossiamo quindi affermare che:\n\n> Ogni Blockchain è un Distributed Ledger, ma non tutti i Distributed Ledger sono Blockchain.\n\n---\n\n### 2.7 I nodi della rete\n\nOgni computer che partecipa alla Blockchain prende il nome di **nodo** (*Node*).\n\nUn nodo può svolgere diversi compiti.\n\nAd esempio:\n\n- conservare una copia della Blockchain;\n- verificare le transazioni;\n- trasmettere informazioni agli altri nodi;\n- partecipare al consenso;\n- validare nuovi blocchi.\n\nPiù nodi sono presenti, maggiore sarà la resilienza della rete.\n\n---\n\n### 2.8 Replica delle informazioni\n\nSupponiamo che la rete sia composta da quattro nodi.\n\n```\nNodo A\nSaldo Mario = 100\n\nNodo B\nSaldo Mario = 100\n\nNodo C\nSaldo Mario = 100\n\nNodo D\nSaldo Mario = 100\n```\n\nQuando Mario invia del denaro, tutti i nodi aggiornano il registro.\n\n```\nNodo A\nSaldo Mario = 70\n\nNodo B\nSaldo Mario = 70\n\nNodo C\nSaldo Mario = 70\n\nNodo D\nSaldo Mario = 70\n```\n\nOgni copia rimane perfettamente sincronizzata.\n\n---\n\n### 2.9 Perché distribuire i dati\n\nDistribuire le informazioni offre numerosi vantaggi.\n\n| Vantaggio | Descrizione |\n|-----------|-------------|\n| Ridondanza | Esistono molte copie dei dati |\n| Disponibilità | Il servizio continua anche se alcuni nodi si spengono |\n| Sicurezza | È molto difficile alterare contemporaneamente tutte le copie |\n| Affidabilità | Nessun computer è indispensabile |\n| Scalabilità | Nuovi nodi possono essere aggiunti alla rete |\n\n---\n\n### 2.10 Un esempio pratico\n\nImmaginiamo una classe di studenti.\n\nOgni studente possiede una copia identica del registro dei voti.\n\nQuando il professore assegna un nuovo voto:\n\n- tutti aggiornano contemporaneamente il proprio registro;\n- ogni copia rimane identica alle altre.\n\nSe uno studente tenta di modificare soltanto il proprio registro:\n\n```\nRegistro Studente A = 8\n\nRegistro Studente B = 8\n\nRegistro Studente C = 10   ❌\n\nRegistro Studente D = 8\n```\n\nL'errore viene immediatamente individuato confrontando le varie copie.\n\nQuesto è uno dei principi fondamentali della Blockchain.\n\n---\n\n### 2.11 Concetti chiave\n\nAl termine di questo modulo dovresti conoscere i seguenti termini.\n\n| Termine | Significato |\n|----------|-------------|\n| Registro | Archivio delle informazioni |\n| Ledger | Registro digitale |\n| Distributed Ledger | Registro distribuito tra molti computer |\n| Nodo | Computer appartenente alla rete |\n| Replica | Copia sincronizzata dei dati |\n| Single Point of Failure | Punto unico il cui guasto compromette il sistema |\n\n---\n\n<a id="m3"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n## M3 — Blocchi e Catena dei Blocchi\n\n### 3.1 Cos'è un blocco\n\nL'elemento fondamentale della Blockchain è il **blocco**.\n\nUn blocco è una struttura dati che contiene un insieme di informazioni validate dalla rete.\n\nGeneralmente un blocco contiene:\n\n- elenco delle transazioni;\n- data e ora di creazione;\n- hash del blocco precedente;\n- hash del blocco corrente;\n- altri dati tecnici necessari al funzionamento della rete.\n\nOgni blocco rappresenta quindi una "pagina" del grande registro distribuito.\n\n---\n\n### 3.2 La struttura logica di un blocco\n\nIn modo semplificato possiamo rappresentare un blocco nel seguente modo.\n\n```\n+--------------------------------------+\n| Numero del blocco                    |\n+--------------------------------------+\n| Timestamp                            |\n+--------------------------------------+\n| Elenco delle transazioni             |\n+--------------------------------------+\n| Hash del blocco precedente           |\n+--------------------------------------+\n| Hash del blocco corrente             |\n+--------------------------------------+\n```\n\nOgni campo svolge un ruolo fondamentale per garantire l'integrità dell'intera Blockchain.\n\n---\n\n### 3.3 Perché si chiamano "blocchi"\n\nLe transazioni non vengono aggiunte una alla volta.\n\nLa rete le raccoglie in gruppi.\n\nOgni gruppo forma un nuovo blocco.\n\nAd esempio:\n\n```\nBlocco 105\n\nTransazione 1\nTransazione 2\nTransazione 3\nTransazione 4\nTransazione 5\n```\n\nQuando il blocco è completo e validato viene aggiunto alla catena.\n\n---\n\n### 3.4 La catena dei blocchi\n\nOgni blocco contiene l'hash del blocco precedente.\n\nQuesto crea una vera e propria catena.\n\n```\nBlocco 1\n    │\n    ▼\nBlocco 2\n    │\n    ▼\nBlocco 3\n    │\n    ▼\nBlocco 4\n    │\n    ▼\nBlocco 5\n```\n\nOgni nuovo blocco dipende matematicamente da quello precedente.\n\nQuesta caratteristica rende estremamente difficile alterare la cronologia delle informazioni.\n\n---\n\n### 3.5 Il blocco Genesis\n\nIl primo blocco di ogni Blockchain prende il nome di:\n\n> **Genesis Block**\n\nIl Genesis Block rappresenta l'origine dell'intera catena.\n\nNon possiede alcun blocco precedente e costituisce il punto di partenza della Blockchain.\n\n```\nGenesis Block\n      │\n      ▼\nBlocco 1\n      │\n      ▼\nBlocco 2\n```\n\nNel caso di Bitcoin il Genesis Block fu creato il **3 gennaio 2009** da Satoshi Nakamoto.\n\n---\n\n### 3.6 Il collegamento tra i blocchi\n\nIl vero elemento innovativo della Blockchain è il collegamento matematico tra i blocchi.\n\nOgni blocco contiene infatti l'**hash del blocco precedente**.\n\nAd esempio.\n\n```\nBlocco 1\nHash: A8F92...\n\n        │\n\n        ▼\n\nBlocco 2\nHash precedente: A8F92...\nHash: 5CD71...\n\n        │\n\n        ▼\n\nBlocco 3\nHash precedente: 5CD71...\nHash: E41BF...\n```\n\nQuesto meccanismo garantisce che ogni blocco dipenda da tutti quelli precedenti.\n\n---\n\n### 3.7 Perché non si possono modificare i blocchi\n\nSupponiamo che un malintenzionato tenti di modificare una transazione presente nel Blocco 2.\n\nAccadrebbe immediatamente quanto segue.\n\n```\nBlocco 1 ✓\n\n↓\n\nBlocco 2 ❌ modificato\n\n↓\n\nBlocco 3 ❌ hash non più valido\n\n↓\n\nBlocco 4 ❌ hash non più valido\n\n↓\n\nBlocco 5 ❌ hash non più valido\n```\n\nLa modifica di un singolo dato cambia completamente l'hash del blocco.\n\nDi conseguenza tutti i blocchi successivi diventano automaticamente non validi.\n\nQuesto rende estremamente difficile alterare la cronologia delle informazioni.\n\n---\n\n### 3.8 Aggiunta di un nuovo blocco\n\nL'aggiunta di un nuovo blocco segue una sequenza ben precisa.\n\n1. Gli utenti inviano nuove transazioni.\n2. Le transazioni vengono raccolte.\n3. I nodi verificano la loro validità.\n4. Viene costruito un nuovo blocco.\n5. Il blocco viene validato.\n6. Il blocco viene aggiunto alla Blockchain.\n7. Tutti i nodi aggiornano la propria copia.\n\nLo schema può essere rappresentato così.\n\n```\nTransazioni\n\n      │\n\n      ▼\n\nVerifica\n\n      │\n\n      ▼\n\nNuovo Blocco\n\n      │\n\n      ▼\n\nValidazione\n\n      │\n\n      ▼\n\nBlockchain aggiornata\n```\n\n---\n\n### 3.9 Timestamp\n\nOgni blocco contiene un'informazione molto importante:\n\nil **Timestamp**.\n\nIl Timestamp rappresenta la data e l'ora di creazione del blocco.\n\nAd esempio.\n\n| Blocco | Timestamp |\n|---------|-----------|\n| 102 | 08/03/2026 10:32 |\n| 103 | 08/03/2026 10:41 |\n| 104 | 08/03/2026 10:53 |\n\nIl Timestamp permette di ricostruire con precisione l'ordine cronologico delle operazioni.\n\n---\n\n### 3.10 Numero del blocco\n\nOgni blocco possiede anche un identificativo progressivo.\n\nAd esempio.\n\n| Numero | Contenuto |\n|----------|-----------|\n| 0 | Genesis Block |\n| 1 | Primo blocco |\n| 2 | Secondo blocco |\n| 3 | Terzo blocco |\n\nNella pratica il numero del blocco prende il nome di **Block Height**.\n\nMaggiore è il Block Height, maggiore è la lunghezza della Blockchain.\n\n---\n\n### 3.11 Crescita della Blockchain\n\nUna Blockchain non viene mai sovrascritta.\n\nOgni nuovo blocco viene semplicemente aggiunto alla fine della catena.\n\n```\nGenesi\n\n↓\n\nBlocco 1\n\n↓\n\nBlocco 2\n\n↓\n\nBlocco 3\n\n↓\n\nBlocco 4\n\n↓\n\nBlocco 5\n\n↓\n\n...\n\n↓\n\nBlocco 1.000.000\n```\n\nLa Blockchain cresce continuamente nel tempo.\n\n---\n\n### 3.12 Concetti chiave\n\nAl termine di questo modulo dovresti conoscere i seguenti termini.\n\n| Termine | Significato |\n|----------|-------------|\n| Blocco | Insieme di transazioni validate |\n| Blockchain | Sequenza di blocchi collegati |\n| Genesis Block | Primo blocco della catena |\n| Timestamp | Data e ora del blocco |\n| Block Height | Numero progressivo del blocco |\n| Hash precedente | Collegamento matematico con il blocco precedente |\n\n---\n\n<a id="m4"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n## M4 — Hash crittografici\n\n### 4.1 Cos'è un hash\n\nUno degli elementi più importanti della Blockchain è l'**hash crittografico**.\n\nUn hash è una sequenza di caratteri ottenuta applicando una funzione matematica ad un insieme di dati.\n\nL'hash può essere considerato come una vera e propria **impronta digitale** dei dati.\n\nOgni contenuto produce un hash differente.\n\n---\n\n### 4.2 Un esempio\n\nSupponiamo di calcolare l'hash della parola:\n\n```\nBlockchain\n```\n\nIl risultato potrebbe essere:\n\n```\n4E8A8F7C5B90D1...\n```\n\nSe modifichiamo anche una sola lettera.\n\n```\nBlockChain\n```\n\notteniamo un risultato completamente diverso.\n\n```\n91BC4AEE0D62F3...\n```\n\nQuesto comportamento prende il nome di **Effetto Valanga (Avalanche Effect)**.\n\n---\n\n### 4.3 Proprietà degli hash\n\nUna buona funzione di hash possiede alcune caratteristiche fondamentali.\n\n| Proprietà | Descrizione |\n|------------|-------------|\n| Deterministica | Gli stessi dati producono sempre lo stesso hash |\n| Veloce | Il calcolo richiede poco tempo |\n| Unidirezionale | Non è possibile ricavare i dati originali |\n| Sensibile | Basta modificare un bit per ottenere un hash completamente diverso |\n| Resistente alle collisioni | È estremamente improbabile ottenere lo stesso hash da dati differenti |\n\n---\n\n### 4.4 L'impronta digitale dei dati\n\nCome ogni persona possiede impronte digitali uniche, anche ogni insieme di dati possiede un hash praticamente unico.\n\n```\nDocumento A\n\n↓\n\nHash A\n\n------------------\n\nDocumento B\n\n↓\n\nHash B\n```\n\nSe i documenti sono differenti, anche gli hash saranno differenti.\n\n---\n\n### 4.5 SHA-256\n\nBitcoin utilizza principalmente una funzione chiamata:\n\n**SHA-256**\n\nIl nome significa:\n\nSecure Hash Algorithm 256 bit.\n\nProduce un hash lungo sempre:\n\n**256 bit**\n\novvero:\n\n**64 caratteri esadecimali**.\n\nAd esempio.\n\n```\nBA7816BF8F01CFEA414140DE5DAE2223...\n```\n\nQualunque sia la dimensione del file originale, il risultato avrà sempre la stessa lunghezza.\n\n---\n\n### 4.6 Perché l'hash è così importante\n\nNella Blockchain gli hash vengono utilizzati per:\n\n- identificare i blocchi;\n- collegare i blocchi;\n- verificare l'integrità dei dati;\n- impedire modifiche non autorizzate;\n- costruire le Proof of Work;\n- garantire l'immutabilità del registro.\n\nSenza gli hash la Blockchain non potrebbe esistere.\n\n---\n\n### 4.7 Come viene calcolato un hash\n\nUna funzione di hash riceve in ingresso un insieme qualsiasi di dati.\n\nPuò trattarsi di:\n\n- una parola;\n- un documento;\n- una fotografia;\n- un video;\n- un blocco della Blockchain.\n\nIl risultato sarà sempre una stringa di lunghezza fissa.\n\n```\nDati\n\n      │\n\n      ▼\n\nFunzione Hash\n\n      │\n\n      ▼\n\nHash\n```\n\nL'algoritmo non "comprende" il significato dei dati.\n\nEsegue semplicemente una trasformazione matematica.\n\n---\n\n### 4.8 Effetto valanga (Avalanche Effect)\n\nUna delle proprietà più importanti delle funzioni hash è il cosiddetto **Effetto Valanga**.\n\nSignifica che basta modificare un solo carattere del testo originale per ottenere un hash completamente differente.\n\nEsempio.\n\n```\nBlockchain\n```\n\n↓\n\n```\n6F8A72...\n```\n\nModificando una sola lettera.\n\n```\nBlockchaim\n```\n\n↓\n\n```\nA19CF4...\n```\n\nNon esiste alcuna somiglianza visibile tra i due risultati.\n\nQuesta proprietà rende immediatamente individuabili eventuali modifiche ai dati.\n\n---\n\n### 4.9 Collisioni\n\nUna **collisione** si verifica quando due contenuti differenti producono lo stesso hash.\n\nIdealmente ciò non dovrebbe mai accadere.\n\nLe moderne funzioni crittografiche sono progettate affinché la probabilità di collisione sia estremamente bassa.\n\nPer SHA-256 tale probabilità è così ridotta da poter essere considerata trascurabile nelle applicazioni pratiche.\n\n---\n\n### 4.10 Hash nei blocchi\n\nOgni blocco possiede un proprio hash.\n\nAd esempio.\n\n```\nBlocco 101\n\nHash\n\n8AFD12...\n```\n\nIl blocco successivo memorizza proprio questo valore.\n\n```\nBlocco 102\n\nHash precedente\n\n8AFD12...\n```\n\nIn questo modo i blocchi risultano concatenati tra loro.\n\n---\n\n### 4.11 Integrità dei dati\n\nSupponiamo di modificare una transazione presente nel blocco.\n\nPrima della modifica.\n\n```\nHash\n\nAB91E7...\n```\n\nDopo la modifica.\n\n```\nHash\n\n6DD41F...\n```\n\nL'hash cambia completamente.\n\nLa rete si accorge immediatamente che il blocco è stato alterato.\n\n---\n\n### 4.12 Un esempio reale\n\nImmaginiamo un documento PDF contenente un diploma.\n\nL'università calcola il suo hash.\n\n```\nDiploma.pdf\n\n↓\n\nHash\n\n92A3FD7E...\n```\n\nAnni dopo sarà sufficiente ricalcolare l'hash del documento.\n\nSe il nuovo hash coincide con quello originale, il documento non è mai stato modificato.\n\nQuesto principio viene utilizzato anche nella conservazione digitale dei documenti.\n\n---\n\n### 4.13 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Hash | Impronta digitale dei dati |\n| SHA-256 | Funzione hash utilizzata da Bitcoin |\n| Collisione | Due dati con lo stesso hash |\n| Avalanche Effect | Piccole modifiche producono hash completamente diversi |\n| Integrità | Possibilità di verificare che i dati non siano stati alterati |\n\n---\n\n<a id="m5"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M5 — Crittografia a chiave pubblica e privata\n\n### 5.1 Cos'è la crittografia\n\nLa **crittografia** è la disciplina che permette di proteggere le informazioni rendendole leggibili soltanto alle persone autorizzate.\n\nLa parola deriva dal greco:\n\n- **Kryptós** → nascosto\n- **Graphía** → scrittura\n\nIl suo obiettivo principale è garantire:\n\n- riservatezza;\n- autenticità;\n- integrità;\n- non ripudio.\n\n---\n\n### 5.2 Dalla crittografia classica a quella moderna\n\nIn passato venivano utilizzati metodi relativamente semplici.\n\nTra questi ricordiamo:\n\n- Cifrario di Cesare;\n- Scitala spartana;\n- Cifrario di Vigenère.\n\nOggi invece vengono utilizzati algoritmi matematici estremamente complessi, progettati per resistere anche ai moderni supercomputer.\n\n---\n\n### 5.3 Crittografia simmetrica\n\nNella crittografia simmetrica si utilizza una sola chiave.\n\n```\nMessaggio\n\n↓\n\nChiave Segreta\n\n↓\n\nMessaggio Cifrato\n\n↓\n\nChiave Segreta\n\n↓\n\nMessaggio Originale\n```\n\nLo stesso segreto viene utilizzato sia per cifrare sia per decifrare.\n\nIl problema principale consiste nel distribuire la chiave in modo sicuro.\n\n---\n\n### 5.4 Crittografia asimmetrica\n\nLa Blockchain utilizza prevalentemente la **crittografia asimmetrica**.\n\nIn questo modello esistono due chiavi differenti.\n\n```\nChiave Privata\n\n↓\n\nGenerazione\n\n↓\n\nChiave Pubblica\n```\n\nLe due chiavi sono matematicamente collegate.\n\nConoscere la chiave pubblica non permette di ricavare quella privata.\n\n---\n\n### 5.5 La chiave privata\n\nLa **Private Key** rappresenta il vero segreto dell'utente.\n\nEssa permette di:\n\n- firmare le transazioni;\n- autorizzare i pagamenti;\n- dimostrare la proprietà dei fondi.\n\nChiunque entri in possesso della chiave privata può controllare completamente il relativo wallet.\n\nPer questo motivo deve essere custodita con estrema attenzione.\n\n---\n\n### 5.6 La chiave pubblica\n\nLa **Public Key** può invece essere condivisa liberamente.\n\nServe principalmente a:\n\n- identificare un utente;\n- verificare una firma digitale;\n- ricevere fondi.\n\nConoscere la chiave pubblica non comporta alcun rischio diretto.\n\n---\n\n### 5.7 Un esempio intuitivo\n\nImmaginiamo una cassetta postale.\n\nChiunque può inserire una lettera.\n\nSolo il proprietario possiede la chiave per aprirla.\n\n```\nChiunque\n\n↓\n\nInserisce la lettera\n\n↓\n\n📮\n\n↓\n\nSolo il proprietario apre la cassetta\n```\n\nLa chiave pubblica funziona in modo analogo.\n\nPermette di ricevere informazioni.\n\nLa chiave privata permette invece di accedervi.\n\n---\n\n### 5.8 Perché la Blockchain usa due chiavi\n\nL'utilizzo della coppia di chiavi offre numerosi vantaggi.\n\n| Vantaggio | Descrizione |\n|-----------|-------------|\n| Sicurezza | La chiave privata non viene mai condivisa |\n| Autenticità | È possibile dimostrare chi ha firmato una transazione |\n| Integrità | Le modifiche vengono immediatamente rilevate |\n| Scalabilità | Milioni di utenti possono operare contemporaneamente |\n\n---\n\n### 5.9 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Crittografia | Protezione matematica delle informazioni |\n| Chiave Privata | Segreto utilizzato per firmare |\n| Chiave Pubblica | Identificatore condivisibile |\n| Crittografia Simmetrica | Una sola chiave |\n| Crittografia Asimmetrica | Coppia di chiavi matematicamente collegate |\n\n---\n\n<a id="m6"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M6 — Wallet e firme digitali\n\n### 6.1 Cos'è un Wallet\n\nQuando si parla di Blockchain, il termine **Wallet** viene spesso tradotto come "portafoglio digitale".\n\nIn realtà un Wallet **non contiene materialmente criptovalute**.\n\nLe criptovalute rimangono sempre registrate sulla Blockchain.\n\nIl Wallet custodisce invece le informazioni necessarie per dimostrarne il possesso.\n\nIn particolare conserva:\n\n- la chiave privata;\n- la chiave pubblica;\n- gli indirizzi della Blockchain.\n\n---\n\n### 6.2 Un concetto importante\n\nÈ utile ricordare che:\n\n> Le criptovalute non vengono memorizzate nel Wallet.\n\nEsse sono registrate all'interno della Blockchain.\n\nIl Wallet rappresenta semplicemente lo strumento che permette all'utente di autorizzarne l'utilizzo.\n\n---\n\n### 6.3 Come funziona un Wallet\n\nIl funzionamento può essere rappresentato nel seguente schema.\n\n```\nChiave Privata\n        │\n        ▼\nGenerazione\n        │\n        ▼\nChiave Pubblica\n        │\n        ▼\nIndirizzo Blockchain\n```\n\nOgni indirizzo è associato ad una particolare coppia di chiavi crittografiche.\n\n---\n\n### 6.4 Indirizzo Blockchain\n\nL'indirizzo rappresenta l'equivalente dell'IBAN nel sistema bancario tradizionale.\n\nPuò essere condiviso pubblicamente.\n\nAd esempio.\n\n```\n1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\n```\n\noppure\n\n```\n0x7A250d5630B4CF539739DF2C5DACB4C659F2488D\n```\n\nChiunque può conoscere un indirizzo senza compromettere la sicurezza del proprietario.\n\n---\n\n### 6.5 Chiave privata\n\nLa chiave privata è invece il vero segreto.\n\nEssa permette di:\n\n- autorizzare pagamenti;\n- firmare transazioni;\n- dimostrare la proprietà dei fondi.\n\nUna tipica chiave privata è composta da una lunga sequenza casuale di caratteri.\n\nAd esempio.\n\n```\n5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWvm...\n```\n\nNon deve mai essere condivisa.\n\n---\n\n### 6.6 Perché la chiave privata è così importante\n\nPossedere la chiave privata equivale a possedere i fondi.\n\nSe qualcuno entra in possesso della chiave privata può:\n\n- trasferire tutte le criptovalute;\n- autorizzare transazioni;\n- firmare documenti digitali.\n\nPer questo motivo vale una semplice regola.\n\n> Chi possiede la chiave privata controlla il Wallet.\n\n---\n\n### 6.7 Tipologie di Wallet\n\nEsistono differenti categorie di Wallet.\n\n| Tipo | Caratteristiche |\n|------|-----------------|\n| Software Wallet | Applicazione installata sul computer o smartphone |\n| Hardware Wallet | Dispositivo fisico dedicato |\n| Paper Wallet | Chiavi stampate su carta |\n| Web Wallet | Accessibile tramite browser |\n| Mobile Wallet | Applicazione per smartphone |\n\nOgni soluzione presenta vantaggi e svantaggi differenti.\n\n---\n\n### 6.8 Hot Wallet\n\nUn **Hot Wallet** è sempre collegato ad Internet.\n\nVantaggi:\n\n- molto pratico;\n- veloce;\n- ideale per l'uso quotidiano.\n\nSvantaggi:\n\n- maggiore esposizione agli attacchi informatici.\n\n---\n\n### 6.9 Cold Wallet\n\nUn **Cold Wallet** rimane invece scollegato dalla rete.\n\nEsempi:\n\n- Hardware Wallet;\n- Paper Wallet.\n\nVantaggi:\n\n- elevata sicurezza;\n- protezione dagli attacchi online.\n\nSvantaggi:\n\n- utilizzo meno immediato.\n\n---\n\n### 6.10 Seed Phrase\n\nQuando viene creato un Wallet viene generalmente generata una frase di recupero.\n\nQuesta prende il nome di:\n\n**Seed Phrase**\n\nÈ composta normalmente da:\n\n- 12 parole;\n- 18 parole;\n- 24 parole.\n\nEsempio.\n\n```\napple\nriver\nfuture\ncoffee\nplanet\ndesk\n...\n```\n\nLa Seed Phrase permette di ricostruire completamente il Wallet in caso di perdita del dispositivo.\n\n---\n\n### 6.11 Regole fondamentali\n\nLa Seed Phrase deve essere:\n\n- conservata offline;\n- custodita in luogo sicuro;\n- mai fotografata;\n- mai inviata tramite e-mail;\n- mai condivisa con nessuno.\n\nLa perdita della Seed Phrase può comportare la perdita definitiva dell'accesso ai propri fondi.\n\n---\n\n### 6.12 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Wallet | Strumento che gestisce le chiavi crittografiche |\n| Indirizzo | Identificativo pubblico |\n| Private Key | Chiave segreta |\n| Public Key | Chiave pubblica |\n| Seed Phrase | Frase di recupero del Wallet |\n| Cold Wallet | Wallet offline |\n| Hot Wallet | Wallet collegato a Internet |\n\n---\n\n<a id="m7"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M7 — Le transazioni\n\n### 7.1 Cos'è una transazione\n\nUna **transazione** rappresenta un'operazione registrata sulla Blockchain.\n\nPuò riguardare:\n\n- trasferimento di criptovalute;\n- esecuzione di Smart Contract;\n- registrazione di dati;\n- emissione di token;\n- trasferimento di NFT.\n\nOgni transazione diventa parte permanente della Blockchain.\n\n---\n\n### 7.2 Componenti di una transazione\n\nUna tipica transazione contiene:\n\n- indirizzo del mittente;\n- indirizzo del destinatario;\n- importo;\n- firma digitale;\n- commissione;\n- timestamp.\n\nIn forma semplificata.\n\n```\nMittente\n\n↓\n\nDestinatario\n\n↓\n\nImporto\n\n↓\n\nFirma Digitale\n\n↓\n\nCommissione\n```\n\n---\n\n### 7.3 Creazione della transazione\n\nQuando un utente desidera inviare criptovaluta, il Wallet costruisce automaticamente una nuova transazione.\n\nIl processo è il seguente.\n\n```\nUtente\n\n↓\n\nWallet\n\n↓\n\nCreazione Transazione\n\n↓\n\nFirma Digitale\n\n↓\n\nInvio alla Rete\n```\n\nLa transazione non viene ancora registrata.\n\nEssa viene semplicemente inviata ai nodi della Blockchain.\n\n---\n\n### 7.4 Verifica\n\nI nodi della rete effettuano numerosi controlli.\n\nTra questi:\n\n- validità della firma;\n- disponibilità dei fondi;\n- correttezza del formato;\n- assenza di doppia spesa;\n- rispetto delle regole del protocollo.\n\nSolo le transazioni corrette possono proseguire.\n\n---\n\n### 7.5 Mempool\n\nLe transazioni valide vengono inserite in una particolare area temporanea chiamata:\n\n**Mempool**\n\nLa Mempool rappresenta una sorta di sala d'attesa.\n\n```\nTransazioni\n\n↓\n\nMempool\n\n↓\n\nNuovo Blocco\n```\n\nQuando viene creato un nuovo blocco, le transazioni presenti nella Mempool vengono selezionate e inserite nella Blockchain.\n\n---\n\n### 7.6 Conferme\n\nUna transazione non è considerata immediatamente definitiva.\n\nOgni nuovo blocco aggiunto dopo quello contenente la transazione costituisce una nuova conferma.\n\nAd esempio.\n\n```\nBlocco 500\n\n↓\n\nBlocco 501\n\n↓\n\nBlocco 502\n```\n\nSe la transazione è presente nel Blocco 500:\n\n- dopo il Blocco 501 possiede una conferma;\n- dopo il Blocco 502 possiede due conferme;\n- e così via.\n\nMaggiore è il numero delle conferme, maggiore è il livello di sicurezza.\n\n---\n\n### 7.7 Commissioni\n\nPer elaborare una transazione è generalmente necessario pagare una commissione.\n\nLa commissione serve a:\n\n- remunerare validatori o miner;\n- evitare spam sulla rete;\n- incentivare il corretto funzionamento della Blockchain.\n\nOgni Blockchain utilizza un proprio sistema di calcolo delle commissioni.\n\n---\n\n### 7.8 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Transazione | Operazione registrata sulla Blockchain |\n| Mempool | Area temporanea delle transazioni in attesa |\n| Conferma | Validazione successiva di una transazione |\n| Commissione | Costo per elaborare la transazione |\n| Firma Digitale | Prova crittografica dell'autore della transazione |\n\n---\n\n<a id="m8"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M8 — Mining e Proof of Work\n\n### 8.1 Cos'è il Mining\n\nIl termine **Mining** significa letteralmente **estrazione**.\n\nIl nome deriva dal mondo minerario, dove per ottenere un minerale prezioso è necessario svolgere un intenso lavoro.\n\nNella Blockchain il Mining consiste nel processo mediante il quale nuovi blocchi vengono validati e aggiunti alla catena.\n\nI computer che svolgono questo lavoro prendono il nome di:\n\n**Miner**\n\n---\n\n### 8.2 Perché serve il Mining\n\nIl Mining svolge numerose funzioni fondamentali.\n\nTra queste:\n\n- verifica le transazioni;\n- impedisce il doppio pagamento;\n- protegge la rete dagli attacchi;\n- mantiene sincronizzata la Blockchain;\n- permette la creazione di nuovi blocchi.\n\nSenza il Mining la Blockchain di Bitcoin non potrebbe funzionare.\n\n---\n\n### 8.3 Come lavora un Miner\n\nOgni Miner riceve le transazioni presenti nella Mempool.\n\n```\nMempool\n\n↓\n\nMiner\n\n↓\n\nNuovo Blocco\n```\n\nIl Miner verifica che tutte le transazioni siano corrette.\n\nSuccessivamente costruisce un nuovo blocco.\n\n---\n\n### 8.4 La Proof of Work\n\nBitcoin utilizza un particolare algoritmo di consenso chiamato:\n\n**Proof of Work**\n\nche significa:\n\n> Prova di Lavoro.\n\nL'idea è semplice.\n\nPrima di poter aggiungere un nuovo blocco, il Miner deve dimostrare di aver svolto un notevole lavoro computazionale.\n\n---\n\n### 8.5 Il problema matematico\n\nIl lavoro consiste nel trovare un particolare valore chiamato:\n\n**Nonce**\n\nche produca un hash valido.\n\nIn modo semplificato.\n\n```\nDati del blocco\n\n+\n\nNonce\n\n↓\n\nSHA-256\n\n↓\n\nHash\n```\n\nSe l'hash soddisfa determinate condizioni, il blocco viene accettato.\n\nAltrimenti il Miner deve riprovare.\n\n---\n\n### 8.6 Cos'è il Nonce\n\nIl **Nonce** è un numero che il Miner modifica continuamente.\n\nOgni nuovo tentativo produce un hash differente.\n\nAd esempio.\n\n```\nNonce = 1\n\n↓\n\nHash A\n```\n\n```\nNonce = 2\n\n↓\n\nHash B\n```\n\n```\nNonce = 3\n\n↓\n\nHash C\n```\n\nIl processo continua milioni o miliardi di volte fino a trovare una soluzione valida.\n\n---\n\n### 8.7 Perché è difficile\n\nIl Miner non può prevedere quale sarà il Nonce corretto.\n\nL'unico metodo consiste nel provare un enorme numero di combinazioni.\n\nQuesto rende la Proof of Work estremamente costosa dal punto di vista computazionale.\n\n---\n\n### 8.8 Un esempio intuitivo\n\nImmaginiamo un lucchetto con milioni di combinazioni.\n\n```\n000000\n\n000001\n\n000002\n\n...\n\n845193\n\n...\n\n999999\n```\n\nNon esiste una scorciatoia.\n\nOccorre tentare moltissime combinazioni.\n\nIl Mining funziona in modo analogo.\n\n---\n\n### 8.9 Chi trova la soluzione\n\nMigliaia di Miner lavorano contemporaneamente sullo stesso problema.\n\n```\nMiner A\n\nMiner B\n\nMiner C\n\nMiner D\n\nMiner E\n```\n\nIl primo che trova una soluzione valida:\n\n- trasmette il blocco alla rete;\n- riceve la ricompensa prevista dal protocollo.\n\nGli altri Miner interrompono il lavoro e iniziano a costruire il blocco successivo.\n\n---\n\n### 8.10 Ricompensa\n\nIl Miner vincitore riceve normalmente:\n\n- nuovi Bitcoin;\n- commissioni delle transazioni.\n\nQuesta ricompensa prende il nome di:\n\n**Block Reward**\n\nEssa rappresenta l'incentivo economico che rende possibile il funzionamento della rete.\n\n---\n\n### 8.11 Difficoltà del Mining\n\nLa rete Bitcoin modifica automaticamente la difficoltà del problema matematico.\n\nSe molti Miner partecipano alla rete:\n\n- la difficoltà aumenta.\n\nSe il numero dei Miner diminuisce:\n\n- la difficoltà viene ridotta.\n\nQuesto permette di mantenere il tempo medio di generazione dei blocchi intorno ai dieci minuti.\n\n---\n\n### 8.12 Vantaggi della Proof of Work\n\n| Vantaggio | Descrizione |\n|-----------|-------------|\n| Elevata sicurezza | Molto difficile alterare la Blockchain |\n| Decentralizzazione | Chiunque può diventare Miner |\n| Robustezza | Resiste agli attacchi informatici |\n| Affidabilità | Tecnologia testata per molti anni |\n\n---\n\n### 8.13 Svantaggi della Proof of Work\n\n| Svantaggio | Descrizione |\n|-----------|-------------|\n| Elevato consumo energetico | Richiede molta energia elettrica |\n| Hardware costoso | Servono apparecchiature specializzate |\n| Bassa velocità | Numero limitato di transazioni al secondo |\n| Impatto ambientale | Consumo significativo di risorse energetiche |\n\n---\n\n### 8.14 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Mining | Processo di creazione dei blocchi |\n| Miner | Computer che valida i blocchi |\n| Proof of Work | Algoritmo di consenso di Bitcoin |\n| Nonce | Numero utilizzato durante il Mining |\n| Block Reward | Ricompensa per il Miner vincitore |\n\n---\n\n<a id="m9"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M9 — Proof of Stake\n\n### 9.1 Perché nasce la Proof of Stake\n\nCon la crescita della Blockchain emerse un problema importante.\n\nLa Proof of Work richiede enormi quantità di energia elettrica.\n\nPer questo motivo venne sviluppato un diverso algoritmo di consenso:\n\n**Proof of Stake**\n\novvero:\n\n> Prova della Partecipazione.\n\n---\n\n### 9.2 L'idea fondamentale\n\nNella Proof of Stake non esistono Miner.\n\nEsistono invece i:\n\n**Validatori**\n\nEssi vengono scelti dalla rete per proporre e validare nuovi blocchi.\n\n---\n\n### 9.3 Cos'è lo Stake\n\nPer partecipare alla validazione occorre bloccare una certa quantità di criptovaluta.\n\nQuesta operazione prende il nome di:\n\n**Staking**\n\nLe monete depositate rappresentano una garanzia di corretto comportamento.\n\n---\n\n### 9.4 Come funziona\n\nIl processo può essere rappresentato nel seguente modo.\n\n```\nUtente\n\n↓\n\nBlocca le proprie monete\n\n↓\n\nDiventa Validatore\n\n↓\n\nPartecipa al consenso\n\n↓\n\nRiceve ricompense\n```\n\n---\n\n### 9.5 Come vengono scelti i validatori\n\nOgni Blockchain utilizza criteri differenti.\n\nGeneralmente vengono considerati fattori come:\n\n- quantità di criptovaluta messa in Stake;\n- tempo di permanenza;\n- affidabilità del nodo;\n- comportamento storico.\n\nIl processo è progettato per essere casuale ma equo.\n\n---\n\n### 9.6 Ricompense\n\nI validatori ricevono:\n\n- nuove monete (quando previste);\n- commissioni delle transazioni;\n- premi per il corretto funzionamento della rete.\n\n---\n\n### 9.7 Penalizzazioni\n\nSe un validatore tenta di comportarsi in modo scorretto può subire una penalizzazione.\n\nQuesta procedura prende il nome di:\n\n**Slashing**\n\nParte delle criptovalute depositate viene confiscata dal protocollo.\n\nCiò incentiva i partecipanti a comportarsi correttamente.\n\n---\n\n### 9.8 Proof of Work e Proof of Stake a confronto\n\n| Proof of Work | Proof of Stake |\n|----------------|----------------|\n| Utilizza Miner | Utilizza Validatori |\n| Richiede hardware potente | Richiede criptovalute in Stake |\n| Elevato consumo energetico | Consumo energetico molto ridotto |\n| Competizione computazionale | Selezione dei validatori |\n| Bitcoin | Ethereum, Cardano, Solana e molte altre reti |\n\n---\n\n### 9.9 Vantaggi della Proof of Stake\n\n- ridotto consumo energetico;\n- maggiore velocità;\n- costi inferiori;\n- migliore scalabilità;\n- minore impatto ambientale.\n\n---\n\n### 9.10 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Proof of Stake | Algoritmo di consenso basato sullo Stake |\n| Stake | Criptovalute bloccate come garanzia |\n| Validator | Nodo che valida i blocchi |\n| Staking | Deposito delle monete |\n| Slashing | Penalizzazione dei validatori scorretti |\n\n---\n\n<a id="m10"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M10 — Bitcoin\n\n### 10.1 La nascita di Bitcoin\n\nBitcoin rappresenta la prima applicazione pratica di successo della tecnologia Blockchain.\n\nFu presentato nel 2008 attraverso un documento intitolato:\n\n**Bitcoin: A Peer-to-Peer Electronic Cash System**\n\nL'autore firmò il documento con lo pseudonimo:\n\n**Satoshi Nakamoto**\n\nAncora oggi la sua vera identità rimane sconosciuta.\n\n---\n\n### 10.2 Il White Paper\n\nIl documento originale, composto da sole nove pagine, descriveva un sistema capace di consentire pagamenti elettronici diretti tra due persone.\n\nL'obiettivo principale era eliminare la necessità di un intermediario centrale.\n\nLe innovazioni introdotte comprendevano:\n\n- Blockchain;\n- Proof of Work;\n- rete Peer-to-Peer;\n- firme digitali;\n- prevenzione del Double Spending.\n\n---\n\n### 10.3 Il Genesis Block\n\nIl primo blocco della Blockchain di Bitcoin venne creato il:\n\n**3 gennaio 2009**\n\ned è conosciuto come:\n\n**Genesis Block**\n\nAl suo interno era presente un celebre messaggio.\n\n> "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"\n\nQuesto testo faceva riferimento ad un titolo del quotidiano britannico *The Times*.\n\nMolti interpretano il messaggio come una critica al sistema bancario tradizionale.\n\n---\n\n### 10.4 Caratteristiche principali\n\nBitcoin possiede alcune caratteristiche distintive.\n\n| Caratteristica | Descrizione |\n|----------------|-------------|\n| Decentralizzato | Nessuna banca centrale |\n| Open Source | Codice pubblico |\n| Peer-to-Peer | Comunicazione diretta tra nodi |\n| Offerta limitata | Massimo 21 milioni di Bitcoin |\n| Sicuro | Basato su Proof of Work |\n\n---\n\n### 10.5 Come circolano i Bitcoin\n\nI Bitcoin non vengono trasferiti fisicamente.\n\nCiò che cambia è il registro della Blockchain.\n\n```\nPrima\n\nMario → 2 BTC\n\nLuca → 0 BTC\n\n↓\n\nTransazione\n\n↓\n\nDopo\n\nMario → 1 BTC\n\nLuca → 1 BTC\n```\n\nLa Blockchain registra semplicemente il nuovo stato del registro.\n\n---\n\n### 10.6 Offerta massima\n\nUno degli aspetti più importanti di Bitcoin riguarda la quantità massima di moneta che potrà esistere.\n\nIl protocollo stabilisce un limite di:\n\n**21.000.000 BTC**\n\nQuesto valore non può essere modificato senza il consenso della rete.\n\nLa scarsità programmata rappresenta una delle principali caratteristiche economiche di Bitcoin.\n\n---\n\n### 10.7 Bitcoin divisibile\n\nUn Bitcoin può essere suddiviso in unità molto piccole.\n\nL'unità minima prende il nome di:\n\n**Satoshi**\n\nIn onore del suo creatore.\n\n```\n1 BTC\n\n=\n\n100.000.000 Satoshi\n```\n\nCiò rende possibile effettuare anche pagamenti di importo molto ridotto.\n\n---\n\n### 10.8 Halving\n\nOgni circa quattro anni la ricompensa destinata ai Miner viene dimezzata.\n\nQuesto evento prende il nome di:\n\n**Bitcoin Halving**\n\n```\n50 BTC\n\n↓\n\n25 BTC\n\n↓\n\n12,5 BTC\n\n↓\n\n6,25 BTC\n\n↓\n\n...\n```\n\nL'Halving riduce progressivamente l'emissione di nuovi Bitcoin.\n\n---\n\n### 10.9 Perché Bitcoin ha valore\n\nBitcoin non possiede un valore imposto da uno Stato.\n\nIl suo valore deriva principalmente da:\n\n- scarsità;\n- domanda di mercato;\n- fiducia degli utenti;\n- sicurezza della rete;\n- decentralizzazione.\n\nCome per molti altri beni economici, il prezzo dipende dall'incontro tra domanda e offerta.\n\n---\n\n### 10.10 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Bitcoin | Prima criptovaluta decentralizzata |\n| Satoshi Nakamoto | Creatore di Bitcoin |\n| Genesis Block | Primo blocco della Blockchain |\n| Halving | Dimezzamento della ricompensa |\n| Satoshi | Più piccola unità di Bitcoin |\n\n---\n\n<a id="m11"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M11 — Ethereum\n\n### 11.1 La nascita di Ethereum\n\nDopo il successo di Bitcoin emerse una nuova esigenza.\n\nLa Blockchain poteva essere utilizzata non solo per trasferire denaro, ma anche per eseguire programmi.\n\nPer rispondere a questa esigenza nacque Ethereum.\n\nIl progetto venne proposto nel 2013 da:\n\n**Vitalik Buterin**\n\ne lanciato ufficialmente nel 2015.\n\n---\n\n### 11.2 L'idea rivoluzionaria\n\nBitcoin è stato progettato principalmente per gestire pagamenti.\n\nEthereum amplia questo concetto.\n\nLa sua Blockchain permette di eseguire programmi distribuiti chiamati:\n\n**Smart Contract**\n\nQuesti programmi vengono eseguiti automaticamente dalla rete.\n\n---\n\n### 11.3 Ether\n\nLa criptovaluta della rete Ethereum prende il nome di:\n\n**Ether**\n\nabbreviato:\n\n**ETH**\n\nEther viene utilizzato per:\n\n- pagare le commissioni;\n- eseguire Smart Contract;\n- partecipare allo Staking;\n- trasferire valore.\n\n---\n\n### 11.4 Ethereum Virtual Machine\n\nIl cuore della piattaforma Ethereum è la:\n\n**Ethereum Virtual Machine**\n\nabbreviata:\n\n**EVM**\n\nL'EVM è un ambiente di esecuzione distribuito.\n\nOgni nodo della rete esegue gli stessi Smart Contract ottenendo gli stessi risultati.\n\n---\n\n### 11.5 Gas\n\nOgni operazione eseguita sulla rete Ethereum richiede il pagamento di una commissione.\n\nQuesta commissione prende il nome di:\n\n**Gas**\n\nIl Gas serve a:\n\n- evitare spam;\n- remunerare i validatori;\n- limitare il consumo di risorse computazionali.\n\n---\n\n### 11.6 Da Proof of Work a Proof of Stake\n\nInizialmente Ethereum utilizzava la Proof of Work.\n\nSuccessivamente è stata introdotta la Proof of Stake.\n\nQuesto cambiamento ha permesso di:\n\n- ridurre drasticamente il consumo energetico;\n- aumentare l'efficienza;\n- migliorare la sostenibilità della rete.\n\n---\n\n### 11.7 Bitcoin ed Ethereum a confronto\n\n| Bitcoin | Ethereum |\n|----------|-----------|\n| Nato nel 2009 | Nato nel 2015 |\n| Creato da Satoshi Nakamoto | Creato da Vitalik Buterin |\n| Obiettivo principale: pagamenti | Obiettivo principale: Smart Contract |\n| Bitcoin (BTC) | Ether (ETH) |\n| Proof of Work | Proof of Stake |\n\n---\n\n### 11.8 Ecosistema Ethereum\n\nNel corso degli anni Ethereum è diventato il punto di riferimento per numerose applicazioni decentralizzate.\n\nTra queste troviamo:\n\n- finanza decentralizzata;\n- NFT;\n- DAO;\n- giochi Blockchain;\n- token digitali;\n- piattaforme di voto;\n- marketplace decentralizzati.\n\n---\n\n### 11.9 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Ethereum | Blockchain programmabile |\n| Ether | Criptovaluta della rete Ethereum |\n| EVM | Ethereum Virtual Machine |\n| Gas | Commissione necessaria per eseguire operazioni |\n| Vitalik Buterin | Ideatore di Ethereum |\n\n---\n\n<a id="m12"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M12 — Smart Contract\n\n### 12.1 Cosa sono gli Smart Contract\n\nUno **Smart Contract** è un programma informatico memorizzato all'interno della Blockchain.\n\nIl programma viene eseguito automaticamente quando si verificano determinate condizioni.\n\nL'idea fondamentale può essere riassunta con la seguente regola.\n\n> **If this, then that.**\n\nOvvero.\n\n> Se accade una determinata condizione, allora esegui automaticamente l'azione prevista.\n\n---\n\n### 12.2 Un esempio semplice\n\nImmaginiamo un distributore automatico di bevande.\n\n```\nInserisci 2 €\n\n↓\n\nVerifica importo\n\n↓\n\nProdotto disponibile?\n\n↓\n\nSÌ\n\n↓\n\nConsegna bevanda\n```\n\nIl distributore non ha bisogno di un operatore umano.\n\nLo Smart Contract funziona secondo la stessa logica.\n\n---\n\n### 12.3 Caratteristiche degli Smart Contract\n\nUno Smart Contract è:\n\n- automatico;\n- trasparente;\n- immutabile;\n- verificabile;\n- distribuito.\n\nUna volta pubblicato sulla Blockchain non può essere modificato facilmente.\n\n---\n\n### 12.4 Possibili applicazioni\n\nGli Smart Contract possono essere utilizzati per:\n\n- assicurazioni;\n- mutui;\n- compravendite;\n- certificazioni;\n- voto elettronico;\n- gestione della Supply Chain;\n- distribuzione di royalties;\n- gestione di token digitali.\n\n---\n\n### 12.5 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Smart Contract | Programma eseguito automaticamente sulla Blockchain |\n| EVM | Ambiente di esecuzione degli Smart Contract |\n| Gas | Commissione necessaria per l'esecuzione |\n| DApp | Applicazione decentralizzata basata su Smart Contract |\n\n---\n\n<a id="m13"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M13 — Token digitali\n\n### 13.1 Cosa sono i Token\n\nQuando si parla di Blockchain è importante distinguere tra:\n\n- criptovalute;\n- token.\n\nUn **Token** è una risorsa digitale creata sopra una Blockchain esistente.\n\nA differenza di Bitcoin, un token non possiede una Blockchain propria.\n\nAd esempio.\n\n```\nEthereum\n\n↓\n\nSmart Contract\n\n↓\n\nToken\n```\n\nLa maggior parte dei token viene infatti realizzata tramite Smart Contract.\n\n---\n\n### 13.2 Criptovalute e Token\n\nLe due categorie vengono spesso confuse.\n\nEsiste però una differenza fondamentale.\n\n| Criptovaluta | Token |\n|---------------|--------|\n| Possiede una Blockchain propria | Utilizza una Blockchain esistente |\n| BTC | USDT |\n| ETH | UNI |\n| ADA | LINK |\n| SOL | AAVE |\n\n---\n\n### 13.3 A cosa servono i Token\n\nI Token possono rappresentare moltissime tipologie di beni.\n\nAd esempio:\n\n- denaro digitale;\n- punti fedeltà;\n- quote societarie;\n- certificati;\n- opere d'arte;\n- diritti di voto;\n- immobili;\n- licenze software.\n\nLa Blockchain permette quindi di digitalizzare praticamente qualsiasi bene.\n\n---\n\n### 13.4 Utility Token\n\nGli **Utility Token** permettono di utilizzare un determinato servizio.\n\nAd esempio possono consentire:\n\n- accesso ad una piattaforma;\n- utilizzo di un'applicazione;\n- pagamento di servizi;\n- partecipazione a programmi fedeltà.\n\n---\n\n### 13.5 Governance Token\n\nI **Governance Token** consentono di partecipare alle decisioni di un progetto.\n\nI possessori possono votare su:\n\n- modifiche del protocollo;\n- aggiornamenti software;\n- utilizzo dei fondi;\n- nuove funzionalità.\n\nIl principio è simile a quello delle assemblee degli azionisti.\n\n---\n\n### 13.6 Stablecoin\n\nLe **Stablecoin** sono Token progettati per mantenere un valore stabile.\n\nGeneralmente sono collegate ad una valuta tradizionale.\n\nAd esempio.\n\n```\n1 Stablecoin\n\n≈\n\n1 Dollaro USA\n```\n\nTra gli impieghi principali troviamo:\n\n- pagamenti;\n- trasferimenti internazionali;\n- protezione dalla volatilità.\n\n---\n\n### 13.7 Security Token\n\nI **Security Token** rappresentano strumenti finanziari.\n\nPossono identificare:\n\n- quote societarie;\n- obbligazioni;\n- fondi di investimento;\n- partecipazioni finanziarie.\n\nLa loro emissione è spesso soggetta alla normativa dei diversi Paesi.\n\n---\n\n### 13.8 Come nasce un Token\n\nLa creazione di un Token avviene generalmente mediante uno Smart Contract.\n\n```\nBlockchain\n\n↓\n\nSmart Contract\n\n↓\n\nCreazione Token\n\n↓\n\nDistribuzione agli utenti\n```\n\nNon è necessario sviluppare una nuova Blockchain.\n\n---\n\n### 13.9 Standard dei Token\n\nPer garantire la compatibilità tra applicazioni sono stati definiti alcuni standard.\n\nTra i più diffusi troviamo:\n\n| Standard | Utilizzo |\n|-----------|----------|\n| ERC-20 | Token fungibili |\n| ERC-721 | NFT |\n| ERC-1155 | Token multipli |\n\nQuesti standard permettono a Wallet ed Exchange di riconoscere automaticamente i Token.\n\n---\n\n### 13.10 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Token | Bene digitale creato su una Blockchain |\n| Utility Token | Permette di utilizzare un servizio |\n| Governance Token | Consente di votare |\n| Stablecoin | Token con valore stabile |\n| ERC-20 | Standard per Token fungibili |\n\n---\n\n<a id="m14"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M14 — NFT (Non Fungible Token)\n\n### 14.1 Cosa significa NFT\n\nNFT significa:\n\n**Non Fungible Token**\n\novvero:\n\n**Token Non Fungibile**\n\nLa parola "fungibile" indica un bene perfettamente sostituibile con un altro identico.\n\nUna banconota da 10 euro può essere sostituita con un'altra banconota dello stesso valore.\n\nUn NFT invece rappresenta un oggetto unico.\n\n---\n\n### 14.2 Fungibile e Non Fungibile\n\nVediamo la differenza.\n\n| Bene | Fungibile |\n|-------|-----------|\n| Moneta | ✔ |\n| Bitcoin | ✔ |\n| Oro puro | ✔ |\n| NFT | ✘ |\n| Opera d'arte originale | ✘ |\n\n---\n\n### 14.3 Cosa può rappresentare un NFT\n\nUn NFT può rappresentare:\n\n- immagini;\n- fotografie;\n- musica;\n- video;\n- certificati;\n- opere d'arte;\n- biglietti digitali;\n- documenti;\n- oggetti di videogiochi.\n\nL'NFT non è necessariamente il file stesso.\n\nSpesso rappresenta il certificato digitale che ne attesta proprietà e autenticità.\n\n---\n\n### 14.4 Come funziona\n\nL'NFT viene creato attraverso uno Smart Contract.\n\n```\nFile Digitale\n\n↓\n\nSmart Contract\n\n↓\n\nNFT\n\n↓\n\nBlockchain\n```\n\nLa Blockchain registra:\n\n- proprietario;\n- identificativo univoco;\n- cronologia dei trasferimenti.\n\n---\n\n### 14.5 Perché gli NFT sono unici\n\nOgni NFT possiede un identificativo esclusivo.\n\nDue NFT possono rappresentare immagini molto simili.\n\nTuttavia avranno sempre identificativi differenti.\n\nQuesto permette di distinguere in modo univoco ogni oggetto digitale.\n\n---\n\n### 14.6 Esempi di utilizzo\n\nGli NFT trovano applicazione in numerosi ambiti.\n\nTra questi:\n\n- arte digitale;\n- collezionismo;\n- videogiochi;\n- certificati universitari;\n- brevetti;\n- biglietti per eventi;\n- certificazioni professionali.\n\n---\n\n### 14.7 Vantaggi\n\nGli NFT offrono numerosi vantaggi.\n\n- unicità;\n- tracciabilità;\n- autenticità;\n- trasferibilità;\n- verificabilità pubblica.\n\n---\n\n### 14.8 Limiti\n\nNonostante il loro successo, gli NFT presentano anche alcune criticità.\n\nTra queste:\n\n- forte volatilità del mercato;\n- possibili frodi;\n- problemi legati al diritto d'autore;\n- conservazione dei file digitali;\n- speculazione finanziaria.\n\n---\n\n### 14.9 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| NFT | Token non fungibile |\n| Fungibile | Bene perfettamente sostituibile |\n| ERC-721 | Standard per NFT |\n| Proprietà Digitale | Possesso certificato tramite Blockchain |\n\n---\n\n<a id="m15"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M15 — DeFi (Finanza Decentralizzata)\n\n### 15.1 Cos'è la DeFi\n\n**DeFi** significa:\n\n**Decentralized Finance**\n\novvero:\n\n**Finanza Decentralizzata**\n\nL'obiettivo della DeFi è offrire servizi finanziari senza intermediari tradizionali.\n\n---\n\n### 15.2 Come funziona\n\nNella finanza tradizionale.\n\n```\nCliente\n\n↓\n\nBanca\n\n↓\n\nServizio Finanziario\n```\n\nNella DeFi.\n\n```\nUtente\n\n↓\n\nSmart Contract\n\n↓\n\nServizio Finanziario\n```\n\nLo Smart Contract sostituisce molte delle funzioni normalmente svolte dagli intermediari.\n\n---\n\n### 15.3 Servizi disponibili\n\nLe piattaforme DeFi possono offrire:\n\n- prestiti;\n- depositi;\n- scambio di criptovalute;\n- investimenti;\n- assicurazioni;\n- gestione patrimoniale.\n\nTutto avviene tramite Smart Contract.\n\n---\n\n### 15.4 Exchange decentralizzati\n\nUno degli esempi più noti è rappresentato dai:\n\n**DEX (Decentralized Exchange)**\n\nEssi consentono agli utenti di scambiare Token direttamente tra loro.\n\nNon è necessario affidare i propri fondi ad una società centrale.\n\n---\n\n### 15.5 Lending\n\nMolte piattaforme permettono di concedere in prestito criptovalute.\n\n```\nUtente A\n\n↓\n\nDeposita Fondi\n\n↓\n\nSmart Contract\n\n↓\n\nUtente B riceve il prestito\n```\n\nGli interessi vengono calcolati automaticamente.\n\n---\n\n### 15.6 Rischi\n\nLa DeFi offre numerose opportunità ma presenta anche alcuni rischi.\n\nTra questi:\n\n- vulnerabilità degli Smart Contract;\n- elevata volatilità;\n- errori di programmazione;\n- attacchi informatici;\n- perdita delle chiavi private.\n\n---\n\n### 15.7 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| DeFi | Finanza Decentralizzata |\n| DEX | Exchange decentralizzato |\n| Lending | Prestito di criptovalute |\n| Smart Contract | Programma che gestisce automaticamente il servizio |\n\n---\n\n<a id="m16"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M16 — DAO (Organizzazioni Autonome Decentralizzate)\n\n### 16.1 Cosa significa DAO\n\nL'acronimo **DAO** significa:\n\n**Decentralized Autonomous Organization**\n\novvero:\n\n**Organizzazione Autonoma Decentralizzata**\n\nUna DAO è un'organizzazione gestita attraverso Smart Contract e decisioni prese collettivamente dai partecipanti.\n\nNon esiste un amministratore unico o un consiglio di amministrazione centrale.\n\nLe regole operative sono definite dal codice informatico pubblicato sulla Blockchain.\n\n---\n\n### 16.2 Come funziona una DAO\n\nUna DAO opera seguendo un insieme di regole prestabilite.\n\nIl funzionamento può essere rappresentato così.\n\n```\nComunità\n\n↓\n\nProposta\n\n↓\n\nVotazione\n\n↓\n\nSmart Contract\n\n↓\n\nEsecuzione automatica\n```\n\nSe una proposta ottiene il numero di voti necessario, lo Smart Contract esegue automaticamente quanto previsto.\n\n---\n\n### 16.3 Governance decentralizzata\n\nLe decisioni vengono generalmente prese mediante votazione.\n\nI partecipanti possono esprimersi su:\n\n- aggiornamenti del protocollo;\n- utilizzo del tesoro della DAO;\n- nuove funzionalità;\n- modifiche alle regole;\n- finanziamento di nuovi progetti.\n\nIl diritto di voto è spesso proporzionale al numero di Governance Token posseduti.\n\n---\n\n### 16.4 Vantaggi delle DAO\n\nLe DAO offrono numerosi vantaggi.\n\n| Vantaggio | Descrizione |\n|-----------|-------------|\n| Trasparenza | Le regole sono pubbliche |\n| Decentralizzazione | Nessuna autorità centrale |\n| Automazione | Gli Smart Contract eseguono automaticamente le decisioni |\n| Partecipazione | La comunità contribuisce alle scelte |\n| Tracciabilità | Ogni voto è registrato sulla Blockchain |\n\n---\n\n### 16.5 Limiti delle DAO\n\nLe DAO presentano anche alcune criticità.\n\nTra queste:\n\n- possibili errori negli Smart Contract;\n- partecipazione limitata degli utenti;\n- concentrazione del potere nei grandi possessori di Token;\n- incertezza normativa in molti Paesi.\n\n---\n\n### 16.6 Esempi di utilizzo\n\nLe DAO vengono utilizzate per:\n\n- gestione di protocolli DeFi;\n- finanziamento di progetti Open Source;\n- investimenti collettivi;\n- comunità digitali;\n- organizzazioni no-profit;\n- gestione di tesorerie decentralizzate.\n\n---\n\n### 16.7 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| DAO | Organizzazione Autonoma Decentralizzata |\n| Governance | Processo decisionale della comunità |\n| Governance Token | Token che attribuisce diritto di voto |\n| Smart Contract | Programma che applica automaticamente le decisioni |\n\n---\n\n<a id="m17"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M17 — Layer 1 e Layer 2\n\n### 17.1 Il problema della scalabilità\n\nCon l'aumento del numero di utenti è emersa una difficoltà importante.\n\nLe Blockchain devono elaborare sempre più transazioni.\n\nQuesto può provocare:\n\n- rallentamenti;\n- aumento delle commissioni;\n- congestione della rete.\n\nPer affrontare questo problema sono stati introdotti i concetti di **Layer 1** e **Layer 2**.\n\n---\n\n### 17.2 Cos'è un Layer 1\n\nIl **Layer 1** rappresenta la Blockchain principale.\n\nÈ il livello sul quale vengono registrate le transazioni definitive.\n\nEsempi di Layer 1 sono:\n\n- Bitcoin;\n- Ethereum;\n- Solana;\n- Cardano;\n- Avalanche.\n\n---\n\n### 17.3 Caratteristiche del Layer 1\n\nUna Blockchain Layer 1 gestisce direttamente:\n\n- consenso;\n- sicurezza;\n- validazione dei blocchi;\n- conservazione del registro distribuito.\n\nOgni operazione viene verificata dai nodi della rete principale.\n\n---\n\n### 17.4 Cos'è un Layer 2\n\nUn **Layer 2** è una soluzione costruita sopra una Blockchain esistente.\n\nIl suo obiettivo è elaborare molte operazioni al di fuori della rete principale, riducendo il carico sul Layer 1.\n\nSchema semplificato.\n\n```\nUtenti\n\n↓\n\nLayer 2\n\n↓\n\nLayer 1\n```\n\n---\n\n### 17.5 Vantaggi del Layer 2\n\nLe soluzioni Layer 2 permettono di ottenere:\n\n- maggiore velocità;\n- commissioni inferiori;\n- migliore scalabilità;\n- riduzione della congestione.\n\n---\n\n### 17.6 Alcuni esempi\n\nTra le principali tecnologie Layer 2 troviamo:\n\n- Lightning Network (Bitcoin);\n- Arbitrum;\n- Optimism;\n- Base;\n- Polygon (in alcuni scenari);\n- zkSync.\n\nOgnuna utilizza tecniche differenti per migliorare le prestazioni.\n\n---\n\n### 17.7 Layer 1 e Layer 2 a confronto\n\n| Layer 1 | Layer 2 |\n|----------|----------|\n| Blockchain principale | Livello aggiuntivo |\n| Massima sicurezza | Maggiore velocità |\n| Commissioni generalmente superiori | Commissioni ridotte |\n| Gestisce il consenso | Si appoggia al Layer 1 |\n\n---\n\n### 17.8 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Layer 1 | Blockchain principale |\n| Layer 2 | Soluzione costruita sopra una Blockchain |\n| Scalabilità | Capacità di gestire molte transazioni |\n| Congestione | Eccessivo carico della rete |\n\n---\n\n<a id="m18"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M18 — Sicurezza della Blockchain\n\n### 18.1 Perché la Blockchain è considerata sicura\n\nLa sicurezza della Blockchain non dipende da un singolo elemento.\n\nEssa deriva dalla combinazione di:\n\n- crittografia;\n- distribuzione dei dati;\n- algoritmi di consenso;\n- replica del registro;\n- firme digitali.\n\nOgni componente contribuisce a proteggere il sistema.\n\n---\n\n### 18.2 Immutabilità\n\nUno dei concetti fondamentali è l'immutabilità.\n\nUna volta confermato, un blocco non può essere modificato facilmente.\n\nQualsiasi alterazione cambierebbe il suo hash e invaliderebbe tutti i blocchi successivi.\n\n---\n\n### 18.3 Ridondanza\n\nPoiché la Blockchain è distribuita su migliaia di nodi, non esiste un'unica copia dei dati.\n\n```\nNodo A\n\nNodo B\n\nNodo C\n\nNodo D\n\nNodo E\n```\n\nAnche se alcuni nodi vengono spenti, la rete continua normalmente a funzionare.\n\n---\n\n### 18.4 Attacco del 51%\n\nUno degli attacchi teoricamente più noti è il cosiddetto:\n\n**51% Attack**\n\nEsso si verifica quando un soggetto controlla oltre la metà della potenza di calcolo (Proof of Work) o della capacità di validazione (Proof of Stake).\n\nIn tale situazione potrebbe tentare di:\n\n- censurare transazioni;\n- riscrivere parte della cronologia recente;\n- effettuare attacchi di Double Spending.\n\nPer le grandi Blockchain pubbliche questo tipo di attacco è estremamente difficile e molto costoso.\n\n---\n\n### 18.5 Errori umani\n\nMolti problemi di sicurezza non dipendono dalla Blockchain.\n\nSono invece causati da errori degli utenti.\n\nTra gli errori più comuni troviamo:\n\n- perdita della Seed Phrase;\n- divulgazione della Private Key;\n- truffe di phishing;\n- malware;\n- falsi Wallet.\n\n---\n\n### 18.6 Buone pratiche\n\nPer utilizzare la Blockchain in modo sicuro è consigliabile:\n\n- conservare offline la Seed Phrase;\n- utilizzare Wallet affidabili;\n- attivare l'autenticazione a più fattori quando disponibile;\n- verificare sempre gli indirizzi di destinazione;\n- aggiornare regolarmente il software.\n\n---\n\n### 18.7 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Immutabilità | Difficoltà di modificare dati già registrati |\n| Ridondanza | Molte copie della Blockchain |\n| 51% Attack | Controllo della maggioranza della rete |\n| Phishing | Tentativo di furto delle credenziali |\n| Seed Phrase | Frase di recupero del Wallet |\n\n---\n\n<a id="m19"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M19 — Applicazioni della Blockchain\n\n### 19.1 Oltre le criptovalute\n\nLa Blockchain è nata per supportare Bitcoin.\n\nCon il passare degli anni si è dimostrata una tecnologia utilizzabile in moltissimi altri settori.\n\nOggi viene impiegata per gestire:\n\n- documenti;\n- contratti;\n- identità digitali;\n- certificazioni;\n- logistica;\n- sanità;\n- pubblica amministrazione;\n- industria.\n\nLa Blockchain rappresenta quindi una tecnologia trasversale.\n\n---\n\n### 19.2 Tracciabilità della Supply Chain\n\nUna delle applicazioni più diffuse riguarda la **Supply Chain**, ovvero la catena di approvvigionamento.\n\nOgni fase del ciclo produttivo può essere registrata sulla Blockchain.\n\n```\nProduzione\n\n↓\n\nTrasporto\n\n↓\n\nMagazzino\n\n↓\n\nDistribuzione\n\n↓\n\nCliente\n```\n\nOgni passaggio viene memorizzato in modo permanente.\n\n---\n\n### 19.3 Vantaggi nella logistica\n\nL'utilizzo della Blockchain permette di:\n\n- tracciare i prodotti;\n- ridurre le frodi;\n- verificare l'origine delle merci;\n- migliorare la trasparenza;\n- semplificare gli audit.\n\nQueste caratteristiche risultano particolarmente utili nei settori alimentare, farmaceutico e del lusso.\n\n---\n\n### 19.4 Certificati digitali\n\nLa Blockchain può essere utilizzata per conservare certificati digitali.\n\nAd esempio:\n\n- diplomi;\n- attestati professionali;\n- certificazioni linguistiche;\n- brevetti;\n- certificazioni aziendali.\n\nChiunque può verificarne l'autenticità senza dover contattare l'ente che li ha emessi.\n\n---\n\n### 19.5 Identità digitale\n\nLa Blockchain può supportare sistemi di identità digitale decentralizzata.\n\nL'utente mantiene il controllo delle proprie informazioni personali.\n\nPuò decidere quali dati condividere con i diversi servizi.\n\nQuesto approccio prende spesso il nome di:\n\n**Self Sovereign Identity (SSI)**\n\n---\n\n### 19.6 Sanità\n\nNel settore sanitario la Blockchain può essere utilizzata per:\n\n- gestione delle cartelle cliniche;\n- condivisione sicura dei dati;\n- tracciabilità dei farmaci;\n- verifica delle prescrizioni;\n- certificazione dei referti.\n\nÈ comunque necessario rispettare le normative sulla protezione dei dati personali.\n\n---\n\n### 19.7 Pubblica Amministrazione\n\nAnche gli enti pubblici possono beneficiare della Blockchain.\n\nPossibili applicazioni:\n\n- gestione documentale;\n- protocolli digitali;\n- catasto;\n- voto elettronico;\n- certificati anagrafici;\n- registri pubblici.\n\n---\n\n### 19.8 Proprietà intellettuale\n\nAutori e creatori di contenuti possono utilizzare la Blockchain per dimostrare:\n\n- paternità di un'opera;\n- data di creazione;\n- cronologia delle modifiche;\n- trasferimenti di proprietà.\n\nQuesto non sostituisce automaticamente il diritto d'autore, ma costituisce una prova tecnica utile.\n\n---\n\n### 19.9 Internet of Things (IoT)\n\nL'Internet delle Cose collega dispositivi intelligenti alla rete.\n\nLa Blockchain può consentire a tali dispositivi di:\n\n- identificarsi;\n- scambiarsi dati;\n- effettuare pagamenti automatici;\n- registrare eventi;\n- certificare misurazioni.\n\n---\n\n### 19.10 Industria 4.0\n\nNel contesto dell'Industria 4.0 la Blockchain viene utilizzata per:\n\n- monitorare la produzione;\n- certificare componenti;\n- controllare la qualità;\n- gestire manutenzioni;\n- condividere dati tra aziende.\n\n---\n\n### 19.11 Concetti chiave\n\n| Termine | Significato |\n|----------|-------------|\n| Supply Chain | Catena di approvvigionamento |\n| SSI | Identità digitale decentralizzata |\n| IoT | Internet of Things |\n| Tracciabilità | Possibilità di seguire la storia di un bene |\n| Certificato Digitale | Documento verificabile tramite Blockchain |\n\n---\n\n<a id="m20"></a>\n**⬆️ [Torna all'Indice](#indice)**\n\n# M20 — Vantaggi, limiti e prospettive future\n\n### 20.1 Perché la Blockchain è importante\n\nLa Blockchain rappresenta una delle innovazioni tecnologiche più significative degli ultimi anni.\n\nLa sua importanza deriva dalla capacità di creare fiducia tra soggetti che non si conoscono, senza richiedere un'autorità centrale.\n\n---\n\n### 20.2 Principali vantaggi\n\nTra i principali punti di forza troviamo:\n\n- decentralizzazione;\n- trasparenza;\n- sicurezza;\n- immutabilità;\n- tracciabilità;\n- disponibilità continua;\n- automazione tramite Smart Contract.\n\n---\n\n### 20.3 Limiti attuali\n\nLa tecnologia presenta ancora alcune criticità.\n\n| Limite | Descrizione |\n|---------|-------------|\n| Scalabilità | Alcune reti gestiscono poche transazioni al secondo |\n| Commissioni | Possono aumentare nei periodi di congestione |\n| Consumo energetico | Alcune Blockchain richiedono molta energia |\n| Complessità | Richiede competenze tecniche |\n| Normativa | Legislazione ancora in evoluzione |\n\n---\n\n### 20.4 Sfide future\n\nNei prossimi anni la ricerca sarà orientata verso:\n\n- Blockchain più veloci;\n- commissioni ridotte;\n- maggiore interoperabilità;\n- sostenibilità energetica;\n- integrazione con Intelligenza Artificiale;\n- maggiore tutela della privacy.\n\n---\n\n### 20.5 Blockchain e Intelligenza Artificiale\n\nBlockchain e Intelligenza Artificiale rappresentano due tecnologie complementari.\n\nL'IA può:\n\n- analizzare grandi quantità di dati;\n- supportare decisioni automatiche;\n- individuare anomalie.\n\nLa Blockchain può invece:\n\n- certificare l'origine dei dati;\n- garantire l'integrità delle informazioni;\n- tracciare le operazioni effettuate dai sistemi intelligenti.\n\nLa combinazione delle due tecnologie è oggetto di intensa ricerca.\n\n---\n\n### 20.6 Blockchain e sostenibilità\n\nLe Blockchain di nuova generazione cercano di ridurre il consumo energetico.\n\nMolte reti hanno adottato algoritmi di consenso più efficienti rispetto alla Proof of Work.\n\nQuesto contribuisce a diminuire l'impatto ambientale.\n\n---\n\n### 20.7 Competenze richieste\n\nLe figure professionali che operano nel settore Blockchain possiedono competenze multidisciplinari.\n\nTra queste:\n\n- programmazione;\n- crittografia;\n- reti informatiche;\n- sicurezza informatica;\n- basi di dati;\n- diritto digitale;\n- economia.\n\n---\n\n### 20.8 Figure professionali\n\nLa diffusione della Blockchain ha favorito la nascita di nuove professioni.\n\nAlcuni esempi sono:\n\n- Blockchain Developer;\n- Smart Contract Developer;\n- Blockchain Architect;\n- Security Auditor;\n- Consulente Blockchain;\n- Web3 Developer;\n- Ricercatore in tecnologie decentralizzate.\n\n---\n\n### 20.9 Riepilogo del corso\n\nNel corso sono stati affrontati i principali concetti della tecnologia Blockchain.\n\nIn particolare hai studiato:\n\n- storia della Blockchain;\n- registri distribuiti;\n- blocchi;\n- hash crittografici;\n- crittografia asimmetrica;\n- Wallet;\n- transazioni;\n- Mining;\n- Proof of Work;\n- Proof of Stake;\n- Bitcoin;\n- Ethereum;\n- Smart Contract;\n- Token;\n- NFT;\n- DeFi;\n- DAO;\n- Layer 1 e Layer 2;\n- sicurezza;\n- applicazioni reali.\n\nQueste conoscenze costituiscono una solida base per approfondire il mondo del Web3 e delle tecnologie decentralizzate.\n\n---\n\n### 20.10 Glossario essenziale\n\n| Termine | Definizione sintetica |\n|----------|-----------------------|\n| Blockchain | Registro distribuito composto da blocchi concatenati |\n| Nodo | Computer che partecipa alla rete |\n| Hash | Impronta digitale dei dati |\n| Wallet | Strumento che gestisce le chiavi crittografiche |\n| Smart Contract | Programma eseguito automaticamente sulla Blockchain |\n| Token | Bene digitale creato su una Blockchain |\n| NFT | Token non fungibile |\n| DAO | Organizzazione autonoma decentralizzata |\n| DeFi | Finanza decentralizzata |\n| Layer 2 | Soluzione che migliora scalabilità e prestazioni |\n\n---\n\n# Conclusioni\n\nLa Blockchain rappresenta una tecnologia destinata ad avere un ruolo sempre più importante nella trasformazione digitale.\n\nPur essendo nata per supportare le criptovalute, oggi trova applicazione in numerosi settori, dalla finanza alla logistica, dalla sanità all'industria, fino alla gestione dell'identità digitale.\n\nComprendere i suoi principi di funzionamento significa acquisire competenze fondamentali per affrontare le sfide dell'economia digitale e del Web3.\n\nCon questa introduzione disponi delle basi necessarie per proseguire lo studio di argomenti più avanzati come la programmazione di Smart Contract, lo sviluppo di applicazioni decentralizzate (DApp), la tokenizzazione degli asset e gli ecosistemi Blockchain di nuova generazione.\n\n---	2	2026-07-20 15:53:39.092483+00	markdown	15	
fe95207c-2d19-451b-9bb2-da5f3e154822	1bab9807-78a9-4bb1-9d02-52eb993ab831	Course Preview	course-preview	\N	# Problem Solving 1° - Le basi del pensiero logico\n\n## 🚀 Impara a risolvere i problemi con metodo\n\nOgni giorno affrontiamo problemi: a scuola, nel lavoro, nella programmazione e nella vita quotidiana. La differenza tra chi trova rapidamente una soluzione e chi si blocca non dipende soltanto dalle conoscenze, ma soprattutto dal **metodo**.\n\nIl corso **Problem Solving 1°** è il punto di partenza ideale per sviluppare un modo di pensare strutturato, analitico ed efficace. Attraverso esempi concreti ed esercizi guidati imparerai ad analizzare un problema, comprenderne gli elementi essenziali e costruire una strategia per arrivare alla soluzione.\n\nNon è necessario avere competenze informatiche: il corso è pensato per chiunque voglia migliorare le proprie capacità di ragionamento e affrontare le sfide con maggiore sicurezza.\n\n---\n\n## Perché seguire questo corso\n\n- 🧠 Sviluppa il pensiero logico e critico.\n- 🎯 Impara un metodo applicabile in qualsiasi contesto.\n- 🔍 Analizza i problemi in modo ordinato e razionale.\n- 💡 Migliora la capacità di trovare soluzioni efficaci.\n- 🚀 Acquisisci competenze fondamentali per lo studio, il lavoro e la programmazione.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere la natura di un problema;\n- distinguere dati, obiettivi e vincoli;\n- scomporre problemi complessi in problemi più semplici;\n- individuare strategie di soluzione;\n- evitare gli errori più comuni nel ragionamento;\n- affrontare nuove situazioni con maggiore sicurezza e metodo.\n\nQueste competenze rappresentano la base indispensabile per qualsiasi percorso nell'informatica, nella programmazione, nell'intelligenza artificiale e in molte altre discipline tecnico-scientifiche.\n\n---\n\n## Cosa imparerai\n\n- Cos'è il Problem Solving\n- Il pensiero logico e il ragionamento strutturato\n- Analisi di un problema\n- Individuazione di dati, obiettivi e vincoli\n- Strategie per la risoluzione dei problemi\n- Scomposizione di problemi complessi\n- Ricerca della soluzione più efficace\n- Errori comuni nel processo decisionale\n- Esercizi pratici e casi di studio\n- Applicazioni nella vita quotidiana e nell'informatica\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti delle scuole superiori e universitari;\n- 💻 futuri programmatori e sviluppatori;\n- 👨‍🏫 insegnanti interessati alle metodologie del pensiero computazionale;\n- 🤖 appassionati di informatica e Intelligenza Artificiale;\n- 👔 professionisti che desiderano migliorare le proprie capacità decisionali;\n- 📚 chiunque voglia imparare ad affrontare i problemi con un approccio più razionale ed efficace.\n\n---\n\n## Requisiti\n\nNon sono richieste conoscenze specifiche.\n\nÈ sufficiente avere curiosità, voglia di ragionare e desiderio di imparare un metodo che potrai utilizzare in ogni ambito della tua vita personale e professionale.\n\n---\n\n## Perché scegliere questo corso\n\nIl Problem Solving è una delle competenze più richieste nel mondo del lavoro e rappresenta il fondamento di discipline come l'informatica, la programmazione, la cybersecurity, la data science e l'intelligenza artificiale.\n\nQuesto corso ti guiderà passo dopo passo nella costruzione di un metodo di ragionamento efficace, attraverso spiegazioni semplici, esempi concreti ed esercitazioni pratiche, permettendoti di acquisire una competenza che continuerà ad esserti utile per tutta la vita.\n\n---\n\n> **Ogni grande soluzione nasce da un buon metodo. Inizia oggi il tuo percorso su GCPROF Academy e sviluppa il pensiero logico che ti aiuterà ad affrontare qualsiasi sfida con sicurezza ed efficacia.**	1	2026-07-21 20:54:44.361532+00	markdown	15	
ff0b5da5-5803-434f-93a6-8e69f91d9283	735b2e36-50fe-41d3-ab9a-601d0dcd0563	Course Preview	course-preview	\N	# Blockchain 1° - Scopri la tecnologia che sta rivoluzionando il mondo digitale\n\n## 🚀 Comprendi come funziona la Blockchain e perché è una delle innovazioni più importanti del XXI secolo\n\nLa **Blockchain** è molto più della tecnologia alla base delle criptovalute: rappresenta un nuovo modo di registrare, condividere e proteggere le informazioni in modo sicuro, trasparente e decentralizzato.\n\nIn questo corso introduttivo scoprirai, con un linguaggio semplice e numerosi esempi pratici, come funziona una blockchain, quali problemi risolve e perché aziende, banche, governi e organizzazioni di tutto il mondo stanno investendo in questa tecnologia.\n\nPartendo dai concetti fondamentali arriverai a comprendere i meccanismi che rendono la Blockchain affidabile, immutabile e resistente alle frodi, acquisendo le basi necessarie per affrontare successivamente argomenti più avanzati come Smart Contract, DeFi, NFT e Web3.\n\n---\n\n## Perché seguire questo corso\n\n- 🔗 Comprendi una delle tecnologie più innovative degli ultimi anni.\n- 🧠 Impara i principi della decentralizzazione e della sicurezza distribuita.\n- 💼 Acquisisci competenze sempre più richieste nel mercato del lavoro.\n- 🌍 Scopri le applicazioni reali della Blockchain in numerosi settori.\n- 🚀 Costruisci solide basi per approfondire criptovalute, Web3 e Smart Contract.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere cos'è una Blockchain e come funziona;\n- distinguere Blockchain, Bitcoin e criptovalute;\n- capire perché una blockchain è sicura e difficile da alterare;\n- comprendere il ruolo dei blocchi, degli hash e della crittografia;\n- conoscere il funzionamento delle reti decentralizzate;\n- riconoscere i principali ambiti di utilizzo della Blockchain nel mondo reale.\n\nQueste conoscenze costituiscono il punto di partenza ideale per chi desidera avvicinarsi alle tecnologie decentralizzate e comprendere il futuro dell'economia digitale.\n\n---\n\n## Cosa imparerai\n\n- Cos'è la Blockchain\n- La nascita della tecnologia Blockchain\n- Blockchain e Bitcoin: differenze e relazioni\n- Blocchi, catena e registri distribuiti\n- Hash crittografici e integrità dei dati\n- Decentralizzazione e consenso distribuito\n- Trasparenza, sicurezza e immutabilità\n- Blockchain pubbliche e private\n- Principali applicazioni della Blockchain\n- Introduzione a Smart Contract, NFT, DeFi e Web3\n- Vantaggi, limiti e prospettive future\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti delle scuole superiori e universitari;\n- 💻 sviluppatori e futuri programmatori;\n- 👨‍💼 professionisti interessati all'innovazione digitale;\n- 🏦 operatori del settore finanziario;\n- 🤖 appassionati di tecnologia e Intelligenza Artificiale;\n- 📚 chiunque desideri comprendere una delle tecnologie che stanno trasformando il mondo.\n\n---\n\n## Requisiti\n\nNon sono richieste conoscenze pregresse.\n\nIl corso è progettato per accompagnarti gradualmente nella scoperta della Blockchain, utilizzando un linguaggio chiaro, esempi intuitivi e spiegazioni accessibili anche a chi parte da zero.\n\n---\n\n## Perché scegliere questo corso\n\nLa Blockchain è destinata a diventare una tecnologia fondamentale in moltissimi settori: finanza, pubblica amministrazione, logistica, sanità, cybersecurity, supply chain, identità digitale e molto altro.\n\nComprenderne il funzionamento significa acquisire una competenza sempre più richiesta e prepararsi alle trasformazioni che stanno ridefinendo il mondo digitale.\n\nGrazie a un approccio semplice, pratico e orientato alla comprensione dei concetti fondamentali, questo corso ti permetterà di costruire solide basi su cui sviluppare competenze sempre più avanzate nel campo delle tecnologie decentralizzate.\n\n---\n\n> **La Blockchain non è soltanto una nuova tecnologia: è un nuovo modo di concepire fiducia, sicurezza e condivisione delle informazioni. Inizia oggi il tuo percorso su GCPROF Academy e scopri le fondamenta dell'innovazione digitale.**	1	2026-07-21 21:25:12.743181+00	markdown	15	
6361383a-9aed-4944-917d-216a7ed127df	d73ff3cc-9b4c-47f0-a001-4984e3a2f1b7	Course Preview	course-preview	\N	# Web Programming 1° - Crea il tuo primo sito web professionale\n\n## 🚀 Entra nel mondo dello sviluppo Web\n\nOgni sito Internet che utilizzi ogni giorno, dai social network agli e-commerce, nasce grazie a tre tecnologie fondamentali: **HTML, CSS e JavaScript**.\n\nCon il corso **Web Programming 1°** imparerai a progettare e realizzare pagine web moderne, responsive e interattive, acquisendo le competenze essenziali per iniziare il tuo percorso come sviluppatore Front-End.\n\nAttraverso spiegazioni chiare, esempi pratici ed esercitazioni guidate, scoprirai come trasformare una semplice idea in un sito web funzionante, comprendendo il ruolo di ogni tecnologia e imparando a utilizzarle insieme per creare interfacce professionali.\n\nChe tu voglia avvicinarti alla programmazione, creare un portfolio personale o muovere i primi passi nel mondo dello sviluppo web, questo corso rappresenta il punto di partenza ideale.\n\n---\n\n## Perché seguire questo corso\n\n- 🌐 Impara le tecnologie fondamentali del Web.\n- 💻 Realizza pagine web moderne e responsive.\n- 🎨 Dai stile ai tuoi siti con CSS.\n- ⚡ Aggiungi interattività con JavaScript.\n- 🚀 Acquisisci le basi richieste per diventare uno sviluppatore Front-End.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere come funziona il Web e la struttura di una pagina Internet;\n- creare pagine HTML ben organizzate;\n- progettare layout moderni utilizzando CSS;\n- rendere i siti responsive e adattabili a qualsiasi dispositivo;\n- aggiungere elementi dinamici e interattivi con JavaScript;\n- sviluppare piccoli progetti web completamente funzionanti.\n\nLe competenze acquisite costituiranno la base per affrontare successivamente framework moderni come React, Next.js, Angular o Vue e approfondire lo sviluppo Full Stack.\n\n---\n\n## Cosa imparerai\n\n- Introduzione al Web e al funzionamento di Internet\n- Struttura di una pagina HTML\n- Tag, elementi e attributi fondamentali\n- Formattazione di testi, immagini, tabelle e collegamenti\n- Introduzione ai fogli di stile CSS\n- Colori, font, layout e responsive design\n- Flexbox e principi di impaginazione moderna\n- Introduzione a JavaScript\n- Variabili, operatori e strutture di controllo\n- Funzioni ed eventi\n- Manipolazione degli elementi HTML (DOM)\n- Creazione di pagine web dinamiche e interattive\n- Buone pratiche nello sviluppo Front-End\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti delle scuole superiori e universitari;\n- 💻 aspiranti sviluppatori Web e Front-End;\n- 👨‍🏫 insegnanti che desiderano introdurre la programmazione Web;\n- 🚀 professionisti che vogliono acquisire competenze digitali;\n- 🌍 chiunque desideri creare siti Internet senza esperienza precedente.\n\n---\n\n## Requisiti\n\nNon sono richieste conoscenze pregresse di programmazione.\n\nÈ sufficiente saper utilizzare un computer e avere la curiosità di imparare come vengono realizzati i siti web che utilizziamo ogni giorno.\n\n---\n\n## Perché scegliere questo corso\n\nLo sviluppo Web è una delle competenze digitali più richieste nel mercato del lavoro e rappresenta la porta d'ingresso verso professioni come Front-End Developer, Full Stack Developer, Web Designer e Software Engineer.\n\nQuesto corso ti permetterà di apprendere in modo semplice e progressivo le tre tecnologie fondamentali del Web moderno, costruendo solide basi tecniche attraverso esempi concreti e progetti pratici.\n\nAl termine avrai acquisito le conoscenze necessarie per realizzare i tuoi primi siti web e proseguire il tuo percorso verso tecnologie più avanzate come React, Next.js, Node.js e lo sviluppo di applicazioni web complete.\n\n---\n\n> **Ogni grande sviluppatore ha iniziato scrivendo la sua prima pagina HTML. Inizia oggi il tuo percorso su GCPROF Academy e trasforma le tue idee in siti web moderni, dinamici e professionali.**	1	2026-07-22 10:00:15.495358+00	markdown	15	
6cc8b998-8101-4dc1-b1f0-3b75404d790d	104629f4-f5d7-49f9-ab40-275864593f05	Course Preview	course-preview	\N	# AI 1° - Scopri il mondo dell'Intelligenza Artificiale\n\n## 🚀 Comprendi la tecnologia che sta trasformando il presente e costruendo il futuro\n\nL'**Intelligenza Artificiale (AI)** è una delle innovazioni più rivoluzionarie della nostra epoca. Dalla generazione di testi e immagini agli assistenti virtuali, dalle auto a guida autonoma ai sistemi di raccomandazione, l'AI è ormai presente in ogni settore della società.\n\nCon il corso **AI 1°** entrerai nel mondo dell'Intelligenza Artificiale attraverso un percorso chiaro, coinvolgente e accessibile anche a chi parte da zero. Scoprirai come funzionano le moderne tecnologie di AI, quali sono le loro applicazioni, i vantaggi, i limiti e le sfide etiche che accompagneranno il loro sviluppo nei prossimi anni.\n\nIl corso fornisce una panoramica completa delle principali tecnologie di Intelligenza Artificiale, permettendoti di comprendere il linguaggio, i concetti e le opportunità di uno dei settori più innovativi e richiesti del mercato.\n\n---\n\n## Perché seguire questo corso\n\n- 🤖 Comprendi i principi fondamentali dell'Intelligenza Artificiale.\n- 🧠 Scopri come funzionano i moderni sistemi di AI generativa.\n- 💼 Acquisisci competenze sempre più richieste nel mondo del lavoro.\n- 🌍 Comprendi l'impatto dell'AI nella vita quotidiana e nelle aziende.\n- 🚀 Costruisci solide basi per approfondire Machine Learning, Deep Learning e Data Science.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere cos'è realmente l'Intelligenza Artificiale;\n- distinguere AI, Machine Learning e Deep Learning;\n- conoscere il funzionamento dei moderni modelli di AI generativa;\n- comprendere il ruolo dei dati nell'addestramento dei sistemi intelligenti;\n- riconoscere le principali applicazioni dell'AI nei diversi settori;\n- valutare opportunità, limiti e implicazioni etiche dell'Intelligenza Artificiale.\n\nLe competenze acquisite rappresenteranno una base solida per affrontare percorsi più avanzati dedicati allo sviluppo di applicazioni AI e all'utilizzo professionale dei moderni strumenti di Intelligenza Artificiale.\n\n---\n\n## Cosa imparerai\n\n- Cos'è l'Intelligenza Artificiale\n- Breve storia dell'AI\n- AI, Machine Learning e Deep Learning\n- Dati e addestramento dei modelli\n- Reti neurali: concetti fondamentali\n- AI Generativa e Large Language Models (LLM)\n- Chatbot e assistenti intelligenti\n- Generazione di testi, immagini, audio e video\n- Principali applicazioni dell'AI nella scuola, nel lavoro e nelle imprese\n- Opportunità, limiti e rischi dell'Intelligenza Artificiale\n- Etica, privacy e utilizzo responsabile dell'AI\n- Le professioni del futuro legate all'Intelligenza Artificiale\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti delle scuole superiori e universitari;\n- 💻 sviluppatori e professionisti del settore ICT;\n- 👨‍🏫 insegnanti interessati a integrare l'AI nella didattica;\n- 👔 professionisti che vogliono comprendere l'impatto dell'AI sul proprio lavoro;\n- 🚀 imprenditori e innovatori;\n- 📚 chiunque desideri conoscere la tecnologia che sta ridefinendo il futuro.\n\n---\n\n## Requisiti\n\nNon sono richieste competenze di programmazione o conoscenze pregresse di Intelligenza Artificiale.\n\nIl corso è progettato per accompagnarti gradualmente nella scoperta dell'AI attraverso spiegazioni semplici, esempi concreti e casi d'uso reali.\n\n---\n\n## Perché scegliere questo corso\n\nL'Intelligenza Artificiale non rappresenta più una tecnologia del futuro: è già parte integrante della nostra quotidianità e sta trasformando il modo in cui studiamo, lavoriamo, comunichiamo e prendiamo decisioni.\n\nComprendere i suoi principi fondamentali significa acquisire una competenza strategica, utile in qualsiasi settore professionale e indispensabile per affrontare con consapevolezza le trasformazioni digitali dei prossimi anni.\n\nGrazie a un approccio pratico, chiaro e orientato alla comprensione dei concetti, questo corso ti fornirà le basi necessarie per utilizzare l'AI in modo efficace e prepararti a percorsi più avanzati nel mondo dell'Intelligenza Artificiale.\n\n---\n\n> **L'Intelligenza Artificiale sta cambiando il mondo. Comprenderla oggi significa essere pronti per le opportunità di domani. Inizia il tuo percorso su GCPROF Academy e scopri come l'AI può diventare una delle competenze più preziose del tuo futuro.**	1	2026-07-22 10:31:59.664727+00	markdown	15	
f18e5712-3c50-4796-b563-4e846cfb57d8	25cc123e-37ab-4a09-9354-e4723812817b	Course Preview	course-preview	\N	# OOP 1° - Scopri la Programmazione Orientata agli Oggetti\n\n## 🚀 Impara il paradigma di programmazione utilizzato dai professionisti\n\nLa **Programmazione Orientata agli Oggetti (Object-Oriented Programming - OOP)** è il paradigma su cui si basano la maggior parte dei software moderni, dalle applicazioni desktop ai siti web, dalle app per smartphone ai videogiochi.\n\nCon il corso **OOP 1°** scoprirai come progettare software in modo più organizzato, modulare e riutilizzabile, imparando a rappresentare il mondo reale attraverso **classi**, **oggetti** e **relazioni**.\n\nAttraverso spiegazioni semplici, esempi concreti ed esercitazioni pratiche comprenderai i principi fondamentali della programmazione orientata agli oggetti, acquisendo competenze indispensabili per affrontare linguaggi come **Java, C#, C++, Python, PHP e JavaScript**.\n\nQuesto corso rappresenta il naturale passo successivo dopo aver appreso le basi della programmazione procedurale.\n\n---\n\n## Perché seguire questo corso\n\n- 🧩 Comprendi il paradigma più utilizzato nello sviluppo software moderno.\n- 💻 Impara a progettare programmi più ordinati e manutenibili.\n- 🚀 Acquisisci competenze richieste in qualsiasi linguaggio orientato agli oggetti.\n- 🏗️ Sviluppa applicazioni modulari, riutilizzabili ed estensibili.\n- 🎯 Preparati ad affrontare progetti software di livello professionale.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere il paradigma Object-Oriented;\n- progettare classi e creare oggetti;\n- utilizzare attributi e metodi per modellare entità reali;\n- comprendere il concetto di incapsulamento;\n- utilizzare l'ereditarietà per riutilizzare il codice;\n- conoscere il polimorfismo e l'astrazione come strumenti per progettare software flessibile;\n- sviluppare piccoli programmi utilizzando i principi della OOP.\n\nQueste competenze costituiscono la base per lo sviluppo di software professionale e per l'apprendimento dei principali linguaggi di programmazione moderni.\n\n---\n\n## Cosa imparerai\n\n- Introduzione alla Programmazione Orientata agli Oggetti\n- Paradigma procedurale e paradigma OOP\n- Classi e oggetti\n- Attributi e metodi\n- Costruttori\n- Incapsulamento\n- Ereditarietà\n- Polimorfismo\n- Astrazione\n- Relazioni tra oggetti\n- Modellazione di semplici sistemi software\n- Buone pratiche di progettazione Object-Oriented\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti delle scuole superiori e universitari;\n- 💻 aspiranti sviluppatori software;\n- 👨‍🏫 insegnanti di informatica;\n- 🚀 programmatori che vogliono approfondire la progettazione del software;\n- 📚 chiunque desideri imparare uno dei paradigmi fondamentali dell'informatica moderna.\n\n---\n\n## Requisiti\n\nÈ consigliata una conoscenza di base della programmazione (variabili, condizioni, cicli e funzioni).\n\nNon è necessario conoscere uno specifico linguaggio: i concetti illustrati sono validi e applicabili a Java, Python, C#, C++, JavaScript e molti altri linguaggi orientati agli oggetti.\n\n---\n\n## Perché scegliere questo corso\n\nLa Programmazione Orientata agli Oggetti rappresenta lo standard nello sviluppo del software moderno. Comprenderne i principi significa acquisire una competenza fondamentale per realizzare applicazioni robuste, scalabili e facilmente manutenibili.\n\nGrazie a un approccio pratico e orientato alla comprensione dei concetti, questo corso ti permetterà di sviluppare un nuovo modo di progettare il software, preparandoti ad affrontare framework, librerie e architetture utilizzate nel mondo professionale.\n\nAl termine avrai costruito solide basi per proseguire il tuo percorso nello sviluppo software, nell'ingegneria del software e nelle moderne tecnologie di programmazione.\n\n---\n\n> **Ogni grande applicazione nasce da una buona progettazione. Inizia oggi il tuo percorso su GCPROF Academy e scopri come la Programmazione Orientata agli Oggetti può trasformare il tuo modo di sviluppare software.**	1	2026-07-22 10:37:18.341679+00	markdown	15	
1b04d4a1-4f13-4ba6-92fb-91db24bc3a03	e6718169-84f6-4f62-9d4c-44cd7ca954f2	Course Preview	course-preview	\N	# Finance 1° - Impara a gestire il denaro con consapevolezza\n\n## 🚀 Costruisci solide basi di Educazione Finanziaria per prendere decisioni intelligenti\n\nSaper gestire il denaro è una delle competenze più importanti nella vita, ma raramente viene insegnata a scuola. Comprendere come risparmiare, investire e pianificare il proprio futuro economico significa acquisire uno strumento fondamentale per vivere con maggiore serenità e indipendenza.\n\nCon il corso **Finance 1°** scoprirai i principi fondamentali dell'**Educazione Finanziaria**, imparando a comprendere il valore del denaro, il funzionamento dei mercati finanziari e le principali forme di investimento.\n\nAttraverso spiegazioni semplici, esempi pratici e casi reali, svilupperai una mentalità orientata alla pianificazione finanziaria, evitando gli errori più comuni e imparando a prendere decisioni consapevoli.\n\nQuesto corso non promette di diventare ricchi velocemente: ti insegnerà invece come costruire nel tempo una solida cultura finanziaria, indispensabile nella vita personale e professionale.\n\n---\n\n## Perché seguire questo corso\n\n- 💰 Impara a gestire il denaro in modo intelligente.\n- 📈 Comprendi come funzionano risparmio e investimenti.\n- 🎯 Acquisisci una mentalità orientata alla pianificazione finanziaria.\n- 🏦 Scopri gli strumenti finanziari più diffusi.\n- 🚀 Evita gli errori più comuni che compromettono il benessere economico.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere i principi fondamentali dell'Educazione Finanziaria;\n- pianificare un semplice budget personale;\n- distinguere risparmio e investimento;\n- comprendere il rapporto tra rischio e rendimento;\n- conoscere le principali tipologie di strumenti finanziari;\n- riconoscere le basi della diversificazione del portafoglio;\n- sviluppare un approccio più consapevole nella gestione del denaro.\n\nQueste competenze rappresentano un punto di partenza fondamentale per costruire un futuro economico più stabile e affrontare con maggiore sicurezza le decisioni finanziarie.\n\n---\n\n## Cosa imparerai\n\n- Cos'è l'Educazione Finanziaria\n- Il valore del denaro nel tempo\n- Entrate, uscite e gestione del budget\n- Risparmio e pianificazione finanziaria\n- Inflazione e potere d'acquisto\n- Interesse semplice e interesse composto\n- Rischio e rendimento\n- Diversificazione degli investimenti\n- Azioni, obbligazioni, ETF e fondi comuni\n- Introduzione alle criptovalute\n- Errori più comuni degli investitori\n- Psicologia della finanza e decisioni consapevoli\n- Pianificazione degli obiettivi finanziari\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti che desiderano acquisire competenze finanziarie essenziali;\n- 👨‍💼 lavoratori e professionisti interessati a gestire meglio le proprie risorse;\n- 💻 giovani che vogliono iniziare a investire con consapevolezza;\n- 🚀 imprenditori e freelance;\n- 📚 chiunque desideri migliorare la propria cultura finanziaria e prendere decisioni più informate.\n\n---\n\n## Requisiti\n\nNon sono richieste conoscenze economiche o finanziarie.\n\nIl corso è pensato per accompagnarti passo dopo passo nella scoperta della finanza personale attraverso esempi concreti e un linguaggio semplice, rendendo accessibili anche i concetti più importanti.\n\n---\n\n## Perché scegliere questo corso\n\nL'Educazione Finanziaria è una competenza indispensabile nel mondo moderno. Sapere come amministrare il proprio denaro, comprendere il funzionamento degli investimenti e pianificare il futuro significa aumentare la propria libertà di scelta e ridurre il rischio di commettere errori costosi.\n\nGrazie a un approccio pratico, chiaro e orientato alla realtà, questo corso ti permetterà di costruire solide basi finanziarie, utili sia nella vita quotidiana sia nelle future decisioni di investimento.\n\nAl termine avrai acquisito una visione completa dei concetti fondamentali della finanza personale e sarai pronto ad approfondire strumenti e strategie più avanzate.\n\n---\n\n> **L'investimento più importante è quello nella tua cultura finanziaria. Inizia oggi il tuo percorso su GCPROF Academy e impara a gestire il denaro con competenza, responsabilità e visione del futuro.**	1	2026-07-22 10:43:08.374296+00	markdown	15	
f49dfb3e-8d32-47d5-9d97-a3ea3c2cdaea	57524f96-6aa9-4d90-8bec-4a5fc4ca73e7	Course Preview	course-preview	\N	# Database 1° - Impara a organizzare e gestire i dati in modo professionale\n\n## 🚀 Scopri il cuore di ogni applicazione moderna\n\nOgni sito web, applicazione mobile, e-commerce o sistema aziendale utilizza un **Database** per archiviare, organizzare e recuperare le informazioni. Dai social network ai servizi bancari, dalla sanità al commercio elettronico, i database rappresentano il motore invisibile che rende possibile la gestione di enormi quantità di dati.\n\nCon il corso **Database 1°** entrerai nel mondo delle basi di dati, imparando come vengono progettate, organizzate e interrogate. Attraverso spiegazioni semplici, esempi concreti ed esercitazioni pratiche comprenderai i principi fondamentali della progettazione dei database relazionali e acquisirai le competenze necessarie per lavorare con i dati in modo efficiente.\n\nQuesto corso costituisce il punto di partenza ideale per chi desidera avvicinarsi allo sviluppo software, al Web Development, alla Data Science o ai sistemi informativi aziendali.\n\n---\n\n## Perché seguire questo corso\n\n- 🗄️ Comprendi come vengono organizzati i dati nelle applicazioni moderne.\n- 📊 Impara a progettare database chiari, efficienti e affidabili.\n- 🔗 Scopri come collegare le informazioni attraverso le relazioni.\n- 💻 Introduci i principali linguaggi per interrogare i database.\n- 🚀 Acquisisci competenze fondamentali richieste nello sviluppo software e nella gestione dei dati.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere cos'è un database e a cosa serve;\n- distinguere dati, informazioni e basi di dati;\n- progettare semplici database relazionali;\n- creare tabelle correttamente strutturate;\n- definire chiavi primarie e chiavi esterne;\n- comprendere le relazioni tra le tabelle;\n- utilizzare le principali interrogazioni per recuperare e organizzare i dati.\n\nQueste competenze rappresentano una base indispensabile per lo sviluppo di applicazioni web, software gestionali, sistemi informativi e applicazioni basate sui dati.\n\n---\n\n## Cosa imparerai\n\n- Cos'è un Database\n- Dati, informazioni e basi di dati\n- Database relazionali\n- Tabelle, record e campi\n- Tipi di dato\n- Chiavi primarie e chiavi esterne\n- Relazioni uno a uno, uno a molti e molti a molti\n- Integrità dei dati\n- Introduzione al modello Entità-Relazione (E/R)\n- Introduzione al linguaggio SQL\n- Query di base per interrogare un database\n- Inserimento, modifica ed eliminazione dei dati\n- Buone pratiche nella progettazione delle basi di dati\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti delle scuole superiori e universitari;\n- 💻 aspiranti sviluppatori software e Web Developer;\n- 👨‍🏫 insegnanti di informatica;\n- 📈 professionisti che lavorano con grandi quantità di dati;\n- 🚀 chi desidera comprendere il funzionamento dei sistemi informativi moderni.\n\n---\n\n## Requisiti\n\nNon sono richieste conoscenze specifiche di database o programmazione.\n\nIl corso è progettato per accompagnarti gradualmente nella scoperta delle basi di dati, utilizzando un linguaggio semplice e numerosi esempi pratici che ti permetteranno di comprendere rapidamente i concetti fondamentali.\n\n---\n\n## Perché scegliere questo corso\n\nI database sono alla base di qualsiasi applicazione moderna. Ogni sviluppatore, analista, sistemista o professionista dell'ICT deve conoscere come vengono organizzati e gestiti i dati per realizzare software affidabili, scalabili ed efficienti.\n\nGrazie a un approccio pratico e progressivo, questo corso ti permetterà di costruire solide fondamenta nella progettazione delle basi di dati e nell'utilizzo del linguaggio SQL, preparandoti ad affrontare argomenti più avanzati come database distribuiti, Big Data, Business Intelligence e Data Science.\n\n---\n\n> **I dati sono il patrimonio più prezioso dell'era digitale. Impara a organizzarli, proteggerli e valorizzarli con il corso Database 1° di GCPROF Academy e costruisci una competenza fondamentale per il tuo futuro professionale.**	1	2026-07-22 10:46:00.548662+00	markdown	15	
03243d4c-2266-4fc5-8452-467d828d18bf	7b9a496a-069d-47a3-a9d7-7aabf6547cba	Course Preview	course-preview	\N	# Python 1° - Impara a programmare con uno dei linguaggi più richiesti al mondo\n\n## 🚀 Inizia il tuo percorso nella programmazione con Python\n\n**Python** è oggi uno dei linguaggi di programmazione più utilizzati al mondo. Grazie alla sua sintassi semplice e leggibile, viene impiegato nello sviluppo software, nell'Intelligenza Artificiale, nella Data Science, nell'automazione, nella cybersecurity e nello sviluppo Web.\n\nCon il corso **Python 1°** muoverai i primi passi nel mondo della programmazione, imparando a scrivere codice in modo chiaro, ordinato ed efficace. Attraverso lezioni pratiche, esempi concreti ed esercizi guidati, scoprirai come trasformare un problema in un programma funzionante.\n\nQuesto corso è pensato per chi parte da zero e desidera acquisire solide basi di programmazione, costruendo competenze che potranno essere applicate in qualsiasi ambito dell'informatica.\n\n---\n\n## Perché seguire questo corso\n\n- 🐍 Impara uno dei linguaggi di programmazione più richiesti nel mercato del lavoro.\n- 💻 Acquisisci solide basi di coding attraverso esempi pratici.\n- 🧠 Sviluppa il pensiero logico e il Problem Solving.\n- 🚀 Preparati ad affrontare corsi più avanzati di programmazione e Intelligenza Artificiale.\n- 🌍 Utilizza un linguaggio impiegato in migliaia di aziende e progetti open source.\n\n---\n\n## Cosa riuscirai a fare\n\nAl termine del corso sarai in grado di:\n\n- comprendere la sintassi fondamentale di Python;\n- scrivere semplici programmi in autonomia;\n- utilizzare variabili e tipi di dato;\n- prendere decisioni mediante istruzioni condizionali;\n- ripetere operazioni con i cicli;\n- creare e utilizzare funzioni;\n- sviluppare piccoli progetti per consolidare le competenze acquisite.\n\nQueste conoscenze rappresentano il punto di partenza ideale per approfondire lo sviluppo software, l'Intelligenza Artificiale, la Data Science, l'automazione e molte altre discipline informatiche.\n\n---\n\n## Cosa imparerai\n\n- Introduzione a Python\n- Installazione e ambiente di sviluppo\n- Sintassi di base\n- Variabili e tipi di dato\n- Input e output\n- Operatori aritmetici, logici e relazionali\n- Strutture condizionali (`if`, `elif`, `else`)\n- Cicli `for` e `while`\n- Liste, tuple e dizionari\n- Funzioni e parametri\n- Modularizzazione del codice\n- Gestione degli errori di base\n- Buone pratiche di programmazione\n\n---\n\n## A chi è rivolto\n\nQuesto corso è ideale per:\n\n- 🎓 studenti delle scuole superiori e universitari;\n- 💻 aspiranti sviluppatori software;\n- 🤖 futuri esperti di Intelligenza Artificiale e Data Science;\n- 👨‍🏫 insegnanti che desiderano introdurre Python nella didattica;\n- 🚀 professionisti che vogliono acquisire competenze di programmazione;\n- 📚 chiunque desideri imparare a programmare partendo da zero.\n\n---\n\n## Requisiti\n\nNon è richiesta alcuna esperienza di programmazione.\n\nÈ sufficiente avere un computer, curiosità e la voglia di imparare un linguaggio semplice ma estremamente potente, utilizzato ogni giorno da milioni di sviluppatori in tutto il mondo.\n\n---\n\n## Perché scegliere questo corso\n\nPython è considerato il linguaggio ideale per iniziare a programmare grazie alla sua semplicità, versatilità e vastissimo ecosistema di librerie. È il punto di partenza perfetto per chi desidera intraprendere una carriera nel mondo dell'informatica o semplicemente acquisire una competenza digitale sempre più richiesta.\n\nCon un approccio pratico e progressivo, questo corso ti guiderà passo dopo passo nella costruzione delle tue competenze, permettendoti di comprendere i concetti fondamentali della programmazione e di applicarli immediatamente in esercizi e piccoli progetti.\n\nAl termine avrai costruito solide basi per affrontare percorsi più avanzati dedicati allo sviluppo software, alla Programmazione Orientata agli Oggetti, allo sviluppo Web, alla Data Science e all'Intelligenza Artificiale.\n\n---\n\n> **Ogni grande sviluppatore ha scritto il suo primo programma. Inizia oggi il tuo percorso su GCPROF Academy e scopri come Python può aprirti le porte del mondo della programmazione e dell'innovazione digitale.**	1	2026-07-22 10:48:07.769113+00	markdown	15	
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quizzes" ("id", "title", "description", "status", "penalty_enabled", "negative_mark", "max_score", "created_by", "created_at", "updated_at", "passing_score") FROM stdin;
059f730b-e762-4c74-aa88-5e49df5a4c8f	Fondamenti di Google Sheets	Un quiz di autovalutazione sulle funzioni e gli strumenti di base di Fogli Google.	draft	t	0.25	10.00	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 19:37:22.805869+00	2026-07-19 19:37:22.805869+00	60.00
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
markdown	Documentazione (.md)	https://vaokzyznazkcqjpbbkgr.supabase.co/storage/v1/object/public/contents/markdown_1784549465357.md	t	2026-07-20 12:11:12.388+00
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
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."order_items" ("id", "order_id", "course_id", "course_title_snapshot", "unit_price", "quantity", "line_total", "metadata", "created_at") FROM stdin;
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."password_reset_tokens" ("id", "user_id", "token", "expires_at", "used", "created_at") FROM stdin;
\.


--
-- Data for Name: payment_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."payment_logs" ("id", "provider", "provider_event_id", "event", "payload", "processed", "processed_at", "error", "created_at") FROM stdin;
\.


--
-- Data for Name: payment_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."payment_settings" ("id", "provider", "sandbox_enabled", "default_currency", "vat_percentage", "allow_coupons", "academy_country", "checkout_session_expire_minutes", "created_at", "updated_at") FROM stdin;
55012857-b52b-4868-9690-0ae91eec6fa9	STRIPE	t	EUR	0.00	t	IT	30	2026-07-21 13:25:20.636852+00	2026-07-21 13:25:20.636852+00
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."payments" ("id", "order_id", "provider", "provider_payment_id", "provider_checkout_session_id", "provider_event_id", "status", "amount", "currency", "transaction_reference", "failure_reason", "paid_at", "raw_response", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: profile_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profile_classes" ("profile_id", "class_id", "assigned_at") FROM stdin;
71be76b7-b2f4-4b8b-8216-a9fa45ab347b	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.754+00
1db651fd-fe09-4911-9cb9-543534d2588c	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.754+00
dfa6a4d3-6bec-43a4-aa1e-db38d477d783	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.754+00
3cb4e26d-2d55-4741-9e09-20da1a96bece	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.754+00
e93cbdf4-74f5-4bf6-a6bc-ab95ae75e4e2	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.754+00
6ce0f33f-0908-4568-bd7e-8e00a11e3172	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
d3dc15f2-7674-45cd-a0d6-5cbbb8b4f0ff	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
89d060ae-ca11-486d-a888-27b80655f2d0	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
c1444bd6-d403-4f91-a476-254aad0951a4	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
69073512-cedf-4e92-b108-bfddf49fd7f0	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
e07e3a8f-2023-46fc-824c-fbf697209aab	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
10f05016-2dd7-469b-b70d-3b746854064e	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
38452999-4c0b-45d8-835c-331a2ba61d0e	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
63027211-6c39-4013-952b-5882b02285ac	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
3b305a50-e194-4ded-857b-a87e7dee560c	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
608666d2-f3b6-41f6-8746-bc7be277d8da	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
fa2ce395-9e85-4331-bae6-c61fbc5b5733	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
27ec38c7-5325-45e9-9e32-f49d0c832f31	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
41ece4d2-4b62-445b-a3e8-7048b5c3f753	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
468c26d6-c3a7-4e0e-960b-7c24788af757	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
6e232992-2721-4601-9361-a047d5cba6ca	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
54bd426e-eddb-48e0-82f9-28de3e05ff86	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
da1f5d3c-0762-48df-b9e1-b189c897ffb1	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
7a03ea83-1b45-456c-91e0-3aa7eb4d3e2b	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
b855cea3-de67-4c93-8d14-c5eef2ff6eb7	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 09:59:11.755+00
83dcd8ae-81f3-48f9-9d2a-542030157d18	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
141a9dcc-249b-4503-98ef-d0e4d6a77f61	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
d079a378-0a89-4a20-b349-d0a45a36df7d	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
bdd201a7-69b1-4d3c-bf2c-91fe7d7625ba	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
e948ca2a-a167-4713-b28b-56ac1b655348	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
f3a2d85d-37cf-4b07-a3a6-fd962fc50f28	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
4a7ba88d-8b74-4fd4-bc3e-c5e4c49aa825	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
0bc5071e-23f9-4afe-879c-32aa71c51282	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
1c9ed5c4-3574-453d-b3eb-07d05cde4458	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
b02ea654-251c-4633-887a-a72f9fc02a53	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
91651f30-503d-4c76-b40d-1462766fe6b6	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
e077b785-a1fa-4c4f-916f-c2284479e9e2	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
f71e75df-ce1c-4b85-a55b-8c794a2225bb	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
d825b61c-7d17-4731-890a-f9729d09c481	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
bf08beee-f12e-4822-a5df-a847d73f8ac7	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
79f5f845-9cd7-4e0d-aa08-9c0e97d291c7	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
c31f1ca5-7401-46c4-b392-ddbfdd629107	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
d001d3dc-342c-4ac2-98e0-33ac1fea31aa	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
8be0331e-95ff-498e-99e4-a17e9fc31c25	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
a1400dd0-9712-45d4-bb01-d70e01316691	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
b91f6432-2066-48aa-b1df-91ddf61979e7	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
21053734-d0d6-410c-a2ee-8010c89a0772	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
863b903f-82b4-4ad6-9df0-2d32314e8d9f	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
e2f3e367-a30e-4a2d-854f-9353042a17b2	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
2c207e4c-9e2d-446d-a2f6-172e922403f4	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-21 09:59:12.049+00
d6ea185b-f6b4-49fd-867b-030e6d0604c0	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
ce482338-4851-4023-aa6b-296e5ebe00fc	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
a2aa8997-24da-4ed4-9bd2-a279fec090c5	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
716765eb-af66-4eef-97a6-c7ae549fe07b	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
aa16d3a7-3d8c-41a9-ad9f-438172a623ec	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
116986c5-ba67-4845-84d5-3d10dfaaaf3b	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
653b5518-8485-4168-bcae-2a26d97475e0	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
1db25eda-361b-49de-a814-fbca7c85fd04	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
1f2754d2-38b7-400e-983f-8183a5d70034	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
40ebe309-365f-4571-bd79-adcc14cf9d05	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
951b3e8a-1a0f-4b02-b964-0b028558c458	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
14dd184b-4eb5-4343-ac28-dd4dd830d2b7	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
605fba82-600f-40b8-85af-e768eaf9a2e9	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
dacde977-be1b-4368-85ea-68249f886de8	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
59b2e469-be34-4c56-95ed-3720dece2018	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
444463df-bdf3-4b6e-91ba-199dc6c4cf7a	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
d12a5041-273f-4257-b1b1-549d1b3cbb56	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
38c57b50-3858-4801-a792-40ee87100bf7	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
7a6f7a61-cf03-43ea-8f94-5d79ba9a1951	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
dde0039d-46a0-4409-9bf3-c9e8e1efdb3b	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
f7b77c39-0d4c-4516-8e71-d3e426da1da9	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
76eb6383-4817-4026-97f6-4fa00bdbcd4e	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
3e791412-c973-4721-aa2d-27f8783a0cf7	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
2e107706-a7ec-4d9e-b7cf-5ac8a1996eb3	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
19a34c3b-30b0-4450-9793-08c82a40bb28	145d5c33-6355-4f94-b3bd-10a8890b500c	2026-07-21 09:59:12.426+00
db9d7a4a-f5e7-4758-a24b-0a93038df15d	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
6c7ef871-6dd6-4bb0-8060-4bbde9c173cc	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
6865a4ab-e67a-4f8c-9e2a-cd954d4ebebc	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
dd697b4a-52ee-4771-b352-192780ea6ca5	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
a5a1f1cd-c9d4-49b7-88bb-8b052d54c81b	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
e829a31b-b645-4acb-91e2-eeb2513dff60	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
6329a6d7-153d-4a3c-a303-fb1ce8277374	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
e9ef9401-edd7-47fa-98cc-3982f1c7fa44	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
38b7a44d-d449-430e-89b1-40e0c952954c	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
926ac1ae-001b-490e-b951-483f21e79cc2	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
ad0662ee-4b55-42fd-b858-00bb3f5766fa	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
d3282d57-f12c-4f13-9093-ff4c8db8f89f	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
216cc140-5c0e-4c4c-b638-b795bb61684a	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
e1170f55-acc0-428d-8c58-86230d366687	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
51b5234f-67a8-465b-9526-f60090b51d32	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
f419cfc5-d356-425c-a999-749d7ce14f8d	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
f052751d-c9f1-4505-be2a-0c67c87e979c	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
351c28d7-e3fb-437f-af56-3dc7c12483aa	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
355e9289-8464-45f5-8f72-664ce07e79cc	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
98acbcdb-7576-4612-bef2-2e160c6858cb	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
536dd36d-0180-44d8-baed-d24fa982dc0a	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
9a6bd77e-ddc3-44f4-b4fb-7c8980c19de2	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
b3520c22-b761-4cbf-911c-591c85ec05c4	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
6b97804b-3daa-4085-9320-e819d73a1013	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
3c6dc1ec-23f9-47b7-bd26-93c48cc0950d	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-21 09:59:12.807+00
6c5e3103-842c-421e-82cb-982c9a6870a1	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
9972f640-d8bd-4675-89ea-f1e08f993600	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
82586405-0d26-42c1-9345-7dafac96fb95	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
fad5a884-c433-49d1-8910-55133c0cfdd7	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
396d06ab-5c2d-4dd2-90f3-6390338521ce	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
088ce537-6fe5-4953-b4b2-89a9b8019a87	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
c51c8467-e7c7-48c5-9818-491241fd56e4	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
856e1aa3-a540-42b1-a630-7fc43b6a14dd	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
9c7cb300-a205-421f-8acd-577da4316e97	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
2ed3871e-ad40-4986-86b8-8c2182f1cd38	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
fd169c33-cd8b-4a0d-98bf-71c89183caa2	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
14738291-039b-45c0-aa4d-7bb84c52ba83	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
1a586b04-b4d0-4d04-a609-add62c61c6a1	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
0f925aec-48ff-4ac0-8ead-453877b803e8	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
7efbf899-2bea-431c-8295-55abb970f7b1	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
d8104ca9-dc1b-452f-8882-08280fe5dad4	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
4349a895-f0b5-47a9-b4b2-f212837d23b9	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
5f6258ac-7089-45b5-b1e4-638178418d4c	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
b1f7eaf7-864f-428b-a271-556fb79103eb	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
110ce348-0c00-49eb-8aad-d368db2acec8	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.174+00
df869064-0813-445b-a81c-a7646f13b67a	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.175+00
aa21a03a-8987-40f6-865f-60290d066887	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.175+00
2f3c234b-859a-4608-8611-95e24cee4bcc	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.175+00
be82a5f2-d4c8-4796-9a1a-de52109c4e81	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.175+00
18f2ee76-85c0-47d2-957c-8984de6ed7bd	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-21 09:59:13.175+00
3da0e5b9-ff82-4850-b194-9b3c6034536b	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-21 19:55:56.114698+00
\.


--
-- Data for Name: profile_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profile_courses" ("profile_id", "course_id", "enrolled_at", "status", "approved_at", "approved_by", "updated_at") FROM stdin;
71be76b7-b2f4-4b8b-8216-a9fa45ab347b	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
71be76b7-b2f4-4b8b-8216-a9fa45ab347b	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
71be76b7-b2f4-4b8b-8216-a9fa45ab347b	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
71be76b7-b2f4-4b8b-8216-a9fa45ab347b	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
1db651fd-fe09-4911-9cb9-543534d2588c	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
1db651fd-fe09-4911-9cb9-543534d2588c	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
1db651fd-fe09-4911-9cb9-543534d2588c	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
1db651fd-fe09-4911-9cb9-543534d2588c	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
dfa6a4d3-6bec-43a4-aa1e-db38d477d783	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
dfa6a4d3-6bec-43a4-aa1e-db38d477d783	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
dfa6a4d3-6bec-43a4-aa1e-db38d477d783	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
dfa6a4d3-6bec-43a4-aa1e-db38d477d783	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3cb4e26d-2d55-4741-9e09-20da1a96bece	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3cb4e26d-2d55-4741-9e09-20da1a96bece	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3cb4e26d-2d55-4741-9e09-20da1a96bece	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3cb4e26d-2d55-4741-9e09-20da1a96bece	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e93cbdf4-74f5-4bf6-a6bc-ab95ae75e4e2	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e93cbdf4-74f5-4bf6-a6bc-ab95ae75e4e2	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e93cbdf4-74f5-4bf6-a6bc-ab95ae75e4e2	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e93cbdf4-74f5-4bf6-a6bc-ab95ae75e4e2	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6ce0f33f-0908-4568-bd7e-8e00a11e3172	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6ce0f33f-0908-4568-bd7e-8e00a11e3172	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6ce0f33f-0908-4568-bd7e-8e00a11e3172	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6ce0f33f-0908-4568-bd7e-8e00a11e3172	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
d3dc15f2-7674-45cd-a0d6-5cbbb8b4f0ff	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
d3dc15f2-7674-45cd-a0d6-5cbbb8b4f0ff	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
d3dc15f2-7674-45cd-a0d6-5cbbb8b4f0ff	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
d3dc15f2-7674-45cd-a0d6-5cbbb8b4f0ff	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
89d060ae-ca11-486d-a888-27b80655f2d0	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
89d060ae-ca11-486d-a888-27b80655f2d0	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
89d060ae-ca11-486d-a888-27b80655f2d0	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
89d060ae-ca11-486d-a888-27b80655f2d0	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
c1444bd6-d403-4f91-a476-254aad0951a4	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
c1444bd6-d403-4f91-a476-254aad0951a4	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
c1444bd6-d403-4f91-a476-254aad0951a4	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
c1444bd6-d403-4f91-a476-254aad0951a4	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
69073512-cedf-4e92-b108-bfddf49fd7f0	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
69073512-cedf-4e92-b108-bfddf49fd7f0	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
69073512-cedf-4e92-b108-bfddf49fd7f0	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
69073512-cedf-4e92-b108-bfddf49fd7f0	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e07e3a8f-2023-46fc-824c-fbf697209aab	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e07e3a8f-2023-46fc-824c-fbf697209aab	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e07e3a8f-2023-46fc-824c-fbf697209aab	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
e07e3a8f-2023-46fc-824c-fbf697209aab	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
10f05016-2dd7-469b-b70d-3b746854064e	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
10f05016-2dd7-469b-b70d-3b746854064e	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
10f05016-2dd7-469b-b70d-3b746854064e	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
10f05016-2dd7-469b-b70d-3b746854064e	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
38452999-4c0b-45d8-835c-331a2ba61d0e	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
38452999-4c0b-45d8-835c-331a2ba61d0e	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
38452999-4c0b-45d8-835c-331a2ba61d0e	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
38452999-4c0b-45d8-835c-331a2ba61d0e	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
63027211-6c39-4013-952b-5882b02285ac	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
63027211-6c39-4013-952b-5882b02285ac	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
63027211-6c39-4013-952b-5882b02285ac	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
63027211-6c39-4013-952b-5882b02285ac	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3b305a50-e194-4ded-857b-a87e7dee560c	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3b305a50-e194-4ded-857b-a87e7dee560c	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3b305a50-e194-4ded-857b-a87e7dee560c	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
3b305a50-e194-4ded-857b-a87e7dee560c	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
608666d2-f3b6-41f6-8746-bc7be277d8da	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
608666d2-f3b6-41f6-8746-bc7be277d8da	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
608666d2-f3b6-41f6-8746-bc7be277d8da	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
608666d2-f3b6-41f6-8746-bc7be277d8da	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
fa2ce395-9e85-4331-bae6-c61fbc5b5733	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
fa2ce395-9e85-4331-bae6-c61fbc5b5733	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
fa2ce395-9e85-4331-bae6-c61fbc5b5733	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
fa2ce395-9e85-4331-bae6-c61fbc5b5733	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
27ec38c7-5325-45e9-9e32-f49d0c832f31	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
27ec38c7-5325-45e9-9e32-f49d0c832f31	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
27ec38c7-5325-45e9-9e32-f49d0c832f31	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
27ec38c7-5325-45e9-9e32-f49d0c832f31	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
41ece4d2-4b62-445b-a3e8-7048b5c3f753	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
41ece4d2-4b62-445b-a3e8-7048b5c3f753	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
41ece4d2-4b62-445b-a3e8-7048b5c3f753	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
41ece4d2-4b62-445b-a3e8-7048b5c3f753	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
468c26d6-c3a7-4e0e-960b-7c24788af757	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
468c26d6-c3a7-4e0e-960b-7c24788af757	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
468c26d6-c3a7-4e0e-960b-7c24788af757	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
468c26d6-c3a7-4e0e-960b-7c24788af757	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6e232992-2721-4601-9361-a047d5cba6ca	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6e232992-2721-4601-9361-a047d5cba6ca	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6e232992-2721-4601-9361-a047d5cba6ca	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
6e232992-2721-4601-9361-a047d5cba6ca	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
54bd426e-eddb-48e0-82f9-28de3e05ff86	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
54bd426e-eddb-48e0-82f9-28de3e05ff86	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
54bd426e-eddb-48e0-82f9-28de3e05ff86	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
54bd426e-eddb-48e0-82f9-28de3e05ff86	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
da1f5d3c-0762-48df-b9e1-b189c897ffb1	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
da1f5d3c-0762-48df-b9e1-b189c897ffb1	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
da1f5d3c-0762-48df-b9e1-b189c897ffb1	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
da1f5d3c-0762-48df-b9e1-b189c897ffb1	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
7a03ea83-1b45-456c-91e0-3aa7eb4d3e2b	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
7a03ea83-1b45-456c-91e0-3aa7eb4d3e2b	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
7a03ea83-1b45-456c-91e0-3aa7eb4d3e2b	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
7a03ea83-1b45-456c-91e0-3aa7eb4d3e2b	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
b855cea3-de67-4c93-8d14-c5eef2ff6eb7	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
b855cea3-de67-4c93-8d14-c5eef2ff6eb7	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
b855cea3-de67-4c93-8d14-c5eef2ff6eb7	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
b855cea3-de67-4c93-8d14-c5eef2ff6eb7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.236509+00	pending	\N	\N	2026-07-21 09:59:10.236509+00
83dcd8ae-81f3-48f9-9d2a-542030157d18	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
83dcd8ae-81f3-48f9-9d2a-542030157d18	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
83dcd8ae-81f3-48f9-9d2a-542030157d18	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
83dcd8ae-81f3-48f9-9d2a-542030157d18	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
141a9dcc-249b-4503-98ef-d0e4d6a77f61	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
141a9dcc-249b-4503-98ef-d0e4d6a77f61	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
141a9dcc-249b-4503-98ef-d0e4d6a77f61	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
141a9dcc-249b-4503-98ef-d0e4d6a77f61	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d079a378-0a89-4a20-b349-d0a45a36df7d	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d079a378-0a89-4a20-b349-d0a45a36df7d	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d079a378-0a89-4a20-b349-d0a45a36df7d	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d079a378-0a89-4a20-b349-d0a45a36df7d	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bdd201a7-69b1-4d3c-bf2c-91fe7d7625ba	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bdd201a7-69b1-4d3c-bf2c-91fe7d7625ba	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bdd201a7-69b1-4d3c-bf2c-91fe7d7625ba	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bdd201a7-69b1-4d3c-bf2c-91fe7d7625ba	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e948ca2a-a167-4713-b28b-56ac1b655348	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e948ca2a-a167-4713-b28b-56ac1b655348	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e948ca2a-a167-4713-b28b-56ac1b655348	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e948ca2a-a167-4713-b28b-56ac1b655348	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f3a2d85d-37cf-4b07-a3a6-fd962fc50f28	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f3a2d85d-37cf-4b07-a3a6-fd962fc50f28	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f3a2d85d-37cf-4b07-a3a6-fd962fc50f28	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f3a2d85d-37cf-4b07-a3a6-fd962fc50f28	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
4a7ba88d-8b74-4fd4-bc3e-c5e4c49aa825	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
4a7ba88d-8b74-4fd4-bc3e-c5e4c49aa825	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
4a7ba88d-8b74-4fd4-bc3e-c5e4c49aa825	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
4a7ba88d-8b74-4fd4-bc3e-c5e4c49aa825	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
0bc5071e-23f9-4afe-879c-32aa71c51282	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
0bc5071e-23f9-4afe-879c-32aa71c51282	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
0bc5071e-23f9-4afe-879c-32aa71c51282	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
0bc5071e-23f9-4afe-879c-32aa71c51282	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
1c9ed5c4-3574-453d-b3eb-07d05cde4458	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
1c9ed5c4-3574-453d-b3eb-07d05cde4458	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
1c9ed5c4-3574-453d-b3eb-07d05cde4458	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
1c9ed5c4-3574-453d-b3eb-07d05cde4458	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b02ea654-251c-4633-887a-a72f9fc02a53	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b02ea654-251c-4633-887a-a72f9fc02a53	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b02ea654-251c-4633-887a-a72f9fc02a53	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b02ea654-251c-4633-887a-a72f9fc02a53	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
91651f30-503d-4c76-b40d-1462766fe6b6	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
91651f30-503d-4c76-b40d-1462766fe6b6	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
91651f30-503d-4c76-b40d-1462766fe6b6	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
91651f30-503d-4c76-b40d-1462766fe6b6	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e077b785-a1fa-4c4f-916f-c2284479e9e2	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e077b785-a1fa-4c4f-916f-c2284479e9e2	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e077b785-a1fa-4c4f-916f-c2284479e9e2	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e077b785-a1fa-4c4f-916f-c2284479e9e2	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f71e75df-ce1c-4b85-a55b-8c794a2225bb	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f71e75df-ce1c-4b85-a55b-8c794a2225bb	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f71e75df-ce1c-4b85-a55b-8c794a2225bb	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
f71e75df-ce1c-4b85-a55b-8c794a2225bb	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d825b61c-7d17-4731-890a-f9729d09c481	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d825b61c-7d17-4731-890a-f9729d09c481	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d825b61c-7d17-4731-890a-f9729d09c481	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d825b61c-7d17-4731-890a-f9729d09c481	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bf08beee-f12e-4822-a5df-a847d73f8ac7	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bf08beee-f12e-4822-a5df-a847d73f8ac7	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bf08beee-f12e-4822-a5df-a847d73f8ac7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
bf08beee-f12e-4822-a5df-a847d73f8ac7	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
79f5f845-9cd7-4e0d-aa08-9c0e97d291c7	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
79f5f845-9cd7-4e0d-aa08-9c0e97d291c7	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
79f5f845-9cd7-4e0d-aa08-9c0e97d291c7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
79f5f845-9cd7-4e0d-aa08-9c0e97d291c7	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
c31f1ca5-7401-46c4-b392-ddbfdd629107	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
c31f1ca5-7401-46c4-b392-ddbfdd629107	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
c31f1ca5-7401-46c4-b392-ddbfdd629107	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
c31f1ca5-7401-46c4-b392-ddbfdd629107	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d001d3dc-342c-4ac2-98e0-33ac1fea31aa	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d001d3dc-342c-4ac2-98e0-33ac1fea31aa	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d001d3dc-342c-4ac2-98e0-33ac1fea31aa	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d001d3dc-342c-4ac2-98e0-33ac1fea31aa	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
8be0331e-95ff-498e-99e4-a17e9fc31c25	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
8be0331e-95ff-498e-99e4-a17e9fc31c25	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
8be0331e-95ff-498e-99e4-a17e9fc31c25	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
8be0331e-95ff-498e-99e4-a17e9fc31c25	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
a1400dd0-9712-45d4-bb01-d70e01316691	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
a1400dd0-9712-45d4-bb01-d70e01316691	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
a1400dd0-9712-45d4-bb01-d70e01316691	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
a1400dd0-9712-45d4-bb01-d70e01316691	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b91f6432-2066-48aa-b1df-91ddf61979e7	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b91f6432-2066-48aa-b1df-91ddf61979e7	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b91f6432-2066-48aa-b1df-91ddf61979e7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
b91f6432-2066-48aa-b1df-91ddf61979e7	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
21053734-d0d6-410c-a2ee-8010c89a0772	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
21053734-d0d6-410c-a2ee-8010c89a0772	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
21053734-d0d6-410c-a2ee-8010c89a0772	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
21053734-d0d6-410c-a2ee-8010c89a0772	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
863b903f-82b4-4ad6-9df0-2d32314e8d9f	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
863b903f-82b4-4ad6-9df0-2d32314e8d9f	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
863b903f-82b4-4ad6-9df0-2d32314e8d9f	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
863b903f-82b4-4ad6-9df0-2d32314e8d9f	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e2f3e367-a30e-4a2d-854f-9353042a17b2	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e2f3e367-a30e-4a2d-854f-9353042a17b2	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e2f3e367-a30e-4a2d-854f-9353042a17b2	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
e2f3e367-a30e-4a2d-854f-9353042a17b2	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
2c207e4c-9e2d-446d-a2f6-172e922403f4	eb25ef9d-33c6-4d06-8f80-4bd91414f10a	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
2c207e4c-9e2d-446d-a2f6-172e922403f4	9a994b87-2319-4f58-a117-e3fab27f7f79	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
2c207e4c-9e2d-446d-a2f6-172e922403f4	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
2c207e4c-9e2d-446d-a2f6-172e922403f4	a978285b-b408-4e16-85a2-97503741ab99	2026-07-21 09:59:10.554187+00	pending	\N	\N	2026-07-21 09:59:10.554187+00
d6ea185b-f6b4-49fd-867b-030e6d0604c0	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
d6ea185b-f6b4-49fd-867b-030e6d0604c0	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
d6ea185b-f6b4-49fd-867b-030e6d0604c0	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
ce482338-4851-4023-aa6b-296e5ebe00fc	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
ce482338-4851-4023-aa6b-296e5ebe00fc	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
ce482338-4851-4023-aa6b-296e5ebe00fc	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
a2aa8997-24da-4ed4-9bd2-a279fec090c5	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
a2aa8997-24da-4ed4-9bd2-a279fec090c5	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
a2aa8997-24da-4ed4-9bd2-a279fec090c5	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
716765eb-af66-4eef-97a6-c7ae549fe07b	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
716765eb-af66-4eef-97a6-c7ae549fe07b	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
716765eb-af66-4eef-97a6-c7ae549fe07b	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
aa16d3a7-3d8c-41a9-ad9f-438172a623ec	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
aa16d3a7-3d8c-41a9-ad9f-438172a623ec	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
aa16d3a7-3d8c-41a9-ad9f-438172a623ec	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
116986c5-ba67-4845-84d5-3d10dfaaaf3b	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
116986c5-ba67-4845-84d5-3d10dfaaaf3b	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
116986c5-ba67-4845-84d5-3d10dfaaaf3b	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
653b5518-8485-4168-bcae-2a26d97475e0	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
653b5518-8485-4168-bcae-2a26d97475e0	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
653b5518-8485-4168-bcae-2a26d97475e0	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
1db25eda-361b-49de-a814-fbca7c85fd04	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
1db25eda-361b-49de-a814-fbca7c85fd04	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
1db25eda-361b-49de-a814-fbca7c85fd04	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
1f2754d2-38b7-400e-983f-8183a5d70034	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
1f2754d2-38b7-400e-983f-8183a5d70034	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
1f2754d2-38b7-400e-983f-8183a5d70034	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
40ebe309-365f-4571-bd79-adcc14cf9d05	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
40ebe309-365f-4571-bd79-adcc14cf9d05	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
40ebe309-365f-4571-bd79-adcc14cf9d05	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
951b3e8a-1a0f-4b02-b964-0b028558c458	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
951b3e8a-1a0f-4b02-b964-0b028558c458	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
951b3e8a-1a0f-4b02-b964-0b028558c458	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
14dd184b-4eb5-4343-ac28-dd4dd830d2b7	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
14dd184b-4eb5-4343-ac28-dd4dd830d2b7	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
14dd184b-4eb5-4343-ac28-dd4dd830d2b7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
605fba82-600f-40b8-85af-e768eaf9a2e9	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
605fba82-600f-40b8-85af-e768eaf9a2e9	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
605fba82-600f-40b8-85af-e768eaf9a2e9	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
dacde977-be1b-4368-85ea-68249f886de8	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
dacde977-be1b-4368-85ea-68249f886de8	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
dacde977-be1b-4368-85ea-68249f886de8	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
59b2e469-be34-4c56-95ed-3720dece2018	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
59b2e469-be34-4c56-95ed-3720dece2018	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
59b2e469-be34-4c56-95ed-3720dece2018	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
444463df-bdf3-4b6e-91ba-199dc6c4cf7a	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
444463df-bdf3-4b6e-91ba-199dc6c4cf7a	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
444463df-bdf3-4b6e-91ba-199dc6c4cf7a	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
d12a5041-273f-4257-b1b1-549d1b3cbb56	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
d12a5041-273f-4257-b1b1-549d1b3cbb56	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
d12a5041-273f-4257-b1b1-549d1b3cbb56	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
38c57b50-3858-4801-a792-40ee87100bf7	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
38c57b50-3858-4801-a792-40ee87100bf7	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
38c57b50-3858-4801-a792-40ee87100bf7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
7a6f7a61-cf03-43ea-8f94-5d79ba9a1951	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
7a6f7a61-cf03-43ea-8f94-5d79ba9a1951	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
7a6f7a61-cf03-43ea-8f94-5d79ba9a1951	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
dde0039d-46a0-4409-9bf3-c9e8e1efdb3b	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
dde0039d-46a0-4409-9bf3-c9e8e1efdb3b	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
dde0039d-46a0-4409-9bf3-c9e8e1efdb3b	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
f7b77c39-0d4c-4516-8e71-d3e426da1da9	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
f7b77c39-0d4c-4516-8e71-d3e426da1da9	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
f7b77c39-0d4c-4516-8e71-d3e426da1da9	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
76eb6383-4817-4026-97f6-4fa00bdbcd4e	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
76eb6383-4817-4026-97f6-4fa00bdbcd4e	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
76eb6383-4817-4026-97f6-4fa00bdbcd4e	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
3e791412-c973-4721-aa2d-27f8783a0cf7	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
3e791412-c973-4721-aa2d-27f8783a0cf7	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
3e791412-c973-4721-aa2d-27f8783a0cf7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
2e107706-a7ec-4d9e-b7cf-5ac8a1996eb3	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
2e107706-a7ec-4d9e-b7cf-5ac8a1996eb3	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
2e107706-a7ec-4d9e-b7cf-5ac8a1996eb3	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
19a34c3b-30b0-4450-9793-08c82a40bb28	92150e94-b8fc-46a0-8f60-f8bf05d30f39	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
19a34c3b-30b0-4450-9793-08c82a40bb28	f3ed2b48-1918-4c01-a1b6-e3441da1c8dd	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
19a34c3b-30b0-4450-9793-08c82a40bb28	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:10.964482+00	pending	\N	\N	2026-07-21 09:59:10.964482+00
db9d7a4a-f5e7-4758-a24b-0a93038df15d	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
db9d7a4a-f5e7-4758-a24b-0a93038df15d	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
db9d7a4a-f5e7-4758-a24b-0a93038df15d	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
db9d7a4a-f5e7-4758-a24b-0a93038df15d	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
db9d7a4a-f5e7-4758-a24b-0a93038df15d	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6c7ef871-6dd6-4bb0-8060-4bbde9c173cc	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6c7ef871-6dd6-4bb0-8060-4bbde9c173cc	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6c7ef871-6dd6-4bb0-8060-4bbde9c173cc	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6c7ef871-6dd6-4bb0-8060-4bbde9c173cc	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6c7ef871-6dd6-4bb0-8060-4bbde9c173cc	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6865a4ab-e67a-4f8c-9e2a-cd954d4ebebc	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6865a4ab-e67a-4f8c-9e2a-cd954d4ebebc	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6865a4ab-e67a-4f8c-9e2a-cd954d4ebebc	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6865a4ab-e67a-4f8c-9e2a-cd954d4ebebc	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6865a4ab-e67a-4f8c-9e2a-cd954d4ebebc	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
dd697b4a-52ee-4771-b352-192780ea6ca5	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
dd697b4a-52ee-4771-b352-192780ea6ca5	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
dd697b4a-52ee-4771-b352-192780ea6ca5	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
dd697b4a-52ee-4771-b352-192780ea6ca5	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
dd697b4a-52ee-4771-b352-192780ea6ca5	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
a5a1f1cd-c9d4-49b7-88bb-8b052d54c81b	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
a5a1f1cd-c9d4-49b7-88bb-8b052d54c81b	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
a5a1f1cd-c9d4-49b7-88bb-8b052d54c81b	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
a5a1f1cd-c9d4-49b7-88bb-8b052d54c81b	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
a5a1f1cd-c9d4-49b7-88bb-8b052d54c81b	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e829a31b-b645-4acb-91e2-eeb2513dff60	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e829a31b-b645-4acb-91e2-eeb2513dff60	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e829a31b-b645-4acb-91e2-eeb2513dff60	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e829a31b-b645-4acb-91e2-eeb2513dff60	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e829a31b-b645-4acb-91e2-eeb2513dff60	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6329a6d7-153d-4a3c-a303-fb1ce8277374	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6329a6d7-153d-4a3c-a303-fb1ce8277374	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6329a6d7-153d-4a3c-a303-fb1ce8277374	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6329a6d7-153d-4a3c-a303-fb1ce8277374	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6329a6d7-153d-4a3c-a303-fb1ce8277374	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e9ef9401-edd7-47fa-98cc-3982f1c7fa44	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e9ef9401-edd7-47fa-98cc-3982f1c7fa44	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e9ef9401-edd7-47fa-98cc-3982f1c7fa44	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e9ef9401-edd7-47fa-98cc-3982f1c7fa44	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e9ef9401-edd7-47fa-98cc-3982f1c7fa44	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
38b7a44d-d449-430e-89b1-40e0c952954c	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
38b7a44d-d449-430e-89b1-40e0c952954c	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
38b7a44d-d449-430e-89b1-40e0c952954c	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
38b7a44d-d449-430e-89b1-40e0c952954c	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
38b7a44d-d449-430e-89b1-40e0c952954c	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
926ac1ae-001b-490e-b951-483f21e79cc2	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
926ac1ae-001b-490e-b951-483f21e79cc2	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
926ac1ae-001b-490e-b951-483f21e79cc2	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
926ac1ae-001b-490e-b951-483f21e79cc2	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
926ac1ae-001b-490e-b951-483f21e79cc2	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
ad0662ee-4b55-42fd-b858-00bb3f5766fa	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
ad0662ee-4b55-42fd-b858-00bb3f5766fa	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
ad0662ee-4b55-42fd-b858-00bb3f5766fa	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
ad0662ee-4b55-42fd-b858-00bb3f5766fa	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
ad0662ee-4b55-42fd-b858-00bb3f5766fa	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
d3282d57-f12c-4f13-9093-ff4c8db8f89f	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
d3282d57-f12c-4f13-9093-ff4c8db8f89f	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
d3282d57-f12c-4f13-9093-ff4c8db8f89f	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
d3282d57-f12c-4f13-9093-ff4c8db8f89f	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
d3282d57-f12c-4f13-9093-ff4c8db8f89f	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
216cc140-5c0e-4c4c-b638-b795bb61684a	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
216cc140-5c0e-4c4c-b638-b795bb61684a	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
216cc140-5c0e-4c4c-b638-b795bb61684a	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
216cc140-5c0e-4c4c-b638-b795bb61684a	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
216cc140-5c0e-4c4c-b638-b795bb61684a	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e1170f55-acc0-428d-8c58-86230d366687	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e1170f55-acc0-428d-8c58-86230d366687	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e1170f55-acc0-428d-8c58-86230d366687	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e1170f55-acc0-428d-8c58-86230d366687	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
e1170f55-acc0-428d-8c58-86230d366687	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
51b5234f-67a8-465b-9526-f60090b51d32	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
51b5234f-67a8-465b-9526-f60090b51d32	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
51b5234f-67a8-465b-9526-f60090b51d32	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
51b5234f-67a8-465b-9526-f60090b51d32	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
51b5234f-67a8-465b-9526-f60090b51d32	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f419cfc5-d356-425c-a999-749d7ce14f8d	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f419cfc5-d356-425c-a999-749d7ce14f8d	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f419cfc5-d356-425c-a999-749d7ce14f8d	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f419cfc5-d356-425c-a999-749d7ce14f8d	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f419cfc5-d356-425c-a999-749d7ce14f8d	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f052751d-c9f1-4505-be2a-0c67c87e979c	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f052751d-c9f1-4505-be2a-0c67c87e979c	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f052751d-c9f1-4505-be2a-0c67c87e979c	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f052751d-c9f1-4505-be2a-0c67c87e979c	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
f052751d-c9f1-4505-be2a-0c67c87e979c	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
351c28d7-e3fb-437f-af56-3dc7c12483aa	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
351c28d7-e3fb-437f-af56-3dc7c12483aa	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
351c28d7-e3fb-437f-af56-3dc7c12483aa	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
351c28d7-e3fb-437f-af56-3dc7c12483aa	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
351c28d7-e3fb-437f-af56-3dc7c12483aa	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
355e9289-8464-45f5-8f72-664ce07e79cc	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
355e9289-8464-45f5-8f72-664ce07e79cc	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
355e9289-8464-45f5-8f72-664ce07e79cc	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
355e9289-8464-45f5-8f72-664ce07e79cc	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
355e9289-8464-45f5-8f72-664ce07e79cc	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
98acbcdb-7576-4612-bef2-2e160c6858cb	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
98acbcdb-7576-4612-bef2-2e160c6858cb	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
98acbcdb-7576-4612-bef2-2e160c6858cb	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
98acbcdb-7576-4612-bef2-2e160c6858cb	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
98acbcdb-7576-4612-bef2-2e160c6858cb	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
536dd36d-0180-44d8-baed-d24fa982dc0a	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
536dd36d-0180-44d8-baed-d24fa982dc0a	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
536dd36d-0180-44d8-baed-d24fa982dc0a	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
536dd36d-0180-44d8-baed-d24fa982dc0a	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
536dd36d-0180-44d8-baed-d24fa982dc0a	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
9a6bd77e-ddc3-44f4-b4fb-7c8980c19de2	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
9a6bd77e-ddc3-44f4-b4fb-7c8980c19de2	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
9a6bd77e-ddc3-44f4-b4fb-7c8980c19de2	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
9a6bd77e-ddc3-44f4-b4fb-7c8980c19de2	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
9a6bd77e-ddc3-44f4-b4fb-7c8980c19de2	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
b3520c22-b761-4cbf-911c-591c85ec05c4	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
b3520c22-b761-4cbf-911c-591c85ec05c4	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
b3520c22-b761-4cbf-911c-591c85ec05c4	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
b3520c22-b761-4cbf-911c-591c85ec05c4	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
b3520c22-b761-4cbf-911c-591c85ec05c4	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6b97804b-3daa-4085-9320-e819d73a1013	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6b97804b-3daa-4085-9320-e819d73a1013	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6b97804b-3daa-4085-9320-e819d73a1013	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6b97804b-3daa-4085-9320-e819d73a1013	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6b97804b-3daa-4085-9320-e819d73a1013	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
3c6dc1ec-23f9-47b7-bd26-93c48cc0950d	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
3c6dc1ec-23f9-47b7-bd26-93c48cc0950d	3ad21296-0fd0-4fae-beca-65bc2ed7cad0	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
3c6dc1ec-23f9-47b7-bd26-93c48cc0950d	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
3c6dc1ec-23f9-47b7-bd26-93c48cc0950d	4b50b95b-df75-4145-8ed0-9eb56c4af59f	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
3c6dc1ec-23f9-47b7-bd26-93c48cc0950d	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.342476+00	pending	\N	\N	2026-07-21 09:59:11.342476+00
6c5e3103-842c-421e-82cb-982c9a6870a1	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
6c5e3103-842c-421e-82cb-982c9a6870a1	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
6c5e3103-842c-421e-82cb-982c9a6870a1	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
6c5e3103-842c-421e-82cb-982c9a6870a1	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9972f640-d8bd-4675-89ea-f1e08f993600	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9972f640-d8bd-4675-89ea-f1e08f993600	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9972f640-d8bd-4675-89ea-f1e08f993600	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9972f640-d8bd-4675-89ea-f1e08f993600	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
82586405-0d26-42c1-9345-7dafac96fb95	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
82586405-0d26-42c1-9345-7dafac96fb95	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
82586405-0d26-42c1-9345-7dafac96fb95	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
82586405-0d26-42c1-9345-7dafac96fb95	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fad5a884-c433-49d1-8910-55133c0cfdd7	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fad5a884-c433-49d1-8910-55133c0cfdd7	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fad5a884-c433-49d1-8910-55133c0cfdd7	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fad5a884-c433-49d1-8910-55133c0cfdd7	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
396d06ab-5c2d-4dd2-90f3-6390338521ce	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
396d06ab-5c2d-4dd2-90f3-6390338521ce	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
396d06ab-5c2d-4dd2-90f3-6390338521ce	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
396d06ab-5c2d-4dd2-90f3-6390338521ce	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
088ce537-6fe5-4953-b4b2-89a9b8019a87	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
088ce537-6fe5-4953-b4b2-89a9b8019a87	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
088ce537-6fe5-4953-b4b2-89a9b8019a87	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
088ce537-6fe5-4953-b4b2-89a9b8019a87	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
c51c8467-e7c7-48c5-9818-491241fd56e4	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
c51c8467-e7c7-48c5-9818-491241fd56e4	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
c51c8467-e7c7-48c5-9818-491241fd56e4	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
c51c8467-e7c7-48c5-9818-491241fd56e4	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
856e1aa3-a540-42b1-a630-7fc43b6a14dd	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
856e1aa3-a540-42b1-a630-7fc43b6a14dd	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
856e1aa3-a540-42b1-a630-7fc43b6a14dd	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
856e1aa3-a540-42b1-a630-7fc43b6a14dd	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9c7cb300-a205-421f-8acd-577da4316e97	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9c7cb300-a205-421f-8acd-577da4316e97	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9c7cb300-a205-421f-8acd-577da4316e97	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
9c7cb300-a205-421f-8acd-577da4316e97	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2ed3871e-ad40-4986-86b8-8c2182f1cd38	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2ed3871e-ad40-4986-86b8-8c2182f1cd38	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2ed3871e-ad40-4986-86b8-8c2182f1cd38	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2ed3871e-ad40-4986-86b8-8c2182f1cd38	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fd169c33-cd8b-4a0d-98bf-71c89183caa2	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fd169c33-cd8b-4a0d-98bf-71c89183caa2	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fd169c33-cd8b-4a0d-98bf-71c89183caa2	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
fd169c33-cd8b-4a0d-98bf-71c89183caa2	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
14738291-039b-45c0-aa4d-7bb84c52ba83	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
14738291-039b-45c0-aa4d-7bb84c52ba83	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
14738291-039b-45c0-aa4d-7bb84c52ba83	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
14738291-039b-45c0-aa4d-7bb84c52ba83	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
1a586b04-b4d0-4d04-a609-add62c61c6a1	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
1a586b04-b4d0-4d04-a609-add62c61c6a1	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
1a586b04-b4d0-4d04-a609-add62c61c6a1	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
1a586b04-b4d0-4d04-a609-add62c61c6a1	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
0f925aec-48ff-4ac0-8ead-453877b803e8	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
0f925aec-48ff-4ac0-8ead-453877b803e8	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
0f925aec-48ff-4ac0-8ead-453877b803e8	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
0f925aec-48ff-4ac0-8ead-453877b803e8	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
7efbf899-2bea-431c-8295-55abb970f7b1	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
7efbf899-2bea-431c-8295-55abb970f7b1	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
7efbf899-2bea-431c-8295-55abb970f7b1	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
7efbf899-2bea-431c-8295-55abb970f7b1	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
d8104ca9-dc1b-452f-8882-08280fe5dad4	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
d8104ca9-dc1b-452f-8882-08280fe5dad4	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
d8104ca9-dc1b-452f-8882-08280fe5dad4	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
d8104ca9-dc1b-452f-8882-08280fe5dad4	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
4349a895-f0b5-47a9-b4b2-f212837d23b9	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
4349a895-f0b5-47a9-b4b2-f212837d23b9	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
4349a895-f0b5-47a9-b4b2-f212837d23b9	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
4349a895-f0b5-47a9-b4b2-f212837d23b9	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
5f6258ac-7089-45b5-b1e4-638178418d4c	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
5f6258ac-7089-45b5-b1e4-638178418d4c	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
5f6258ac-7089-45b5-b1e4-638178418d4c	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
5f6258ac-7089-45b5-b1e4-638178418d4c	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
b1f7eaf7-864f-428b-a271-556fb79103eb	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
b1f7eaf7-864f-428b-a271-556fb79103eb	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
b1f7eaf7-864f-428b-a271-556fb79103eb	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
b1f7eaf7-864f-428b-a271-556fb79103eb	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
110ce348-0c00-49eb-8aad-d368db2acec8	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
110ce348-0c00-49eb-8aad-d368db2acec8	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
110ce348-0c00-49eb-8aad-d368db2acec8	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
110ce348-0c00-49eb-8aad-d368db2acec8	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
df869064-0813-445b-a81c-a7646f13b67a	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
df869064-0813-445b-a81c-a7646f13b67a	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
df869064-0813-445b-a81c-a7646f13b67a	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
df869064-0813-445b-a81c-a7646f13b67a	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
aa21a03a-8987-40f6-865f-60290d066887	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
aa21a03a-8987-40f6-865f-60290d066887	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
aa21a03a-8987-40f6-865f-60290d066887	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
aa21a03a-8987-40f6-865f-60290d066887	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2f3c234b-859a-4608-8611-95e24cee4bcc	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2f3c234b-859a-4608-8611-95e24cee4bcc	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2f3c234b-859a-4608-8611-95e24cee4bcc	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
2f3c234b-859a-4608-8611-95e24cee4bcc	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
be82a5f2-d4c8-4796-9a1a-de52109c4e81	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
be82a5f2-d4c8-4796-9a1a-de52109c4e81	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
be82a5f2-d4c8-4796-9a1a-de52109c4e81	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
be82a5f2-d4c8-4796-9a1a-de52109c4e81	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
18f2ee76-85c0-47d2-957c-8984de6ed7bd	08532251-557e-4194-82d6-6af2ed6874c2	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
18f2ee76-85c0-47d2-957c-8984de6ed7bd	c373ac19-8fdd-4e21-81cc-6f39561baf1f	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
18f2ee76-85c0-47d2-957c-8984de6ed7bd	996bde3b-c8d1-4ec3-941e-e9317980a5f0	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
18f2ee76-85c0-47d2-957c-8984de6ed7bd	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 09:59:11.665713+00	pending	\N	\N	2026-07-21 09:59:11.665713+00
3da0e5b9-ff82-4850-b194-9b3c6034536b	e5efed14-cf07-4530-916a-1a1d3f43822a	2026-07-21 19:55:56.114698+00	pending	\N	\N	2026-07-21 19:55:56.114698+00
3da0e5b9-ff82-4850-b194-9b3c6034536b	dfec57c5-eb5a-4acb-94a6-a3d6e2075083	2026-07-21 19:55:56.114698+00	pending	\N	\N	2026-07-21 19:55:56.114698+00
3da0e5b9-ff82-4850-b194-9b3c6034536b	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-21 19:55:56.114698+00	pending	\N	\N	2026-07-21 19:55:56.114698+00
3da0e5b9-ff82-4850-b194-9b3c6034536b	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-21 19:55:56.114698+00	pending	\N	\N	2026-07-21 19:55:56.114698+00
ccc07580-f37b-42e3-93e8-9680099fbebe	755949a6-6f22-4608-a071-9b01a0aa8a2b	2026-07-22 14:29:59.656+00	ACTIVE	\N	\N	2026-07-22 14:29:59.656+00
ccc07580-f37b-42e3-93e8-9680099fbebe	6a5c3c32-2d8e-44b3-9940-62a508b44fa9	2026-07-22 14:47:29.954+00	ACTIVE	\N	\N	2026-07-22 14:47:29.954+00
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
\.


--
-- Data for Name: quiz_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_questions" ("id", "quiz_id", "type", "order_index", "text", "points", "created_at") FROM stdin;
a3d01ecc-6c51-48e8-8441-f7e31238fb34	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	1	Che cos'è principalmente Google Sheets (Fogli Google)?	0.50	2026-07-19 19:37:23.10387+00
cd951399-5ab3-49b3-97df-e358d33c81c2	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	2	Quale simbolo è obbligatorio inserire all'inizio di una cella per scrivere una formula o una funzione?	0.50	2026-07-19 19:37:23.697769+00
4fc5f55b-b094-4762-89c2-6b6a633d2104	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	3	Come vengono identificate le colonne e le righe all'interno di un foglio di calcolo?	0.50	2026-07-19 19:37:24.075788+00
670aad17-a7aa-4547-8389-8a47c1b10f34	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	4	Quale funzione di base si utilizza per sommare i valori contenuti in un intervallo di celle (es. da A1 a A5)?	0.50	2026-07-19 19:37:24.456629+00
e7a39031-7f09-4fc1-a9f5-6e44c825e266	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	5	Cosa succede se si fa doppio clic sul bordo divisorio tra l'intestazione di due colonne (ad esempio tra A e B)?	0.50	2026-07-19 19:37:24.835479+00
ff09dc4a-0b0f-455f-ae07-04f596bc318e	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	6	Quale funzione ti permette di trovare il valore numerico più alto all'interno di un gruppo di celle?	0.50	2026-07-19 19:37:25.37914+00
04dc6efc-8d92-40d2-a9fe-52675738e189	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	7	A cosa serve l'aggiunta del simbolo del dollaro in un riferimento di cella (es. $A$1)?	0.50	2026-07-19 19:37:25.76099+00
a68bb306-748f-4f2c-87a3-d87b61e8abb7	059f730b-e762-4c74-aa88-5e49df5a4c8f	multiple_choice	8	Quale strumento di Google Sheets permette di cambiare in automatico il colore o lo stile di una cella in base al suo contenuto (es. testo rosso se il valore è inferiore a zero)?	0.50	2026-07-19 19:37:26.158547+00
7b0fe81b-827f-454f-95e5-07eb2bb39d1e	059f730b-e762-4c74-aa88-5e49df5a4c8f	open_ended	9	A. La funzione =SE() è uno degli strumenti logici più importanti nei fogli di calcolo. Spiega brevemente qual è lo scopo principale di questa funzione.\r\nB. La differenza tra riferimenti di cella relativi e assoluti è fondamentale in Google Sheets. Definisci cos'è un "riferimento relativo" e spiega cosa succede quando copi una formula che lo contiene in un'altra cella.\r\nC. I grafici permettono di trasformare tabelle di dati in informazioni visive immediate.Quali sono i passaggi tecnici fondamentali per inserire un grafico partendo da una tabella di dati grezzi in Google Sheets?	6.00	2026-07-19 19:37:26.564315+00
\.


--
-- Data for Name: quiz_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_options" ("id", "question_id", "text", "is_correct") FROM stdin;
b9bcd1c0-a96d-4330-83c5-6f231b11e498	a3d01ecc-6c51-48e8-8441-f7e31238fb34	Un programma di videoscrittura per redigere documenti testuali.	f
2754df56-523d-421f-959c-e36ae8ad1f12	a3d01ecc-6c51-48e8-8441-f7e31238fb34	Un'applicazione web per la creazione e la gestione di fogli di calcolo.	t
dbb3caaa-8583-49cd-b315-a141e0d35f34	a3d01ecc-6c51-48e8-8441-f7e31238fb34	Un software per il fotoritocco e la grafica vettoriale.	f
d39ddb27-e572-4f1c-80d2-7a127ec4c792	a3d01ecc-6c51-48e8-8441-f7e31238fb34	Una piattaforma per creare presentazioni a diapositive.	f
d8d3a7a3-76a2-47d7-af8e-d751b3af562c	cd951399-5ab3-49b3-97df-e358d33c81c2	+	f
6e4c0a88-44bf-4cbc-ac3e-85a0d3fed6ff	cd951399-5ab3-49b3-97df-e358d33c81c2	*	f
620ea9eb-0f06-4d17-8932-ceb452bca226	cd951399-5ab3-49b3-97df-e358d33c81c2	=	t
fb9af792-8f5f-4e1a-8368-d07933f63896	cd951399-5ab3-49b3-97df-e358d33c81c2	#	f
4687fbf0-8972-4f3d-afac-28b4ae47e57c	4fc5f55b-b094-4762-89c2-6b6a633d2104	Le colonne con numeri (1, 2, 3...) e le righe con lettere (A, B, C...).	f
7b8a3054-9810-4040-8b03-5885850e055d	4fc5f55b-b094-4762-89c2-6b6a633d2104	Le colonne con lettere (A, B, C...) e le righe con numeri (1, 2, 3...).	t
afca4bcd-8562-4888-8b2d-8ade3f6b89f0	4fc5f55b-b094-4762-89c2-6b6a633d2104	Entrambe utilizzano numeri progressivi.	f
3cfa8bf5-99f0-49dd-baaa-775d244a0aca	4fc5f55b-b094-4762-89c2-6b6a633d2104	Entrambe utilizzano lettere dell'alfabeto.	f
d5b1147c-f9e9-40a8-8d5b-3fcfeb548409	670aad17-a7aa-4547-8389-8a47c1b10f34	=TOTALE(A1:A5)	f
e5faa099-f18e-49ab-b654-e03e87f67f2b	670aad17-a7aa-4547-8389-8a47c1b10f34	=ADDIZIONE(A1:A5)	f
aad7379f-4190-4699-ac98-5b09f91d233e	670aad17-a7aa-4547-8389-8a47c1b10f34	=SOMMA(A1:A5)	t
21faf306-c805-4564-a53e-a4c4dd5c1763	670aad17-a7aa-4547-8389-8a47c1b10f34	=CALCOLA(A1:A5)	f
0124532b-5007-46ae-a1a8-a2752f02cd46	e7a39031-7f09-4fc1-a9f5-6e44c825e266	La colonna selezionata viene nascosta.	f
1fd28af2-a937-4177-9ce9-35946b1f04da	e7a39031-7f09-4fc1-a9f5-6e44c825e266	La larghezza della colonna si adatta automaticamente al contenuto più lungo al suo interno.	t
fe1e46ac-5e0f-4e6f-bb57-a62843cedd5d	e7a39031-7f09-4fc1-a9f5-6e44c825e266	Il colore di sfondo della colonna cambia in modo casuale.	f
97b21017-e5b5-46d8-94df-6329516810cd	e7a39031-7f09-4fc1-a9f5-6e44c825e266	Viene inserita una nuova colonna vuota.	f
ce48a295-90a6-497c-a999-e3bd0d00074a	ff09dc4a-0b0f-455f-ae07-04f596bc318e	=ALTO()	f
d3a5cab7-af35-4601-9b9b-535d33ea0bf4	ff09dc4a-0b0f-455f-ae07-04f596bc318e	=MAX()	t
aaab51d9-8f9c-4ce7-914b-01d9bb58c2dd	ff09dc4a-0b0f-455f-ae07-04f596bc318e	=MASSIMO()	f
1e0adadc-a4e9-49b3-978e-0189d7c38159	ff09dc4a-0b0f-455f-ae07-04f596bc318e	=MAGGIORE()	f
b1e77919-1c74-450e-b978-f86c5c729868	04dc6efc-8d92-40d2-a9fe-52675738e189	A formattare automaticamente il numero contenuto nella cella come valuta.	f
4626fec0-c2fb-4fdf-b1d1-27794cb45fd8	04dc6efc-8d92-40d2-a9fe-52675738e189	A indicare che la cella contiene dati provenienti da un sito web esterno.	f
74ab656c-529b-49a7-b267-a8cd3a159006	04dc6efc-8d92-40d2-a9fe-52675738e189	A creare un "riferimento assoluto", bloccando la cella affinché non cambi quando si copia la formula altrove.	t
ba8c568d-754b-4b8b-95fc-531d5964d72f	04dc6efc-8d92-40d2-a9fe-52675738e189	A proteggere la cella con una password per impedirne la modifica.	f
4a6babfd-8a5c-47a3-891d-b6b52865dcad	a68bb306-748f-4f2c-87a3-d87b61e8abb7	Formattazione condizionale	t
db9dbc60-7543-4ba0-afba-6939f5bef111	a68bb306-748f-4f2c-87a3-d87b61e8abb7	Creazione di un grafico	f
fa60081a-1c44-4243-83ed-f5cbcb90d96c	a68bb306-748f-4f2c-87a3-d87b61e8abb7	Convalida dei dati	f
393f907d-44a5-40f9-9f9b-198b238b2196	a68bb306-748f-4f2c-87a3-d87b61e8abb7	Testo a capo	f
\.


--
-- Data for Name: quiz_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_answers" ("id", "attempt_id", "question_id", "selected_option_id", "open_answer_text", "is_correct", "score", "created_at") FROM stdin;
\.


--
-- Data for Name: quiz_assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_assignments" ("id", "quiz_id", "course_id", "assigned_at", "due_at", "is_visible") FROM stdin;
b222e893-e169-4dba-84f1-0d8a8b0e3a75	059f730b-e762-4c74-aa88-5e49df5a4c8f	92903de9-0cae-4077-ae07-c6e962ba5c02	2026-07-19 19:37:42.552051+00	\N	t
\.


--
-- Data for Name: quiz_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."quiz_reviews" ("id", "attempt_id", "teacher_id", "question_id", "score", "comment", "reviewed_at") FROM stdin;
\.


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."resources" ("id", "title", "description", "url", "provider", "type", "typeVariant", "rating", "tags", "language", "is_visible", "created_at") FROM stdin;
16e1c68c-0456-42c0-9db7-e1e229db13d7	Blockchain Visualizer	Blockchain Visualizer	https://txcity.io/v/eth-btc	Web	Blockchain	default	4	{blockchain}	IT	t	2026-07-18 12:34:06.922684+00
fd4e84f5-8f86-4629-92e9-87c4e2de1d06	Blockchain Simulator	Blockchain Simulator	https://andersbrownworth.com/blockchain/	Web	Blockchain	default	5	{blockchain}	IT	t	2026-07-18 12:12:29.628477+00
baecab61-e562-41de-993e-a544da54c4d1	Blockchain Explorer	Blockchain Explorer	https://www.blockchain.com/explorer	Web	Blockchain	default	5	{blockchain}	IT	t	2026-07-18 12:50:03.871281+00
4e603114-6d46-492c-88bf-c56134331bfd	Bitcoin Paper Wallet  Generator	Bitcoin Paper Wallet  Generator	https://paperwallet.bitcoin.com/	Web	Blockchain	default	5	{blockchain}	IT	t	2026-07-18 12:52:12.143339+00
76aa8c80-b03b-48c4-9130-f5ab4306560d	Ethereum Blockchain Explorer	Ethereum Blockchain Explorer	https://etherscan.io/	Web	Blockchain	default	5	{blockchain}	IT	t	2026-07-18 12:53:50.493829+00
b068b2e8-a7e0-456a-a90f-f9fbef52e94e	Coinmarketcap	Crypto prices and more	https://coinmarketcap.com/	Web	Blockchain	default	5	{blockchain}	IT	t	2026-07-18 12:54:56.983343+00
972675cb-f196-4dfe-8758-a19ab0aa85c2	AI - Gemini	AI - Gemini	https://gemini.google.com/app	Web	AI	default	5	{AI}	IT	t	2026-07-18 12:56:45.794544+00
ee3c506b-9ab1-4219-9636-574c39f4d189	AI Models Hub	AI Models Hub	https://huggingface.co/	Web	AI	default	5	{AI}	IT	t	2026-07-18 12:57:29.643078+00
a4e3f2d4-9b24-47bf-aeda-13c147106acd	AI - Open Models	AI - Open Models	https://ollama.com/	Web	AI	default	5	{AI}	IT	t	2026-07-18 12:58:56.334988+00
650060fc-3998-48c8-94b0-e1af3fb33e98	Exercises Solutions	Soluzioni Esercizi	https://sites.google.com/view/gcprofsolutions	Web	Didattica	default	5	{teaching}	IT	t	2026-07-18 13:00:55.557009+00
6260a2ba-40fd-457a-b6ac-ca4356f1ee5a	GCPROF AI GENERATED	GCPROF AI GENERATED	https://youtu.be/ThGskUBzPEg?si=2KgVaIn1NjbVknnz	YouTube	Video	default	3	{gcprof}	IT	t	2026-07-18 13:07:48.610981+00
4cc786ea-257b-467e-a6d8-65843d7ef715	GCPROF SITE	GCPROF SITE	https://gcprof.odoo.com/	Web	Didattica	default	5	{gcprof}	IT	t	2026-07-18 13:11:31.54493+00
660818f0-6f26-429c-aab1-5f5917ee92aa	Bcrypt Generator	Bcrypt Generator	https://bcrypt-generator.com/	Web	Tools	default	3	{tools}	IT	t	2026-07-18 13:53:06.205099+00
\.


--
-- Data for Name: shopping_carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."shopping_carts" ("id", "profile_id", "status", "created_at", "updated_at") FROM stdin;
e00ca836-ada3-4250-a1c8-da3a391980ba	ccc07580-f37b-42e3-93e8-9680099fbebe	ACTIVE	2026-07-22 08:40:54.440638+00	2026-07-22 08:40:54.440638+00
76228e4a-2776-4dab-a41d-b28abbb4642d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	ACTIVE	2026-07-22 09:45:51.668654+00	2026-07-22 09:45:51.668654+00
\.


--
-- Data for Name: shopping_cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."shopping_cart_items" ("id", "cart_id", "course_id", "unit_price", "quantity", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: user_page_views; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."user_page_views" ("id", "profile_id", "path", "course_slug", "lesson_slug", "viewed_at") FROM stdin;
555ab011-e443-4c4e-bdc1-7be69b35be25	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-09 07:41:07.3+00
da90d07c-4776-4010-96ea-9c006794e057	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-09 07:41:16.679+00
ed57a626-db03-40ac-b668-34c0fb54d14f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/contacts	\N	\N	2026-07-09 07:41:27.799+00
c88d3f44-90bd-4b06-bfdf-e32e2a520818	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-09 07:41:31.597+00
435ff479-e725-4c1a-90b4-2c35d9e86174	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:25:20.905+00
04eee092-92fb-428d-913c-5d6b2102f22c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 19:54:45.854+00
0da4ed16-dc36-48e8-b57c-f0df812d5ca7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 09:54:31.581+00
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
500b23b2-3874-4d63-999b-b0debc5e4ade	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:16:07.107+00
66367931-0fac-47ea-8471-697576585f79	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 13:00:59.938+00
0664d2f8-d591-49b5-87b0-45140d0b1c2a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 13:31:07.167+00
e65b6941-fa82-41bb-9ba5-b1f7645a63e2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:53:17.444+00
9a67147f-4d97-4424-8c04-1f4d22fac02c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:10:43.026+00
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
54dd1b99-5af0-43f7-84ab-970d1f17abbd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:27:35.667+00
cbb40484-d940-46d3-9158-7a43c11adf42	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:34:51.11+00
df5a8d7d-73c3-43b1-9a3e-d50023db5c08	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:35:08.433+00
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
288ef8e1-9fb3-4aca-ab17-b6df6d0785e2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:35:05.569+00
aa7d1e9c-4b77-447f-804f-4eb63cca19a9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 19:54:50.082+00
3e870ef2-1be6-47b2-be47-fa79e1d1e614	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 10:01:45.619+00
036081f8-0a16-4282-b02e-4f3321869725	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:18:18.334+00
3928a06c-9a17-42c9-8e4f-813d1eb31b47	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 13:05:29.677+00
a617d27f-172a-4639-8fa0-52c9f320beff	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:31:10.34+00
a0642497-b920-4458-8519-e875d1735152	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:53:21.858+00
0406d9fd-8518-47a4-b1bc-e6317b3953ee	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:12:00.49+00
01b7e39c-6c3b-4c5a-abd5-c9d528d4f599	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-18 14:27:38.966+00
dfd132af-97db-4ddd-9b87-2556c1563859	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:34:54.553+00
fa4a79a4-d530-42b0-a85f-333318370a28	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:54:37.506+00
04e26ec7-c4be-40c2-a36a-9903e3b08ba1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:55:08.196+00
16e39145-21c8-435b-9feb-821808255e4b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 15:01:58.696+00
d96148da-8c17-452d-a464-166f0b983e3f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz	quiz	\N	2026-07-18 15:17:33.006+00
9e94acac-56f3-4f43-bc19-0a974f4fa862	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:35:28.941+00
4541bbd2-d088-4146-bc90-94dc8421dc66	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/99faa893-5fe8-4001-ba87-f5814e31791d	python-1	99faa893-5fe8-4001-ba87-f5814e31791d	2026-07-18 16:41:18.495+00
f372a881-c768-40dd-a80b-0af62983340d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1/modules/d4c96bb2-e80b-4ead-a569-86e791beb3ba/lessons/64cb0f4c-4123-485a-a2c6-0eadf9864131	problem-solving-1	64cb0f4c-4123-485a-a2c6-0eadf9864131	2026-07-18 16:46:58.498+00
62f981d0-fd12-4014-be56-1d144817b34e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1/modules/22ff1322-2316-4cba-9626-668c84ec1d59/lessons/cf29aedb-d0df-4675-b32c-5946f8d69280	database-1	cf29aedb-d0df-4675-b32c-5946f8d69280	2026-07-18 16:53:02.766+00
50ab0778-2968-4d9a-b11a-31fae4f91324	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 16:56:12.698+00
688b9ed4-be85-47d5-b339-c37353895904	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:59:44.679+00
a2cc6b22-bbf6-44fe-8ad9-8e69d502df2d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 16:59:47.575+00
c2ff78fd-cdea-4bb2-80b2-8e344828db96	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 17:08:13.21+00
00faaffb-bda0-4191-9661-8500d0dabcca	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-18 17:08:16.622+00
1484371e-7cd2-47af-942c-82e419252596	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:01:54.961+00
ff7b9b3a-3b02-46ed-84ab-b883e620a0cc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 12:21:40.765+00
4dd00c85-4000-4b78-8bd3-bb1e6e21c05e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-19 12:34:37.444+00
a327cc9d-cf91-459e-8481-0513e3745c8f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-19 19:38:01.225+00
c6b25b6b-c056-436f-846d-f57a426c5ebb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz-1	quiz-1	\N	2026-07-19 19:38:07.229+00
14d19e7b-ff77-4ec0-8443-1fd039a1ef12	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-19 19:38:35.069+00
79f7dbd6-c805-4ad6-9f93-ad5075fade49	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 08:02:23.52+00
f41ebbfd-114d-47d8-bfb7-a4bff3181002	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-20 12:00:48.492+00
b6a3a855-83eb-4da2-a6c1-6382b9bc8013	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 12:21:35.214+00
75d6f84d-fbc2-4f6a-8fa4-fcb3e3a2efc7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 12:22:13.836+00
f2b1365d-f341-41ee-9136-7b75f7c60081	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 12:33:02.447+00
2a379434-b16b-434e-b782-d7615832d151	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1/modules/d4c96bb2-e80b-4ead-a569-86e791beb3ba/lessons/64cb0f4c-4123-485a-a2c6-0eadf9864131	problem-solving-1	64cb0f4c-4123-485a-a2c6-0eadf9864131	2026-07-20 12:47:19.685+00
bb12d958-e10b-49e1-93cf-c6d720274507	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:31:57.581+00
34e70d27-097a-436e-a7f0-41f18fd86e78	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1/modules/d4c96bb2-e80b-4ead-a569-86e791beb3ba/lessons/64cb0f4c-4123-485a-a2c6-0eadf9864131	problem-solving-1	64cb0f4c-4123-485a-a2c6-0eadf9864131	2026-07-20 15:46:23.946+00
2fcb2921-acc5-4d0f-b8ef-75abb9ceab79	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-20 15:46:33.555+00
1ceb9f10-bb51-40a0-8893-1dda6a27bb50	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/38217ff1-0993-4867-87d8-234b480787c3	python-1	38217ff1-0993-4867-87d8-234b480787c3	2026-07-20 15:46:49.263+00
89a4653c-cb7c-424c-a8de-28bbb038b6aa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 15:54:13.023+00
dd66c186-8175-4cc1-bc2f-75aa3b439c4d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:13:05.964+00
c824d878-f7c9-417a-b963-0d0383d63cac	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:50:33.249+00
030f5153-74ea-448f-9017-b615aedb516c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 14:52:56.256+00
67e36f7a-10a7-4a44-9a30-bb07c5c3d219	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 16:43:38.777+00
c8dd5af7-eb66-498c-8b03-745b6b03e968	ccc07580-f37b-42e3-93e8-9680099fbebe	/login	\N	\N	2026-07-21 20:11:39.207+00
3478e6f2-b8a1-4367-9f92-d14d9ebd2023	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-21 20:11:39.361+00
f6dc635b-a89b-4c8a-b357-08296474f6d8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-21 20:51:48.826+00
af0de1d0-b021-4c6f-ad47-5b3a7af50fef	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-21 20:59:40.729+00
2156e02a-6642-47f4-ba1d-5012589b5df9	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:00:00.573+00
135d71a4-f76a-44a5-928e-75471c7a84e9	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:06:21.238+00
0e39b3bd-a309-41f8-9760-ce267069ae0a	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-21 21:13:45.943+00
7a4e0dd2-bd3e-404d-93d4-922fc681946e	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:14:04.135+00
8c0fff0c-bc60-4362-831e-ecfcc8096f72	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/blockchain-1	blockchain-1	\N	2026-07-21 21:20:25.106+00
31d19d1a-ada1-4156-9cf0-8e40974600e6	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/finance-1	finance-1	\N	2026-07-21 21:22:13.397+00
fd2ab2d1-4044-43d9-9cd3-a0b1e2c641ff	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-21 21:26:22.537+00
46b14166-16d5-4cab-b487-a7c7055bf97e	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 07:45:40.292+00
5889c54a-6f19-4ff6-9c4f-8f6958ee741b	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/ai-1	ai-1	\N	2026-07-22 08:10:25.762+00
035d8ee4-a7b8-4b00-830e-d004531c6bee	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:10:35.298+00
78b59678-ae3f-46da-9a22-e97adf63b45c	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:24:47.202+00
4bdc4038-3a5b-4dfb-a6eb-0ca8d6689e89	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 09:45:51.188+00
6307378a-bf39-4c0a-81a3-d7ca8cf3717e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 09:45:54.66+00
6b94fe8f-0b73-4878-9f05-59627c91ebe8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:00:20.291+00
4843b904-8005-4fa7-8f51-aaff4ce3e3a8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1/modules/d73ff3cc-9b4c-47f0-a001-4984e3a2f1b7/lessons/6361383a-9aed-4944-917d-216a7ed127df	web-programming-1	6361383a-9aed-4944-917d-216a7ed127df	2026-07-22 10:00:28.842+00
190823fb-67e2-443d-a8c8-4545786a71d8	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:00:51.499+00
a3ba80cc-e6cd-4498-ac3f-90763b6a0f90	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 10:17:14.762+00
50f1fe90-dfdc-4558-a279-94297e6407c5	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:17:20.401+00
46d2a554-5ef2-4e6a-a3b4-f64e00988ff3	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:21:36.76+00
ecc6e224-7b03-44bd-8b32-6912c3094f0c	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 10:24:15.526+00
e7045830-0c2e-4c80-9063-5c8804d50a1c	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/blockchain-1	blockchain-1	\N	2026-07-22 10:24:28.492+00
ea628639-4f43-4a90-bc37-1983ec98ef28	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 10:30:16.276+00
dd8bf147-4da0-49e2-bdbf-4e17fcbdabee	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-22 10:35:14.353+00
e6586fcf-f789-4195-b3fb-eecd92f89159	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-22 10:37:38.043+00
06899535-c654-4bf2-97ba-580d243364dd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 10:37:43.75+00
e83599c9-c117-4e3b-b114-cbcd7b7eeea1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:43:10.477+00
1e162905-7f8d-440a-8e0a-8cfa286cbd01	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1/modules/e6718169-84f6-4f62-9d4c-44cd7ca954f2/lessons/1b04d4a1-4f13-4ba6-92fb-91db24bc3a03	finance-1	1b04d4a1-4f13-4ba6-92fb-91db24bc3a03	2026-07-22 10:43:19.375+00
99feb81d-d07d-44b6-9bad-4621249816fe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 10:45:45.647+00
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
0962ca65-3cfa-40fb-95a7-6e59515b0ad5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:35:14.738+00
85ef85f7-65a3-4322-adc9-8208083c0637	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:01:38.112+00
e2520dad-8d96-4334-b3e6-34e31c0bb108	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 10:01:51.416+00
e95a290a-2f27-436c-baad-710893638c01	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-12 16:21:33.567+00
6fe4e1be-99ef-4abb-afef-9db2e3f196f7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-12 16:21:39.879+00
2aab58e8-44f3-4972-b33e-40189408ff7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 16:21:42.079+00
66b59475-4ded-43f6-a825-8d38d8e60829	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 16:22:14.997+00
fffbc9a4-6aae-484d-bba1-045fd796d861	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 17:12:47.691+00
6ac1804b-6e81-404d-a462-03a6690b8b1e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 17:12:51.391+00
2098e4e4-5657-422d-b4d0-e42ac64cfb65	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:13:02.974+00
e402a299-7a14-432c-a072-c77982356408	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:18:56.903+00
10a08537-ff24-4bf1-9579-21a3cafc4e4c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:05:32.393+00
8bc01e7a-d578-4a94-b782-d06aae5d6d2e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 13:44:33.914+00
8d02ba27-c16e-484d-ba26-87b62d0f8ad8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 13:54:57.015+00
5817d178-359c-45c1-b7de-b0900c801556	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:12:02.868+00
bbdfbd5f-63e0-4707-b000-a9784fbdb6a4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:12:10.877+00
c2eb2d86-7739-40ba-b1b8-dcd4d7f4b51b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-18 14:30:32.249+00
fa13b4f7-db95-449a-a2a0-bba8b8b2f482	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:35:23.848+00
b40fc89c-3c3b-45d4-9093-28d2836c73c6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-12 17:15:37.659+00
06323152-fdc8-4fba-bf1f-7564608a074c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 17:15:41.089+00
b99f1669-5670-4f18-9562-ef40875fc788	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:15:48.439+00
168d5956-6cd8-4634-8778-e6f268643eae	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-12 17:47:26.956+00
fee98e13-016d-4061-be58-0e77fb52a403	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-12 17:47:34.93+00
6d719f33-0048-4257-8122-cf8149460021	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:47:47.994+00
5f51b07a-4e32-4e1f-b01d-ba8462b27142	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/correction	\N	\N	2026-07-12 17:47:54.402+00
6f8593d0-9eb1-4382-9dfb-b1cf1557b004	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/analytics	\N	\N	2026-07-12 17:48:27.511+00
7202e90a-74cb-4a9d-b819-f5b199a421b0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/07a5cb8d-9287-4180-a66e-725f1716e734/review	\N	\N	2026-07-12 17:48:30.993+00
d2f31318-2e13-4998-880d-25b3a53d96e2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:55:30.712+00
bbdc66f4-8f71-4f17-968b-0b40ec7bb13e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 15:00:57.677+00
d071f23d-0e58-4ebd-8162-07792d24f300	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:01:59.411+00
9e2c2a53-598d-41a2-925e-ebda9d4279aa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:17:35.786+00
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
028836ec-825b-4218-8100-75093b00d415	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 10:40:30.186+00
13bcbde4-6c29-466f-b554-99f26ae06362	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:32:56.368+00
ada3f25b-140a-4f0d-834b-a8ba81fca85e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 13:05:40.69+00
c2d2fd4b-4e5e-4abb-8b3e-1c8c6dac5a8d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:44:35.068+00
066da990-8b2b-418a-8497-368c4da19c88	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 13:45:22.042+00
bd474d24-79f1-4544-be4f-6bba4846a0c3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:55:01.65+00
87c0c746-0cdf-496a-9fe2-f1380b91a6f7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2/modules/b99800bd-ee0d-42ed-956f-59694058ff47/lessons/82005a0d-227a-4804-8dd4-1db3177bc56d	informatica-2	82005a0d-227a-4804-8dd4-1db3177bc56d	2026-07-18 14:12:04.258+00
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
d2336c0c-4723-4bcb-a2fa-25083ce0df26	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:30:39.898+00
b9083510-e64e-48a2-a3ae-5de0766ca396	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:43:27.606+00
52e30970-b2cb-4ade-b70f-83255d89a94b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:56:21.751+00
78062045-8e30-4604-9434-cb6a97432bc1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:00:58.815+00
3c9da34e-d0b7-42cd-9f7c-af52ae650edc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/1a03cfbf-eb62-4544-b158-44a0a1c4a45a/analytics	\N	\N	2026-07-18 15:17:50.918+00
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
c068a3ef-9acf-403e-aac4-c1eb00495204	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:34:11.728+00
10894cb6-1c9a-46a4-9306-5639edbb7c50	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:06:36.126+00
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
9022f8bb-4d0a-4805-9b29-684d1837c019	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:46:22.798+00
f1dddd05-0523-40b9-8c36-abcc4daf20f7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/modules/844a247f-dacd-48c5-960b-ccfa70cf0026/lessons/e141188a-5200-4e4a-bda9-e71e1abfb944	informatica-1	e141188a-5200-4e4a-bda9-e71e1abfb944	2026-07-18 13:55:04.455+00
54a04bb4-29ad-4caf-a929-16937008c598	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:12:14.585+00
b7477a77-67f5-47a7-a70b-60de579a2ef4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:30:41.908+00
7eea11ee-f35c-4ad5-a4e1-e6d291258821	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/gcprof-ai-academy_logo_01.png	gcprof-ai-academy_logo_01.png	\N	2026-07-18 14:50:35.015+00
d716d3d7-08f9-48a9-bb7e-0c90653611e6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:30.864+00
289d19b5-3045-45c5-b152-217ecba1e49a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:33.306+00
3cdcb0e8-42c8-4924-b1fb-22930539655e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:34.425+00
c5c60515-c05c-4cfc-b67e-159825f64857	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:19:35.57+00
ba2338cc-c610-4d47-a44b-b95c6c3e5c32	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:27:31.358+00
9f4ca514-76c0-4cea-aabf-339537aa3f7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:27:33.132+00
e938a1fb-9ed1-44f4-8e87-9f7d4a13c665	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 13:46:52.45+00
25753354-850a-4d51-bf1f-96369d356e17	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:56:33.054+00
08af7685-24df-4a35-ad53-37bc54cf4c0d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/1a03cfbf-eb62-4544-b158-44a0a1c4a45a/review	\N	\N	2026-07-18 15:17:57.004+00
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
bf408196-b6f2-4c43-be06-ccb69b4dab12	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:35:50.096+00
bce69bb4-da9b-4f0c-a783-cb7ef543375d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 13:07:52.109+00
0596d613-8b17-4efe-9ba9-519ff565cc46	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 13:46:21.992+00
10f00fb0-15ea-49fe-ac3f-3e54f8627002	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/modules/844a247f-dacd-48c5-960b-ccfa70cf0026/lessons/e141188a-5200-4e4a-bda9-e71e1abfb944	informatica-1	e141188a-5200-4e4a-bda9-e71e1abfb944	2026-07-18 13:55:37.018+00
f7df3b95-1eff-428f-bf79-b76f6960d2fb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:14:03.271+00
a959ede8-5b0f-4d8e-a1bc-91fcfeafbcc2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz	quiz	\N	2026-07-18 14:30:44.016+00
1909e164-9da8-4ced-9aa6-cb94c4e97316	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:51:56.953+00
8c5d19cd-2e1d-40c8-842d-c374cd5ecfa8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:43:44.252+00
5e3d540e-3dc7-4b5c-b282-4974d81b7390	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:17:55.083+00
ff6a4650-7758-422f-bb3b-73351a91740f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-13 18:39:51.437+00
c81284e6-9ed4-4956-b95b-58b6b415b782	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 10:47:17.64+00
877bb575-8bd4-480a-81c3-d15a01cbff75	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:35:52.974+00
4cc9247d-cf68-40e9-94f8-e00e5b231b24	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 13:10:43.837+00
e6fad48c-d7a2-427d-b25b-e78b3d880653	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:45:22.723+00
07c51cbe-c6ee-4144-9c32-8977cfad9877	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:55:45.455+00
a72ca3d1-67f4-4bef-8143-b36dca00fc06	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:20:53.326+00
be0dc983-a5aa-4a6e-9448-13d95ef47e58	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:31:27.378+00
11d072c2-5909-4d28-b216-bbc036de7d8c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:51:57.491+00
17910f75-248d-4a1a-b4b2-46ea7f9f80bf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:56:44.292+00
f156b955-0f20-4feb-8915-b12ced49d89d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/1a03cfbf-eb62-4544-b158-44a0a1c4a45a/analytics	\N	\N	2026-07-18 15:18:16.617+00
4f606bac-c9fd-4df6-93ab-f44feb356a48	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 15:38:16.96+00
5b7775bd-20bb-43d4-bf37-7c1a84a7ea67	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:36:42.399+00
89e18874-ecd2-4987-8c86-05aa40cfead7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:41:30.636+00
be19bc27-c2b8-4c0f-8918-9506a5e36aea	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-18 16:47:05.773+00
731d2b4f-ac67-41ad-a40f-8a75821a1f76	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:47:09.408+00
d5146179-d9d2-432a-8881-6a5136691e8e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-18 16:53:08.606+00
38a20d2b-f83f-4a3b-afcf-db4b550822e4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1/modules/ef22d24e-02df-4587-a56d-db1917a8d0e3/lessons/738a3e3d-a2cd-4461-8af0-6e3351b64196	finance-1	738a3e3d-a2cd-4461-8af0-6e3351b64196	2026-07-18 16:56:13.972+00
c23089ab-c0c2-4be1-af89-d11fba3efa55	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:56:31.012+00
0da74a9f-2a36-404b-8e11-c2d32ac5e75d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1/modules/c5ede590-c3ff-46fd-9290-823c7eb9b20f/lessons/ebd7404b-0212-43b9-89b2-43b5f16e2aef	finance-1	ebd7404b-0212-43b9-89b2-43b5f16e2aef	2026-07-18 16:59:50.096+00
45d7b1cb-cd26-4874-bee5-7823b1c43c1a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 17:00:22.851+00
123d899c-6fe5-4530-9f5c-90a3209f5ce4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1/modules/c5ede590-c3ff-46fd-9290-823c7eb9b20f/lessons/b3c191b4-eb1f-4fa8-b51a-94feac458c4a	finance-1	b3c191b4-eb1f-4fa8-b51a-94feac458c4a	2026-07-18 17:01:15.774+00
230ca609-c976-4fa9-8446-ba6c6725bcb5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1/modules/008fd2cd-3ac8-4379-babb-e326e99c8172/lessons/d2f34ac5-4b0c-4d37-8369-4fba236575cb	blockchain-1	d2f34ac5-4b0c-4d37-8369-4fba236575cb	2026-07-18 17:08:19.387+00
6dc244f0-a7c8-4423-9311-3257dc338364	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:10:09.751+00
2dc73a65-1d1e-4d60-95ad-ed5fed8d1947	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 10:15:51.637+00
9a676963-dd7c-4ca8-9c75-ed9e95e6f601	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:15:52.325+00
ff9b8e30-a0d3-479b-b4d1-5b2f6386e1af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 12:34:38.785+00
f7cc5486-ee9a-436c-93c0-e2d521bac32e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 12:35:50.231+00
ad5f11f5-f11a-45a7-a93e-3f365b1cc946	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz-1/quizzes/059f730b-e762-4c74-aa88-5e49df5a4c8f	quiz-1	\N	2026-07-19 19:38:14.286+00
ac9873c4-25b6-4810-89e9-7771195a3027	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 08:02:56.16+00
169ebf2a-dfe6-4241-ab73-63289a5ff317	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 12:00:53.102+00
27ac89ce-b0e0-4f9e-b8c3-323a021c6357	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 12:21:48.414+00
be995b5c-a64e-4848-b11c-76e3d3ddf105	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/38217ff1-0993-4867-87d8-234b480787c3	python-1	38217ff1-0993-4867-87d8-234b480787c3	2026-07-20 12:21:58.47+00
b96a9754-1f6e-4409-906c-def91aea927a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 12:22:07.68+00
e202aa8a-f660-4555-ba43-e05da8ce1c27	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 12:44:27.88+00
c899ac09-36a3-4a21-9bba-43ee2a5516be	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-20 12:48:32.891+00
e15446e1-4a29-420d-abd9-1f13fa5beb7f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:39:24.504+00
ee4a3199-3672-4468-ba74-faf9de4b2b84	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 15:47:03.67+00
d1c0372a-bf64-499c-a6a1-d64d890c108b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-20 15:54:18.012+00
4e55b7f8-cf43-45d4-a06f-cc2963d0980c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-20 15:54:47.849+00
0985b9a5-03d7-4d31-baa7-f05d43056fdb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 07:03:15.349+00
56950106-34c6-4b7d-9b21-5aa1110cc146	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 07:03:18.861+00
5ff91d3b-8b60-4a6b-8b4c-31832a24433e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:19:45.145+00
67ce0832-fd93-4a09-843d-f5a189ebe1be	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 10:53:46.328+00
842d2707-dc81-4120-bfe3-99a2f1c6679b	e1170f55-acc0-428d-8c58-86230d366687	/courses/informatica-2	informatica-2	\N	2026-07-21 14:57:38.356+00
58233364-a1d2-43ac-bbdd-1e341fa91333	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 16:43:42.07+00
ef11abe3-12b1-4409-aec4-099ca8c6d426	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 20:13:17.736+00
92946090-3392-4455-9444-64ec26eda784	ccc07580-f37b-42e3-93e8-9680099fbebe	/contacts	\N	\N	2026-07-21 20:13:28.216+00
33064240-7360-41e2-a3ae-f37b538d8db1	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 20:13:29.244+00
e0076276-21ef-4d50-add0-503bf8f40e08	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 20:53:52.784+00
58bf768a-ab7b-43ba-8b6f-cf7f17da648c	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 20:59:41.596+00
8dfd51ac-c8b4-46d4-a768-2d0a9a45426b	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:06:48.869+00
b08afa13-fb2f-4341-8712-cf9e28359aea	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:07:01.833+00
3d7ef25d-77c7-4e65-a12d-b4c585274986	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:13:48.734+00
c8cfa8b3-966f-4797-a572-a96b6b2e1e34	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:20:39.561+00
243d8a79-9536-4bce-84e3-b884af6f485a	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:22:21.7+00
e53904bf-1379-456d-8c99-54db12920824	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-21 21:26:38.166+00
4ef79c22-ac69-4ae6-813d-7d6932ca55a1	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 07:45:41.316+00
8be2455d-95e4-4036-adae-16ca7578beb3	ccc07580-f37b-42e3-93e8-9680099fbebe	/resources	\N	\N	2026-07-22 08:11:20.364+00
2002024a-8209-4a4d-b1af-ccb4748c610e	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:33:24.436+00
4e24ab53-1cab-4a82-a840-6d9e8b63dea6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 09:45:59.546+00
9b671b56-f519-4cf2-9fde-0dee939fdff2	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 09:46:17.045+00
eb0151e1-31a1-4b67-b4d1-f90793c165d3	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:06:06.508+00
9a955130-b7de-458f-b67f-4023d0f6867b	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 10:06:25.417+00
9631b07d-0166-4812-a541-3653bfef07c5	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 10:17:16.551+00
dce52603-2e06-4243-b232-59f1395cdcbf	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:21:39.405+00
865aff81-2234-4164-a279-7c0e4b0ce07e	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:24:25.175+00
bc263396-670a-462c-a40f-34d14d7f7506	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 10:31:42.009+00
2bec1aef-6ec0-4f2c-b1dc-b5c52ddd9562	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1/modules/289b267f-fc51-496b-b682-68ee74a5f990/lessons/ddfd060b-8dcf-4ba6-882a-e9e457e91e01	oop-1	ddfd060b-8dcf-4ba6-882a-e9e457e91e01	2026-07-22 10:35:19.451+00
e7f9300a-8a75-465a-9f0d-924b67df888e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:37:50.167+00
818faf12-64e2-44e0-a4f1-ed8eb941c346	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-22 10:43:15.365+00
29ee63ff-2151-4a28-8daf-9b0ab2970a84	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 10:43:43.77+00
1c651483-dcd1-4ff2-b265-2ccc30e1ea8f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 10:45:46.397+00
b83de368-b1bd-4fb5-b7ee-fb0f1d590009	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/finance-1	finance-1	\N	2026-07-22 10:46:34.374+00
bba71b78-5d22-4433-8619-3327467abebf	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/finance-1/modules/e6718169-84f6-4f62-9d4c-44cd7ca954f2/lessons/1b04d4a1-4f13-4ba6-92fb-91db24bc3a03	finance-1	1b04d4a1-4f13-4ba6-92fb-91db24bc3a03	2026-07-22 10:46:37.436+00
2c5da527-3b33-4b07-9694-3e6d99833159	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-13 18:38:57.313+00
cb2743ff-af64-45d8-aa00-ac81d40298d3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:38:59.618+00
c0fa231a-3432-4bf1-8fd6-9f9c3daaea17	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 18:39:09.472+00
572b50c3-12e6-459a-8771-01f3c181b35d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/review	\N	\N	2026-07-13 18:39:20.058+00
e8ca0a49-2098-4645-a166-77071c5098a0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-13 18:39:53.46+00
fe8ad8a7-bd79-4ea3-a1ec-b9ab611d436a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:43:02.64+00
f69ced11-d7b7-458d-a420-12df5c1532b1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:36:10.967+00
a04a385f-74d4-466f-8025-fe19411b7075	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 10:47:20.415+00
97f37a6a-59f2-46d5-85c9-612030c45968	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:47:48.038+00
51695f20-e8e8-4496-adc5-40153129dba1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:10:44.893+00
dfb01547-2712-4418-866f-c0bc6f68114d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:56:06.532+00
6f970399-f411-43bb-be4a-8bdb0de1d383	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-18 14:20:55.809+00
f1b518eb-efd4-449c-8d7c-83b08337d713	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-18 14:21:11.515+00
fbabaa9b-681b-4506-a824-2a3a579accd8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-18 14:31:31.296+00
6f20c2e8-3431-415f-b135-8ae7db9fa056	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:52:02.94+00
5964072d-a7d2-4a66-8231-995d8d029e6a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:18:33.048+00
3e5f86b5-d0ba-4e3e-9b9e-87e466e72462	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 15:21:41.155+00
d110d817-97d6-4b50-b128-707afc3329a6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:38:19.13+00
0b74d6e2-b93d-4f63-8196-bfb445d6f977	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 16:26:59.664+00
7f175bf9-5864-4c41-8bb0-9eb3866439f0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:27:30.894+00
e09ab85a-d824-4900-9f08-7a7c3dc07b6d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:41:32.582+00
e825f6a8-1028-4435-b162-6e5a78399fdb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:50:01.435+00
829c9075-fc98-4184-8ccd-13c69ffa2dee	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1/modules/22ff1322-2316-4cba-9626-668c84ec1d59/lessons/472c8254-a3ec-40a2-934f-5effc3f54a54	database-1	472c8254-a3ec-40a2-934f-5effc3f54a54	2026-07-18 16:53:10.373+00
4e0b20f6-f6f0-4fb0-901e-74dbcc2bc9d3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 16:56:26.801+00
df6f1b27-88ff-4e4c-a189-72c6db00d5b2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 17:00:09.792+00
805a8f7b-0248-4b00-b94c-60310d1f8fd3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-18 17:08:33.209+00
c82813c9-c02c-4959-b0cd-4d1aa100c78f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:13:09.423+00
63ec5e5b-8b91-4109-926b-69e22f793134	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:42:15.048+00
a8d3c7f4-9436-45a7-a27c-28d55e919131	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz-1	quiz-1	\N	2026-07-19 19:38:27.554+00
5cd30d16-c41d-475d-be24-7a87e29037f1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 08:05:31.827+00
d8cae6cb-2b0b-4f4d-8100-811d738afb1d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 12:01:05.231+00
35f3ab71-85df-490c-b0bd-549a2da01929	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-20 12:22:11.416+00
1a3e0c4b-1b2e-4490-b36a-1a961362093d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-20 12:44:30.187+00
60ed825a-3dc3-4041-ad9b-f17469a89709	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1/modules/008fd2cd-3ac8-4379-babb-e326e99c8172/lessons/b2b47c27-e48f-41a4-b258-210b325ddda0	blockchain-1	b2b47c27-e48f-41a4-b258-210b325ddda0	2026-07-20 12:44:33.048+00
b5e172c2-0f20-428c-8fc3-b83341dd334f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1/modules/d4c96bb2-e80b-4ead-a569-86e791beb3ba/lessons/64cb0f4c-4123-485a-a2c6-0eadf9864131	problem-solving-1	64cb0f4c-4123-485a-a2c6-0eadf9864131	2026-07-20 12:49:15.226+00
1346460a-2f02-40af-b10d-4403fc4e0285	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:43:32.708+00
b22cfc8f-0775-4f9f-b406-a5408708ef4f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 15:48:01.003+00
2a07b82b-3f7e-4a1c-815f-d6d47dd0a0df	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 15:48:08.423+00
0898ed7d-19d5-401a-a434-a5d39c92e172	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1/modules/008fd2cd-3ac8-4379-babb-e326e99c8172/lessons/480371ea-8b85-4dcf-8543-2cdac3d4d32c	blockchain-1	480371ea-8b85-4dcf-8543-2cdac3d4d32c	2026-07-20 15:54:28.709+00
f8a736d2-f447-4633-9fad-897c02f8b8a1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 09:12:29.533+00
52ba5567-0890-4996-b8e3-c84db4374781	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:23:07.446+00
d6b1b319-4ae9-495d-80ca-8b67e33fba32	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:53:52.355+00
d0b9fa60-5010-4450-ae66-f57e2fa91109	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-21 15:09:22.218+00
f8ae9702-ef77-47b1-a19b-1d24b1eb2097	3da0e5b9-ff82-4850-b194-9b3c6034536b	/	\N	\N	2026-07-21 20:15:31.162+00
fe9a0fb2-fd0a-4b2d-9a2e-6637cacd86b3	3da0e5b9-ff82-4850-b194-9b3c6034536b	/	\N	\N	2026-07-21 20:15:31.463+00
906a2a87-b831-4ed8-a281-5793a7806a6d	3da0e5b9-ff82-4850-b194-9b3c6034536b	/courses	\N	\N	2026-07-21 20:15:33.752+00
3d3d853b-6970-4a90-a3e0-133e97529c5b	3da0e5b9-ff82-4850-b194-9b3c6034536b	/contacts	\N	\N	2026-07-21 20:15:37.191+00
22e2bd96-8e74-497e-925a-cfc2e42b1b05	3da0e5b9-ff82-4850-b194-9b3c6034536b	/courses	\N	\N	2026-07-21 20:15:38.348+00
3dc28d22-0ad7-4646-a45e-cd3ccdc25d2a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-21 20:56:24.736+00
5a47b959-9b86-4160-94d3-5380b4272942	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1/modules/d4c96bb2-e80b-4ead-a569-86e791beb3ba/lessons/64cb0f4c-4123-485a-a2c6-0eadf9864131	problem-solving-1	64cb0f4c-4123-485a-a2c6-0eadf9864131	2026-07-21 20:56:35.109+00
e6a90153-a883-4dd9-86d4-6658a2bf4173	ccc07580-f37b-42e3-93e8-9680099fbebe	/resources	\N	\N	2026-07-21 20:59:57.939+00
a51d6981-0e09-4d01-9f50-b8777bde064f	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:06:55.577+00
d4ba7aaa-9d7c-48b5-b12a-f44bf210cd89	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:13:55.578+00
169d16f5-48da-46de-a459-834f6d6e0cf2	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:20:42.419+00
b2798868-23a7-46bf-99c5-5073fc74815e	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/blockchain-1	blockchain-1	\N	2026-07-21 21:22:23.372+00
662389b6-fa72-459e-946e-0cfd44b4952b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 21:26:41.201+00
e0b264e7-cb4c-4c13-8f51-ce32481fcde3	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 07:45:42.736+00
8fbe38de-ebd1-4164-9f34-8e38148cec14	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:11:25.53+00
b540f13c-9245-451d-9edb-b04b7fa1e34a	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/finance-1	finance-1	\N	2026-07-22 08:33:37.785+00
fc65c275-9423-4f80-bf3b-871c2bce9358	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-22 09:46:03.645+00
0c2e5b81-a5b9-485e-9a22-04d17c4d734f	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 09:46:18.759+00
30b20886-c515-4a86-a7f5-3b51d81c2e0f	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 09:46:38.046+00
97281011-0796-4204-8552-5cd86a086bd0	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 10:06:24.266+00
4ebb2ac5-949f-4987-b6dd-2e4c4a423eb2	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:17:17.857+00
b2c3d6a0-fc3a-4cd4-a521-795408fadd69	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:23:02.051+00
9918cd59-0f86-413f-a7a2-51c1470ee320	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:23:25.837+00
e8aeaa3a-3295-4daf-8c9c-ec6545b480ad	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/blockchain-1/modules/735b2e36-50fe-41d3-ab9a-601d0dcd0563/lessons/ff0b5da5-5803-434f-93a6-8e69f91d9283	blockchain-1	ff0b5da5-5803-434f-93a6-8e69f91d9283	2026-07-22 10:24:32.401+00
85e442da-89a8-4989-8f5c-51fbc4e2c386	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:32:02.093+00
df4754b9-dea4-4b56-a01f-56f44b3c7e37	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1/modules/104629f4-f5d7-49f9-ab40-275864593f05/lessons/6cc8b998-8101-4dc1-b1f0-3b75404d790d	ai-1	6cc8b998-8101-4dc1-b1f0-3b75404d790d	2026-07-22 10:32:07.569+00
cc6f7b4d-8916-4d57-a6ed-4318eac7f1e9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-22 10:35:24.573+00
3189e902-2815-45c4-a30d-ec09bee09585	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-22 10:37:56.843+00
06f8fb12-1ed0-4362-9525-bbb106c5fd14	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 10:43:42.941+00
a53950ed-4e92-4962-a373-3df7ae2a280d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:46:02.765+00
86b3687d-4fe6-4609-a34e-eb2219ce3c07	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1/modules/57524f96-6aa9-4d90-8bec-4a5fc4ca73e7/lessons/f49dfb3e-8d32-47d5-9d97-a3ea3c2cdaea	database-1	f49dfb3e-8d32-47d5-9d97-a3ea3c2cdaea	2026-07-22 10:46:09.754+00
9c6a98d9-30c1-4c57-b672-401a8e26aa68	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 10:46:24.805+00
7f755ac8-8216-4b43-9a3b-1f71c8e74835	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-13 18:39:42.304+00
bce47aaa-c858-4c30-a823-2cd219ca4b49	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 14:43:58.518+00
87827957-aa50-4a39-8f1e-ffc17df2976a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:43:03.212+00
c653e99a-c37c-4181-980d-9a33339e4d0d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:43:44.818+00
5f6847e3-436e-49f7-a009-eb8a9c0cf7d8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:42:06.893+00
95caff8b-5a79-4aa8-bcc0-1b350f15d26e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 11:57:06.837+00
4723a74e-602e-4d45-87cf-f45039e582e8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:48:15.658+00
ff09502e-def5-458b-a4f7-aaeea83c36b9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 13:11:39.821+00
e79d30b6-9bb0-4b8b-99bb-9739a822f31a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 13:58:46.311+00
e0bb7e5d-435d-4678-8833-20649a66d249	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1/modules/0340d4c9-cc6d-4149-9736-608a6f7001c1/lessons/7cd20878-125b-4250-a14e-7099fec3cc6b	web-programming-1	7cd20878-125b-4250-a14e-7099fec3cc6b	2026-07-18 14:21:03.184+00
1544aea9-8d7a-4828-a484-db7f434186cf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:21:20.112+00
0834f0ad-de1b-48e2-8251-2587061665a8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:31:34.171+00
a0a83ac6-2a12-40d9-ad74-60ca1c128946	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:53:05.45+00
992b27a0-9c6e-49a5-8391-7e9fdc6890cc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:03:20.63+00
43aa29c3-b9c8-4a7b-9130-11950d355e82	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:21:41.817+00
bb325d65-78ff-40de-98a0-226e279faa30	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:27:03.079+00
22d9cd6b-029d-4d6e-a9a6-dd8a27a399eb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:43:16.22+00
7570cdad-841f-4d87-a2a1-7018f6e585ff	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-18 16:44:25.881+00
95301f09-e659-43c9-a2f3-aa4e540ba930	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:50:48.854+00
aad06a19-9ebd-4849-bcad-4d4a2ce9c79b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-18 16:50:53.002+00
53872a77-0965-4173-b90f-3f8ebad722ce	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-18 16:53:17.089+00
84e26060-b990-42bd-9675-967097a85919	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:58:25.828+00
9cbda7a5-97a4-495f-b283-d28a5508fb5c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 16:58:28.74+00
24eceb2f-0c49-4eee-874e-69a6d7f6ee5e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 17:01:10.706+00
e40a6df8-8062-47d9-8f7b-2e8dcec1d2c8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 17:01:13.431+00
71e65151-7d7b-491d-8a60-17e02d059489	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 21:02:28.754+00
a36f24e4-df50-4877-a47f-8da054f0c705	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:13:35.595+00
019cfba3-127b-4085-b60e-f7185cbcc53f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:43:37.321+00
86df55a5-04c4-4073-91be-6fa893014abd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 12:27:06.857+00
18f8682a-268f-4d8a-902b-7adec4d0c075	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 12:35:50.842+00
13468847-5f6b-4af6-89db-cec50e02febd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-19 19:38:32.901+00
247c9b2e-ed45-48f5-81e1-9b2e48c1dfdc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 08:05:50.779+00
1d2862e2-2837-480c-9160-b317a3d42f64	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 12:01:11.738+00
b7cfd6a7-3792-44c1-ba04-b26dc7e16c3b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/38217ff1-0993-4867-87d8-234b480787c3	python-1	38217ff1-0993-4867-87d8-234b480787c3	2026-07-20 12:01:19.137+00
32a5fc2b-d7d0-44c7-9cea-62b7adaae120	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 12:01:44.41+00
705b20fa-3e3b-4f15-8d76-717c3a3324f3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/38217ff1-0993-4867-87d8-234b480787c3	python-1	38217ff1-0993-4867-87d8-234b480787c3	2026-07-20 12:01:52.959+00
dc7f6c03-f09a-4277-8b97-fae9fe375cf2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 12:02:01.258+00
d996c952-8877-48ab-abee-5e9cf82deb04	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-20 12:22:17.645+00
a022c518-f464-4922-b996-528ddd07cf3e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-20 12:45:16.339+00
df890ca6-5e58-48ea-a5ae-c5ab38e45170	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-20 12:57:53.023+00
1954c521-5a3c-49f8-81b6-78a5210777f5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:55:33.834+00
1a83a69c-f559-46c2-94ca-e375a57187e7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/5f4da030-d846-4004-bd0c-e245d25b77c0	python-1	5f4da030-d846-4004-bd0c-e245d25b77c0	2026-07-20 15:48:13.553+00
cb8035ba-6f08-4923-a0f2-a20fd1bfce8a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-20 15:56:33.961+00
f103160f-d5d0-4ffc-a3de-4e24a6b2fbf9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 09:12:32.697+00
313bcc56-14f7-4708-ab57-f0f0a6522c1f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:23:28.941+00
250dcaa1-72f7-449a-b5fe-8d0d887a4875	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 14:52:19.742+00
b8eda468-abed-4eeb-a448-c5d2a260708f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-21 14:52:30.186+00
7a4f19e7-025e-406d-b3e0-fbb41084ccea	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 15:09:23.47+00
9b752adc-fda0-400a-b2d1-f19fcecbaec7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 20:50:19.889+00
f0439c08-12e7-4253-9b0b-e38906299b7c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-21 20:56:27.585+00
5c2ba7ce-6d30-4166-8787-9a8d669e7e32	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-21 20:57:00.208+00
ee0f4c02-99d2-4264-a76a-fe357c90cbc3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 20:57:22.984+00
f0599e10-20a6-496c-aca3-ffd90847fa2c	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:01:26.112+00
3c4b6983-9a19-4089-bc05-ed54ea72b66e	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:09:06.705+00
2902bae4-b57b-4834-948e-f0d8a5d14bae	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:13:57.187+00
3bb8583b-da8b-49fc-8f8e-d4c05d69be58	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/ai-1	ai-1	\N	2026-07-21 21:20:44.588+00
a9c2814f-2d5f-4299-96a1-6664bfa47379	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 21:24:17.709+00
bebbaadf-99f1-4759-b498-8c3bb9ac0bcf	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 06:24:27.775+00
b1f1178d-67af-4ce1-bf35-443c16446613	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 06:24:29.668+00
6f3f0d3b-93ae-47dc-9eff-e03a58c619bd	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 06:24:32.144+00
eb1f20ec-359e-40da-afdd-56ee81a1c2b3	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/blockchain-1	blockchain-1	\N	2026-07-22 06:24:36.489+00
b0a6f4b0-05b2-4c5f-bc83-4b738bde49a5	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 06:24:43.138+00
a1220555-98a3-40b7-9a98-e251b9de28fa	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 06:24:47.637+00
69c8318b-4aa1-4719-bca2-e8203bea6b95	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/finance-1	finance-1	\N	2026-07-22 06:24:50.818+00
ff58a7a2-d549-4924-af08-f64f3c7b5ae4	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 07:49:28.788+00
4d8baf4b-20d7-4d44-b813-f1055820ecef	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:21:51.843+00
c6ea6d75-7e4e-4d3b-ae49-2313a592c740	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 08:40:53.555+00
e14fe619-4a69-483d-85be-e4bdb8a9c349	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 09:46:24.994+00
ed72461b-2337-48b2-89d7-c5e07858250f	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:06:26.353+00
8c989e3e-f8e4-48db-9c39-39d55706f175	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:18:04.223+00
35ae0241-dd9d-4267-ac41-cd7f804f806a	ccc07580-f37b-42e3-93e8-9680099fbebe	/resources	\N	\N	2026-07-22 10:18:14.561+00
1f4b30c8-1a9b-4788-9ea5-8c7585699365	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:18:35.788+00
66062cad-620b-48ed-b03c-d86e8e9370de	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1/modules/d73ff3cc-9b4c-47f0-a001-4984e3a2f1b7/lessons/6361383a-9aed-4944-917d-216a7ed127df	web-programming-1	6361383a-9aed-4944-917d-216a7ed127df	2026-07-22 10:23:08.034+00
c4a7ca93-7889-4708-88f9-e1df85953433	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1/modules/1bab9807-78a9-4bb1-9d02-52eb993ab831/lessons/fe95207c-2d19-451b-9bb2-da5f3e154822	problem-solving-1	fe95207c-2d19-451b-9bb2-da5f3e154822	2026-07-22 10:23:35.975+00
d4d365fb-7a37-48c6-8eed-9cca9de0b1f9	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/blockchain-1	blockchain-1	\N	2026-07-22 10:24:35.473+00
4b84ac3e-ebde-47a4-926c-739988b75cd9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-22 10:32:05.236+00
ed867875-e936-48b8-ba5f-04ec7798cff1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-22 10:35:57.879+00
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
b5d7785e-6a6f-468a-bf8b-1931ad59334e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 20:42:54.617+00
ea8abafc-efda-417c-afef-ff5dec0e7f6f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-14 08:20:50.217+00
871097e6-3c44-4a5d-9ecf-e339a5a09df7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 08:20:51.496+00
4ca88bcc-7d9a-41c0-9ade-a5d360efa974	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 11:57:09.917+00
b5bb00ac-0228-4cc6-8761-b6e024345c71	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:48:49.892+00
ec98e82e-a89f-48be-a50b-04431b7091a9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:12:45.19+00
21ab40f3-bdf4-4b57-8600-a87a5d4661b0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 13:47:46.973+00
65916e3d-85a3-40df-81c0-01822bf02c80	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:58:49.711+00
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
b0c8fae2-68c5-4325-8c9a-2a221a1c247e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:59:03.431+00
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
c2029188-3af6-4d12-8c6c-03cab92d8990	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 21:07:29.995+00
def2006c-b0c1-46d7-b0c4-746d0a039d54	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 11:57:23.721+00
79de0b35-f488-4cdd-840a-e4784fbaf6bb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:49:19.255+00
80a39d6a-c6e7-4980-b118-e8d768c78591	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:14:06.954+00
2a681046-7e76-4a0a-8b06-0b082edf5839	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:47:48.742+00
e7aa3380-4611-41b1-a0bd-460656ffd76e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:47:57.715+00
99f59545-4d9c-43b0-aaac-43d61ce9cfa7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/modules/b972b733-03cd-4cc3-ae67-2fe4f33af4b5/lessons/8682ed9c-4786-4014-9087-0d5bae19432e	informatica-1	8682ed9c-4786-4014-9087-0d5bae19432e	2026-07-18 13:58:53.009+00
ed2cfa8e-e130-4cc4-9f33-d63bef1828cb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:59:10.639+00
16c51b1a-517d-4b56-aa3d-882feb0e2a94	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 14:31:38.737+00
de3b4662-3701-450a-8d64-1b3acadb7146	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:53:09.208+00
f66bfc2c-4a3c-4959-b3a5-9b3c1313eda1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:59:11.501+00
16c5bc97-b8ce-4212-bc07-467ebaf4850e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/1a03cfbf-eb62-4544-b158-44a0a1c4a45a/analytics	\N	\N	2026-07-18 15:15:12.658+00
be423b42-24d5-4452-a9bd-df2470cffd16	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:28:47.093+00
42d1118b-60a9-418e-a340-a6f67864ca14	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:44:02.569+00
4681ccea-0d1c-4c72-adad-990cfe7d664f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-18 16:44:07.972+00
37619376-50aa-4739-aabe-816244fae5cb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1/modules/15940690-567a-4a47-a43d-dcd8ea90379b/lessons/f056f02b-2b41-431d-b683-ed545e03f0a2	database-1	f056f02b-2b41-431d-b683-ed545e03f0a2	2026-07-18 16:50:54.964+00
bbf3bcf0-4743-40a2-b155-c34ddebfdce9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:51:04.364+00
0e72c08b-8b80-47a0-9d34-207550cbc5d2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:54:03.519+00
417152f6-1388-4af4-a201-f099432e53cf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1/modules/c5ede590-c3ff-46fd-9290-823c7eb9b20f/lessons/8521753f-534f-4bbc-baa6-d43f42fa0bc3	finance-1	8521753f-534f-4bbc-baa6-d43f42fa0bc3	2026-07-18 16:58:30.968+00
9c4a4fcd-4169-44d2-af48-ef3e3be38efa	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 17:01:24.009+00
c675d324-c54a-46f9-abdf-fc920f2b95bb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 21:02:31.911+00
8d820c1d-f6c7-4b92-8ce1-019fb23a5726	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/login	\N	\N	2026-07-19 10:44:26.591+00
b9177e92-0c76-4586-bb1a-d1fdf1957cf7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 12:27:54.24+00
f674e1ea-4f9e-4ffd-a520-671a8555bca8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 15:00:24.541+00
9b17934f-a478-4489-8e2d-f13b27a67c5b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 15:00:25.922+00
70252e28-4115-4e6a-8a9d-465b8ace3ec5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-20 07:43:11.439+00
d96e7527-119d-45cb-8ee4-f29d84d5ba66	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 07:43:12.481+00
66a6cea7-170c-425c-9965-76afcc203180	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/38217ff1-0993-4867-87d8-234b480787c3	python-1	38217ff1-0993-4867-87d8-234b480787c3	2026-07-20 08:05:59.073+00
0d6e2a1a-3522-4bad-a041-496286667db3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-20 12:09:23.926+00
d56c2966-8fcc-484e-8e7a-f2d00e79bb73	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-20 12:30:58.603+00
a2c4ffee-98ba-4614-9bd0-5c4813de31e6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-20 12:45:20.765+00
287cce33-fcef-4128-8f3d-e0851b0b2503	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 12:57:58.388+00
4f0d66cc-de97-44d7-9951-a968456ead3e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:55:57.457+00
47dc00b0-d273-48f5-b931-2172eaf92caf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 15:52:50.062+00
afb7c81a-c190-4bed-a8a9-2ae3e4de150a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 15:56:42.635+00
c3f760a9-f884-45d1-a862-dbb75536b739	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 15:56:52.422+00
06c504c2-fc0e-43f1-9e7f-968fbdb54067	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 09:40:31.371+00
d6e08c71-12fe-4664-908e-515d004a0bc1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:31:58.673+00
2b8e6efc-75b0-4010-b8cb-aadc0f8b52fd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 14:52:22.954+00
f1be44bf-fdbe-431b-bf0d-445464472e42	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-21 14:52:55.652+00
5c3fc4fc-e28b-46ea-a273-e3d626b9d94e	e1170f55-acc0-428d-8c58-86230d366687	/	\N	\N	2026-07-21 14:53:26.285+00
7ca2a219-0031-49fc-8806-f90947a23557	e1170f55-acc0-428d-8c58-86230d366687	/courses/informatica-2	informatica-2	\N	2026-07-21 14:53:51.018+00
734dd95d-b5a6-46a1-ac7c-82ec4606d702	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-21 15:09:25.309+00
45db738b-8484-440b-8342-c955283ce1bd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 20:50:23.804+00
3e77e46b-23b4-436f-aebf-7dd1a31534b9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-21 20:56:42.095+00
121e8951-05e7-40c3-ac57-9491d4fc5a64	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:01:31.584+00
11415d84-abaa-44d5-87fe-153f2a52202b	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:09:15.219+00
a942b8ff-6cf4-4e2d-9ff3-6e6b77e168d2	ccc07580-f37b-42e3-93e8-9680099fbebe	/resources	\N	\N	2026-07-21 21:14:02.809+00
fde574c8-6e65-4db4-924b-4fa11c0608a7	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-21 21:20:51.544+00
fb182efd-cdcc-4a44-9e10-021f0aa6a627	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 21:24:20.836+00
761cd447-1e4b-4ec6-a600-2d78b3ff74c3	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 06:39:45.218+00
58a40e2f-b7b2-4cb6-a47e-f3a6470bfd66	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 06:40:08.652+00
9e43e0b7-69ed-4347-b07b-82f38f8276a5	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 06:40:13.211+00
c36f072d-75ab-42d2-a314-7e67971a1212	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 07:56:02.742+00
139ab549-d1a6-4084-838c-094fc7f3eab6	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:22:26.752+00
0f1c6375-f295-401d-af60-b78bcc4e6575	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:40:56.024+00
4228ff94-acd0-41bf-b87d-89b647805a2f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 09:59:46.288+00
298be80a-aca8-4835-a9a7-2c494941d18f	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 10:00:49.943+00
580cf2ba-508a-4ac6-8f2e-40835528f993	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:06:29.85+00
c178768d-6785-4af3-87dd-84ace7ac0a14	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:18:18.854+00
c8a96404-239b-4e2e-ad04-49cdb283fcb2	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:23:18.343+00
f37f0e64-f49c-438f-bed5-6dc3097b3139	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 10:23:39.691+00
52963992-89ba-48a8-a7e1-06deb89d860f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 10:30:12.927+00
319d8937-914d-4f63-95f1-06cf24d065ca	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:30:17.696+00
35da6680-099f-41b3-a257-c69906207adb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-22 10:32:23.412+00
d561956a-4207-479c-9fbe-aa0c939f996d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-22 10:32:36.658+00
fbed1c4d-3867-48c1-ac98-a85a89561133	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 10:36:53.694+00
399ad60a-2177-46bd-b9e4-95cf80e4837a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1	oop-1	\N	2026-07-22 10:37:24.507+00
4be7aa39-358a-46bc-8093-d0d5767ffed1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:41:13.297+00
8d7047e5-35d5-49f3-b42b-845c1e7bb6f8	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:43:45.697+00
5e074320-c5f1-438c-b327-66b1bd2d181e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-22 10:46:06.922+00
c1785eea-a122-4df3-9900-35ff55ef6b23	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 10:46:25.729+00
45789d6b-e431-45e6-8716-56089c6917c5	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/finance-1	finance-1	\N	2026-07-22 10:46:40.698+00
18c655f4-d9e6-4815-9bfa-eb67773d5350	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:46:42.908+00
a45a5a5f-f48b-4d3f-a489-6e1976b13428	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/python-1	python-1	\N	2026-07-22 10:46:55.971+00
db12463b-10bc-44e5-9ca7-38ffcd52349a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 10:47:47.666+00
4010e1d2-ead1-4362-a734-237910c8bd07	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 10:47:48.358+00
814061bb-d014-43bb-aed6-b31e60cc33b1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:48:09.729+00
ee485ac3-dd38-4845-82ca-b89723560553	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-22 10:48:18.262+00
9be3eba2-7efb-4c66-baa6-dd065004a2fc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/854bdf01-ff5d-498d-ac0d-7d685cd741f1/analytics	\N	\N	2026-07-14 17:05:21.409+00
8ea2c28b-8c7c-4d25-85b0-50c33a8fb892	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-14 17:05:42.864+00
6a1391d5-9ee8-4e7c-acdb-04b51bbd4100	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 15:45:06.838+00
4b18d177-9625-4bab-86c6-f503c972387a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 21:20:26.077+00
9ed4357b-eef0-4fcc-bdc3-561bdf759229	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 11:57:27.222+00
ee89771c-08af-43b4-a653-c51a60f064f0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:49:21.29+00
8ab358a9-b2d7-4682-8d12-d732f0e40914	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 13:15:00.263+00
31ff7437-e71d-4468-b997-dca9b79e2d8b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/modules/b972b733-03cd-4cc3-ae67-2fe4f33af4b5/lessons/10af0217-f01c-4e14-871f-42ad58ed089c	informatica-1	10af0217-f01c-4e14-871f-42ad58ed089c	2026-07-18 13:47:51.918+00
6d9c486c-fae4-459a-8960-7afee9cae1a1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:01:02.097+00
c461395e-66e8-4c16-886f-c2052a8954f3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 14:22:16.489+00
a448c076-4ef8-4532-afaf-a2fa5029d800	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:31:41.171+00
afbb32d6-e747-4d81-ad65-1dadf3b673dd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:53:10.981+00
d2cd8d70-339a-4c82-a3ee-d6084ccaef6c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 15:15:23.589+00
b42da8eb-666c-4c97-8c57-26e74c328c85	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:29:48.206+00
f5d82f39-0815-448d-9ef2-cf6a10eb5246	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 16:37:28.885+00
ae9b0e7c-d6d5-4ba2-982c-ccaa16dfc1af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:37:29.529+00
59d3c6e3-b29b-4ad8-aa6e-c0801b80ae11	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1/modules/289b267f-fc51-496b-b682-68ee74a5f990/lessons/ddfd060b-8dcf-4ba6-882a-e9e457e91e01	oop-1	ddfd060b-8dcf-4ba6-882a-e9e457e91e01	2026-07-18 16:44:12.533+00
0a6920a3-ef67-4803-974a-4cc2243aee2f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-18 16:51:02.139+00
7d5b08f9-f426-4133-925c-77b232eec96c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:54:37.656+00
f9b9bb05-17df-472f-a9c3-ee0f4fa9b22b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 16:58:42.047+00
dfd8c887-3738-4823-bb8a-515ebcadc6b3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 17:02:06.411+00
c3424e8a-c3a9-40da-baa8-d915d453c470	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 09:54:46.689+00
11279e5b-b7a2-4b88-8d49-a0594bed9b0d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin	\N	\N	2026-07-19 10:44:26.772+00
f5a3db98-576e-4f88-b4f0-10bbbd259f0f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:44:43.035+00
08021e09-6c3e-471c-9701-771260d31b2a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 12:27:53.42+00
3dc7859d-c570-45ab-b6ba-c193174244b1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 19:36:37.896+00
7daa3272-e5eb-4c69-906b-67e927f17060	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 19:36:42.258+00
8d44bb00-1848-4979-bfd7-5856e1e98270	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-20 07:53:09.502+00
5dee0304-c222-4336-8ba9-be6b237072b7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 07:53:13.02+00
06dde29d-395e-436e-be7b-0d6ac59c5c77	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 08:07:58.585+00
29e68164-09a9-49c5-b35b-9e068f6fcccd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 08:08:14.251+00
99a7ff91-8d8d-490e-b32c-303889d4329c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-20 12:15:52.973+00
5047be6d-40d9-4e89-bcd3-739b8b0fd9a0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 12:31:00.453+00
8dffb269-e006-48a6-87b9-3a22c573f51f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 12:45:22.206+00
26c28e81-8fc5-4a9f-95ea-e84eaa8a6fc6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:19:26.826+00
4efc591c-9f6d-4ef3-a430-1024dabb8653	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-20 15:46:00.562+00
5a902a7d-a0c1-41b1-994c-eeea3dd2aac0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 15:46:06.107+00
202d692a-90a6-4ac2-b387-dadcecd63570	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-20 15:46:28.732+00
74fc035f-1ff7-4056-992a-60ce86313e80	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 15:53:42.048+00
d0b78567-3714-4b33-958d-bd9483448ce2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 15:56:57.38+00
acfeab26-36df-4860-84fe-63b49e5db669	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 09:58:47.439+00
5037bef4-c79c-4299-b7d5-42499dd46904	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-21 10:36:52.62+00
856aa1c0-441a-4183-92ce-a2e0d3189dbb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-21 14:52:26.145+00
525f9288-976e-4dc9-8a07-9d2ba89bc51a	e1170f55-acc0-428d-8c58-86230d366687	/dashboard	\N	\N	2026-07-21 14:53:27.717+00
9925226d-d0eb-4009-b741-72458f6f4ad4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-21 15:09:28.359+00
200d09bb-0b76-43b8-8b57-343f35455283	3da0e5b9-ff82-4850-b194-9b3c6034536b	/login	\N	\N	2026-07-21 19:56:12.951+00
178f4083-efb0-4ed8-9aae-d3b9cce7458f	3da0e5b9-ff82-4850-b194-9b3c6034536b	/dashboard	\N	\N	2026-07-21 19:56:13.828+00
154b83a6-0647-4dcf-8a8f-0a4f34bf6811	3da0e5b9-ff82-4850-b194-9b3c6034536b	/courses/problem-solving-1	problem-solving-1	\N	2026-07-21 19:56:41.862+00
288dc955-1c68-47ae-a3e8-4727660907c4	3da0e5b9-ff82-4850-b194-9b3c6034536b	/dashboard	\N	\N	2026-07-21 19:56:45.67+00
99da3034-cb0c-400a-b532-02bb0a3e721a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-21 20:51:42.307+00
1bc25dd1-55e5-4ec2-8519-7879ddd05368	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1/modules/1bab9807-78a9-4bb1-9d02-52eb993ab831/lessons/fe95207c-2d19-451b-9bb2-da5f3e154822	problem-solving-1	fe95207c-2d19-451b-9bb2-da5f3e154822	2026-07-21 20:56:44.494+00
b5b94477-a27f-408f-ad9f-f828f2332b15	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:01:35.132+00
4b570680-6d1b-4c1e-b0a0-baeec2b646b1	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:09:24.113+00
6f6d9ec0-eefd-4186-b92a-1e64286a4cb6	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:09:32.463+00
737f22fe-b825-4cc8-bcc1-3e5d9d8a747b	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:16:43.83+00
326cc1ca-94e9-4e5e-aba9-36ace7f07a26	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-21 21:20:55.216+00
3f69eedb-3ab9-4851-95b2-f0665c695130	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-21 21:26:18.346+00
e6af3757-f707-4b8e-a7dd-22bbdaffd987	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1/modules/735b2e36-50fe-41d3-ab9a-601d0dcd0563/lessons/ff0b5da5-5803-434f-93a6-8e69f91d9283	blockchain-1	ff0b5da5-5803-434f-93a6-8e69f91d9283	2026-07-21 21:26:29.527+00
1b83e980-90c4-41ac-aba0-d028f5a390fc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 07:38:48.541+00
925e0c84-2783-4f29-bfeb-b99cc0dd6b3b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 07:38:51.779+00
7abcc88e-5e57-4cb2-9829-f47077867f60	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:10:13.994+00
b448288d-2a3c-4ffc-badf-487a351bea14	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 08:10:33.377+00
cdcd1ca1-a7a7-461f-9bd8-e51d1c1a12d3	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 08:22:28.622+00
2364d055-e90f-4dfb-9ce4-8b4d4b881de3	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 08:41:00.307+00
75da5f23-2d1b-4e10-8968-5cb0408cb253	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 09:59:47.334+00
f86db56d-d0a6-4e6b-b7fd-55af0519570d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:00:23.739+00
f9b0c0e7-f9da-4b3d-8206-8c9b4da6dc2f	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 10:00:48.789+00
7c0f4dd8-0f0d-4fbf-996d-b8fd942b025b	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:00:54.801+00
191836ff-eb4d-4d61-bed5-2ec452ddc886	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:16:30.599+00
ff2a4268-a7ef-4d6e-a062-28c337f6545f	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:21:27.618+00
bf951659-d649-454f-a0d1-6d61b08b2481	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 10:21:35.115+00
1f9646c0-da5f-4853-8cf3-963fc6391f62	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 10:23:31.573+00
e3ba4e74-9216-4732-9da2-d77c32e6b8f5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:30:14.534+00
bcdfe6d5-534d-4576-bd4a-f2a7e0027b3d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/ai-1	ai-1	\N	2026-07-22 10:30:32.097+00
9a2bc6dc-8c07-419b-b531-9bbd76966b95	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:32:27.351+00
cec8d58d-60d1-425a-b6d1-bccf9d4420f9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-22 10:37:20.75+00
763625cf-c3c0-4c8f-8905-992c6663164f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/oop-1/modules/25cc123e-37ab-4a09-9354-e4723812817b/lessons/f18e5712-3c50-4796-b563-4e846cfb57d8	oop-1	f18e5712-3c50-4796-b563-4e846cfb57d8	2026-07-22 10:37:30.2+00
8a862473-f3c7-4b36-a809-db312e872910	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-22 10:41:22.452+00
910bc13d-f6ef-4239-a7d3-f71a2c83bbfb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 10:41:29.457+00
45daabfb-5b99-4841-a166-45dd34afb466	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/database-1	database-1	\N	2026-07-22 10:44:41.825+00
c23f08d1-bac3-434d-af64-75912409b79a	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:46:29.434+00
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
4609553f-858c-4d56-867b-5b2300ff8e36	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:45:07.466+00
0ff53f3f-915d-4f73-98d2-9f2870ccfbcb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 07:19:12.235+00
90de60d7-5aca-4500-9007-efdfaa0fa284	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 07:19:17.637+00
6a136bd7-ed93-441d-848b-67622b19be6d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 21:24:37.543+00
b09aa66d-db05-4c91-a68d-ad52bf509198	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 12:07:26.537+00
cf0c7877-6ad2-4e83-8d18-e51cd6a55c73	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:49:26.622+00
616d0236-8ff2-4043-9795-9a9d6411fa17	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 13:15:13.895+00
1b55ca31-2beb-4cbc-976b-7389b0b0c44f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:48:10.134+00
aab859d6-bd33-4023-a372-de9573b16f14	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:05:00.023+00
74cdcdcd-9484-442f-b0e9-aeb0a8774c55	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:22:17.162+00
ecdc5b6b-a381-4ae9-97b3-d218445fc7b1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:33:05.418+00
7a0865b7-86b1-4392-bb86-99c6652695a3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:53:41.276+00
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
42eb4c22-0258-4aee-aa78-18e375e1c928	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:07:29.381+00
a9de77e7-705d-45e3-9770-d13506ad9a6f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:15:17.414+00
c1ea225e-4af5-4a11-a842-68d0c618eeee	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-17 15:17:04.379+00
7af802de-cc03-456c-827d-f0bc77ff9b0e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-17 15:17:13.467+00
ca751d6f-32be-405f-b7b7-cc62605598af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 15:58:54.919+00
4339c329-5972-4d81-968f-7aa326576e04	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-17 21:25:26.764+00
ff7cb29d-4a8c-4246-a12e-155f2f8cb386	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:10:41.048+00
6db3aac7-ab71-44a8-851e-a8c6ed82e088	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1/modules/844a247f-dacd-48c5-960b-ccfa70cf0026/lessons/ace8663d-42c4-46cb-86fd-64221ff7eb6b	informatica-1	ace8663d-42c4-46cb-86fd-64221ff7eb6b	2026-07-18 13:15:20.68+00
687c50ac-e7b3-499e-88b7-32ebe839ae4a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 13:50:36.567+00
64506420-5665-42cb-98d5-75ad63b81547	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-18 14:05:02.149+00
93ddb813-0117-4ba7-bbb0-4d6ba589600f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-18 14:05:08.625+00
cd6bc4b6-0392-4dc3-bbbb-f1435f846e4f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-18 14:05:12.683+00
70e8876f-17ee-4e4c-987d-dbcab886be05	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-18 14:05:21.226+00
959e05e0-0b48-425b-af64-3dafa2372d43	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:24:00.358+00
073332bb-2a90-46f0-8f6d-de1f74400e78	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 14:33:13.966+00
11145faf-7710-486b-873a-0dd003ba13ed	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 14:33:24.03+00
bd3f60db-25a4-44f8-9114-625b47e116d2	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 14:53:46.653+00
42816628-b1da-42a3-8fee-6e2b20cb7bdd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 14:59:10.439+00
3a4fbe92-813b-4fe0-9552-16ebb1e02698	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 15:15:27.462+00
5b0f3355-7174-43de-8726-87732f4b6ca1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:30:16.305+00
45b94b72-716f-4ce4-b6a1-f82cd0eb6b9d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:38:28.546+00
38018f79-5025-4563-ab74-09b642589975	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-2	informatica-2	\N	2026-07-18 16:38:31.174+00
4dc44bda-657d-403e-ad95-dee121dcbe1d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:38:58.191+00
d212cf42-d32c-4665-95ea-8de947b0323d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:44:28.656+00
f9c967a4-c945-40c1-affa-f17489064c7e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:52:46.355+00
b26a5c41-2ac6-496e-93a9-dcf08b19af8b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-15 14:19:44.94+00
c06f46a3-c09f-400f-9a66-64f7c003cf0f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 14:19:47.597+00
9c9f18e2-e8b2-4007-bb85-fc8f36675ae6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 14:20:09.473+00
e01afb41-848d-4db4-820b-4d0fc91e5ca0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 14:20:13.359+00
b2fae15f-0dce-47c9-95c8-0cc306e9064a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/9a99cbcf-97eb-44e8-841d-5d0d09985917/analytics	\N	\N	2026-07-15 14:20:39.914+00
42ad3eda-1384-4b82-841f-374bf41920c4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-15 14:20:51.111+00
ff04aa5c-3f56-4ce2-a5d6-83fd51161698	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 14:20:55.175+00
0072d54f-3971-4866-b718-a8fd99dec16d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 14:21:04.309+00
3bb19143-0e51-4ef1-b337-1e4d37342563	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-18 16:52:49.468+00
d7e89d89-ba00-4a03-82e6-1facdd568ff4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:56:03.925+00
ab89f366-fdb6-469c-8368-335d1160e69a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 16:56:06.692+00
19f5e6d9-693c-454d-8ffb-8c538435b597	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1/modules/c5ede590-c3ff-46fd-9290-823c7eb9b20f/lessons/4180050d-a101-4386-b9ef-2ab6cd18d4c8	finance-1	4180050d-a101-4386-b9ef-2ab6cd18d4c8	2026-07-18 16:58:43.893+00
085ada45-6c17-47f9-bfc3-6901254f60ff	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:59:07.923+00
c38b5f5a-8cd6-4933-a827-866f0076c7b4	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 17:04:13.523+00
e9cfebb7-b2f4-4a37-94e1-7ad72400143d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 09:54:50.428+00
99a9e617-8d86-4c19-8f24-0cb5cef11570	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:54:13.279+00
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
945c85f4-0999-49d7-a926-9ac5620738b9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/059f730b-e762-4c74-aa88-5e49df5a4c8f/analytics	\N	\N	2026-07-19 19:37:34.242+00
e5a769c4-5642-44e2-ac79-621175d42fa5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 08:00:29.227+00
6ae00180-3881-43cf-9505-67efb9767f15	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 08:00:55.089+00
a8c240e4-50f6-4581-b1ca-eee189eb95bf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/dashboard	\N	\N	2026-07-20 08:08:03.941+00
b554211e-8fcb-4618-ba5d-29e418dbf26e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/credits	\N	\N	2026-07-20 12:16:48.006+00
fadd8355-bc3e-4e5d-b0d4-d902dabcce27	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-20 12:31:04.481+00
8dd6ab30-a1e9-4556-a953-51e7e74ce418	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-20 12:45:37.833+00
8b1fdf5f-2f1f-44a1-8db5-ce5033868e3e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:22:42.243+00
46a4b89c-4acd-4cf2-9ec0-85edaff48be5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 16:26:18.325+00
a50ede30-b5ab-44ee-9504-5aaa1589780a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 16:26:19.884+00
5e003445-64ff-4f19-8fba-e0769fef2e98	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:26:25.982+00
f67fa703-dc33-4df8-a4ca-30dd154643ab	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/review	\N	\N	2026-07-15 16:26:33.523+00
4e198225-ab30-474a-b357-b513751f480d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:37:11.242+00
9fcb4231-8658-47d1-8a9d-48c96e8b0f46	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 15:46:13.203+00
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
c649217c-3ead-46e9-93c5-828d4e50629c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-18 12:12:50.09+00
293962dd-c362-4071-8681-bbfe15e76e69	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 12:55:37.172+00
ba37534b-a44f-4bf4-82af-6735453fc4b7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/informatica-1	informatica-1	\N	2026-07-18 13:15:33.716+00
baecd56e-cf1c-46fb-90b4-e0d52acc374d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/testquiz	testquiz	\N	2026-07-15 16:53:02.23+00
bc1427f1-2154-4a53-a785-b5bb8d7eb0f6	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-15 16:53:04.085+00
c90716e9-1aa6-455c-8bd5-db1609e6286d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/quiz/71e55eca-e273-41a6-8143-b15df93ec35d/analytics	\N	\N	2026-07-15 16:53:17.587+00
dbfac829-7d90-4e8d-a721-05c30feaf402	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:50:40.581+00
f84a328f-7c2e-4b00-ad6a-4ebf40c6cc05	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/2a6b555f-1145-4aee-90aa-700c5219e954	python-1	2a6b555f-1145-4aee-90aa-700c5219e954	2026-07-18 14:05:04.311+00
7af7bce5-4b18-44bf-9af9-d54ac0a91889	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/b89e4f04-fea6-40d6-9b69-9e914c8ffe61	python-1	b89e4f04-fea6-40d6-9b69-9e914c8ffe61	2026-07-18 14:05:09.86+00
875d2675-3d1d-4554-9a27-a6c93abf91ab	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/44648729-fb08-472a-91d4-d2b6dae29738/lessons/e4611b5f-5d29-4e51-9300-dfc8691424cb	python-1	e4611b5f-5d29-4e51-9300-dfc8691424cb	2026-07-18 14:05:14.037+00
f713a66e-b7d0-4b3b-bd2a-0ee30746a2ff	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:24:46.134+00
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
61eef8b0-9c86-4a61-9969-8f9e5225403f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:33:16.303+00
a1d4808b-c5c0-4f75-ba6a-2fda489817ff	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:53:49.389+00
cb6ba781-1f20-42db-9ddb-41691c229486	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz	quiz	\N	2026-07-18 15:15:31.888+00
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
b2ff59cb-0e9f-4f94-afd3-487cd8b28921	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:30:42.184+00
804aca31-5259-4068-af05-9d9daa2b4c64	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:30:58.934+00
83f498e4-771e-4e05-8937-59bc141e5f22	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:38:49.402+00
7bba2e56-4ad0-4489-8feb-8a123e418aa1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-18 16:38:52.8+00
9c662e20-c6b1-419e-b780-5c63567c2e7d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 12:30:55.384+00
e4b9c468-e07f-4a01-b8a4-d2853ba5bd53	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/students	\N	\N	2026-07-16 12:31:09.807+00
c2d299d7-530e-40cb-a030-2d6cdeed6fcd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 12:31:14.133+00
a0bbc397-8396-41a6-b035-ecdee1e54c38	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 12:36:14.069+00
56b8fe65-3dad-4c57-8e9f-dae6505860cf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 12:36:18.169+00
b89bfd2f-24dd-431f-9784-2a961f994510	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-16 12:36:28.977+00
fa529890-2ede-4a30-9805-346e26e192df	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/profile	\N	\N	2026-07-16 12:36:32.535+00
5c2371e3-2398-466f-be31-c6153f9d1a59	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 16:45:59.712+00
7a20701d-d738-4bc7-838b-b05e10c4ca57	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1/modules/22ff1322-2316-4cba-9626-668c84ec1d59/lessons/6502f03a-94e4-4fde-8a03-67df38247cf7	database-1	6502f03a-94e4-4fde-8a03-67df38247cf7	2026-07-18 16:52:52.058+00
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
7608be92-5652-45a0-8b66-660c83fe482d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-18 09:54:16.801+00
12aede24-457c-409f-b65a-01e13715efcd	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 09:54:19.914+00
ab19aa28-28b4-4436-acb1-abad676c8ca9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:13:59.029+00
f8c91ad3-6b84-4b2d-95ec-1229c6b2ff76	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 12:55:38.051+00
d6eb2b7d-6d95-4d99-a720-87e41693a296	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 13:15:41.925+00
29326b7f-7b97-473e-8086-1fbdbfe09c4e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 13:53:15.742+00
dde52b30-22f1-4258-8cf5-56989d086739	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-16 21:23:51.715+00
7d219e5c-0298-427f-a8d5-fd34bd0c1ef9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-16 21:23:54.511+00
7bd4f9fa-951d-4d08-b7b1-4502c31784a1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:05:26.142+00
8a9ccf8d-46b2-4078-b80c-e758d644eaea	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:26:21.669+00
daccb365-8788-48e3-8b1f-5f64fcdf3e79	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 09:29:34.598+00
2c1e1dcb-8873-4b82-9be8-45645db4677b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 09:29:37.733+00
cbad22d6-8b95-4418-9fca-73d17862b638	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 09:54:51.593+00
2b5e5045-b123-477d-922a-9e49c117f0af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 09:54:59.035+00
5fbc6d57-ab93-40b7-9b11-dd7d94c66e4c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 09:59:35.604+00
51c09977-fec6-4aba-8fa4-96572cf4c928	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 14:33:28.099+00
0828cc5e-b314-42a1-93d3-2c5554962a21	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 14:53:54.436+00
87aa9058-8987-4474-b4cb-67a06f23ff5c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz/quizzes/1a03cfbf-eb62-4544-b158-44a0a1c4a45a	quiz	\N	2026-07-18 15:15:41.278+00
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
deb37f71-719e-4923-9b4f-e6da18b17657	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:35:17.666+00
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
e72dd5a7-73df-4cc0-9123-8b91e557d6a5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/quiz-1	quiz-1	\N	2026-07-18 16:35:22.796+00
03b94fc2-db32-4bc4-88bc-9eb487517f5e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:41:11.898+00
e350f613-300e-4473-bc27-5da9283cc481	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-18 16:41:14.038+00
6431a7f1-6e60-4c05-881a-a76419a71559	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-17 14:38:01.55+00
ce0a971b-bc5f-47fd-b492-09d4414e6bcf	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-17 14:38:02.133+00
0e4b7d71-082f-42e9-af29-556ffe0fe168	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-18 16:46:51.856+00
27ad5435-4d19-4677-bcc3-abae264075c8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-18 16:46:56.924+00
1711e687-1ed2-49f1-8348-b0f3392cdd36	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/database-1	database-1	\N	2026-07-18 16:53:00.72+00
0f230e15-c6a3-482a-a529-fa001f2a96ce	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1/modules/ef22d24e-02df-4587-a56d-db1917a8d0e3/lessons/00939b67-4599-4943-ae9a-471d67738af3	finance-1	00939b67-4599-4943-ae9a-471d67738af3	2026-07-18 16:56:08.748+00
f5d5e704-7a48-43f2-8b25-6ee4a90fa364	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/finance-1	finance-1	\N	2026-07-18 16:58:50.623+00
c3f917b5-eb07-4f0b-b869-f90f65fe936d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-18 17:05:35.512+00
4a64a520-32cf-4ed5-ae81-09d604eab47b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 10:00:28.487+00
7730ffd3-4d17-468a-b849-8b044705f634	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-19 12:21:35.696+00
e5033705-2c52-4ff5-a082-cdbb94cd3e0e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 12:27:08.344+00
42d8a285-b136-48f7-a680-59db442e9745	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-19 19:37:52.089+00
6cbb1816-af5b-4532-bb7f-c39a7ceaefa3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 08:00:33.309+00
002314da-ddf9-46c3-961a-11bdbfc2be8e	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/resources	\N	\N	2026-07-20 08:08:11.509+00
f0833261-7360-4e41-a352-a96a27f963b3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-20 12:21:31.87+00
a7b28d9e-93a3-4576-8e0a-3fe6194627c5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 12:21:38.292+00
077bb069-3b6d-40ab-9df5-d4a128401f35	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/web-programming-1	web-programming-1	\N	2026-07-20 12:32:44.187+00
1da74094-64f2-4417-9bcb-a6ff4acd3095	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-20 12:47:07.746+00
9101f83d-40a6-4c18-b301-fe98c69a77d5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-20 13:24:03.214+00
c37eddae-c4aa-46ba-9cf8-a5fb25a75574	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/problem-solving-1	problem-solving-1	\N	2026-07-20 15:46:18.233+00
be58a803-6a34-487f-968d-013cbfe6232b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses	\N	\N	2026-07-20 15:46:34.964+00
33e22f33-e292-44bb-a6f2-e6b8ecbaaa36	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1	python-1	\N	2026-07-20 15:46:42.301+00
93d5aa59-570f-4801-a762-23086557ff03	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/blockchain-1	blockchain-1	\N	2026-07-20 15:53:50.459+00
2af023e1-5b20-4631-a0cf-dfa459c2750b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/courses/python-1/modules/7b9a496a-069d-47a3-a9d7-7aabf6547cba/lessons/03243d4c-2266-4fc5-8452-467d828d18bf	python-1	03243d4c-2266-4fc5-8452-467d828d18bf	2026-07-22 10:48:22.447+00
2e5738e3-d8d4-4225-9d57-681111892f1b	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 10:58:34.463+00
f76ea5eb-65d3-411c-b324-a4ad16cd2db3	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 10:58:38.001+00
ff029196-d9d0-474b-b9bf-4954d43d08f7	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 10:58:40.652+00
079f63b8-ae52-43b6-87a5-46e9a49c7492	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/python-1	python-1	\N	2026-07-22 10:58:47.354+00
a11619b4-c1b7-4245-b453-aab17b465f6b	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/python-1/modules/7b9a496a-069d-47a3-a9d7-7aabf6547cba/lessons/03243d4c-2266-4fc5-8452-467d828d18bf	python-1	03243d4c-2266-4fc5-8452-467d828d18bf	2026-07-22 10:58:55.766+00
3251c57c-bc30-4789-b7e4-cb4badedb91f	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/python-1	python-1	\N	2026-07-22 10:59:04.131+00
c495bca7-87e4-4c83-84ce-5febcedaa77c	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 11:13:49.167+00
c96555c1-52bb-418b-865d-708f5827fbc6	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 11:13:50.953+00
d2164d16-e08b-41c9-8a62-dd2495f5bbaf	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 11:13:53.388+00
3284845c-737e-4ee7-97d1-d9aff42b9c27	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 11:13:58.963+00
38ec26c6-52ea-4371-8152-6039b5a320d2	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 11:14:24.304+00
d6e45d28-281c-4378-81d6-bbcd447215ea	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 11:14:31.009+00
2eba11d8-b39c-4162-99a7-57d5097add82	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 11:14:36.568+00
c03eac1f-9b9d-4fdd-bbdb-60490e4ed632	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1/modules/1bab9807-78a9-4bb1-9d02-52eb993ab831/lessons/fe95207c-2d19-451b-9bb2-da5f3e154822	problem-solving-1	fe95207c-2d19-451b-9bb2-da5f3e154822	2026-07-22 11:14:49.824+00
ffd7608d-ee75-4129-86f4-cae84d104105	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 11:14:54.328+00
3bafbabd-dc41-442e-ac2c-d69e49dfce87	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 11:15:04.029+00
ed195bae-49d5-4e39-a60d-a6cab86cfa3d	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 11:15:08.814+00
bcc446f5-cf14-466d-9b9c-614a1e047726	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 11:19:14.559+00
0d5ca3ad-70ff-4e2c-9d13-363c798aad73	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1/modules/1bab9807-78a9-4bb1-9d02-52eb993ab831/lessons/fe95207c-2d19-451b-9bb2-da5f3e154822	problem-solving-1	fe95207c-2d19-451b-9bb2-da5f3e154822	2026-07-22 11:19:24.42+00
87d7793d-50b9-4aa9-a1df-9f2b84a45d5d	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 11:19:28.799+00
565b29d3-4c00-4b62-bdc2-37c91712dd97	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 14:25:25.625+00
f4ea3634-94f6-4a44-a5a0-9921eac2686f	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 14:25:27.456+00
0f9dc6f5-8a50-4983-8ce3-93af0f49d534	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 14:25:32.682+00
27099b29-be6a-4e34-846b-f15566513902	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 14:25:38.392+00
62f3ea5d-7347-4652-9f1f-b754aff6a4ee	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 14:25:45.503+00
cc02bbd4-df93-453b-bd23-7f017741a878	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 14:25:47.875+00
6b985ea8-b6a2-4d4e-b04f-c39dd63ff53f	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 14:27:23.82+00
b6f7f7ac-fb92-4929-a2fa-8097c080ebd4	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 14:29:50.225+00
fac5426f-6aa2-47b2-b6ff-115c2a276b99	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 14:30:02.969+00
1db87d06-a76e-4409-975a-d8dc52b595d0	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 14:30:04.131+00
08ca312d-ba42-4281-9c2f-cca981829dcf	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 14:47:05.525+00
e383aa09-c224-46fa-be07-acfa5702931f	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 14:47:07.272+00
26be5389-9143-453d-9d3b-206439815aa0	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/problem-solving-1	problem-solving-1	\N	2026-07-22 14:47:10.212+00
a041a581-2178-4157-b031-71dcd468aa72	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses	\N	\N	2026-07-22 14:47:19.759+00
e71cb639-a5c2-42f0-80f1-03bb7e288b5d	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 14:47:23.239+00
ad0c054a-aa04-450f-974d-424ceb7d75c5	ccc07580-f37b-42e3-93e8-9680099fbebe	/dashboard	\N	\N	2026-07-22 14:47:35.495+00
59e7aba4-fe5a-4d75-955c-ecfc759f11c4	ccc07580-f37b-42e3-93e8-9680099fbebe	/courses/web-programming-1	web-programming-1	\N	2026-07-22 14:47:37.552+00
7e79cffc-d921-4fc6-8dff-e45fcb062fe2	ccc07580-f37b-42e3-93e8-9680099fbebe	/admin/payments	\N	\N	2026-07-22 15:52:19.846+00
d9fe5216-0bd8-4aef-85ce-ee32e46d0c73	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 15:52:20.956+00
ef16033a-3b46-4f1b-93f4-d394d02097e1	ccc07580-f37b-42e3-93e8-9680099fbebe	/admin/payments	\N	\N	2026-07-22 15:53:39.759+00
a64e3973-b3e3-451c-8e58-e5b82dc9b8cd	ccc07580-f37b-42e3-93e8-9680099fbebe	/	\N	\N	2026-07-22 15:53:39.823+00
f61df600-0d65-47a0-b18f-9a7d80be96ad	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 15:53:50.635+00
71f629bf-fef7-4b30-bd1a-570a9c9b7a69	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 15:53:53.889+00
87e1bce6-8b48-4af8-b169-3ac72f937c57	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/payments	\N	\N	2026-07-22 15:54:00.693+00
a1c25c1b-03d1-44a9-8e28-993dbd6169ee	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/payments/orders	\N	\N	2026-07-22 15:54:09.955+00
33bde359-8233-4cda-b92d-bb556ae425d5	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/payments/enrollments	\N	\N	2026-07-22 15:54:12.228+00
4a5cf78f-9f2f-4ffb-8b1f-caa45ec40d98	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/payments/courses	\N	\N	2026-07-22 15:54:14.841+00
5e1f15b1-411e-412c-ac04-8a5eb946ede3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/payments/settings	\N	\N	2026-07-22 15:54:16.976+00
4cad55e1-5d57-41b5-9f72-d7351b996498	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 15:59:16.356+00
8868c145-b2b4-431f-964e-acf7334de162	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 15:59:19.174+00
e6f580cb-0068-4f72-acd1-e47ca2ee875c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 16:03:36.915+00
94596c0f-25dd-460c-bdcd-174fd1230dad	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 16:07:49.623+00
9772db55-35b1-4709-b0cc-2e27c20e3d1b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 16:07:52.043+00
bd0ddc77-6302-4fb1-aec4-43dddfc71418	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/	\N	\N	2026-07-22 18:36:18.551+00
e14bb396-4e75-466b-bfd3-1329ea5d7d16	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 18:36:22.132+00
732b4c1c-64ae-46f6-ac86-648177d33a42	08be3132-7d36-46c3-9d31-2b1fd0b48d83	/admin/dashboard	\N	\N	2026-07-22 18:43:45.703+00
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."user_sessions" ("id", "profile_id", "login_at", "logout_at", "session_duration_seconds", "ip_address", "user_agent", "created_at") FROM stdin;
ee20f980-5290-442a-a0f5-145944f9e222	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 16:26:59.453+00	2026-07-18 16:36:57.775+00	598	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 16:26:59.184735+00
13b263af-e6df-4f53-a62e-c5312c6f8beb	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-17 21:24:36.243+00	2026-07-17 21:25:42.915+00	66	156.146.62.37	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-17 21:24:36.475622+00
17c2b1c0-e0d6-4ffb-8a1e-8a044e08e1b4	3da0e5b9-ff82-4850-b194-9b3c6034536b	2026-07-21 19:56:12.004+00	2026-07-21 19:56:49.475+00	37	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 19:56:12.746049+00
fd2980cf-a301-4127-b6a7-0b74ed2ff910	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 16:37:28.711+00	2026-07-18 17:09:21.93+00	1913	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 16:37:28.412999+00
be310013-f8f1-4ebc-ad4c-b58ad8f5e9f1	3da0e5b9-ff82-4850-b194-9b3c6034536b	2026-07-21 20:15:30.964+00	2026-07-21 20:15:40.5+00	9	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 20:15:31.675769+00
11bbd636-3565-41f0-a46b-611f7c91f1c0	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 09:54:46.494+00	2026-07-19 10:14:07.502+00	1161	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 09:54:45.67579+00
180b89bf-3a7a-461f-b60b-5508800a1289	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 11:57:06.679+00	2026-07-18 12:07:26.243+00	619	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 11:57:06.143181+00
0ebc479a-2e10-4114-b4a5-7453a0ee2b16	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 10:44:25.914+00	2026-07-19 12:21:35.419+00	5829	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 10:44:25.010211+00
0caf06ef-7bde-4348-9b79-3984c06d4919	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-21 20:59:40.586+00	2026-07-21 21:24:09.53+00	1468	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 20:59:41.246216+00
e1adaf27-1d27-4900-a69f-0366c37f9cab	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 13:10:42.305+00	2026-07-18 13:30:19.773+00	1177	156.146.62.37	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 13:10:42.539769+00
c16b64ca-cae3-4f64-8959-b6358ce03eb5	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 06:24:27.574+00	2026-07-22 07:38:40.233+00	4452	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 06:24:28.288263+00
d152d705-2b95-4286-a8a1-1b5f9fe35e32	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 12:27:06.697+00	2026-07-19 12:27:28.71+00	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 12:27:05.365211+00
79efe865-3ed8-46a3-b966-0a63201f4828	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 13:44:33.731+00	2026-07-18 13:44:47.244+00	13	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 13:44:33.083804+00
3f88527b-2af2-41b0-b81c-b6ca7606680e	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 07:45:40.079+00	2026-07-22 09:46:16.806+00	7236	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 07:45:40.655167+00
4c081651-58cc-43a0-82fb-92c35f279c87	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 12:27:53.149+00	2026-07-19 12:31:08.078+00	194	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 12:27:51.817589+00
39bdc478-d7a1-467f-bfbb-2a058b6ae64d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 13:45:21.892+00	2026-07-18 13:45:39.922+00	18	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 13:45:21.218176+00
f6e66523-2963-4b46-81cc-1462b56a5bbe	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 12:34:36.896+00	2026-07-19 12:35:15.217+00	38	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 12:34:35.558708+00
b8e6b75f-8598-41d5-ae3b-5c66d48a9e18	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 09:46:16.88+00	2026-07-22 09:59:40.216+00	803	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 09:46:17.094429+00
33a923ac-72ae-417f-98e0-03983c46f202	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 12:35:50.092+00	2026-07-19 12:36:18.818+00	28	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 12:35:48.748851+00
89abe844-97bb-4c0b-a8e5-2265bdc88684	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 13:46:21.838+00	2026-07-18 14:21:30.584+00	2108	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 13:46:21.16347+00
e58b5c8d-935f-48aa-a628-c9626f5cf1c4	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 10:00:48.542+00	2026-07-22 10:06:18.967+00	330	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:00:48.719857+00
93b94a74-d4a5-45fb-b1f9-04189363594d	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 15:00:23.226+00	2026-07-19 15:02:02.924+00	99	87.19.14.134	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36	2026-07-19 15:00:23.45928+00
2e014400-a683-40fa-9f82-0a55db20002b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-20 07:43:10.136+00	2026-07-20 07:52:48.275+00	578	87.19.14.134	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-20 07:43:10.368576+00
af10cc99-6c61-4838-ad76-ceeea73d63b7	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 10:17:14.547+00	2026-07-22 10:29:57.555+00	763	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:17:14.742033+00
eb0234c1-8164-433d-8714-680a686a93b3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-20 12:00:48.287+00	2026-07-20 12:17:42.649+00	1014	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-20 12:00:47.221712+00
462f6340-ebd4-49a0-a4d2-392308df9b19	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 10:43:42.8+00	2026-07-22 10:45:39.442+00	116	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:43:42.925041+00
3e7c623f-201a-44e0-9544-5dd2bdb37d00	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-20 15:46:00.045+00	2026-07-21 07:03:15.029+00	55034	87.19.14.134	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-20 15:46:00.277274+00
7d8d313f-e1e1-4e76-9165-ad16bf7a7310	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 10:46:24.637+00	2026-07-22 10:47:42.051+00	77	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:46:24.764088+00
1a358dc3-d376-4c9f-b1a6-a3bbefbb6120	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 07:03:15.142+00	2026-07-21 09:12:29.28+00	7754	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 07:03:14.095878+00
efaf59ab-1012-47e3-90d6-d260aaec324e	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 10:58:33.919+00	2026-07-22 10:59:34.51+00	60	195.242.213.222	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:58:34.148927+00
0a922770-926f-4ac0-8d25-9c4a8cba40f7	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 14:52:19.56+00	2026-07-21 14:52:38.752+00	19	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 14:52:19.473829+00
4023f21d-b246-4829-b414-eb6613fe2848	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 14:25:25.387+00	2026-07-22 14:47:05.258+00	1299	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 14:25:25.610809+00
e00bc3ba-e8b3-4871-8fea-476922834e34	e1170f55-acc0-428d-8c58-86230d366687	2026-07-21 14:53:26.122+00	2026-07-21 14:57:56.578+00	270	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 14:53:26.02698+00
519bb0cd-bdfa-422e-9088-2252a067919f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 15:53:50.487+00	2026-07-22 16:08:01.615+00	851	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 15:53:50.539555+00
907332f2-1924-4a1c-afca-0f7affad25c3	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 15:38:16.141+00	2026-07-18 15:39:34.262+00	78	217.200.91.27	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-07-18 15:38:16.384852+00
d5614ea0-e121-4aa4-92e1-5bfccea03789	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 16:43:38.618+00	2026-07-21 16:44:00.147+00	21	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 16:43:39.686311+00
a07f386a-0395-45a1-9b8c-14e33dfe4f14	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-17 19:54:45.562+00	2026-07-17 21:24:35.943+00	5390	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-17 19:54:45.155719+00
67195a2f-568f-4033-9456-69cdc7568074	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 09:54:16.627+00	2026-07-18 10:40:36.472+00	2779	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 09:54:16.279274+00
cbf11449-9641-4820-a5c4-e9f55ec19b5e	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-21 20:11:38.954+00	2026-07-21 20:15:25.681+00	226	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 20:11:39.675661+00
c320be50-e2dd-45a5-9b4c-808b06a67c53	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 10:47:17.496+00	2026-07-18 11:57:06.572+00	4189	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 10:47:17.066821+00
29c6e638-b86a-4730-b4bf-d2e1bcbe4906	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 12:07:26.315+00	2026-07-18 12:55:00.896+00	2854	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 12:07:25.766274+00
34bc6f63-bfc8-4173-8f9b-bb0419528b78	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 20:50:19.697+00	2026-07-21 20:59:34.87+00	555	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 20:50:20.387841+00
6a7dd245-9ccc-4f91-8409-da2d6d1d6e8c	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 21:02:28.549+00	2026-07-19 09:54:46.411+00	46337	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 21:02:28.262724+00
f39fb777-5044-4b8d-a158-f2950f36d04a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 12:55:36.988+00	2026-07-18 13:10:42.013+00	905	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 12:55:36.40251+00
bc0a9f6d-cd39-488b-bf47-c9e556698c85	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 13:31:06.921+00	2026-07-18 13:31:32.607+00	25	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 13:31:06.330149+00
8ea2ee9a-c6b5-4fb3-88a1-6524648cd649	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 21:24:17.546+00	2026-07-21 21:26:44.081+00	146	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 21:24:18.17396+00
589df4be-0101-40df-b093-507bf7555927	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 07:38:48.376+00	2026-07-22 07:45:35.191+00	406	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 07:38:48.948304+00
806f6759-b007-444b-b191-2d43b6cc19e1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 10:15:51.469+00	2026-07-19 10:43:43.652+00	1672	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 10:15:50.597643+00
8dce1f6d-b19c-4ee5-b5b3-ac55e306cec9	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 14:22:16.273+00	2026-07-18 14:57:33.614+00	2117	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 14:22:15.573867+00
2c5eef66-f230-4c37-bb4b-05027fad9fac	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 09:45:51.008+00	2026-07-22 09:46:11.999+00	20	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 09:45:51.206352+00
80a6d9fb-afa7-4bb7-be54-d00a75358827	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 14:59:10.29+00	2026-07-18 14:59:28.064+00	17	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 14:59:09.532409+00
36b9b15d-8953-4e79-9026-11b3a1f2d747	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 12:21:35.491+00	2026-07-19 12:22:24.755+00	49	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 12:21:34.17011+00
7dd375e1-0b2d-4838-abaa-8cf9b5e7c73b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 15:00:57.531+00	2026-07-18 15:01:16.315+00	18	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 15:00:56.765163+00
8a15b2da-5b48-4d4f-ace9-49a3fe1ed69b	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 15:01:58.526+00	2026-07-18 15:18:42.828+00	1004	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 15:01:57.767972+00
2974b050-0ec2-4703-8a99-afed8f4cb6c8	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 09:59:46.128+00	2026-07-22 10:00:43.932+00	57	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 09:59:46.309801+00
95efb25c-d9ce-4c6a-882e-0d45de12d886	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-18 15:21:41.018+00	2026-07-18 15:22:08.085+00	27	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-18 15:21:40.222783+00
af7e209b-aae0-47f3-99cd-00d69543d7dc	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 10:06:24.107+00	2026-07-22 10:17:06.42+00	642	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:06:24.280513+00
001468e8-3b33-4029-9d9b-b647be88a7ae	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 10:30:12.765+00	2026-07-22 10:43:38.329+00	805	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:30:12.911413+00
effef8c7-fe87-44f2-a0f8-aa79b011b553	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 10:45:45.491+00	2026-07-22 10:46:19.006+00	33	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:45:45.618259+00
b5692d94-4484-4287-9da3-edb5c4103725	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 10:47:47.513+00	2026-07-22 10:48:35.058+00	47	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 10:47:47.629697+00
d9a47609-e754-407b-9700-e14a32bf9801	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-19 19:36:37.39+00	2026-07-19 19:38:41.643+00	124	89.37.173.40	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-19 19:36:37.614908+00
a941d170-42a1-45e6-a27d-16bd9e60d330	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 11:13:48.968+00	2026-07-22 11:19:43.725+00	354	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 11:13:49.093996+00
6a2e7df1-e26c-49e0-b0ff-0a45cdfa16af	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-20 07:53:09.284+00	2026-07-20 12:00:48.196+00	14858	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-20 07:53:08.908319+00
eafd78ff-511a-4cdb-ad92-b8b079fea94f	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-20 12:21:31.627+00	2026-07-20 15:45:59.758+00	12268	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-20 12:21:30.583393+00
e15c06cb-585d-4e65-81fe-3ee24c799083	ccc07580-f37b-42e3-93e8-9680099fbebe	2026-07-22 14:47:05.336+00	2026-07-22 15:53:43.161+00	3997	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 14:47:05.494397+00
102e0fff-396e-40a4-b662-8a534a8c5135	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-22 18:36:18.387+00	\N	\N	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-22 18:36:18.83563+00
1bef86dd-f4f5-46d3-bfe8-29e53b71d313	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 09:12:29.352+00	2026-07-21 10:54:59.225+00	6149	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 09:12:27.802964+00
e151e0c0-f9d4-4f89-9bd7-ad37d4d76330	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 14:52:55.454+00	2026-07-21 14:53:15.984+00	20	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 14:52:55.395808+00
435fefd2-79e3-4dc0-b865-033248a46691	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-21 15:09:21.851+00	2026-07-21 15:09:33.276+00	11	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	2026-07-21 15:09:21.739051+00
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
90a03147-68f0-4013-b06e-7f5a490b1fb2	avatars	uploads/feaf2ae9-1237-408c-93d7-6355c949a218-1784388086010.png	\N	2026-07-18 15:21:25.864533+00	2026-07-18 15:21:25.864533+00	2026-07-18 15:21:25.864533+00	{"eTag": "\\"0cdf0230225cc5396b1fd4ffd18abb61\\"", "size": 381365, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-07-18T15:21:26.000Z", "contentLength": 381365, "httpStatusCode": 200}	a028f541-ff4d-4ff0-864a-22ca5438c492	\N	{}
f59d3fba-cc0b-433b-bfab-15300bdd74f0	avatars	uploads/a62cd94e-59e1-46d4-ab87-12c4413ec8df-1784388982772.jpg	\N	2026-07-18 15:36:23.303805+00	2026-07-18 15:36:23.303805+00	2026-07-18 15:36:23.303805+00	{"eTag": "\\"6c41d335b136f60571e776804e799819\\"", "size": 79015, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-07-18T15:36:24.000Z", "contentLength": 79015, "httpStatusCode": 200}	c0da0926-a182-4a25-866e-11f183e43202	\N	{}
1fac02b5-4067-47dd-a03e-23b32a24edd8	contents	markdown_1784549465357.md	\N	2026-07-20 12:11:04.530559+00	2026-07-20 12:11:04.530559+00	2026-07-20 12:11:04.530559+00	{"eTag": "\\"a501048a89360f8a90e65f49d5f8825f\\"", "size": 11505, "mimetype": "text/markdown", "cacheControl": "max-age=3600", "lastModified": "2026-07-20T12:11:05.000Z", "contentLength": 11505, "httpStatusCode": 200}	d216a1d1-a4e0-45da-a258-b6aad644db1b	\N	{}
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
-- Name: order_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."order_number_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict hHqIM8wgc5JCWMxfsNQfd4QFZpvQycMfewbhHbSWcR0VGz9HJmKJCpbe7cYO7wt

RESET ALL;
