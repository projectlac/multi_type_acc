import { useAuth } from '@/contexts/AuthGuard';
import { Card } from '@mui/material';
import { getAccountVipFromDashboard } from 'api/apiAccount/account';
import { IAccountVipAdmin } from 'model/account';
import { useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { update } = useAuth();
  const [data, setData] = useState<IAccountVipAdmin[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<boolean | null>(null);
  const [hidden, setHidden] = useState<boolean | null>(null);

  const [soldOrder, setSoldOrder] = useState<'true' | 'false' | null>(null);

  const [search, setSearch] = useState<string>('');

  const changePage = (page: number) => {
    setPage(page);
  };
  const changeLimit = (limit: number) => {
    setLimit(limit);
  };
  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    setPage(0);
  };
  const handleOrder = (order: 'true' | 'false' | null) => {
    setSearch('');
    setSoldOrder(order);
  };
  const handleStatus = (status: boolean | null) => {
    setStatus(status);
    setPage(0);
    setSearch('');
  };
  const handleHidden = (hidden: boolean | null) => {
    setHidden(hidden);
  };
  useEffect(() => {
    setData([]);
    getAccountVipFromDashboard({
      limit: limit,
      offset: page,
      keyword: search,
      priceSort: '',
      is_sold: status,
      sold_date: soldOrder,
      is_hidden: hidden,
      game: 'genshin-impact'
    }).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [update, page, search, status, limit, hidden, soldOrder]);
  return (
    <Card sx={{ mb: 5 }}>
      <RecentOrdersTable
        cryptoOrders={data}
        changePage={changePage}
        total={total}
        handleSearch={handleSearch}
        changeLimit={changeLimit}
        handleStatus={handleStatus}
        handleOrder={handleOrder}
        handleHidden={handleHidden}
      />
    </Card>
  );
}

export default RecentOrders;
