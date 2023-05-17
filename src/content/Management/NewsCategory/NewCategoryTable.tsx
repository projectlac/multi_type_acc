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
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import { INewsCategory } from 'model/news';
import Delete from './Action/Delete';
import EditTag from './Action/EditTag';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: INewsCategory[];
}

interface Filters {
  type: 'hero' | 'weapon';
}

const applyPagination = (
  cryptoOrders: INewsCategory[],
  page: number,
  limit: number
): INewsCategory[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const NewCategoryTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    type: null
  });
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




  const paginatedCryptoOrders = applyPagination(cryptoOrders, page, limit);

  const theme = useTheme();


  return (
    <Card>
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
                <MenuItem value={'hero'}>Hero</MenuItem>
                <MenuItem value={'weapon'}>Weapon</MenuItem>
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

              <TableCell>Danh mục</TableCell>

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
                      {cryptoOrder.name}
                    </Typography>
                  </TableCell>

                  {/* <TableCell>{getStatusLabel(cryptoOrder.type)}</TableCell> */}

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
                        {/* <EditTwoToneIcon fontSize="small" /> */}
                        <EditTag
                          title="Sửa tag"
                          slug={cryptoOrder.slug}

                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <Delete
                          title="Xóa tag"
                          slug={cryptoOrder.slug}

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

NewCategoryTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

NewCategoryTable.defaultProps = {
  cryptoOrders: []
};

export default NewCategoryTable;
