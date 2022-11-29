import OgTag from '@/components/Common/OgTag';
import TopUp from '@/components/TopUp/TopUp';
import TopUpMobile from '@/components/TopUp/TopUpMobile';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container } from '@mui/material';
import Head from 'next/head';

export default function VerticalTabs() {
  return (
    <ProtectGuess>
      <Head>
        <title>Nạp web coin </title>
        <OgTag title="Nạp web coin " />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 20, mb: 10 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <TopUp />
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <TopUpMobile />
        </Box>
      </Container>
    </ProtectGuess>
  );
}
VerticalTabs.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
