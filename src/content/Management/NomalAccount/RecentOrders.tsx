import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getAccountNomalFromDashboard } from 'api/apiAccount/account';
import { IAccountVipAdmin } from 'model/account';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { update } = useAuth();

  const [data, setData] = useState<IAccountVipAdmin[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  useEffect(() => {
    getAccountNomalFromDashboard(limit, page, 'genshin-impact', search).then(
      (res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      }
    );
  }, [update, page, limit, search]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable
        cryptoOrders={data}
        setPage={setPage}
        setLimit={setLimit}
        setSearch={setSearch}
        total={total}
      />
    </Card>
  );
}

export default RecentOrders;
