import formatMoney from '@/utility/formatMoney';
import { Table as MuiTable, TablePagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import * as React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface IProp {
  data: any;
}
export default function Table({ data }: IProp) {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    console.log(event.type);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Thông tin</StyledTableCell>
              <StyledTableCell align="left">Thời gian</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => {
              const {
                transaction: { detail, updated_at }
              } = row;
              return (
                <StyledTableRow
                  key={detail[0].id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor:
                        detail[0].username === 'Gift-Code'
                          ? '#508f27'
                          : 'rgb(229, 232, 255)',
                      '> td': {
                        color:
                          detail[0].username === 'Gift-Code' ? '#fff' : '#000'
                      }
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor:
                        detail[0].username === 'Gift-Code' ? '#39bbba' : '#fff',
                      '> td': {
                        color:
                          detail[0].username === 'Gift-Code' ? '#fff' : '#000'
                      }
                    }
                  }}
                >
                  <StyledTableCell align="left">{detail[0].id}</StyledTableCell>
                  <StyledTableCell align="left">
                    <b> Tài khoản</b>: {detail[0].username}
                    <br />
                    <b> Mật khẩu</b>: {detail[0].password}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {formatMoney(detail[0].price_after_sale)} VNĐ
                    <br />
                    <Typography fontWeight={'bold'}>
                      {format(new Date(updated_at), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography>
                      {format(new Date(updated_at), 'hh:mm:ss')}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
