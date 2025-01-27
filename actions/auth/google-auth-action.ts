

'use server';
import axios from 'axios';

import { googleSignInPath } from '@/config/api-urls';
import { baseURL } from '@/config/baseUrl';

export async function googleSignInAction() {
  try {
    const res = await axios.get(`${baseURL}${googleSignInPath}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


