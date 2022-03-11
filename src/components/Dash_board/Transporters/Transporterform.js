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
    saveeditbtn
}) {
    const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };
    const [usrbranch, setCng] = useState('');
    const [usrrole, setRole] = useState('');
    const [open, setOpen] = useState(false);
    const [uploadfile, setUploadfile] = useState('');

    // ........................... for select ..................

    const theme = useTheme();

    const { addToast } = useToasts();
    const [loading, setLoading] = useState(false);

    // ........... to be passed to form values ..........

    const tinf = useRef('');

    // ......................... to be passed to the form default...........

    const {} = branchdata;
    const handleChange = (event) => {
        setCng(event.target.value);
    };

    const handleRundle = async () => {
        let response = await axios.get(
            'http://192.168.1.62:9898/api/process_ruffle'
        );
        if (response) {
            console.log('server response', response);
            return;
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };
    let formData = new FormData();
    const handleChangeUpload = async (e) => {
        formData.append('newfile', document.getElementById('filenew').files[0]);
        var newfile = formData.get('newfile');
        console.log('', newfile);

        let response = await Upladfile(formData);
        axios.post('upload_file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response) {
            console.log('server response', response);
            return;
        }
        console.log('file not sent');
    };

    function selcust(data, selector) {
        console.log('fff', data, selector);
        let newdata = data.reduce((acc, item) => {
            if (item.customerId === selector) {
                acc.push(item);
            }
            return acc;
        }, []);
        return newdata[0];
    }

    function selcons(data, selector) {
        let newdata = data.reduce((acc, item) => {
            if (item.consignerid === selector) {
                acc.push(item);
            }
            return acc;
        }, []);
        return newdata[0];
    }

    async function handlesave() {
        try {
            if (saveedit == 'add') {
                setLoading(true);
                // formref.current.reset();
                let response = await registerTransporter({});

                if (response) {
                    console.log(response);
                    setLoading(false);
                    addToast(' User Added successfully', {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    window.location.replace(`/dashboard/transporters`);
                    return;
                }
                setLoading(false);
                addToast('Updated!', { appearance: 'warning' });
                return;
            }
            if (saveedit == 'edit') {
                setLoading(true);
                // formref.current.reset();
                let response = await editUser({});

                if (response) {
                    console.log(response);
                    setLoading(false);
                    addToast(' User Updated successfully', {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    window.location.replace(`/dashboard/transporters`);
                    return;
                }
                setLoading(false);
                addToast('Updated!', { appearance: 'warning' });
                return;
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            addToast('Failed', { appearance: 'error' });
        }
    }

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
                <div>
                    <button
                        onClick={handleRundle}
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
                    >
                        Run Ruffle
                    </button>
                </div>
            </Card>
        </Card>
    );
}
const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Regteam);
