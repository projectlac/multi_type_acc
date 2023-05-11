import Label from '@/components/Label';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
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
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import { IOrderGift } from 'model/gift';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import EditTag from './Action/EditTag';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: IOrderGift[];
}

const applyPagination = (
  cryptoOrders: IOrderGift[],
  page: number,
  limit: number
): IOrderGift[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};
interface Filters {
  status?: 'SUCCESS' | 'PENDING' | 'ERROR';
}
const RecentOrdersTableLuckySpin: FC<RecentOrdersTableProps> = ({
  cryptoOrders
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [search, setSearch] = useState<string>('');
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterBySearch = (cryptoOrders: IOrderGift[]) => {
    let filter = cryptoOrders.filter(
      (d) =>
        d.user.username.toLowerCase().includes(search.toLowerCase()) ||
        d.user.email.includes(search)
    );

    return filter;
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const applyFilters = (
    cryptoOrders: IOrderGift[],
    filters: Filters
  ): IOrderGift[] => {
    return cryptoOrders.filter((cryptoOrder) => {
      let matches = true;

      if (filters.status && cryptoOrder.status.toString() !== filters.status) {
        matches = false;
      }

      return matches;
    });
  };
  const fileterSearch = filterBySearch(cryptoOrders);
  const filteredCryptoOrders = applyFilters(fileterSearch, filters);

  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'SUCCESS',
      name: 'Đã gửi'
    },
    {
      id: 'PENDING',
      name: 'Chưa gửi'
    },
    {
      id: 'ERROR',
      name: 'Hủy'
    }
  ];
  const getStatusLabel = (cryptoOrderStatus: string): JSX.Element => {
    const map = {
      PENDING: {
        text: 'PENDING',
        color: 'error'
      },
      SUCCESS: {
        text: 'SUCCESS',
        color: 'success'
      },
      ERROR: {
        text: 'ERROR',
        color: 'error'
      }
    };
    const { text, color }: any = map[cryptoOrderStatus.toString()];

    return <Label color={color}>{text}</Label>;
  };
  const theme = useTheme();
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
          label="Search by username hoặc email"
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
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Orders"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={'5%'}>#</TableCell>

              <TableCell width={'20%'}>Người nhận</TableCell>
              <TableCell>Thông tin</TableCell>
              <TableCell>Sản phẩm</TableCell>

              <TableCell align="right">Ngày mua</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                      {cryptoOrder.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.receiver}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="normal"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      Username: <b>{cryptoOrder.user.username}</b>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      <b>Địa chỉ: </b> {cryptoOrder.delivery_address} |{' '}
                      <b>Số điện thoại: </b>
                      {cryptoOrder.phone}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.description && (
                        <>
                          <b>Chú thích: </b>
                          {cryptoOrder.description}
                        </>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {cryptoOrder.details.length > 0 &&
                      cryptoOrder.details.map((f, i) => (
                        <Box key={i}>
                          <Typography
                            variant="body1"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {f.gift.wheel.name}x {f.gift.amount}
                          </Typography>
                        </Box>
                      ))}
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
                    <Typography>
                      {format(new Date(cryptoOrder.created_at), 'hh:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Đổi trạng thái" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.success.lighter
                          },
                          color: theme.palette.success.main
                        }}
                        color="success"
                        size="small"
                      >
                        <EditTag title="Đổi trạng thái" id={+cryptoOrder.id} />
                      </IconButton>
                    </Tooltip>
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
          count={cryptoOrders.length}
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

RecentOrdersTableLuckySpin.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTableLuckySpin.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTableLuckySpin;
