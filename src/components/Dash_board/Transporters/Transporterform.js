import React, { useRef, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useToasts } from 'react-toast-notifications';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { ADD_USER, EXIT_ADD_FORM } from '../../../actions';
import { addUser, registerTransporter, editUser } from '../../../client/client';
import { Divider } from '@mui/material';
import axios from 'axios';

// ...................... for select ..............................

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel as inputlabels } from '@mui/material/InputLabel';
import MenuItems from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Selects from '@mui/material/Select';

// .................... for select end.........................

//  import Textdate from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';

import { Upladfile } from '../../../client/client';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300
        }
    }
};

function getStyles(name, customerData, theme) {
    return {
        fontWeight:
            customerData.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
}
// ................. end for select

function Regteam({
    adduser,
    teamdata,
    dispatch,
    branchdata,
    saveedit,
    saveeditbtn,
    reportdata
}) {
    const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };
    const [usrbranch, setCng] = useState('');
    const [usrrole, setRole] = useState('');
    const [open, setOpen] = useState(false);
    const [Newwinners, setNewWinners] = useState([]);

    const formref = useRef();
    // ........................... for select ..................

    const theme = useTheme();

    const { addToast } = useToasts();
    const [loading, setLoading] = useState(false);

    // ........... to be passed to form values ..........

    const winnersf = useRef('');

    // ......................... to be passed to the form default...........

    const { winners } = reportdata;

    const {} = branchdata;

    const handleRundle = async () => {
        let response = await axios.get(
            `http://196.41.38.46:9898/api/process_ruffle?winners=${winnersf.current.value}`
        );
        if (response) {
            setNewWinners(response.data.message);
            return;
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };
    let formData = new FormData();
    const handleChangeUpload = async (e) => {
        formData.append('file', document.getElementById('filenew').files[0]);

        let response = await axios.post(
            'http://192.168.100.8:9898/api/process_file',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        if (response) {
            console.log('server response', response);
            return;
        }
        console.log('file not sent');
    };

    //................................... for date time ............

    return (
        <Card
            variant="outlined "
            style={{
                fontFamily: 'sans-serif',
                minWidth: '300px',
                borderRadius: '16px',
                padding: '40px',
                width: '80%',
                height: 'auto',
                borderRadius: '16px',
                transition: '0.3s',
                margin: '20px'
            }}
        >
            <FormLabel>KIBUNDA </FormLabel>
            <Divider
                fullWidth
                style={{
                    background: 'gray',
                    marginTop: '10px',
                    marginBottom: '30px',
                    height: '30px'
                }}
            />
            <div
                style={{
                    marginTop: '20px',
                    width: '100%',
                    gap: '5%'
                }}
            ></div>
            <div
                style={{
                    marginTop: '20px',
                    width: '100%',
                    gap: '5%'
                }}
            ></div>
            <div
                style={{
                    marginTop: '20px',
                    width: '100%',
                    gap: '5%'
                }}
            ></div>
            <div
                style={{
                    marginTop: '20px',
                    width: '100%',
                    gap: '5%'
                }}
            ></div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="file" name="fileuploaded" id="filenew" />
                <button
                    variant="contained"
                    className="btn-havor"
                    style={{
                        marginTop: '20px',
                        width: '200px',
                        background: 'gray',
                        color: 'white',
                        height: '30px',
                        borderRadius: '6px'
                    }}
                    onClick={handleChangeUpload}
                >
                    Upload file
                </button>
            </form>

            {/* <Button variant="contained" component="label">
                Upload File
                <input inputRef={tinf} type="file" hidden />
            </Button> */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '70px'
                }}
            ></div>
            <Divider
                fullWidth
                style={{
                    background: 'gray',
                    marginTop: '50px',
                    marginBottom: '30px',
                    height: '30px'
                }}
            />
            <Card
                variant="outlined "
                style={{
                    fontFamily: 'sans-serif',
                    minWidth: '300px',
                    borderRadius: '16px',
                    padding: '40px',
                    width: '80%',
                    height: 'auto',
                    borderRadius: '16px',
                    transition: '0.3s',
                    margin: '20px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20%'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="Number of Winners"
                            margin="normal"
                            inputRef={winnersf}
                            variant="outlined"
                            autoComplete="off"
                            maxWidth="300px"
                            defaultValue={winners}
                            ref={formref}
                        />
                        <button
                            onClick={handleRundle}
                            variant="contained"
                            className="btn-havor"
                            style={{
                                marginTop: '20px',
                                width: '150px',
                                background: 'gray',
                                color: 'white',
                                height: '30px',
                                borderRadius: '6px'
                            }}
                        >
                            Run Ruffle
                        </button>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '400px'
                        }}
                    >
                        <span style={{ marginBottom: '20px' }}>Winners:</span>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            {Newwinners.map((row) => (
                                <span>{row}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </Card>
    );
}
const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Regteam);
