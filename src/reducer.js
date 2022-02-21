import {
  ACTIVATE_USER,
  ADD_USER,
  EDIT_USER,
  DEACTIVATE_USER,
  REMOVE_USER,
  EXIT_ADD_FORM,
  EXIT_EDIT_USER,
  EXIT_EDIT_REGION,
  ADD_USER_FORM,
  CLEAR_PROFILE_DATA,
  CLEAR_BRANCH_DATA,
  VIEW_USER,
  EXIT_VEW_USER,
  SAVE_UPDATES,
  SAVE_TOKEN,
  SAVE_INITIAL_DATA,
  SAVE_REPORT_DATA,
  SAVE_FORM_DATA,
  SAVE_PROFILE_DATA,
  CLEAR_REPORT_DATA,
  SHOW_HISTORY_TABLE,
  EDIT_BUNDLE_DATA,
  SHOW_PDF,
  DASH_BPARD,
  SAVE_BRANCH_DATA,
} from './actions';
// import { removeUser, registerUser } from "./client/";
let removeUser, registerUser;

function reducer(state, action) {
  /*forms*/
  if (action.type === EXIT_ADD_FORM) {
    return { ...state, adduser: false };
  }
  if (action.type === ADD_USER_FORM) {
    return { ...state, adduser: true };
  }

  /*user data*/
  if (action.type === ADD_USER) {
    return { ...state, adduser: true, saveedit: 'add', saveeditbtn: 'ADD' };
  }

  if (action.type === EDIT_USER) {
    return { ...state, adduser: true, saveedit: 'edit', saveeditbtn: 'EDIT' };
  }

  if (action.type === REMOVE_USER) {
    // return {...state, data: removeUser(action.payload), viewuser: false };
  }

  if (action.type === VIEW_USER) {
    if (action.payload) {
      const { modalShown } = action.payload;
      return {
        ...state,
        showProfile: modalShown,
      };
    }
    return { ...state };
  }
  if (action.type === SAVE_INITIAL_DATA) {
    if (action.payload) {
      return {
        ...state,
        profile: { ...action.payload },
      };
    }
    return { ...state };
  }

  if (action.type === EXIT_VEW_USER) {
    return {
      ...state,
      showProfile: false,
    };
  }

  if (action.type === EXIT_EDIT_USER) {
    return { ...state, edituser: false };
  }
  if (action.type === SAVE_UPDATES) {
    let { data } = state;
    const { payload } = action;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === payload.id) {
        data[i] = payload;
        if (payload.role === 'admin') {
          state.profile = payload;
        }
      }
    }

    return {
      ...state,
      edituser: false,
      data,
      viewdata: null,
      adduserbtn: true,
    };
  }

  //................. AUTH

  if (action.type === SAVE_TOKEN) {
    if (action.payload) {
      const { access_token } = action.payload;
      console.log('token from login', access_token);
      return { ...state, token: access_token };
    }
  }

  //......... form data

  if (action.type === SAVE_FORM_DATA) {
    if (action.payload) {
      const { email } = action.payload;
      console.log('token from login', email);
      return { ...state, formdata: { email } };
    }
  }
  if (action.type === CLEAR_REPORT_DATA) {
    return { ...state, reportdata: {} };
  }
  if (action.type === SAVE_REPORT_DATA) {
    if (action.payload) {
      return { ...state, reportdata: { ...action.payload } };
    }
  }

  if (action.type === EDIT_BUNDLE_DATA) {
    if (action.payload) {
      return {
        ...state,
        saveedit: 'edit',
        reportdata: { ...action.payload, saveedit: 'edit' },
      };
    }
  }

  if (action.type === EXIT_EDIT_REGION) {
    if (action.payload) {
      return {
        ...state,
        saveedit: 'edit',
        reportdata: { ...action.payload, saveedit: 'edit' },
      };
    }
  }

  if (action.type === SAVE_PROFILE_DATA) {
    if (action.payload) {
      return { ...state, teamdata: { ...action.payload } };
    }
  }

  if (action.type === CLEAR_PROFILE_DATA) {
    return { ...state, teamdata: {} };
  }
  if (action.type === SHOW_PDF) {
    return { ...state, pdf: !state.pdf };
  }
  if (action.type === SHOW_HISTORY_TABLE) {
    return { ...state, historytable: !state.historytable };
  }

  //...........................2021.......... actions...............

  if (action.type == DASH_BPARD) {
    const { dashboard } = action.payload;
    return { ...state, showdash: dashboard };
  }

  if (action.type === SAVE_BRANCH_DATA) {
    if (action.payload) {
      return { ...state, branchdata: { ...action.payload } };
    }
  }
  if (action.type === CLEAR_BRANCH_DATA) {
    return { ...state, branchdata: {} };
  }
  return state;
}

export default reducer;