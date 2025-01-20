
// 'use server';
import axios from 'axios';

import { signInPath } from '@/config/api-urls';
import { baseURL } from '@/config/baseUrl';

export async function signInAction(values: { email: string; password: string }) {
  try {
    const res = await axios.post(`${baseURL}${signInPath}`, values);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


