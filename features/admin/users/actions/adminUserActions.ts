"use server";

import { getAdminUsersPaginated, UserFilterParams, PaginatedUsersResponse } from "../services/adminService";

/**
 * Server Action sicura che fa da ponte tra il Client Component e il servizio DB
 */
export async function getAdminUsersPaginatedAction(
  params: UserFilterParams
): Promise<PaginatedUsersResponse> {
  // Questo codice gira rigorosamente sul server, dove process.env ha pieno accesso alle chiavi
  return await getAdminUsersPaginated(params);
}