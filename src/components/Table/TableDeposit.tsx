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
    fontSize: 13
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
export default function TableDeposit({ data }: IProp) {
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
        <MuiTable aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{
                  fontSize: '11px',
                  padding: '16px 5px',
                  textAlign: 'center'
                }}
              >
                Mã đơn
              </StyledTableCell>
              <StyledTableCell align="left" width={'40%'}>
                Gói
              </StyledTableCell>
              <StyledTableCell align="left">Giá</StyledTableCell>
              <StyledTableCell align="center">Ngày mua</StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{
                  fontSize: '11px',
                  padding: '16px 5px',
                  textAlign: 'center'
                }}
              >
                Trạng thái
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => {
              const {
                pack_list: { description, price },
                id,
                transaction: { status, created_at, id: code },
                uuid
              } = row;
              return (
                <StyledTableRow key={id}>
                  <StyledTableCell align="left">{code}</StyledTableCell>
                  <StyledTableCell align="left">
                    {description} <br /> <b>UID: {uuid.slice(0, 6)}***</b>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatMoney(price) + `VND`}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Typography fontWeight={'bold'}>
                      {format(new Date(created_at), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography>
                      {format(new Date(created_at), 'hh:mm:ss')}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">{status}</StyledTableCell>
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
