
'use client'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function useLogout() {
    const router = useRouter();

  const handleLogout = async () => {
    console.log('removed&*****')
    try {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return { handleLogout }
}
