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
  MenuItem,
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
import { getMoneyTable, getRemainingMoney } from 'api/apiDashboard/userApi';
import { useAuth } from '@/contexts/AuthGuard';
import formatMoney from '@/utility/formatMoney';

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
  const [moneyToday, setMoneyToday] = useState('0');
  const date = new Date();
  const date1 = format(
    new Date(date.setMonth(date.getMonth() - 12)),
    'yyyy/MM/dd'
  );

  const [start, setStart] = useState<string | null>(date1);
  const [end, setEnd] = useState<string | null>(
    format(new Date(), 'yyyy/MM/dd')
  );
  const [currency, setCurrency] = useState('Mua nick');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const currencies = [
    {
      value: 'Mua nick',
      label: 'Mua nick'
    },
    {
      value: 'Nạp tiền tài khoản',
      label: 'Nạp tiền tài khoản'
    },
    {
      value: 'Nạp tiền vào game',
      label: 'Nạp tiền vào game'
    }
  ];

  const [dataTotal, setDataTotal] = useState<IData[]>([
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
  ]);

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
    },
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: string) {
            return `${formatMoney(value)} VNĐ`;
          }
        }
      }
    }
  };
  const labels = dataTotal.map((d) => d.label);
  const datasets = [
    {
      label: 'Số tiền bán được',
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
    const date = new Date();
    const date1 = format(
      new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000),
      'yyyy/MM/dd'
    );
    getMoneyTable(format(new Date(), 'yyyy/MM/dd'), date1, 'Mua nick').then(
      (res) => {
        setMoneyToday(res.data[0].total);
      }
    );
  }, [update]);
  useEffect(() => {
    const date = new Date(end);
    const date1 = format(
      new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000),
      'yyyy/MM/dd'
    );
    getMoneyTable(start, date1, currency).then((res) => {
      const data = res.data;
      const temp: IData[] = data.map((d: any) => ({
        label: `${d.month}/${d.year}`,
        data: { money: d.total }
      }));
      setDataTotal(temp);
    });
  }, [update, start, end, currency]);

  const onKeyDown = (e) => {
    e.preventDefault();
  };

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
                <Box
                  sx={{
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
                        setStart(format(new Date(newValue), 'yyyy/MM/dd'));
                      }}
                      renderInput={(params) => (
                        <TextField onKeyDown={onKeyDown} {...params} />
                      )}
                    />
                    <Box mx={1}>Tới</Box>
                    <DatePicker
                      label="Ngày kết thúc"
                      value={end}
                      inputFormat="dd/MM/yyyy"
                      onChange={(newValue) => {
                        setEnd(format(new Date(newValue), 'yyyy/MM/dd'));
                      }}
                      renderInput={(params) => (
                        <TextField onKeyDown={onKeyDown} {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box ml={2}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Phân loại"
                    value={currency}
                    fullWidth
                    onChange={handleChange}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
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
              <Typography>Tổng tiền hôm nay</Typography>
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
              >
                {formatMoney(moneyToday)} VNĐ
              </Typography>
            </Card>
            <Card
              sx={{
                padding: '15px',
                mb: 3
              }}
            >
              <Typography>Tổng tiền account chưa bán</Typography>
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
              >
                {formatMoney(dataRemain.account_remaining)} VNĐ
              </Typography>
            </Card>
            <Card
              sx={{
                padding: '15px',
                mb: 3
              }}
            >
              <Typography>Tổng tiền account đã bán</Typography>
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
              >
                {formatMoney(dataRemain.account_sold)} VNĐ
              </Typography>
            </Card>{' '}
            <Card
              sx={{
                padding: '15px',
                mb: 3
              }}
            >
              <Typography>Tổng tiền giao dịch</Typography>
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
              >
                {formatMoney(dataRemain.transaction_sold)} VNĐ
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
