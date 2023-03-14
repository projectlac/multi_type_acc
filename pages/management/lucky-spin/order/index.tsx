import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/Order/WheelOrder/PageHeaderLuckySpin';
import RecentOrders from '@/content/Management/Order/WheelOrder/RecentOrdersLuckySpin';

import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

function UserManagement() {
  return (
    <>
      <Head>
        <title>Quản lý Đơn</title>
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
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

UserManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserManagement;
