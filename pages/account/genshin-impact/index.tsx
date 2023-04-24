import BaseLayout from '@/layouts/BaseLayout';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function Genshin() {
  const router = useRouter();
  useEffect(() => {
    router.push('/account/genshin-impact/vip');
  }, []);
  return <Container maxWidth="lg" sx={{ mt: 15 }}></Container>;
}

export default Genshin;
Genshin.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
