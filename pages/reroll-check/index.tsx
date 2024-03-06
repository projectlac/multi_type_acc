import rrr from '@/assets/images/mainCategory/310545249_770219224063920_253246776766894058_n.webp';
import OgTag from '@/components/Common/OgTag';
import TitleSpecial from '@/components/Common/TitleSpecial';
import ProductCollectionItem from '@/components/ProductCollection/ProductCollectionItem';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
function AccountReroll() {
  return (
    <Box>
      <Head>
        <title>Account Reroll Mới Nhất</title>
        <OgTag title="Account Reroll Mới Nhất" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Lựa chọn acc Reroll</TitleSpecial>
        <Box py={3}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={3}></Grid>
            <Grid item xs={12} md={3}>
              <ProductCollectionItem
                title="Acc Reroll"
                url="/account/genshin-impact/reroll"
                image={rrr}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <ProductCollectionItem
                title="Acc Reroll 5 sao"
                url="/account/genshin-impact/reroll-vip"
                image={rrr}
              />
            </Grid>
            <Grid item xs={12} md={3}></Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default AccountReroll;
AccountReroll.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
