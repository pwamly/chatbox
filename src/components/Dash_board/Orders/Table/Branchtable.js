import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  useRef,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FaEye, FaRegEye, FaTrash, FaPrint } from 'react-icons/fa';

// for search ......................
import { Breakpoint, BreakpointProvider } from 'react-socks';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { ImPencil } from 'react-icons/im';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useToasts } from 'react-toast-notifications';
import Paper from '@material-ui/core/Paper';
import Pagination from 'react-bootstrap/Pagination';
import { useGet, useGetList } from '../../../../hooks/index';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { getUsers, deleteOrder, getOrders } from '../../../../client/client';
import {
  ADD_USER,
  EDIT_USER,
  CLEAR_PROFILE_DATA,
  SAVE_REPORT_DATA,
  SAVE_BRANCH_DATA,
  CLEAR_BRANCH_DATA,
} from '../../../../actions';
import './tableteam.css';
import { ROW_SELECT_SINGLE } from 'react-bootstrap-table-next';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function BasicTable({ adduser, dispatch }) {
  const {
    results: rows,
    loading,
    refresh,
    currentPage,
    pages,
    havePreviousPage,
    haveNextPage,
    setCurrentPage,
    total,
    setTotal,sortBy,
    searchBy,
    filterBy,
  } = useGetList(getOrders);

  const { addToast } = useToasts();
  const [loadingdel, setLoadingdel] = useState(false);

// ........... for search ..................................

const [paramsSearch, setSearch] = useState("");
const [paramsStatus, setExpire] = useState("");
const [paramsDate, setDateparam] = useState("");
const [opendate, setOpendate] = useState(false);
const [openstatus, setOpenstatus] = useState(false);
const [openpdf, setOpenspdf] = useState(false);
const [status, setStatus] = useState('');

const Actions = useCallback(
  (row) => (
    <div
      style={{
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        paddingRight: '40px',
      }}>
      <Link to='#'>
        {' '}
        <FaEye
          className='IconStyle'
          onClick={() => {
            dispatch({ type: SAVE_REPORT_DATA, payload: row });
            history.push('orders/view');
          }}
        />
      </Link>
      <Link>
        {' '}
        <ImPencil
          className='IconStyle'
          onClick={() => {
            console.log('', row);
            // dispatch({ type: SAVE_BRANCH_DATA, payload: row });
            // history.push('/dashboard/orders/create-user');
          }}
        />
      </Link>

      <FaTrash
        id='trash'
        className='IconStyle'
        onClick={() => {
          handledelete(row);
        }}
      />
    </div>
  ),
  []
);
let history = useHistory();
const columns = [
  // { label: 'Order Id', show: true, name: 'orderid' },
  { label: 'Customer Name', show: true, name: 'customername' },
  { label: 'Tracking No', show: true, name: 'trackingNo' },
  { label: 'Consigner Name', show: true, name: 'consignername' },
  { label: 'Destination ', show: true, name: 'dregion' },
  { label: 'Pick up Time', show: true, name: 'pickuptime' },
  { label: 'Expected Delivery Time', show: true, name: 'expdlrtime' },
  { label: 'Status', show: true, name: 'orderStatus' },
  { name: 'formatter', label: 'Actions', show: true, formatter: Actions },
];

const classes = useStyles();
const handleAdduser = () => {
  dispatch({ type: CLEAR_BRANCH_DATA });
  history.push('/dashboard/orders/create-order');
};

async function handledelete(row) {
  const { orderid } = row;
  try {
    setLoadingdel(true);
    let response = await deleteOrder(orderid);

    if (response) {
      setLoadingdel(false);
      addToast('deleted successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      window.location.replace('/dashboard/orders');
      return;
    }
    setLoadingdel(false);
    addToast('Wrong Credentials!', { appearance: 'error' });
  } catch (error) {
    setLoadingdel(false);
    addToast('Failed', { appearance: 'error' });
  }
}

// for search......................................................

const handleClosedate = () => {
  setOpendate(false);
};

const handleOpendate = () => {
  setOpendate(true);
};
//..
const handleChangestatus = (event) => {
  setStatus(event.target.value);
};

const handleClosestatus = () => {
  setOpenstatus(false);
};

const handleOpenstatus = () => {
  setOpenstatus(true);
};

return (
  <div className='table-wrapper'>
    <Breakpoint small down>
      <div
        style={{
          height: 'fit-content',
          marginBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}>
        <TextField
          id='search '
          style={{
            height: '10px !important',
            margin: 'auto',
            variant: 'contained',
            width: '300px',
          }}
          label='Search by eg Tracking Id '
          margin='normal'
          onChange={(e) => {
            setLoadingdel(true);
            searchBy(e.target.value);
          }}
          variant='outlined'
          autoComplete='off'
          width='sm'
        />{' '}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
            gap: '5px',
            border: '1px solid grey',
            width: '300px',
            height: '50px',
          }}>
          {' '}
          <InputLabel style={{ padding: '15px' }} id='label'>
            Filter By Date
          </InputLabel>
          <Select
            labelId='label'
            id='selectdate'
            open={opendate}
            onClose={handleClosedate}
            onOpen={handleOpendate}
            onChange={(e) => setDateparam({ day: e.target.value })}>
            <MenuItem value='day'>Today</MenuItem>
            <MenuItem value='week'>This week</MenuItem>
            <MenuItem value='month'>This month</MenuItem>
          </Select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            border: '1px solid grey',
            width: '300px',
            height: '50px',
            margin: 'auto',
            gap: '30px',
          }}>
          {' '}
          <InputLabel style={{ padding: '15px' }} id='label'>
            Filter By Order Status
          </InputLabel>
          <Select
            labelId='label'
            id='selectstatus'
            open={openstatus}
            onClose={handleClosestatus}
            onOpen={handleOpenstatus}
            onChange={(e) => setExpire({ status: e.target.value })}>
            <MenuItem value='Delivered'>Delivered</MenuItem>
            <MenuItem value='Dispatched'>Dispatched</MenuItem>
            <MenuItem value='Picked'>Picked</MenuItem>
            <MenuItem value='Unloaded'>Unloaded</MenuItem>
          </Select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 'fit-content',
            margin: 'auto',
            gap: '20px',
            height: '50px',
          }}></div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
            width: 'fit-content',
            gap: '20px',
          }}></div>
      </div>
    </Breakpoint>
    <Breakpoint medium up>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // background: 'yellow',
        }}>
        <div
          style={{
            height: '50px',
            marginBottom: '30px',
            width: '70%',
            // background: 'blue',
            display: 'flex',
            flexDirection: 'row',
            gap: '30px',
          }}>
          <TextField
            id='search'
            style={{ height: '10px !important', marginLeft: '20px' }}
            label='Search by eg Tracking Id '
            margin='normal'
            onChange={(e) => {
              setLoadingdel(true);
              searchBy(e.target.value);
            }}
            variant='outlined'
            autoComplete='off'
            width='sm'
          />{' '}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '35px',
              gap: '20px',
            }}>
            {' '}
            <InputLabel
              InputProps={{ style: { fontSize: 240 } }}
              style={{ paddingTop: '3px' }}
              id='label'>
              Filter By Date
            </InputLabel>
            <Select
              labelId='label'
              id='selectdate'
              fontSize='370px'
              open={opendate}
              onClose={handleClosedate}
              onOpen={handleOpendate}
              onChange={(e) => sortBy({ day: e.target.value })}>
              <MenuItem value='day'>Today</MenuItem>
              <MenuItem value='week'>This week</MenuItem>
              <MenuItem value='month'>This month</MenuItem>
            </Select>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '35px',
              gap: '20px',
            }}>
            {' '}
            <InputLabel style={{ paddingTop: '3px' }} id='label'>
              Filter By Order Status
            </InputLabel>
            <Select
              labelId='label'
              id='selectstatus'
              open={openstatus}
              onClose={handleClosestatus}
              onOpen={handleOpenstatus}
              onChange={(e) => setExpire({ status: e.target.value })}>
              <MenuItem value='Delivered'>Delivered</MenuItem>
              <MenuItem value='Dispatched'>Dispatched</MenuItem>
              <MenuItem value='Picked'>Picked</MenuItem>
              <MenuItem value='Unloaded'>Unloaded</MenuItem>
            </Select>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '35px',
              gap: '20px',
            }}></div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '35px',
              gap: '20px',
            }}></div>
        </div>
        <div
          style={{
            // background: 'red',
            width: '30%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '30px',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '35px',
              gap: '20px',
              paddingRight: '40px',
            }}>
            {' '}
            <InputLabel style={{ paddingTop: '3px' }} id='label'>
              <span className='pdfbtn'>Export File</span>
            </InputLabel>
            <Select
              labelId='label'
              id='selectstatus'
              open={openpdf}
              onClose={handleClosestatus}
              onOpen={handleOpenstatus}
              onChange={(e) => setExpire({ status: e.target.value })}>
              <MenuItem value='Delivered'>PDF</MenuItem>
              <MenuItem value='Dispatched'>CSV</MenuItem>
            </Select>
            <span></span>
          </div>
        </div>
      </div>
    </Breakpoint>
    <TableContainer
      component={Paper}
      style={{
        border: 'none',
      }}>
      <Table
        className={classes.table}
        aria-label='simple table'
        style={{
          border: 'none',
          padding: 'auto',
        }}>
        <TableHead style={{ background: 'rgb(241, 239, 239)' }}>
          <TableRow>
            {columns.map((th) => (
              <TableCell>{th.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, index) => (
              <TableRow key={row.id}>
                {columns.map((column) => {
                  if (column.show == false) {
                    return null;
                  }

                  if (column.name == 'formatter') {
                    return <TableCell>{column.formatter(row)}</TableCell>;
                  }
                  return (
                    <TableCell
                      style={{
                        border: 'none !important',
                        fontSize: 'small',
                      }}>
                      {row[column.name] || 'N/A'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
        <caption style={{ background: 'rgb(241, 239, 239)' }}>
          <div style={{ float: 'right', marginRight: '50px' }}>
            <Pagination
              style={{
                display: 'flex',
                flexDirection: 'row',
                // textDecoration: 'none !important',
              }}>
              <AddIcon className='plus' onClick={handleAdduser} />
              <Pagination.First
                disabled={!havePreviousPage}
                onClick={() => setCurrentPage(1)}
              />

              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!havePreviousPage}
              />
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!haveNextPage}
              />
              <Pagination.Last
                onClick={() => setCurrentPage(pages)}
                disabled={pages > currentPage ? false : true}
              />

              <span>
                Page: {currentPage} out of {pages}
              </span>
            </Pagination>
          </div>
        </caption>
      </Table>
    </TableContainer>
  </div>
);
}
const MapStateToprops = (store) => {
  return { ...store };
};
export default connect(MapStateToprops)(BasicTable);
