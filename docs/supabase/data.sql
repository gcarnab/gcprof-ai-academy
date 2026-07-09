SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict OH4v6NdZFiFJ2tVFbyMscDBY2mM3Td3Msnohg2ZG4qID1lfKOdnAlYgCaz6R6Fh

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

COPY "public"."courses" ("id", "slug", "title", "description", "created_at", "updated_at", "category", "difficulty", "teacher", "estimated_hours", "cover_image", "published") FROM stdin;
4a6d4534-259d-4028-b82a-55b315d4bb6c	problem-solving	Problem Solving	Corso base di problem solving del Prof. Carnabuci	2026-07-05 18:13:02.085276+00	2026-07-05 18:13:02.085276+00	Programmazione	Facile	Prof. G. Carnabuci	50	\N	t
15c71938-702e-4367-92f0-561e74c3bab7	python-1	Python 1°	Corso base di Python del Prof. Carnabuci	2026-07-05 17:22:11.117785+00	2026-07-05 17:22:11.117785+00	Programmazione	Facile	Prof. G. Carnabuci	50	\N	t
372d91a8-f414-40b6-a5f6-098793736749	informatica-4	Informatica 4°	Corso di informatica per le classi quarte del Prof. Carnabuci	2026-07-02 17:21:04.848825+00	2026-07-02 17:21:04.848825+00	Informatica	Avanzato	Prof. G. Carnabuci	60	/courses/gcprof-ai-academy_logo_info_04.png	t
842557a2-80a6-4aae-941f-92b046c4d6dc	informatica-2	Informatica 2°	Corso di informatica per le classi seconde del Prof. Carnabuci	2026-07-02 17:16:55.247655+00	2026-07-02 17:16:55.247655+00	Informatica	Facile	Prof. G. Carnabuci	60	/courses/gcprof-ai-academy_logo_info_02.png	t
5987eb43-939e-408f-980a-fee080a56112	informatica-3	Informatica 3°	Corso di informatica per le classi terze del Prof. Carnabuci	2026-07-02 17:18:41.384923+00	2026-07-02 17:18:41.384923+00	Informatica	Intermedio	Prof. G. Carnabuci	60	/courses/gcprof-ai-academy_logo_info_03.png	t
aa600d1a-7dd0-4e3a-ab97-f6c0d41211e1	informatica-1	Informatica 1°	Corso di informatica per le classi prime del Prof. Carnabuci	2026-07-02 15:42:27.063112+00	2026-07-02 15:42:27.063112+00	Informatica	Facile	Prof. G. Carnabuci	60	/courses/gcprof-ai-academy_logo_info_01.png	t
b4ab19fb-f69d-401e-a587-a195737a1252	ai-1	AI 1°	Corso introduttivo su Intelligenza Artificiale del Prof. Carnabuci	2026-07-03 11:16:20.693504+00	2026-07-03 11:16:20.693504+00	AI	Facile	Prof. G. Carnabuci	50	\N	t
\.


--
-- Data for Name: course_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_classes" ("course_id", "class_id", "assigned_at") FROM stdin;
aa600d1a-7dd0-4e3a-ab97-f6c0d41211e1	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-03 08:48:59.903616+00
842557a2-80a6-4aae-941f-92b046c4d6dc	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-03 09:28:03+00
5987eb43-939e-408f-980a-fee080a56112	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-03 11:09:51+00
372d91a8-f414-40b6-a5f6-098793736749	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-03 11:11:22+00
b4ab19fb-f69d-401e-a587-a195737a1252	517057c0-c200-461c-876a-7851ba5b4afa	2026-07-03 11:40:31.631503+00
b4ab19fb-f69d-401e-a587-a195737a1252	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-03 11:41:53.50542+00
b4ab19fb-f69d-401e-a587-a195737a1252	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-03 11:42:03.434819+00
b4ab19fb-f69d-401e-a587-a195737a1252	018cd1bb-1118-412e-8ed1-a80bb65844cd	2026-07-03 11:42:15.904875+00
15c71938-702e-4367-92f0-561e74c3bab7	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-05 17:22:51.63759+00
4a6d4534-259d-4028-b82a-55b315d4bb6c	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-05 18:14:37.375575+00
4a6d4534-259d-4028-b82a-55b315d4bb6c	a0c182a7-4074-4e8f-801b-9ad08fa768f9	2026-07-05 18:14:51.03201+00
\.


--
-- Data for Name: course_modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_modules" ("id", "course_id", "title", "order_index", "created_at") FROM stdin;
6a8d3ba1-1252-4bcc-8ed4-ef15f4a1e8cb	5987eb43-939e-408f-980a-fee080a56112	Guida Didattica LSA	1	2026-07-03 09:38:06.351867+00
5213a025-b234-4668-bc2c-455bdb6bca5a	5987eb43-939e-408f-980a-fee080a56112	Guida Didattica RIM	2	2026-07-03 09:38:18.982985+00
a394b56c-26b6-4e55-9358-64ab8f2e148d	372d91a8-f414-40b6-a5f6-098793736749	Guida Didattica LSA	1	2026-07-03 09:38:37.343959+00
49522f90-31f3-4871-9f80-a6cfdfe1f0ab	372d91a8-f414-40b6-a5f6-098793736749	Guida Didattica RIM	2	2026-07-03 09:38:52.030781+00
5860688c-a341-4125-a08d-49d4af50e922	b4ab19fb-f69d-401e-a587-a195737a1252	Modulo 1: Fondamenti di Intelligenza Artificiale	1	2026-07-03 11:17:06.828034+00
983bc244-a1e0-4d3c-8c4d-5cb693303371	aa600d1a-7dd0-4e3a-ab97-f6c0d41211e1	Guida Didattica	1	2026-07-02 15:57:56.522338+00
d4284d13-249f-4745-8224-98bcc8ad28fd	842557a2-80a6-4aae-941f-92b046c4d6dc	Guida Didattica	1	2026-07-05 17:13:51.484732+00
0ef674e2-fc9c-4d83-92af-7a9254c1faf2	842557a2-80a6-4aae-941f-92b046c4d6dc	Problem Solving	2	2026-07-05 17:15:52.063445+00
2273c8cc-76b7-4c13-9f5f-b7a97b280e82	15c71938-702e-4367-92f0-561e74c3bab7	Tutorial Prof.	1	2026-07-05 17:23:22.543921+00
00778d2d-48a8-46d0-938f-b5c52d7bddf1	15c71938-702e-4367-92f0-561e74c3bab7	Tutorial Video	2	2026-07-05 17:24:42.013919+00
fedbefba-6f62-4c9a-be9a-564ccc677a1e	4a6d4534-259d-4028-b82a-55b315d4bb6c	Tutorial	1	2026-07-05 18:13:30.393258+00
3ceeab1a-4f23-4bbf-a55d-9c91fc4dfb46	15c71938-702e-4367-92f0-561e74c3bab7	Markdown	3	2026-07-06 12:33:48.929922+00
\.


--
-- Data for Name: course_lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."course_lessons" ("id", "module_id", "title", "slug", "video_url", "content", "order_index", "created_at", "content_type", "duration", "external_url") FROM stdin;
8b417a80-aae6-42a2-8a4c-1094bbbccc9a	5860688c-a341-4125-a08d-49d4af50e922	Modulo 1 : Fondamenti di Intelligenza Artificiale	modulo-1--fondamenti-di-intelligenza-artificiale	\N		1	2026-07-03 11:19:45.978804+00	document	15	https://drive.google.com/file/d/13e-1komxIO7uHvd0-Z64kG8CTquRCghf/view?usp=sharing
06350436-6017-409a-8feb-77a954fef685	d4284d13-249f-4745-8224-98bcc8ad28fd	Guida didattica LSA	guida-didattica-lsa	\N		1	2026-07-05 17:14:45.491957+00	document	15	https://docs.google.com/document/d/1Usu1lT423ayJKMJBFBIPgi_6bO4TJC5S_Vc6ekd6Jqs/edit?usp=sharing
c7cab48c-9d32-4eee-ad54-12a4ed026e4f	0ef674e2-fc9c-4d83-92af-7a9254c1faf2	PROBLEM SOLVING	problem-solving	\N		1	2026-07-05 17:16:21.473732+00	document	15	https://docs.google.com/document/d/1QNM2Uok0JUubUTItiGT7Tjcj67iHJV3o8FJ9_v2mxEg/edit?usp=sharing
3f8a731d-738c-40dc-8842-cf8d7297e30b	2273c8cc-76b7-4c13-9f5f-b7a97b280e82	Vol 01	vol-01	\N		1	2026-07-05 17:23:46.746956+00	document	15	https://drive.google.com/file/d/13rao1DpUT6Lm6lDIHLen2nZIKmJfDmBG/view?usp=drive_link
a504ae1b-12cf-4098-a134-74be4d65feb2	2273c8cc-76b7-4c13-9f5f-b7a97b280e82	Vol 02	vol-02	\N		2	2026-07-05 17:24:02.285104+00	document	15	https://drive.google.com/file/d/138vE3tODVjD-hohECapG5b3Hay2Rz0n1/view?usp=drive_link
8789c9be-2a5b-44c2-a09e-efd4bbf8eb49	2273c8cc-76b7-4c13-9f5f-b7a97b280e82	Vol 03	vol-03	\N		3	2026-07-05 17:24:19.715217+00	document	15	https://drive.google.com/file/d/13wJ5aId6UDW9pOP6iqPidXmL7-qS8Uo8/view?usp=drive_link
d97b238b-865c-484f-8157-ddceabfdce7a	00778d2d-48a8-46d0-938f-b5c52d7bddf1	01. INTRO E INSTALLAZIONE	01-intro-e-installazione	\N		1	2026-07-05 17:25:05.138608+00	video	15	https://youtu.be/J3M4ZAVD9y8?si=YF0KDkiN6U28_la2
1ffb9148-5172-46aa-80d1-8ed8185224ac	00778d2d-48a8-46d0-938f-b5c52d7bddf1	02. VALORI E OPERATORI	02-valori-e-operatori	\N		2	2026-07-05 17:37:43.127962+00	video	15	https://youtu.be/HVvaiMVyAi0?si=FOeUGgXeN4cLwxt5
8f82ddc1-e0de-4cbf-b820-2149e72bf9de	00778d2d-48a8-46d0-938f-b5c52d7bddf1	03. VARIABILI E STRINGHE	03-variabili-e-stringhe	\N		3	2026-07-05 17:38:02.818242+00	video	15	https://youtu.be/eNZRzJQXZ0o?si=h4BmFHyTmGKzMtEa
de2aa29c-8811-4754-8cbe-1e2f3e76c1db	00778d2d-48a8-46d0-938f-b5c52d7bddf1	04. CONVERSIONI DI TIPO, PRINT E INPUT	04-conversioni-di-tipo-print-e-input	\N		4	2026-07-05 17:38:23.929401+00	video	15	https://youtu.be/aiElE8gxw-k?si=w20JK351xqc_tH__
129f8685-b7cb-4f5d-ae03-1ce798fb8b9d	6a8d3ba1-1252-4bcc-8ed4-ef15f4a1e8cb	Guida LSA	guida-lsa	\N		1	2026-07-05 18:11:41.134567+00	document	15	https://docs.google.com/document/d/1dDMLPTJZCAMVoirTMy5_UoH0js0VGq6B-73kjVU0bYY/edit?usp=sharing
8bfd0a7b-d1ca-4c3b-bd22-be4919f433b1	5213a025-b234-4668-bc2c-455bdb6bca5a	Guida RIM	guida-rim	\N		1	2026-07-05 18:11:59.624813+00	document	15	https://docs.google.com/document/d/1HZRQ5PXwuHVVNPeGumLS6RtkJ7FE6Zp-zc0a555M3is/edit?usp=sharing
bb528b46-e89a-4246-bd19-675ea3064221	fedbefba-6f62-4c9a-be9a-564ccc677a1e	Vol 01	vol-01	\N		1	2026-07-05 18:14:26.316881+00	document	15	https://docs.google.com/document/d/1QNM2Uok0JUubUTItiGT7Tjcj67iHJV3o8FJ9_v2mxEg/edit?usp=sharing
fdd74b59-7c46-4c23-8cc0-b1a32eced0ad	3ceeab1a-4f23-4bbf-a55d-9c91fc4dfb46	Python Practice 01	python-practice-01	\N	# Python Practice: Guida Completa ai Fondamenti\n\nQuesta guida offre una panoramica esaustiva e progressiva sui concetti fondamentali di Python, pensata per consolidare la teoria e facilitare la pratica nello sviluppo di algoritmi e script.\n\n---\n\n## **Modulo 1: Valori e Operatori Numerici**\n\nIl primo passo nella programmazione è capire come il computer gestisce i numeri e le operazioni matematiche di base.\n\n* **I Commenti (`#`)**: Fondamentali per la didattica e la manutenzione del codice. Tutto ciò che segue il simbolo `#` sulla stessa riga viene ignorato dall'interprete Python. Servono per spiegare la logica o "spegnere" temporaneamente porzioni di codice.\n* **Tipi di Dato Numerici**:\n    * `int` (Interi): Numeri senza virgola (es. `10`, `-5`, `0`). Rappresentano quantità indivisibili, come il numero di studenti in una classe o le quote intere di un'azione.\n    * `float` (Virgola Mobile): Numeri decimali (es. `3.14`, `-0.01`, `100.50`). Utilizzati per misurazioni, tassi di interesse o prezzi di mercato. *Nota: in Python si usa il punto (.), non la virgola (,).*\n* **Operatori Aritmetici**:\n    * Base: `+` (addizione), `-` (sottrazione), `*` (moltiplicazione), `/` (divisione, restituisce sempre un `float`).\n    * Avanzati:\n        * `**` (Potenza): Es. `2 ** 3` restituisce `8`.\n        * `//` (Divisione Intera): Restituisce il quoziente senza i decimali. Es. `10 // 3` restituisce `3`.\n        * `%` (Modulo): Restituisce il resto della divisione. Es. `10 % 3` restituisce `1`. Utilissimo per capire se un numero è pari o dispari (`numero % 2 == 0`).\n* **Funzioni di Ispezione**:\n    * `type(valore)`: Rivela il tipo di dato (es. `type(3.14)` restituisce `<class 'float'>`).\n    * `isinstance(valore, tipo)`: Verifica se un valore appartiene a una classe, restituendo Vero o Falso (es. `isinstance(5, int)` restituisce `True`).\n\n---\n\n## **Modulo 2: Variabili e Stringhe**\n\nLe variabili sono le fondamenta della gestione della memoria in un programma.\n\n* **Concetto di Variabile**: Immagina una variabile come un'etichetta applicata a una scatola nella memoria RAM del computer. L'operatore di assegnazione `=` inserisce un valore in questa scatola.\n    * *Esempio:* `tasso_interesse = 0.05`\n* **Regole di Naming (Nomenclatura)**:\n    * Sì: `prezzo_unitario`, `studente1`, `_contatore`. (Lo standard in Python è lo *snake_case*, tutto minuscolo con underscore).\n    * No: `1studente` (inizia con numero), `prezzo-totale` (contiene il meno, che è un operatore).\n* **Tipizzazione Dinamica**: Python è flessibile. Una variabile nata per ospitare un numero può, successivamente, ospitare un testo.\n    * `x = 10` (Ora x è un int) -> `x = "Dieci"` (Ora x è una str).\n* **Le Stringhe (`str`)**: Sequenze di caratteri racchiuse tra apici singoli (`' '`) o doppi (`" "`).\n* **Caratteri di Escape (`\\`)**: Permettono di inserire caratteri problematici.\n    * Es. `messaggio = 'L\\'albero è verde'`.\n* **Concatenazione e Formattazione (f-strings)**:\n    * Concatenazione classica: `"Ciao " + "Mondo"`\n    * **Best Practice (f-strings)**: Anteponendo una `f` alla stringa, possiamo iniettare variabili direttamente tra parentesi graffe: `f"Il tasso attuale è {tasso_interesse}"`.\n\n---\n\n## **Modulo 3: Conversioni tra tipi di dato, funzioni print e input**\n\nPer creare programmi utili, dobbiamo farli comunicare con il mondo esterno.\n\n* **La funzione `input()`**: Mette il programma in pausa e attende che l'utente scriva qualcosa sulla tastiera.\n    * **Attenzione:** Il risultato di `input()` è **sempre** una stringa (`str`). Se l'utente digita `50`, Python memorizza `"50"`.\n* **Casting (Conversione di tipo)**: Poiché `input()` restituisce stringhe, non possiamo farci dei calcoli direttamente. Dobbiamo convertire (castare) i dati:\n    * `int("50")` -> `50`\n    * `float("3.14")` -> `3.14`\n    * `str(100)` -> `"100"`\n    * *Esempio Pratico:* `capitale = float(input("Inserisci il capitale da investire: "))`\n* **La funzione `print()`**: Invia dati allo schermo.\n    * Può stampare più valori separandoli con una virgola: `print("Il totale è:", totale)`\n    * Stringhe multilinea: Usando le triple virgolette `"""Testo..."""` è possibile stampare lunghi blocchi di testo mantenendo gli a capo originali.\n    * Caratteri speciali: `\\n` inserisce un a capo manuale all'interno del testo, `\\t` inserisce una tabulazione.\n\n---\n\n## **Modulo 4: Controllo del Flusso, Algebra Booleana e Operatori di Comparazione**\n\nUn programma lineare esegue istruzioni dall'alto verso il basso. Con il controllo di flusso, diamo al programma la capacità di prendere decisioni.\n\n* **Diagrammi di Flusso (Flowcharts)**: Prima di scrivere il codice, è fondamentale strutturare la logica visivamente. Strumenti dedicati o simulatori didattici come `GC_FLOWGORITHM` permettono di mappare gli algoritmi graficamente, rendendo evidente il percorso decisionale.\n* **Tipo di dato Boolean (`bool`)**: Rappresenta la logica binaria. Esistono solo due valori: `True` (Vero) e `False` (Falso).\n* **Operatori di Comparazione**:\n    * `==` (Uguale a). Da non confondere con `=` (assegnazione).\n    * `!=` (Diverso da).\n    * `>`, `<`, `>=`, `<=` (Maggiore, Minore, ecc.).\n    * *Esempio:* `10 >= 5` restituisce `True`.\n* **Operatori Logici (Algebra Booleana)**: Permettono di concatenare più condizioni.\n    * `and`: `True` solo se **tutte** le condizioni sono vere.\n    * `or`: `True` se **almeno una** condizione è vera.\n    * `not`: Inverte il risultato (da `True` a `False` e viceversa).\n\n---\n\n## **Modulo 5: Istruzioni if, elif ed else**\n\nTraduciamo la logica booleana in veri e propri bivi nel codice.\n\n* **Istruzione `if` (Se)**: Esegue il blocco di codice sottostante solo se l'espressione valutata è `True`.\n* **L'Indentazione**: In Python le parentesi graffe per delimitare i blocchi non esistono. Si usano i due punti `:` alla fine della condizione e **4 spazi** (indentazione) per tutte le righe che fanno parte di quel blocco decisionale.\n* **Istruzione `else` (Altrimenti)**: Si aggancia a un `if`. Cattura tutte le casistiche in cui la condizione dell'`if` si rivela `False`. Non ha bisogno di condizioni.\n* **Istruzione `elif` (Altrimenti se)**: Contrazione di *else if*. Permette di valutare scenari a cascata. Se il primo `if` è falso, si valuta l'`elif`. Se anch'esso è falso, si passa al prossimo, o all'`else` finale.\n* **Istruzione `pass`**: Un "segnaposto". Se crei la struttura di un `if` ma non sai ancora quale codice inserirvi, metti `pass` per evitare che Python segnali un errore di sintassi (IndentationError).\n\n---\n\n## **Modulo 6: Ciclo while, istruzioni break e continue**\n\nI cicli (loop) servono a ripetere operazioni. Il `while` è legato a una condizione di verità.\n\n* **Il Ciclo `while`**: Legge una condizione (come un `if`); se è `True`, esegue il blocco di codice indentato. Alla fine del blocco, **torna su** e ricalcola la condizione. Continua finché la condizione non diventa `False`.\n* **Loop Infiniti**: Il nemico principale del `while`. Se la condizione non cambia mai (es. non aggiorniamo un contatore), il programma si blocca ripetendo l'operazione all'infinito.\n    * *Regola d'oro:* Assicurati sempre che esista una via per far diventare `False` la condizione (es. `contatore += 1`).\n* **Istruzione `break`**: Un "freno a mano". Interrompe immediatamente e in modo definitivo il ciclo in cui si trova, saltando fuori, a prescindere dalla condizione. Utile se l'utente inserisce un comando di uscita.\n* **Istruzione `continue`**: Un "salto del turno". Interrompe l'iterazione *corrente* e rimanda il programma all'inizio del ciclo per valutare nuovamente la condizione e procedere con il giro successivo.\n\n---\n\n## **Modulo 7: Il Ciclo for e la funzione range**\n\nIl ciclo `for` è lo strumento ideale quando sappiamo già quante volte un'operazione deve essere ripetuta o quando dobbiamo scorrere una collezione di elementi.\n\n* **Il Ciclo `for`**: A differenza del `while`, non c'è rischio di loop infiniti (nella maggior parte dei casi), perché itera su una sequenza ben definita e gestisce l'avanzamento automaticamente.\n* **La funzione `range()`**: Genera sequenze di numeri interi "al volo", risparmiando memoria. Accetta fino a tre argomenti: `range(start, stop, step)`.\n    * `start`: Il numero di partenza (incluso). Se omesso, parte da 0.\n    * `stop`: Il numero di fine (**escluso**). `range(5)` genera i numeri 0, 1, 2, 3, 4.\n    * `step`: Il passo o incremento. `range(0, 10, 2)` genera 0, 2, 4, 6, 8. Può essere negativo per contare alla rovescia.\n* **Variabile di Iterazione**: La variabile scritta dopo il `for` (es. `for anno in range(2024, 2037):`) si "veste" automaticamente del valore corrente della sequenza ad ogni iterazione (ideale per simulare progressioni temporali, ad esempio fino all'anno obiettivo 2036).\n\n---\n\n## **Modulo 8: I Moduli della Standard Library**\n\nPython è famoso per le sue batterie incluse ("batteries included"). La Standard Library è un arsenale di strumenti pronti all'uso, ideali per essere sfruttati immediatamente in ambienti cloud o IDE locali.\n\n* **Cos'è un Modulo**: Un file contenente codice Python (funzioni, variabili, classi) già testato e ottimizzato.\n* **Sintassi di Importazione**:\n    * `import math`: Importa tutto il modulo. Per usare una funzione serve la dot notation (es. `math.sqrt(16)` per la radice quadrata).\n    * `from random import randint`: Importa solo la funzione specifica. Si usa direttamente: `randint(1, 10)`.\n* **Moduli Chiave per la didattica e i calcoli**:\n    * `math`: Costanti (come `math.pi`) e funzioni avanzate (logaritmi, trigonometria).\n    * `random`: Estrazioni casuali. Ottimo per creare giochi, simulatori o scegliere elementi a caso.\n    * `datetime`: Fondamentale per gestire serie storiche, scadenze, o semplicemente sapere che giorno è oggi.\n    * `platform`: Raccoglie dati sull'hardware e sul sistema operativo su cui gira lo script.\n    * `re`: (Regular Expressions) Strumento avanzatissimo per trovare pattern all'interno di grossi blocchi di testo (es. validare un indirizzo email).\n\n---\n\n## **Modulo 9: Funzioni**\n\nLe funzioni permettono di raggruppare un blocco di codice in un "comando personalizzato" riutilizzabile. Rispettano il principio DRY (*Don't Repeat Yourself*).\n\n* **Definizione (`def`)**: Si crea usando la parola chiave `def`, un nome (stesse regole delle variabili) e le parentesi tonde.\n* **Parametri e Argomenti**: Le variabili dichiarate tra le parentesi durante la definizione si chiamano *parametri*. I dati reali che passiamo alla funzione quando la chiamiamo si chiamano *argomenti*.\n* **Istruzione `return`**: La differenza tra una funzione che "fa qualcosa" e una che "restituisce qualcosa". Il `return` fa uscire un valore dalla funzione affinché il programma principale possa salvarlo e usarlo (es. in un calcolo matematico). Chiude immediatamente la funzione.\n* **Parametri di Default**: Possiamo assegnare un valore standard a un parametro (es. `def calcola(valore, iva=0.22):`). Se chi chiama la funzione non specifica l'IVA, Python userà 0.22 automaticamente.\n* **Docstring**: Sotto la definizione (con `""" """`), si inserisce una documentazione che spiega cosa fa la funzione, i parametri attesi e cosa restituisce.\n\n---\n\n## **Modulo 10: Variabili Globali e Variabili Locali (Scope)**\n\nCapire lo *Scope* (ambito di visibilità) è fondamentale per non sovrascrivere dati per errore quando si usano le funzioni.\n\n* **Local Scope (Ambito Locale)**: Le variabili create *all'interno* di una funzione sono locali. Esistono solo mentre la funzione sta lavorando e vengono distrutte (pulite dalla memoria) appena viene eseguito il `return`. Non sono accessibili dall'esterno.\n* **Global Scope (Ambito Globale)**: Le variabili definite fuori da tutte le funzioni (nel corpo principale del file) sono globali.\n* **Accessibilità e la keyword `global`**:\n    * Una funzione può "leggere" una variabile globale.\n    * Una funzione **non può modificare** direttamente una variabile globale riassegnandola, a meno che non si utilizzi esplicitamente la parola chiave `global nome_variabile` all'inizio della funzione.\n* **Best Practice**: Modificare le variabili globali dentro le funzioni rende il codice imprevedibile e difficile da debuggare (i famosi "effetti collaterali" o *side effects*). È sempre preferibile passare i dati tramite i parametri e riottenerli tramite `return`.\n\n---\n\n## **Modulo 11: Le Liste**\n\nLe variabili classiche contengono un solo dato per volta. Le liste sono strutture di dati fondamentali per ospitare intere collezioni di informazioni.\n\n* **Definizione**: Creata usando le parentesi quadre `[]`. Gli elementi sono separati da virgole.\n    * *Esempio per serie di dati:* `ticker_portafoglio = ["VWCE", "QDEV", "NUKL", "LCUJ", "EUNK"]`. Possono coesistere tipologie di fondi diversi (es. focus settoriali, geografici specifici sul Giappone come `LCUJ` o varianti ad accumulazione come `EUNK`).\n* **Indici In base 0**: L'informatica conta a partire da zero. Il primo elemento è `lista[0]`, il secondo `lista[1]`. Gli indici negativi contano dalla fine (es. `lista[-1]` è l'ultimo elemento).\n* **Slicing**: Estrazione di fette di lista usando i due punti `:`. `lista[1:4]` estrae dall'indice 1 fino al 3 (il 4 è escluso).\n* **Metodi Principali (Mutations)**:\n    * `append(elemento)`: Aggiunge un dato in coda alla lista.\n    * `insert(indice, elemento)`: Inserisce un dato in una posizione esatta.\n    * `extend(altra_lista)`: Fonde una seconda lista nella prima.\n    * `pop(indice)`: Rimuove l'elemento all'indice specificato e lo restituisce. Se vuoto, rimuove l'ultimo.\n    * `remove(valore)`: Cerca e rimuove la prima occorrenza di un valore specifico.\n    * `sort()`: Ordina la lista in modo alfabetico o crescente (modificando la lista originale).\n* **Iterazione**: Il modo più elegante per scorrere una lista è il ciclo `for`. Es: `for ticker in ticker_portafoglio: print(ticker)`.	1	2026-07-07 07:50:22.862577+00	markdown	15	
e791e3f7-cdc3-466a-81f3-081a1708d4a4	983bc244-a1e0-4d3c-8c4d-5cb693303371	Guida didattica LSA	guida-didattica-lsa	\N		1	2026-07-03 17:42:37.060565+00	document	15	https://docs.google.com/document/d/1C6E-r8kusgvMhoRriN78nJ6E6K0rTCGJrLa734vGAvY/edit?usp=sharing
373b550f-f611-428a-8240-8e95cac0b7e4	3ceeab1a-4f23-4bbf-a55d-9c91fc4dfb46	Python Full Guide	python-full-guide	\N	# 🐍 Guida Completa a Python\n### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com\n### Ottimizzata per Google Colab · Aggiornata a Python 3.13/3.14\n\n---\n\n## Come usare questa guida\n\nOgni modulo è pensato per essere copiato **così com'è** in una cella di testo (Markdown) o di codice di Google Colab. I blocchi di codice sono eseguibili direttamente: apri un nuovo notebook, incolla, premi `Shift+Invio`.\n\n**Indice dei moduli**\n\n- [M0 — Introduzione a Python e ambiente di lavoro](#m0)\n- [M1 — Numeri e operatori](#m1)\n- [M2 — Variabili e stringhe](#m2)\n- [M3 — Conversioni di tipo, `print()` e `input()`](#m3)\n- [M4 — Controllo del flusso, algebra booleana, operatori di confronto](#m4)\n- [M5 — `if`, `elif`, `else`](#m5)\n- [M6 — Ciclo `while`, `break`, `continue`](#m6)\n- [M7 — Ciclo `for`, `range()`, `enumerate()`](#m7)\n- [Appendice — Riferimenti rapidi e cheat sheet](#appendice)\n\n---\n\n<a id="m0"></a>\n## M0 — Introduzione a Python e ambiente di lavoro\n\n### 0.1 Cos'è Python\n\nPython è un linguaggio di programmazione **interpretato**, **ad alto livello** e **multi-paradigma**, creato da Guido van Rossum e rilasciato per la prima volta nel 1991. Ad oggi è uno dei linguaggi più diffusi al mondo, mantenuto dalla Python Software Foundation, con una release principale circa ogni anno (la serie attuale più recente è Python 3.13, con la 3.14 già disponibile e la 3.15 in sviluppo).\n\n**Perché è così popolare:**\n\n| Caratteristica | Descrizione |\n|---|---|\n| Leggibilità | Sintassi vicina al linguaggio naturale, basata sull'indentazione |\n| Versatilità | Web, data science, intelligenza artificiale, automazione, scripting, didattica |\n| Ecosistema | Migliaia di librerie (NumPy, Pandas, Django, PyTorch...) |\n| Comunità | Enorme, attiva, con documentazione ufficiale eccellente |\n\n**Caratteristiche tecniche principali:**\n\n1. **Multi-paradigma**: supporta programmazione procedurale, orientata agli oggetti e funzionale.\n2. **Tipizzazione dinamica**: non serve dichiarare il tipo di una variabile, viene dedotto a runtime.\n3. **Portabilità**: gira su Windows, macOS, Linux senza modifiche al codice.\n4. **Interattività**: puoi eseguire istruzioni una alla volta in una shell (REPL) o in notebook come Colab/Jupyter.\n5. **Interpretato**: il codice non va compilato manualmente; l'interprete CPython lo esegue direttamente (compilandolo internamente in bytecode).\n\n### 0.2 Ambienti di lavoro: perché Google Colab\n\nPer la didattica, l'ambiente scelto in questo corso è **Google Colab** (colab.research.google.com), un notebook Jupyter gratuito eseguito interamente nel cloud da Google. Vantaggi:\n\n- **Zero installazione**: basta un account Google, nessun setup locale.\n- **Celle miste**: testo Markdown e codice eseguibile nello stesso documento.\n- **Persistenza su Drive**: i notebook si salvano automaticamente su Google Drive.\n- **Hardware gratuito**: CPU (e GPU/TPU se servisse in futuro) senza costi.\n\nIn alternativa, per lavorare in locale, si può installare Python da [python.org](https://www.python.org/) e verificare l'installazione con:\n\n```bash\npython --version\n# oppure, su alcuni sistemi:\npython3 --version\n```\n\n### 0.3 Il tuo primo programma\n\n```python\n# Il classico "Hello, World!" — la prima riga che ogni programmatore scrive\nprint("Ciao, mondo!")\n```\n\nIn Colab: crea una nuova cella di codice, incolla la riga, premi `Shift+Invio`. L'output apparirà subito sotto la cella.\n\n---\n\n<a id="m1"></a>\n## M1 — Numeri e operatori\n\n### 1.1 I tipi numerici di Python\n\nPython distingue tre tipi numerici built-in:\n\n| Tipo | Descrizione | Esempio |\n|---|---|---|\n| `int` | Numeri interi, precisione illimitata (limitata solo dalla RAM) | `42`, `-7`, `10**100` |\n| `float` | Numeri in virgola mobile (standard IEEE 754, doppia precisione) | `3.14`, `-0.001` |\n| `complex` | Numeri complessi, parte reale + immaginaria (suffisso `j`) | `3 + 4j` |\n\n```python\nintero = 10\ndecimale = 3.14\ncomplesso = 2 + 3j\n\nprint("Intero:", intero, type(intero))\nprint("Decimale:", decimale, type(decimale))\nprint("Complesso:", complesso, type(complesso))\nprint("Parte reale:", complesso.real)\nprint("Parte immaginaria:", complesso.imag)\n```\n\n> 💡 **Nota moderna**: da Python 3.6 in poi puoi usare il carattere `_` come separatore delle migliaia per rendere leggibili i numeri grandi: `popolazione = 1_234_567` è equivalente a `1234567`.\n\n### 1.2 Operatori aritmetici\n\n| Operatore | Nome | Esempio | Risultato |\n|---|---|---|---|\n| `+` | Addizione | `5 + 3` | `8` |\n| `-` | Sottrazione | `10 - 2` | `8` |\n| `*` | Moltiplicazione | `4 * 7` | `28` |\n| `/` | Divisione (sempre float) | `15 / 3` | `5.0` |\n| `//` | Divisione intera (floor division) | `15 // 2` | `7` |\n| `%` | Modulo (resto della divisione) | `15 % 2` | `1` |\n| `**` | Potenza | `2 ** 3` | `8` |\n\n```python\nprint("Addizione:", 5 + 3)\nprint("Sottrazione:", 10 - 2)\nprint("Moltiplicazione:", 4 * 7)\nprint("Divisione:", 15 / 3)          # restituisce sempre un float\nprint("Divisione intera:", 15 // 2)   # tronca verso il basso\nprint("Modulo:", 15 % 2)\nprint("Potenza:", 2 ** 3)\nprint("Radice quadrata (potenza 0.5):", 16 ** 0.5)\n```\n\n⚠️ **Attenzione al floor con i negativi**: `//` arrotonda sempre verso il basso (verso `-∞`), non verso lo zero:\n\n```python\nprint(-7 // 2)   # -4, non -3!\nprint(-7 % 2)    # 1 (il segno del resto segue il divisore)\n```\n\n### 1.3 Operatori di confronto\n\nRestituiscono sempre un valore booleano (`True`/`False`):\n\n| Operatore | Significato | Esempio | Risultato |\n|---|---|---|---|\n| `==` | Uguale | `5 == 5` | `True` |\n| `!=` | Diverso | `5 != 3` | `True` |\n| `<` | Minore | `5 < 10` | `True` |\n| `>` | Maggiore | `10 > 5` | `True` |\n| `<=` | Minore o uguale | `5 <= 5` | `True` |\n| `>=` | Maggiore o uguale | `10 >= 10` | `True` |\n\nPython permette anche il **concatenamento** dei confronti, una comodità che molti altri linguaggi non hanno:\n\n```python\nx = 5\nprint(3 < x < 7)      # True, equivale a (3 < x) and (x < 7)\nprint(1 < x < 3)      # False\n```\n\n### 1.4 Operatori di assegnazione combinata\n\n```python\nz = 5\nz += 3   # equivale a z = z + 3  -> z diventa 8\nz -= 2   # z = z - 2             -> z diventa 6\nz *= 2   # z = z * 2             -> z diventa 12\nz /= 4   # z = z / 4             -> z diventa 3.0\nz //= 1  # divisione intera combinata\nz **= 2  # potenza combinata\nz %= 5   # modulo combinato\nprint(z)\n```\n\n### 1.5 Precedenza degli operatori (PEMDAS)\n\nL'ordine di valutazione, dal più al meno prioritario:\n\n1. **P**arentesi `( )`\n2. **E**sponenti `**`\n3. **M**oltiplicazione, **D**ivisione, **D**ivisione intera, Modulo `* / // %`\n4. **A**ddizione, **S**ottrazione `+ -`\n\n```python\nprint(2 + 3 * 4)     # 14 -> prima la moltiplicazione\nprint((2 + 3) * 4)   # 20 -> prima la parentesi\nprint(2 ** 3 ** 2)   # 512 -> ** è associativo a destra: 2 ** (3 ** 2)\n```\n\n### 1.6 Conversioni tra tipi numerici\n\n```python\nnumero_intero = 10\nnumero_decimale = float(numero_intero)   # 10.0 — int -> float, aggiunge precisione\nprint(numero_decimale)\n\nnumero_troncato = int(3.99)              # 3 — float -> int TRONCA (non arrotonda!)\nprint(numero_troncato)\n\nnumero_arrotondato = round(3.99)         # 4 — round() invece arrotonda correttamente\nprint(numero_arrotondato)\n\nnumero_complesso = complex(numero_intero)  # (10+0j)\nprint(numero_complesso)\n```\n\n> ⚠️ Errore comune: `int(3.99)` **non** arrotonda a 4, tronca a 3. Per arrotondare usa sempre `round()`.\n\n### 1.7 Il modulo `math` per operazioni avanzate\n\nPer operazioni matematiche più sofisticate della semplice aritmetica, la libreria standard offre il modulo `math`:\n\n```python\nimport math\n\nprint(math.sqrt(16))     # radice quadrata -> 4.0\nprint(math.floor(3.7))   # arrotonda per difetto -> 3\nprint(math.ceil(3.2))    # arrotonda per eccesso -> 4\nprint(math.pi)            # costante pi greco\nprint(math.pow(2, 10))    # potenza (restituisce sempre float)\n```\n\n---\n\n<a id="m2"></a>\n## M2 — Variabili e stringhe\n\n### 2.1 Variabili\n\nUna **variabile** è un nome simbolico associato a un valore in memoria. In Python non serve dichiarare il tipo: viene dedotto automaticamente al momento dell'assegnazione.\n\n```python\nx = 5\nnome = "Alice"\npi_greco = 3.14\n```\n\n**Regole per i nomi delle variabili:**\n\n1. Devono iniziare con una lettera o `_` (mai con una cifra).\n2. Possono contenere lettere, numeri e underscore (`_`).\n3. Non possono coincidere con parole riservate (`if`, `for`, `class`, `import`, ...).\n4. Sono **case-sensitive**: `eta` e `Eta` sono due variabili diverse.\n\n**Convenzioni di stile (PEP 8, lo standard ufficiale di stile Python):**\n\n- `snake_case` per variabili e funzioni: `numero_studenti`.\n- `PascalCase` per le classi: `StudenteLiceo`.\n- `MAIUSCOLO` per le costanti: `VELOCITA_LUCE = 299792458`.\n\n### 2.2 Dinamicità dei tipi\n\n```python\nx = 10          # x è int\nprint(type(x))\nx = "ciao"      # ora x è str — Python lo permette senza errori\nprint(type(x))\nx = 3.14        # ora x è float\nprint(type(x))\n```\n\nQuesta flessibilità è comoda ma va usata con giudizio: riassegnare tipi diversi alla stessa variabile può rendere il codice confuso. Buona pratica: usare nomi che riflettano il contenuto, e non "riciclare" variabili per scopi diversi.\n\n### 2.3 Le stringhe\n\nUna stringa (`str`) è una sequenza di caratteri, delimitata da apici singoli, doppi o tripli:\n\n```python\nsingola = 'Ciao'\ndoppia = "Ciao"\nmultilinea = """Questa è una stringa\nche occupa più righe"""\n```\n\n#### Immutabilità\n\nLe stringhe in Python sono **immutabili**: non si può modificare un carattere al loro interno. Ogni "modifica" in realtà crea una stringa nuova.\n\n```python\ns = "Python"\n# s[0] = "J"   # ❌ TypeError: 'str' object does not support item assignment\ns = "J" + s[1:]  # ✅ si crea una nuova stringa\nprint(s)  # "Jython"\n```\n\n#### Indicizzazione e slicing\n\nGli indici partono da `0`; gli indici negativi contano dalla fine.\n\n```python\ntesto = "Python"\nprint(testo[0])     # 'P' (primo carattere)\nprint(testo[-1])     # 'n' (ultimo carattere)\n\n# Slicing: testo[inizio:fine:passo] — 'fine' è ESCLUSO\nprint(testo[0:3])   # 'Pyt'\nprint(testo[:3])     # 'Pyt' (dall'inizio)\nprint(testo[3:])     # 'hon' (fino alla fine)\nprint(testo[::-1])   # 'nohtyP' (stringa invertita, passo -1)\nprint(testo[::2])    # 'Pto' (un carattere sì e uno no)\n```\n\n#### Concatenazione e ripetizione\n\n```python\nnome = "Alice"\nsaluto = "Ciao, " + nome\nprint(saluto)          # "Ciao, Alice"\n\neco = "echo! " * 3\nprint(eco)             # "echo! echo! echo! "\n```\n\n#### Escape character\n\n| Sequenza | Significato |\n|---|---|\n| `\\n` | Nuova riga |\n| `\\t` | Tabulazione |\n| `\\\\` | Barra rovesciata |\n| `\\'` , `\\"` | Apice dentro la stringa |\n\n```python\nmessaggio = "Ciao\\nMondo"   # va a capo\nprint(messaggio)\n```\n\n**Stringhe raw** (`r"..."`): ignorano gli escape, utili per percorsi Windows o espressioni regolari:\n\n```python\npercorso = r"C:\\Users\\Alice\\Documenti"\nprint(percorso)   # stampato esattamente come scritto\n```\n\n### 2.4 Interpolazione di stringhe: tre metodi a confronto\n\n```python\nnome = "Alice"\neta = 25\n\n# 1) Concatenazione con + (poco pratico, richiede conversioni manuali)\nprint("Ciao, " + nome + ". Hai " + str(eta) + " anni.")\n\n# 2) .format() (più leggibile, storicamente diffuso)\nprint("Ciao, {}. Hai {} anni.".format(nome, eta))\n\n# 3) f-string (Python 3.6+, oggi lo STANDARD raccomandato)\nprint(f"Ciao, {nome}. Hai {eta} anni.")\n\n# Le f-string supportano anche espressioni ed formattazione avanzata:\nprint(f"Tra un anno avrai {eta + 1} anni.")\nprezzo = 19.999\nprint(f"Prezzo: {prezzo:.2f} €")     # arrotonda a 2 decimali -> 20.00 €\nprint(f"{eta = }")                    # debug rapido -> "eta = 25" (Python 3.8+)\n```\n\n> 💡 Nella didattica moderna si raccomanda di usare **sempre le f-string** per nuovo codice: sono più leggibili, più veloci e supportano formattazione inline.\n\n### 2.5 Metodi utili delle stringhe\n\n| Metodo | Descrizione | Esempio |\n|---|---|---|\n| `len(s)` | Lunghezza | `len("Python")` → `6` |\n| `.lower()` | In minuscolo | `"HELLO".lower()` → `"hello"` |\n| `.upper()` | In maiuscolo | `"hello".upper()` → `"HELLO"` |\n| `.strip()` | Rimuove spazi iniziali/finali | `" hi ".strip()` → `"hi"` |\n| `.replace(a,b)` | Sostituisce occorrenze | `"ciao".replace("a","e")` → `"cieo"` |\n| `.split(sep)` | Divide in lista | `"a,b,c".split(",")` → `["a","b","c"]` |\n| `.join(iterabile)` | Unisce una lista in stringa | `",".join(["a","b"])` → `"a,b"` |\n| `.find(sub)` | Indice prima occorrenza (-1 se assente) | `"ciao".find("a")` → `2` |\n| `.startswith(s)` | Verifica prefisso | `"Python".startswith("Py")` → `True` |\n| `.endswith(s)` | Verifica suffisso | `"Python".endswith("on")` → `True` |\n| `.count(sub)` | Conta le occorrenze | `"banana".count("a")` → `3` |\n| `.isdigit()` | Verifica se è tutta numerica | `"123".isdigit()` → `True` |\n| `.title()` | Prima lettera maiuscola per parola | `"ciao mondo".title()` → `"Ciao Mondo"` |\n\n```python\nfrase = "  Programmare in Python è divertente!  "\nprint(frase.strip())\nprint(frase.strip().upper())\nparole = frase.strip().split(" ")\nprint(parole)\nprint(len(parole), "parole trovate")\nprint("-".join(parole))\n```\n\n---\n\n<a id="m3"></a>\n## M3 — Conversioni di tipo, `print()` e `input()`\n\n### 3.1 Conversione implicita (coercizione automatica)\n\nPython converte automaticamente i tipi quando non c'è perdita di informazione, ad esempio in operazioni miste `int`/`float`:\n\n```python\na = 10        # int\nb = 2.5       # float\nc = a + b     # Python converte 'a' in float per fare l'operazione\nprint(c)      # 12.5\nprint(type(c))  # <class 'float'>\n```\n\n### 3.2 Conversione esplicita\n\nRealizzata con funzioni built-in:\n\n| Funzione | Descrizione | Esempio |\n|---|---|---|\n| `int(x)` | Converte in intero (tronca i decimali) | `int(3.7)` → `3` |\n| `float(x)` | Converte in float | `float(3)` → `3.0` |\n| `str(x)` | Converte in stringa | `str(42)` → `"42"` |\n| `bool(x)` | Converte in booleano | `bool(0)` → `False` |\n| `list(x)` | Converte in lista | `list("abc")` → `['a','b','c']` |\n| `tuple(x)` | Converte in tupla | `tuple([1,2,3])` → `(1,2,3)` |\n| `set(x)` | Converte in insieme | `set("aab")` → `{'a','b'}` |\n\n```python\nnumero = "42"\nnumero_int = int(numero)       # da stringa a intero\nprint(numero_int + 10)         # 52\n```\n\n⚠️ **Errori di conversione**: se il dato non è compatibile, Python solleva un'eccezione:\n\n```python\n# print(int("3.14"))   # ValueError: invalid literal for int() with base 10: '3.14'\n# Per convertire "3.14" in intero serve un passaggio intermedio:\nprint(int(float("3.14")))   # 3\n```\n\n### 3.3 La funzione `print()`\n\n```python\nprint(valore1, valore2, sep=" ", end="\\n")\n```\n\n- `sep`: separatore tra i valori (default: spazio).\n- `end`: cosa stampare alla fine (default: newline).\n\n```python\nprint("Ciao", "Mondo", sep="-", end="!\\n")   # Ciao-Mondo!\n\nlista = [1, 2, 3]\nprint("Lista:", lista)   # stampa direttamente strutture complesse\n\nrisultato = 42\nprint(f"Il risultato è: {risultato}")   # f-string, il metodo consigliato oggi\n```\n\n### 3.4 La funzione `input()`\n\n`input()` raccoglie dati da tastiera **sempre come stringa**, anche se l'utente digita un numero.\n\n```python\nnome = input("Come ti chiami? ")\nprint(f"Ciao, {nome}!")\n\neta = int(input("Quanti anni hai? "))   # conversione esplicita necessaria!\nprint(f"L'anno prossimo avrai {eta + 1} anni.")\n```\n\n⚠️ Se l'utente inserisce del testo non numerico dove ci si aspetta un numero, `int()` genera un `ValueError`.\n\n### 3.5 Validazione degli input con `try` / `except`\n\n```python\ntry:\n    numero = int(input("Inserisci un numero intero: "))\n    print(f"Hai inserito {numero}.")\nexcept ValueError:\n    print("Errore: devi inserire un numero intero valido.")\n```\n\nPer richiedere input finché non è valido, si combina con un ciclo `while` (vedi Modulo 6):\n\n```python\nwhile True:\n    valore = input("Inserisci un numero: ")\n    if valore.isdigit():\n        numero = int(valore)\n        print(f"Numero valido: {numero}")\n        break\n    else:\n        print("Non è un numero valido, riprova.")\n```\n\n### 3.6 Sintesi delle best practice\n\n1. **Converti sempre** l'output di `input()` prima di fare calcoli.\n2. **Messaggi chiari**: guida l'utente su cosa inserire (es. "Inserisci un numero intero: ").\n3. **Gestisci gli errori** con `try/except` per evitare che il programma si blocchi.\n4. **Formatta l'output** con f-string per messaggi leggibili.\n\n---\n\n<a id="m4"></a>\n## M4 — Controllo del flusso, algebra booleana, operatori di confronto\n\n### 4.1 Cos'è il controllo del flusso\n\nIl controllo del flusso permette a un programma di **decidere** quale codice eseguire e **quante volte** ripeterlo, in base a condizioni logiche. I costrutti principali sono:\n\n1. **Condizionali** (`if`, `elif`, `else`) → Modulo 5\n2. **Cicli** (`while`, `for`) → Moduli 6 e 7\n\n### 4.2 Algebra booleana\n\nPython valuta le condizioni secondo la logica booleana classica: ogni condizione produce `True` o `False`.\n\n**Valori "falsy" (considerati `False` in un contesto booleano):**\n\n```python\n# False, 0, 0.0, "" (stringa vuota), [] (lista vuota),\n# {} (dizionario vuoto), set() (insieme vuoto), None\n\nif []:\n    print("Non viene mai eseguito")   # lista vuota è falsy\nelse:\n    print("Questo viene eseguito")\n```\n\nTutto il resto (numeri diversi da zero, stringhe non vuote, liste con elementi...) è considerato "truthy" (equivalente a `True`).\n\n### 4.3 Operatori logici\n\n| Operatore | Descrizione | Esempio |\n|---|---|---|\n| `and` | Vero se entrambe le condizioni sono vere | `True and False` → `False` |\n| `or` | Vero se almeno una condizione è vera | `True or False` → `True` |\n| `not` | Inverte il valore booleano | `not True` → `False` |\n\n```python\nx, y = 10, 5\nif x > 5 and y < 10:\n    print("Condizione soddisfatta")\n\n# Verifica di condizioni multiple senza ripetere la variabile:\nif 5 < x < 15:   # equivalente a (x > 5 and x < 15)\n    print("x è compreso tra 5 e 15")\n```\n\n### 4.4 Operatori di confronto (riepilogo)\n\n| Operatore | Descrizione | Esempio | Risultato |\n|---|---|---|---|\n| `==` | Uguale | `5 == 5` | `True` |\n| `!=` | Diverso | `5 != 3` | `True` |\n| `<` | Minore | `3 < 5` | `True` |\n| `<=` | Minore o uguale | `5 <= 5` | `True` |\n| `>` | Maggiore | `7 > 3` | `True` |\n| `>=` | Maggiore o uguale | `7 >= 7` | `True` |\n| `is` | Identità (stesso oggetto in memoria) | `x is y` | dipende |\n| `in` | Appartenenza a una sequenza | `"a" in "ciao"` | `True` |\n\n```python\nprint(5 == "5")   # False: tipi diversi (int vs str), Python non li considera uguali\n\na = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)   # True: stesso contenuto\nprint(a is b)   # False: sono due oggetti distinti in memoria\nc = a\nprint(a is c)   # True: c punta allo stesso oggetto di a\n```\n\n> 💡 **Regola pratica**: usa `==` per confrontare i *valori*, usa `is` solo per confrontare l'*identità* (tipicamente con `None`: `if variabile is None:`).\n\n### 4.5 Precedenza tra operatori logici e di confronto\n\nDal più al meno prioritario:\n\n1. Parentesi `( )`\n2. Operatori di confronto (`<`, `>`, `==`, `!=`, ...)\n3. Operatori logici: `not` → `and` → `or`\n\n```python\nx, y = 10, 5\nif not (x > 5 and y < 10):\n    print("Non soddisfa la condizione")\nelse:\n    print("Soddisfa la condizione")\n```\n\n### 4.6 Valutazione a corto circuito (short-circuit evaluation)\n\nPython interrompe la valutazione appena il risultato è determinato:\n\n- Con `and`: se la prima condizione è `False`, la seconda non viene nemmeno valutata.\n- Con `or`: se la prima condizione è `True`, la seconda non viene valutata.\n\n```python\nx = 0\nif x != 0 and 10 / x > 2:   # la seconda parte non viene mai eseguita: niente ZeroDivisionError\n    print("Non genera errore")\nelse:\n    print("Condizione falsa, divisione evitata")\n```\n\nQuesto comportamento è molto utile per scrivere codice sicuro, ad esempio controllare che un oggetto non sia `None` prima di usarlo:\n\n```python\ndati = None\nif dati is not None and len(dati) > 0:\n    print("Ci sono dati")\nelse:\n    print("Nessun dato disponibile")\n```\n\n### 4.7 Espressioni condizionali inline (operatore ternario)\n\n```python\nx = 10\nmessaggio = "Positivo" if x > 0 else "Negativo"\nprint(messaggio)\n```\n\n### 4.8 Pattern matching con `match` (Python 3.10+)\n\nPer condizioni multiple su un singolo valore, `match` è un'alternativa più leggibile a lunghe catene `if/elif`:\n\n```python\nx = 42\nmatch x:\n    case 1:\n        print("Uno")\n    case 42:\n        print("La risposta alla vita, l'universo e tutto quanto")\n    case _:\n        print("Altro valore")\n```\n\n`match` supporta anche pattern più complessi (liste, classi, guardie condizionali):\n\n```python\npunto = (0, 5)\nmatch punto:\n    case (0, 0):\n        print("Origine")\n    case (0, y):\n        print(f"Sull'asse y, altezza {y}")\n    case (x, 0):\n        print(f"Sull'asse x, larghezza {x}")\n    case (x, y) if x == y:\n        print("Sulla bisettrice")\n    case _:\n        print("Punto generico")\n```\n\n### 4.9 Best practice\n\n1. Preferisci condizioni semplici e leggibili a espressioni contorte.\n2. Evita `if condizione == True:` — scrivi direttamente `if condizione:`.\n3. Usa parentesi per chiarire la precedenza anche quando non strettamente necessarie, se migliora la leggibilità.\n4. Sfrutta lo short-circuit per evitare errori (es. accessi a `None`, divisioni per zero).\n\n---\n\n<a id="m5"></a>\n## M5 — Istruzioni `if`, `elif`, `else`\n\n### 5.1 Struttura di base\n\n```python\nif condizione1:\n    ...  # eseguito se condizione1 è vera\nelif condizione2:\n    ...  # eseguito se condizione1 è falsa ma condizione2 è vera\nelse:\n    ...  # eseguito se nessuna condizione precedente è vera\n```\n\nLe condizioni sono valutate **in ordine**: appena una risulta vera, il blocco corrispondente viene eseguito e tutte le successive vengono ignorate.\n\n### 5.2 `if` semplice\n\n```python\nx = 10\nif x > 5:\n    print("x è maggiore di 5")\n```\n\n### 5.3 `elif`: condizioni multiple\n\nPuoi avere quanti `elif` vuoi; ognuno viene valutato solo se tutti i precedenti sono falsi.\n\n```python\nx = 10\nif x > 15:\n    print("x è maggiore di 15")\nelif x > 5:\n    print("x è maggiore di 5 ma non di 15")\nelse:\n    print("x è 5 o meno")\n```\n\n### 5.4 `else`: il caso residuo\n\n`else` è opzionale e va sempre per ultimo:\n\n```python\nx = 3\nif x > 5:\n    print("x è maggiore di 5")\nelse:\n    print("x non è maggiore di 5")\n```\n\n### 5.5 Esempio completo — fasce d'età\n\n```python\neta = 25\nif eta < 18:\n    categoria = "Minorenne"\nelif eta < 65:\n    categoria = "Adulto"\nelse:\n    categoria = "Anziano"\nprint(f"Categoria: {categoria}")\n```\n\n### 5.6 Condizioni nidificate\n\n```python\nx = 10\nif x > 0:\n    if x % 2 == 0:\n        print("x è positivo e pari")\n    else:\n        print("x è positivo e dispari")\nelse:\n    print("x è negativo o nullo")\n```\n\n⚠️ Nidificazioni troppo profonde rendono il codice difficile da leggere. Meglio spezzare in funzioni o "appiattire" la logica con `elif`.\n\n### 5.7 Operatore ternario (ripasso)\n\n```python\nx = 10\nmessaggio = "Positivo" if x > 0 else "Negativo"\nprint(messaggio)\n```\n\n### 5.8 Best practice\n\n1. **Leggibilità prima di tutto**: usa variabili intermedie per condizioni complesse.\n\n    ```python\n    is_pari = (x % 2 == 0)\n    if is_pari:\n        print("x è pari")\n    ```\n\n2. **Evita nidificazioni profonde**: preferisci `elif`, o restituisci subito il risultato in una funzione (*early return*):\n\n    ```python\n    def valuta_eta(eta):\n        if eta < 18:\n            return "Minorenne"\n        if eta < 65:\n            return "Adulto"\n        return "Anziano"\n\n    print(valuta_eta(30))\n    ```\n\n3. **Copri tutti i casi possibili**: aggiungi sempre un `else` (o un controllo esplicito) per gli input inattesi.\n4. **Rispetta l'indentazione**: in Python è obbligatoria e definisce i blocchi di codice (di norma 4 spazi).\n5. Per condizioni multiple su un singolo valore, valuta se `match` (Modulo 4.8) è più leggibile di una lunga catena `elif`.\n\n### 5.9 Differenze rispetto ad altri linguaggi\n\n- Python **non ha `switch`** in senso classico; il pattern matching (`match`, dal 3.10) ne è l'equivalente moderno.\n- **Nessuna graffa `{}`**: i blocchi sono delimitati dall'indentazione, non da parentesi.\n- Corto circuito automatico in `and`/`or` (vedi Modulo 4.6).\n\n---\n\n<a id="m6"></a>\n## M6 — Ciclo `while`, istruzioni `break` e `continue`\n\n### 6.1 Sintassi di base\n\n```python\nwhile condizione:\n    ...  # eseguito finché la condizione resta vera\n```\n\nAd ogni iterazione la condizione viene rivalutata: se `True` il blocco viene eseguito, se `False` il ciclo termina.\n\n```python\nx = 0\nwhile x < 5:\n    print(x)\n    x += 1   # fondamentale: senza questo, il ciclo non termina mai!\n```\n\n### 6.2 Cicli infiniti\n\n```python\n# while True:\n#     print("Questo ciclo non finisce mai da solo")\n```\n\nUn ciclo infinito è utile solo se combinato con un `break` che lo interrompe in base a una condizione interna (tipico pattern per menu interattivi, server, giochi):\n\n```python\ncontatore = 0\nwhile True:\n    print(f"Iterazione {contatore}")\n    contatore += 1\n    if contatore == 3:\n        break   # esce dal ciclo infinito\n```\n\n### 6.3 `break`: uscita anticipata\n\n`break` interrompe **immediatamente** il ciclo più vicino, saltando alla prima riga dopo il ciclo.\n\n```python\nnumeri = [1, 2, 3, 4, 5, 6]\ncerca = 4\nindice = 0\nwhile indice < len(numeri):\n    if numeri[indice] == cerca:\n        print("Trovato!")\n        break\n    indice += 1\n```\n\n### 6.4 `continue`: salta all'iterazione successiva\n\n`continue` interrompe solo l'iterazione corrente e passa alla successiva, senza uscire dal ciclo.\n\n```python\nnumeri = [1, 2, 3, 4, 5, 6]\nfor numero in numeri:\n    if numero % 2 == 0:\n        continue   # salta la stampa per i numeri pari\n    print(numero)   # stampa solo i dispari: 1, 3, 5\n```\n\n### 6.5 Condizioni composte\n\n```python\nx, y = 0, 10\nwhile x < 5 and y > 5:\n    print(f"x: {x}, y: {y}")\n    x += 1\n    y -= 1\n```\n\n### 6.6 Evitare cicli infiniti indesiderati\n\n```python\nx = 0\nwhile x < 5:\n    if x == 3:\n        break\n    print(x)\n    x += 1\n```\n\nRegola d'oro: **verifica sempre che la variabile che controlla la condizione venga modificata dentro il ciclo**, altrimenti il ciclo non terminerà mai.\n\n### 6.7 La clausola `else` nei cicli (funzionalità poco nota ma utile)\n\nIn Python, sia `while` che `for` possono avere una clausola `else`, eseguita solo se il ciclo termina **senza** un `break`:\n\n```python\nnumeri = [1, 3, 5, 7]\ncerca = 4\nindice = 0\nwhile indice < len(numeri):\n    if numeri[indice] == cerca:\n        print("Trovato!")\n        break\n    indice += 1\nelse:\n    print("Valore non presente nella lista")   # eseguito perché non c'è stato break\n```\n\n### 6.8 Complessità e prestazioni\n\n- La complessità temporale di un ciclo `while` dipende dal numero di iterazioni necessarie a rendere falsa la condizione: se sono `n`, la complessità è `O(n)`.\n- Un ciclo la cui condizione non viene mai aggiornata correttamente può bloccare il programma indefinitamente: è uno degli errori più comuni per chi inizia a programmare.\n\n### 6.9 Best practice\n\n1. **Aggiorna sempre** la condizione di uscita all'interno del ciclo.\n2. Usa `break` per uscite anticipate, `continue` per saltare casi particolari.\n3. Mantieni i cicli `while` semplici; evita nidificazioni eccessive.\n4. Se il numero di iterazioni è **noto a priori**, preferisci `for` (Modulo 7): è più leggibile e meno soggetto a errori.\n\n### 6.10 `while` vs `for`: quando usare cosa\n\n| Situazione | Costrutto consigliato |\n|---|---|\n| Non conosci il numero di iterazioni in anticipo (dipende da una condizione dinamica) | `while` |\n| Devi iterare su una sequenza nota (lista, stringa, range) | `for` |\n\n---\n\n<a id="m7"></a>\n## M7 — Ciclo `for`, funzione `range()`, `enumerate()`\n\n### 7.1 Sintassi di base\n\n```python\nfor elemento in sequenza:\n    ...  # eseguito per ogni elemento della sequenza\n```\n\n`sequenza` può essere una lista, tupla, stringa, dizionario, `range()` o qualunque oggetto iterabile.\n\n```python\nnumeri = [1, 2, 3, 4, 5]\nfor numero in numeri:\n    print(numero)\n```\n\n### 7.2 Iterare su liste, stringhe, tuple\n\n```python\nfrutta = ["mela", "banana", "ciliegia"]\nfor item in frutta:\n    print(item)\n\nparola = "Python"\nfor lettera in parola:\n    print(lettera)\n```\n\n### 7.3 La funzione `range()`\n\nGenera una sequenza di interi, tipicamente usata per ripetere un blocco un numero prefissato di volte.\n\n```python\nrange(stop)               # da 0 a stop-1\nrange(start, stop)        # da start a stop-1\nrange(start, stop, step)  # con passo personalizzato\n```\n\n```python\nfor i in range(5):        # 0, 1, 2, 3, 4\n    print(i)\n\nfor i in range(2, 10, 2): # 2, 4, 6, 8\n    print(i)\n\nfor i in range(10, 0, -1): # conto alla rovescia: 10, 9, ..., 1\n    print(i)\n```\n\n### 7.4 Cicli annidati\n\n```python\n# Tabellina di moltiplicazione da 1 a 5\nfor i in range(1, 6):\n    for j in range(1, 6):\n        print(f"{i} * {j} = {i * j}")\n```\n\n### 7.5 Iterare su indici: `range(len(...))` vs `enumerate()`\n\nMetodo classico (funzionale ma meno elegante):\n\n```python\nfrutta = ["mela", "banana", "ciliegia"]\nfor i in range(len(frutta)):\n    print(f"Indice {i}: {frutta[i]}")\n```\n\nMetodo consigliato con `enumerate()` — più leggibile e "pythonico":\n\n```python\nfor indice, elemento in enumerate(frutta):\n    print(f"Indice {indice}: {elemento}")\n\n# enumerate() accetta anche un parametro 'start' per iniziare da un numero diverso da 0\nfor indice, elemento in enumerate(frutta, start=1):\n    print(f"Posizione {indice}: {elemento}")\n```\n\n### 7.6 Iterare sui dizionari\n\n```python\ndizionario = {"a": 1, "b": 2, "c": 3}\n\nfor chiave in dizionario:                # itera sulle chiavi\n    print(chiave)\n\nfor valore in dizionario.values():        # itera sui valori\n    print(valore)\n\nfor chiave, valore in dizionario.items(): # itera su coppie chiave-valore\n    print(f"{chiave}: {valore}")\n```\n\n### 7.7 List comprehension: il ciclo `for` in forma compatta\n\nUna delle caratteristiche più distintive e moderne di Python: costruire una lista in un'unica riga.\n\n```python\nquadrati = [n ** 2 for n in range(10)]\nprint(quadrati)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n\n# Con condizione: solo i numeri pari\npari = [n for n in range(20) if n % 2 == 0]\nprint(pari)\n\n# Equivalente "esteso" con ciclo for classico, per confronto:\npari_v2 = []\nfor n in range(20):\n    if n % 2 == 0:\n        pari_v2.append(n)\nprint(pari_v2 == pari)   # True\n```\n\n> 💡 Le list comprehension sono più veloci e concise del corrispondente ciclo `for` con `.append()`, e sono lo standard "pythonico" per costruire liste derivate da altre sequenze.\n\n### 7.8 `zip()`: iterare su più sequenze in parallelo\n\n```python\nnomi = ["Alice", "Bruno", "Carla"]\nvoti = [8, 6, 9]\n\nfor nome, voto in zip(nomi, voti):\n    print(f"{nome}: {voto}")\n```\n\n### 7.9 Best practice\n\n1. Usa `for` quando conosci a priori la sequenza da percorrere.\n2. Usa `range()` per contare un numero fisso di ripetizioni.\n3. Preferisci `enumerate()` a `range(len(...))` quando servono sia indice che valore.\n4. Preferisci iterare direttamente sugli elementi piuttosto che sugli indici, quando l'indice non serve.\n5. Usa le list comprehension per trasformazioni semplici; per logiche complesse, un ciclo `for` classico resta più leggibile.\n\n### 7.10 `for` vs `while`: riepilogo finale\n\n| Costrutto | Quando usarlo |\n|---|---|\n| `for` | Sequenza nota o numero di iterazioni prevedibile |\n| `while` | Condizione dinamica, numero di iterazioni non noto a priori |\n\n---\n\n<a id="appendice"></a>\n## Appendice — Cheat sheet riassuntivo\n\n### Tipi di dato fondamentali\n\n```python\nint, float, complex   # numerici\nstr                    # testo\nbool                   # booleano (True/False)\nlist, tuple, dict, set # strutture dati (contenitori)\n```\n\n### Operatori — riepilogo generale\n\n| Categoria | Operatori |\n|---|---|\n| Aritmetici | `+  -  *  /  //  %  **` |\n| Confronto | `==  !=  <  >  <=  >=` |\n| Logici | `and  or  not` |\n| Identità | `is  is not` |\n| Appartenenza | `in  not in` |\n| Assegnazione combinata | `+=  -=  *=  /=  //=  %=  **=` |\n\n### Struttura tipica di un programma Python\n\n```python\n# 1. Import delle librerie necessarie\nimport math\n\n# 2. Acquisizione dati (eventuale input utente)\nn = int(input("Inserisci un numero: "))\n\n# 3. Elaborazione con controllo del flusso\nif n < 0:\n    print("Numero negativo, valore assoluto:", abs(n))\nelif n == 0:\n    print("Il numero è zero")\nelse:\n    radice = math.sqrt(n)\n    print(f"La radice quadrata di {n} è {radice:.2f}")\n\n# 4. Output dei risultati\nprint("Elaborazione completata.")\n```\n\n### Errori comuni da evitare\n\n| Errore | Perché succede | Come evitarlo |\n|---|---|---|\n| `ValueError` con `int(input(...))` | L'utente inserisce testo non numerico | Usa `try/except` |\n| Ciclo infinito | La condizione del `while` non cambia mai | Aggiorna sempre la variabile di controllo |\n| `TypeError` su stringhe | Si tenta di modificare un carattere: `s[0] = "x"` | Ricorda: le stringhe sono immutabili |\n| Confondere `/` e `//` | `/` restituisce sempre float | Usa `//` se serve un intero |\n| Confondere `==` e `is` | `is` confronta l'identità, non il valore | Usa `==` per confrontare i contenuti |\n| Indentazione inconsistente | Python usa l'indentazione per delimitare i blocchi | Usa sempre lo stesso numero di spazi (4 è lo standard) |\n\n### Note sulle versioni di Python\n\nQuesta guida è aggiornata alle versioni moderne del linguaggio (Python 3.10 – 3.14). In particolare vengono usate quando utile:\n\n- **f-string** (dalla 3.6) come metodo standard di formattazione.\n- **`match` / `case`** (dalla 3.10) come alternativa al pattern matching multiplo.\n- **Separatore `_` nei numeri** (dalla 3.6) per la leggibilità.\n- **`{variabile = }`** nelle f-string (dalla 3.8) per il debug rapido.\n\nPer approfondire ulteriormente, la documentazione ufficiale (in italiano) è disponibile su [docs.python.org/it/3](https://docs.python.org/it/3/).\n\n---\n\n*Fine della Guida Completa a Python — Prof. Giuseppe Carnabuci.*	2	2026-07-07 20:57:38.613168+00	markdown	15	
\.


--
-- Data for Name: document_configs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."document_configs" ("id", "label", "file_path", "is_active", "updated_at") FROM stdin;
markdown	Documentazione (.md)	/docs/credits.md	t	2026-07-02 10:15:13.537782+00
html	Slide HTML	/showcase/index.html	t	2026-07-07 19:08:05.7+00
pdf	Documento PDF	/docs/gcprof-academy-showcase.pdf	t	2026-07-07 19:14:52.544+00
google_slides	Google Slides	https://docs.google.com/presentation/d/1H-9sSJykMteHWcKBKxsnozzYSOBWhbJ10_cBTuo-sPY/preview	t	2026-07-07 19:28:17.897+00
google_sheet	Google Sheets	https://docs.google.com/spreadsheets/d/1mQ86Hez67apQqteKgAMCMd9Ysa_LsAeILcZcmZGYkFA/preview	t	2026-07-07 19:30:35.336+00
google_doc	Google Docs	https://docs.google.com/document/d/19bILcE6pEW4NbhRRdFo9UruIHD02h6ARwomJFhsXeII/preview	t	2026-07-07 19:32:24.333+00
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
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("id", "first_name", "last_name", "display_name", "role", "status", "created_at", "updated_at", "email", "password_hash", "avatar_url", "total_minutes_active") FROM stdin;
f7cd70e7-a2c4-4f82-86d8-366d066068db	Giuscar		Giuscar	student	active	2026-07-06 08:26:39.73287+00	2026-07-07 07:38:08.588+00	giuscar74@gmail.com	$2b$10$eLu2IBwwOeNHqAoCkLuu1.ZYaE0ZfUS7xRH.IWujrWSta6Q/IJu7W	https://vaokzyznazkcqjpbbkgr.supabase.co/storage/v1/object/public/avatars/uploads/f7cd70e7-a2c4-4f82-86d8-366d066068db-1783409883619.png	20
cc421283-06af-41de-a08b-4c3adf39f65c	Peppe	Scuola	Peppe Scuola	student	active	2026-07-06 08:27:41.83213+00	2026-07-08 10:54:08.964+00	carnabuci.giuseppe@ismonnet.eu	$2b$10$fUe5qjnfA8VPSR5RVEpXjOsZ5Gl7mywMHeD2lq3AZ78X2Q8MKF0la	https://vaokzyznazkcqjpbbkgr.supabase.co/storage/v1/object/public/avatars/uploads/cc421283-06af-41de-a08b-4c3adf39f65c-1783409817434.png	13
08be3132-7d36-46c3-9d31-2b1fd0b48d83	Giuseppe	Carnabuci	Prof. Carnabuci	admin	active	2026-07-02 15:39:26.487928+00	2026-07-08 10:54:42.053+00	admin@gcprof-academy.com	$2b$10$GAhB.B3Ht67g1kNu9e939OpnNh6gUMJ1apWvFYHJMXOy55fj4Px8q	https://vaokzyznazkcqjpbbkgr.supabase.co/storage/v1/object/public/avatars/uploads/08be3132-7d36-46c3-9d31-2b1fd0b48d83-1783066842958.png	0
\.


--
-- Data for Name: mail_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."mail_templates" ("id", "template_key", "name", "description", "subject", "title_override", "body_text_override", "enabled", "version", "created_at", "updated_at", "updated_by") FROM stdin;
4f6a34cb-5f9f-44af-9d1e-9d9ca498e0ef	PASSWORD_RESET	Recupero Password	Inviata durante il reset password.	 {{academy_name}} Recupera la tua password	Reset Password	Hai richiesto il recupero della password.\r\n\r\nUtilizza il link sottostante.	t	1	2026-07-04 11:16:49.297209+00	2026-07-05 13:29:03.278105+00	\N
eb967192-476a-485f-88a8-91863e6071bb	CONTACT_REPLY	Risposta Contatti	Risposta automatica del form Contatti.	 {{academy_name}} Abbiamo ricevuto il tuo messaggio	Grazie per averci contattato	Ti risponderemo nel più breve tempo possibile.	t	1	2026-07-04 11:16:49.297209+00	2026-07-05 13:29:17.842118+00	\N
d3bca8b6-93d8-47c3-8182-57a5e325783f	WELCOME	Email di Benvenuto	Inviata dopo la registrazione.	 {{academy_name}} Benvenuto sulla piattaforma di E-Learning del Prof. Giuseppe Carnabuci	Benvenuto!	Ciao {{first_name}},\r\n\r\nsiamo felici di averti nella nostra Academy.	t	1	2026-07-04 11:16:49.297209+00	2026-07-05 13:29:21.713849+00	\N
060a7d90-d767-4090-82cd-5cd152708b50	SUPPORT	Supporto Studenti	Inviato per supporto studenti	{{academy_name}} Scusa per il disagio provvederemo al più presto a risolvere il problema!	Supporto Studenti	Ciao {{first_name}}, risolveremo il problema al più presto!	t	1	2026-07-06 09:18:41.068016+00	2026-07-06 09:18:41.068016+00	\N
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
f7cd70e7-a2c4-4f82-86d8-366d066068db	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-06 08:26:39.89217+00
cc421283-06af-41de-a08b-4c3adf39f65c	838cfa24-0b23-4e15-b145-c55241f2768c	2026-07-06 08:27:41.925612+00
\.


--
-- Data for Name: profile_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profile_courses" ("profile_id", "course_id", "enrolled_at") FROM stdin;
f7cd70e7-a2c4-4f82-86d8-366d066068db	aa600d1a-7dd0-4e3a-ab97-f6c0d41211e1	2026-07-06 08:26:39.89217+00
f7cd70e7-a2c4-4f82-86d8-366d066068db	b4ab19fb-f69d-401e-a587-a195737a1252	2026-07-06 08:26:39.89217+00
f7cd70e7-a2c4-4f82-86d8-366d066068db	4a6d4534-259d-4028-b82a-55b315d4bb6c	2026-07-06 08:26:39.89217+00
cc421283-06af-41de-a08b-4c3adf39f65c	aa600d1a-7dd0-4e3a-ab97-f6c0d41211e1	2026-07-06 08:27:41.925612+00
cc421283-06af-41de-a08b-4c3adf39f65c	b4ab19fb-f69d-401e-a587-a195737a1252	2026-07-06 08:27:41.925612+00
cc421283-06af-41de-a08b-4c3adf39f65c	4a6d4534-259d-4028-b82a-55b315d4bb6c	2026-07-06 08:27:41.925612+00
f7cd70e7-a2c4-4f82-86d8-366d066068db	15c71938-702e-4367-92f0-561e74c3bab7	2026-07-07 07:10:20.293359+00
cc421283-06af-41de-a08b-4c3adf39f65c	15c71938-702e-4367-92f0-561e74c3bab7	2026-07-07 07:10:20.293359+00
\.


--
-- Data for Name: profile_lessons_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profile_lessons_progress" ("profile_id", "lesson_id", "course_id", "is_completed", "minutes_watched", "last_accessed_at", "updated_at") FROM stdin;
cc421283-06af-41de-a08b-4c3adf39f65c	e791e3f7-cdc3-466a-81f3-081a1708d4a4	aa600d1a-7dd0-4e3a-ab97-f6c0d41211e1	t	3	2026-07-06 19:28:25.491+00	2026-07-06 19:28:25.491+00
\.


--
-- Data for Name: user_page_views; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."user_page_views" ("id", "profile_id", "path", "course_slug", "lesson_slug", "viewed_at") FROM stdin;
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."user_sessions" ("id", "profile_id", "login_at", "logout_at", "session_duration_seconds", "ip_address", "user_agent", "created_at") FROM stdin;
1eba208a-9e61-47ab-a67e-a05a8afe3226	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-08 07:36:08.961+00	2026-07-08 07:42:45.445+00	396	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 07:36:08.371014+00
bc63308a-8243-46ba-bf9f-603b1262d782	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-08 08:19:54.078+00	2026-07-08 08:20:05.625+00	11	2.157.214.40	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 08:19:54.299816+00
885ccf70-323d-469b-8c10-8dae43fd67dc	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-08 08:50:44.676+00	2026-07-08 09:20:54.867+00	1810	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 08:50:43.993355+00
35f3af98-368e-4041-84d9-1c1ceaf69d14	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-08 09:39:14.513+00	\N	\N	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 09:39:13.811226+00
b024c25d-8649-4913-a499-1461fd8ae774	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-08 10:25:52.729+00	2026-07-08 10:54:05.625+00	1692	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 10:25:51.923839+00
26a6b26d-3ad6-49aa-9163-13a97c27c5d2	cc421283-06af-41de-a08b-4c3adf39f65c	2026-07-08 10:54:09.248+00	2026-07-08 10:54:33.828+00	24	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 10:54:08.401217+00
612535e3-e5a4-49a6-bd78-dada79ac604a	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-08 10:54:38.531+00	\N	\N	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 10:54:37.712303+00
9be9529c-f27c-406e-8f3b-1d2cc144d5f1	08be3132-7d36-46c3-9d31-2b1fd0b48d83	2026-07-08 10:54:42.368+00	2026-07-08 12:11:23.115+00	4600	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-07-08 10:54:41.517951+00
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
certificates	certificates	\N	2026-06-24 14:19:59.587854+00	2026-06-24 14:19:59.587854+00	t	f	\N	\N	\N	STANDARD
avatars	avatars	\N	2026-07-03 08:04:41.984459+00	2026-07-03 08:04:41.984459+00	t	f	1048576	{image/png,image/jpg,image/gif,image/jpeg}	\N	STANDARD
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

-- \unrestrict OH4v6NdZFiFJ2tVFbyMscDBY2mM3Td3Msnohg2ZG4qID1lfKOdnAlYgCaz6R6Fh

RESET ALL;
