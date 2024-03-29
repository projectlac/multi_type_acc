import {
  Box,
  Card,
  Divider,
  IconButton,
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
import { IAccountVipAdmin } from 'model/account';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import EditAccount from './Action/EditAccount';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: any;
}

interface Filters {
  status?: 'true' | 'false';
}

const applyFilters = (
  cryptoOrders: IAccountVipAdmin[],
  filters: Filters
): IAccountVipAdmin[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.is_sold.toString() !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: IAccountVipAdmin[],
  page: number,
  limit: number
): IAccountVipAdmin[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [buyTimeSort, setBuyTimeSort] = useState<boolean | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filterBySearch = (cryptoOrders: IAccountVipAdmin[]) => {
    let filter = cryptoOrders.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.code.includes(search)
    );

    switch (buyTimeSort) {
      case true:
        filter = filter.sort(
          (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at)
        );
        break;
      case false:
        filter = filter.sort(
          (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
        );
        break;
      default:
        break;
    }

    return filter;
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const filteredCode = filterBySearch(filteredCryptoOrders);
  const paginatedCryptoOrders = applyPagination(filteredCode, page, limit);

  const theme = useTheme();
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
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
          label="Search by code"
          value={search}
          onChange={handleChangeSearch}
        ></TextField>
      </Box>

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#ID</TableCell>
              <TableCell>Tên quà</TableCell> <TableCell>Tỷ lệ</TableCell>
              <TableCell align="right">Thời gian tạo</TableCell>
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
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder['number']} %
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
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(cryptoOrder.created_at), ' HH:mm:ss')}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {!cryptoOrder.is_sold && (
                      <Tooltip title="Edit Order" arrow>
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
                          <EditAccount
                            title="Sửa quà"
                            slug={cryptoOrder.slug}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
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
