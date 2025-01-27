


'use server';
import axios from 'axios';

import { verifygoogleCodePath } from '@/config/api-urls';
import { baseURL } from '@/config/baseUrl';

export async function verifyGoogleCodeAction(code: string) {
  try {
    const res = await axios.get(`${baseURL}${verifygoogleCodePath}?code=${code}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


