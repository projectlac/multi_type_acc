import Head from 'next/head';
// import { Data } from '@/utility/data';
import SidebarLayout from '@/layouts/SidebarLayout';
// import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Bar } from 'react-chartjs-2';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getRemainingMoney } from 'api/apiDashboard/userApi';
import { useAuth } from '@/contexts/AuthGuard';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface IData {
  label: string;
  data: IChart;
}
interface IChart {
  money: number;
}

function DashboardCrypto() {
  const { update } = useAuth();
  const [dataRemain, setDataRemain] = useState({
    account_remaining: '0',
    account_sold: '0',
    transaction_sold: '0'
  });
  const date = new Date();
  const date1 = format(
    new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000),
    'MM/dd/yyyy'
  );

  const [start, setStart] = useState<string | null>(date1);
  const [end, setEnd] = useState<string | null>(
    format(new Date(), 'MM/dd/yyyy')
  );
  const dataTotal: IData[] = [
    {
      label: '10/7/2022',
      data: { money: 150000 }
    },
    {
      label: '11/7/2022',
      data: { money: 150000 }
    },
    {
      label: '12/7/2022',
      data: { money: 150000 }
    },
    {
      label: '13/7/2022',
      data: { money: 150000 }
    },
    {
      label: '14/7/2022',
      data: { money: 150000 }
    },
    {
      label: '15/7/2022',
      data: { money: 150000 }
    }
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: `Bảng thống kê từ ngày ${format(
          new Date(start),
          'dd/MM/yyyy'
        )} tới ngày ${format(new Date(end), 'dd/MM/yyyy')}`
      }
    }
  };
  const labels = dataTotal.map((d) => d.label);
  const datasets = [
    {
      label: 'Số tiền bán được (fake data)',
      data: dataTotal.map((d) => d.data.money),
      backgroundColor: 'rgba(17, 241, 44, 0.5)'
    }
  ];
  const data = {
    labels,
    datasets
  };

  useEffect(() => {
    getRemainingMoney().then((res) => setDataRemain(res.data));
  }, [update]);
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
          mt={3}
        >
          <Grid item md={9}>
            <Card
              sx={{
                padding: '30px'
              }}
            >
              <Box
                sx={{
                  width: '600px',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',

                  justifyContent: 'space-between'
                }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  localeText={{ start: 'Check-in', end: 'Check-out' }}
                >
                  <DatePicker
                    label="Ngày bắt đầu"
                    value={start}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setStart(format(new Date(newValue), 'MM/dd/yyyy'));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  Tới
                  <DatePicker
                    label="Ngày kết thúc"
                    value={end}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setEnd(format(new Date(newValue), 'MM/dd/yyyy'));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Bar options={options} data={data} />
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card
              sx={{
                padding: '15px',
                mb: 3
              }}
            >
              <Typography>Tổng tiền còn lại</Typography>
              <Typography>Tổng tiền còn lại</Typography>
            </Card>
            <Card
              sx={{
                padding: '15px',
                mb: 3
              }}
            >
              2
            </Card>
            <Card
              sx={{
                padding: '15px',
                mb: 3
              }}
            >
              3
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
