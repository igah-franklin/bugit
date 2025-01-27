


'use server';
import axios from 'axios';

import { verifyEmailPath } from '@/config/api-urls';
import { baseURL } from '@/config/baseUrl';

export async function verifyEmailAction(token: string) {
  try {
    const res = await axios.get(`${baseURL}${verifyEmailPath}?token=${token}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


