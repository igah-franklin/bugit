






'use server';
import { transactionPath } from '@/config/api-urls';
import axiosInstance from '@/config/axiosInstance';

export async function editTransactionAction(transactionId: string, payload: any) {
  try {
    const res = await axiosInstance.put(`${transactionPath}/${transactionId}/update`, payload);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    throw error;
  }
}


