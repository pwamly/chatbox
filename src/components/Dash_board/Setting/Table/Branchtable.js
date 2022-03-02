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
  deleteRegion,
  getOrders,
  getRegions,
} from '../../../../client/client';
import {
  ADD_USER,
  EDIT_USER,
  CLEAR_PROFILE_DATA,
  EXIT_EDIT_REGION,
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

function BasicTable({ adduser, dispatch, reportdata }) {
  const {
    results: rows,
    loading,
    currentPage,
    pages,
    havePreviousPage,
    haveNextPage,
    setCurrentPage,
    total,
    refresh,
    setTotal,
  } = useGetList(getRegions);

  console.log();
  const { addToast } = useToasts();
  const [loadingdel, setLoadingdel] = useState(false);

  const [page, setPage] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const { region } = reportdata;
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
          <FaEye className='IconStyle' onClick={() => {}} />
        </Link>
        <Link>
          <ImPencil
            className='IconStyle'
            onClick={() => {
              console.log('', row);
              dispatch({ type: EXIT_EDIT_REGION, payload: row });
              history.push('/dashboard/settings/add-regions');
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
    { label: 'Region Name', show: true, name: 'region' },
    { name: 'formatter', label: 'Actions', show: true, formatter: Actions },
  ];

  const handleRegion = () => {
    window.location.replace('/dashboard/settings/add-regions');
  };

  async function handledelete(row) {
    const { regionId } = row;
    try {
      setLoadingdel(true);
      let response = await deleteRegion(regionId);

      if (response) {
        setLoadingdel(false);
        addToast('deleted successfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        window.location.replace('/dashboard/settings');
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
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <TableContainer
        component={Paper}
        style={{
          border: 'none',
          width: '80%',
        }}>
        <Table>
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
                  textDecoration: 'none !important',
                }}>
                <AddIcon className='plus' onClick={handleRegion} />
                <Pagination.First onClick={() => setPage(1)} disabled={true} />
                <Pagination.Prev
                  onClick={() => {
                    setPage(page - 1);
                    setPageNo(pageNo - 10);
                  }}
                  disabled={page > 1 ? false : true}
                />
                <Pagination.Next
                  onClick={() => {
                    setPage(page + 1);
                    setPageNo(pageNo + 10);
                  }}
                  disabled={pages > page ? false : true}
                />
                <Pagination.Last
                  onClick={() => setPage(pages)}
                  disabled={pages > page ? false : true}
                />
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