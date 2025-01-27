

'use server';
import axios from 'axios';

import { signUpPath } from '@/config/api-urls';
import { baseURL } from '@/config/baseUrl';

export async function signUpAction(values: { email: string; password: string }) {
  try {
    const res = await axios.post(`${baseURL}${signUpPath}`, values);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    if (error.response) {
        // Backend responded with an error (e.g., 400, 401, 500)
        const { data, status } = error.response;
        return { message: data?.message || 'Something went wrong', status };
      } else if (error.request) {
        // Request was made, but no response was received
        throw { message: 'No response from server', status: 500 };
      } else {
        // Something else went wrong
        throw { message: error.message, status: 500 };
      }
    }
}


