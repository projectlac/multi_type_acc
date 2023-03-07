import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import Label from '@/components/Label';
import { History, IHistoryData } from 'model/tag';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IHistoryData[];
}

interface Filters {
  type: 'SUCCESS' | 'ERROR';
}

const applyPagination = (
  cryptoOrders: IHistoryData[],
  page: number,
  limit: number
): IHistoryData[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    type: null
  });
  const [search, setSearch] = useState<string>('');
  const getStatusLabel = (type: History): JSX.Element => {
    const map = {
      ERROR: {
        text: 'Thất bại',
        color: 'error'
      },
      SUCCESS: {
        text: 'Thành công',
        color: 'success'
      }
    };

    const { text, color }: any = map[type];

    return <Label color={color}>{text}</Label>;
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      type: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const applyFilters = (
    cryptoOrders: IHistoryData[],
    filters: Filters
  ): IHistoryData[] => {
    return cryptoOrders.filter((cryptoOrder) => {
      let matches = true;

      if (filters.type && cryptoOrder.transaction.status !== filters.type) {
        matches = false;
      }

      return matches;
    });
  };
  const filterBySearch = (cryptoOrders: IHistoryData[]) => {
    return cryptoOrders.filter(
      (d) =>
        d.user?.email.toLowerCase().includes(search.toLowerCase()) ||
        d.transaction?.bank_name.toLowerCase().includes(search.toLowerCase())
    );
  };
  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const filteredCode = filterBySearch(filteredCryptoOrders);
  const paginatedCryptoOrders = applyPagination(filteredCode, page, limit);

  const theme = useTheme();
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  console.log(paginatedCryptoOrders);

  return (
    <Card>
      <Box
        sx={{
          padding: '10px 15px 0px'
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          label="Search bằng tên"
          value={search}
          onChange={handleChangeSearch}
        ></TextField>
      </Box>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.type || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'SUCCESS'}>Thành công</MenuItem>
                <MenuItem value={'ERROR'}>Thất bại</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        title="Danh sách"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Phương thức</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell align="right">Thời gian tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <Typography
                        variant={`${
                          cryptoOrder.user?.username ? 'body1' : 'body2'
                        }`}
                        fontWeight={`${
                          cryptoOrder.user?.username ? 'bold' : 'normal'
                        }`}
                        color={`${
                          cryptoOrder.user?.username
                            ? 'text.primary'
                            : 'text.secondary'
                        }`}
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.user?.username
                          ? cryptoOrder.user?.username
                          : 'Không có dữ liệu'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {cryptoOrder.user?.email}
                      </Typography>
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.transaction.bank_name}
                    </Typography>
                  </TableCell>
                  <TableCell>{cryptoOrder.history_message}</TableCell>
                  <TableCell>
                    {getStatusLabel(cryptoOrder.transaction.status)}
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(cryptoOrder.created_at), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(cryptoOrder.created_at), ' HH:mm:ss')}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
