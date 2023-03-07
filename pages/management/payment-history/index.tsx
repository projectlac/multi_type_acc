import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/History/PageHeader';
import RecentOrdersTag from '@/content/Management/History/RecentOrdersTag';

import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Lịch sử nạp</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrdersTag />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
