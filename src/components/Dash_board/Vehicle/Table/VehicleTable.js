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
import {
  getUsers,
  deleteVehicle,
  getVehicles,
} from '../../../../client/client';
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
    setTotal,
  } = useGetList(getVehicles);
  const { addToast } = useToasts();
  const [loadingdel, setLoadingdel] = useState(false);
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
              // dispatch({ type: SAVE_REPORT_DATA, payload: row });
              // dispatch({ type: SHOW_PDF });
              // history.push('/dashboard/reports/view');
            }}
          />
        </Link>
        <Link>
          {' '}
          <ImPencil
            className='IconStyle'
            onClick={() => {
              dispatch({ type: SAVE_BRANCH_DATA, payload: row });
              dispatch({ type: EDIT_USER });
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
    { label: 'Vehicle Name', show: true, name: 'name' },
    { label: 'TYPE', show: true, name: 'type' },
    { label: 'Plate Number', show: true, name: 'plateno' },
    { label: 'Model', show: true, name: 'model' },
    { label: 'Load Capacity', show: true, name: 'loadcapacity' },
    { label: 'Status', show: true, name: 'status' },
    { label: 'Route Status', show: true, name: 'routestatus' },
    { label: 'Registered At', show: true, name: 'created' },
    { name: 'formatter', label: 'Actions', show: true, formatter: Actions },
  ];

  const classes = useStyles();
  const handleAdduser = () => {
    dispatch({ type: CLEAR_BRANCH_DATA });
    dispatch({ type: ADD_USER });
  };

  async function handledelete(row) {
    const { vehicleid } = row;
    try {
      setLoadingdel(true);
      let response = await deleteVehicle(vehicleid);

      if (response) {
        setLoadingdel(false);
        addToast('deleted successfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        window.location.replace('/dashboard/vehicles');
        return;
      }
      setLoadingdel(false);
      addToast('Wrong Credentials!', { appearance: 'error' });
    } catch (error) {
      setLoadingdel(false);
      addToast('Failed', { appearance: 'error' });
    }
  }

  return (
    <div className='table-wrapper'>
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
              <TableCell></TableCell>
              {columns.map((th) => (
                <TableCell>{th.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
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
