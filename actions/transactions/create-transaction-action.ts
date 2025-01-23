





'use server';
import { transactionPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function createTransactionAction(payload: any) {

  try {
    const res = await axiosInstance.post(`${transactionPath}`, payload);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


