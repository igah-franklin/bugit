



'use server';
import { transactionByTypePath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function fetchTransactionTypeAction(type: string) {

  try {
    const res = await axiosInstance.get(`${transactionByTypePath}?type=${type}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


