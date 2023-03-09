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
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import { ISpinHistory } from 'model/deposit';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import EditTag from '../Action/EditTag';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: ISpinHistory[];
}

const applyPagination = (
  cryptoOrders: ISpinHistory[],
  page: number,
  limit: number
): ISpinHistory[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};
interface Filters {
  status?: 'true' | 'false';
}
const RecentOrdersTableLuckySpin: FC<RecentOrdersTableProps> = ({
  cryptoOrders
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

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
    cryptoOrders: ISpinHistory[],
    filters: Filters
  ): ISpinHistory[] => {
    return cryptoOrders.filter((cryptoOrder) => {
      let matches = true;

      if (
        filters.status &&
        cryptoOrder.is_receive.toString() !== filters.status
      ) {
        matches = false;
      }

      return matches;
    });
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);

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
      id: 'true',
      name: 'Đã gửi'
    },
    {
      id: 'false',
      name: 'Chưa gửi'
    }
  ];
  const theme = useTheme();
  return (
    <Card>
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

              <TableCell width={'30%'}>Người quay</TableCell>
              <TableCell>Thông tin</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Ngày quay</TableCell>
              <TableCell align="right">Action</TableCell>
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
                      {cryptoOrder.user.username}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.wheel.name} x {cryptoOrder.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.is_receive ? 'Đã gửi' : 'Chưa gửi '}
                    </Typography>
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
                    <Tooltip title="Đổi role" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTag
                          title="Chuyển đổi trạng thái"
                          id={cryptoOrder.id}
                        />
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
