import Head from 'next/head';
// import { Data } from '@/utility/data';
import SidebarLayout from '@/layouts/SidebarLayout';
// import { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import { Container, Grid } from '@mui/material';

function DashboardCrypto() {
  // const [chartData, setChartData] = useState({
  //   labels: Data.map((data) => data.month),
  //   datasets: [
  //     {
  //       label: 'Users Gained ',
  //       data: Data.map((data) => data.userGain),
  //       backgroundColor: [
  //         'rgba(75,192,192,1)',
  //         '#ecf0f1',
  //         '#50AF95',
  //         '#f3ba2f',
  //         '#2a71d0'
  //       ]
  //     }
  //   ]
  // });

  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
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
          spacing={4}
        >
          {/* <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Data giả thôi'
                },
                legend: {
                  display: false
                }
              }
            }}
          /> */}
        </Grid>
      </Container>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
