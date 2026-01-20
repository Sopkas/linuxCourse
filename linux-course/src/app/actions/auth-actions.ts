'use server';

import { signOut as nextAuthSignOut } from '@/auth';

export async function signOutAction(redirectTo: string = '/') {
  await nextAuthSignOut({ redirectTo });
}