import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getListUser } from 'api/apiUser/userApi';
import { IUser } from 'model/user';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';
import { IUserRole } from '@/models/crypto_order';

function RecentOrders() {
  const [data, setData] = useState<IUser[]>([]);
  const { update } = useAuth();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [role, setRole] = useState<IUserRole>('');

  useEffect(() => {
    const callApi = async () => {
      await getListUser(limit, page, search, role).then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      });
    };
    callApi();
  }, [update, limit, page, search, role]);

  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable
        cryptoOrders={data}
        setPage={setPage}
        setLimit={setLimit}
        setSearch={setSearch}
        total={total}
        setRole={setRole}
      />
    </Card>
  );
}

export default RecentOrders;
