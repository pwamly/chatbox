import { stringify } from "query-string";
import { store } from "../store";
import instance from "../config/axiosConfig";
import { SAVE_TOKEN } from "../actions";
import { merge, forEach } from "lodash";
import isEmpty from "lodash/isEmpty";
import { singularize, pluralize } from "inflection";
import camelCase from "lodash/camelCase";
import jwtDecode from "jwt-decode";

let access_token;
let tokenPayload;
const logged = localStorage.getItem("islogged");
const token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
// const logged = true;
// const token = 'sjbcskclscms;mamcx;aslm;cma;ma;l';

//..................start..................
// ............. auth functions........

/**
 * @function
 * @name getTokenPayload
 * @description Return decoded token payload
 * @param {string} token jwt token base64 url encoded token
 * @returns {object} Jwt token content
 * @version 0.1.0
 * @since 0.1.0
 */
export const getTokenPayload = (token) => {

    if (isEmpty(tokenPayload)) {
        try {
            tokenPayload = jwtDecode(token);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }

    return tokenPayload;
};

export const fetchAccessToken = async() => {
    try {
        access_token = await instance.post("/refresh_token");
        const { AccessToken } = access_token.data;
        localStorage.setItem("token", AccessToken);
        return access_token;
    } catch (error) {
        console.log(error);
    }
};

export const isLogged = () => {
    if (!logged) {
        console.log("not loged", logged);
        return false;
    }
    if (!token) {
        console.log("no token");
        return false;
    }
    return logged;
    // return true;  ............ uncomment for change only
};

export const login = async(payload) => {
    try {
        const authRes = await instance.post("/login", {...payload });
        
        const { token:accessToken } = authRes;
        if (accessToken) {
          const payload = getTokenPayload(accessToken);
          const { id } = payload;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('islogged', true);
          localStorage.setItem('userId', id);
          return 'success';
        }
    } catch (error) {
        console.log("error in login", error);
    }

    return false;
};

export const registerUser = async(payload) => {
    try {
        const repsonse = await instance.post("auth/register", {...payload });
        console.log("response");
    } catch (error) {
        console.log("error in login", error);
    }

    return false;
};

export const editProfile = async(payload) => {
    try {
        const response = await instance.put("/auth/profile", {...payload });

        if (response) {
            const { successful, success } = response;
            return successful || success;
        }
    } catch (error) {
        return error;
        console.log("error in login", error);
    }

    return false;
};


export const editBranch = async (payload) => {
  try {
    const response = await instance.put(`/admin/edit-user/${payload.userid}`, {
      ...payload,
    });

    if (response) {
      const { successful, success } = response;
      return successful || success;
    }
  } catch (error) {
    return error;
    console.log('error in login', error);
  }

  return false;
};

export const editUser = async (payload) => {
  try {
    const response = await instance.put(`/admin/edit-user/${payload.userid}`, {
      ...payload,
    });

    if (response) {
      const { successful, success } = response;
      return successful || success;
    }
  } catch (error) {
    return error;
    console.log('error in login', error);
  }

  return false;
};

export const logout = async () => {
  localStorage.clear();
  window.location.replace(`/`);
  try {
    const authRes = await instance.post('/auth/logout', {
      token: token,
    });
    const { accessToken } = authRes.data;
    if (authRes.status == '200') {
    }
  } catch (error) {
    console.log('error in login', error);
  }

  return false;
};

export const getCode = async (data) => {
  try {
    const { email } = data;
    const code = await instance.post('/auth/forgot-password', { email });
    return code;
  } catch (error) {
    return {};
  }
};

export const postCode = async (data) => {
  try {
    const { email, usercode, newpass } = data;
    const isSuccessful = await instance.post('/auth/reset-password', {
      email,
      code: usercode,
      newpassword: newpass,
    });
    if (isSuccessful) {
      return { isSuccessful: true };
    }
    return { isSuccessful: false };
  } catch (error) {
    return { isSuccessful: false };
  }
};

//.................................. api endpoints........................

export const getAllReports = async (data) => {
  try {
    if (data) {
      const reports = await instance.get('/api/reports', {
        params: data,
      });
      if (reports) {
        return reports;
      }
    } else {
      const reports = await instance.get('/api/reports');
      if (reports) {
        return reports;
      }
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const getAllhistory = async (data) => {
  try {
    if (data) {
      const reports = await instance.get('/api/reports/history', {
        params: data,
      });
      if (reports) {
        return reports;
      }
    } else {
      const reports = await instance.get('/api/reports/history');
      if (reports) {
        return reports;
      }
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const getUsers = async () => {
  try {
    const users = await instance.get('/api/users');
    if (users) {
      return users;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};

// ............................. new services  2022 ...........................

export const getBranches = async () => {
  try {
    const branches = await instance.get('/admin/branches');
    if (branches) {
      return branches;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const postVehicleInfo = async (data) => {
  try {
    const response = await instance.post('/api/actions/registervehicle', {
      ...data,
    });
    if (response) {
      return response;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const deleteReport = async (id) => {
  try {
    const response = await instance.delete(`/api/reports/deletevehicle/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};
export const deletehistory = async (id) => {
  try {
    const response = await instance.delete(`/api/reports/deletehistory/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const EditReport = async (data) => {
  try {
    const { id } = data;
    const isSuccessful = await instance.put(`/api/actions/editvehicle/${id}`, {
      ...data,
    });
    if (isSuccessful) {
      return { isSuccessful: true };
    }
    return { isSuccessful: false };
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await instance.delete(`/admin/delete-user/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};

export const addUser = async (data) => {
  try {
    const response = await instance.post('/admin/create-user', {
      ...data,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};
//..................end..................

export const addBranch = async (data) => {
  try {
    const response = await instance.post('/admin/create-branch', {
      ...data,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    return { isSuccessful: false };
  }
};



// ............. auth functions..........

/**
 * @function prepareParams
 * @name prepareParams
 * @description convert api query params as per API filtering specifications
 * @param {object} params api call query params
 * @returns {object} http params to be sent to server
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 */
export const prepareParams = (params) => {
    const normalizedParams = {};
    const { sort, page, pageSize, ...otherParams } = params || {};

    if (sort) {
        forEach(params.sort, (value, key) => {
            normalizedParams.sortBy = key;
            normalizedParams.sortOrder = value;
        });
    }

    if (page) {
        normalizedParams.page = params.page;
    }

    if (pageSize) {
        normalizedParams.pageSize = params.pageSize;
    }

    if (otherParams) {
        forEach(otherParams, (value, key) => {
            normalizedParams[key] = value;
        });
    }

    return normalizedParams;
};

/**
 * @function get
 * @name get
 * @description issue http get request to specified url.
 * @param {string} url valid http path.
 * @param {object} [params] params that will be encoded into url query params.
 * @returns {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 */
export const get = (url, params) => {
    const options = prepareParams(params);
    return instance.get(url, { params: options });
};

/**
 * @function post
 * @name post
 * @description issue http post request to specified url.
 * @param {string} url valid http path.
 * @param {object} data request payload to be encoded on http request body
 * @returns {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { post } from './client';
 *
 * const postUser = post('/users', { age: 14 });
 * postUser.then(user => { ... }).catch(error => { ... });
 */
export const post = (url, data) => {
    if (isEmpty(data)) {
        return Promise.reject(new Error("Missing Payload"));
    }

    return instance.post(url, data);
};

/**
 * @function put
 * @name put
 * @description issue http put request to specified url.
 * @param {string} url valid http path.
 * @param {object} data request payload to be encoded on http request body
 * @returns {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 */
export const put = (url, data) => {
    if (isEmpty(data)) {
        return Promise.reject(new Error("Missing Payload"));
    }

    return instance.put(url, data);
};

/**
 * @function patch
 * @name patch
 * @description issue http patch request to specified url.
 * @param {string} url valid http path.
 * @param {object} data request payload to be encoded on http request body
 * @returns {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 */
export const patch = (url, data) => {
    if (isEmpty(data)) {
        return Promise.reject(new Error("Missing Payload"));
    }

    return instance.patch(url, data);
};

/**
 * @function del
 * @name del
 * @description issue http delete request to specified url.
 * @param {string} url valid http path.
 * @returns {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 */
export const del = (url) => {
    return instance.delete(url);
};

/**
 * @function
 * @name normalizeResource
 * @description Normalize resource by adding singular and plural
 * names to it
 * @param {string} resource valid api resource name
 * @returns {object} Object contains singular and plural names for resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const normalizeResource = (resource) => {
    const singular = singularize(resource.name);
    const plural = pluralize(resource.name);

    return { singular, plural };
};

/**
 * @function
 * @name variableNameFor
 * @description Generate camel cased variable name based on provided strings
 * @param  {...string} names array of names to be used in variable name
 * @returns {string} camel cased name
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const variableNameFor = (...names) => camelCase([...names]);

/**
 * @function
 * @name createGetListHttpAction
 * @param {string} resource Api resource name
 * @returns {object} http actions to interact with a resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const createGetListHttpAction = (resource) => {
    const { plural } = normalizeResource(resource);

    const methodName = variableNameFor("get", plural);

    return {
        [methodName]: (params) => {
            const endpoint = `/${plural}`;

            return get(endpoint, params);
        },
    };
};

/**
 * @function
 * @name createGetSingleHttpAction
 * @param {string} resource Api resource name
 * @returns {object} http actions to interact with a resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const createGetSingleHttpAction = (resource) => {
    const { singular, plural } = normalizeResource(resource);

    const methodName = variableNameFor("get", singular);

    return {
        [methodName]: (id) => {
            const endpoint = `/api/${singular}/${id}`;

            return get(endpoint);
        },
    };
};

/**
 * @function
 * @name createPostHttpAction
 * @param {string} resource Api resource name
 * @returns {object} http actions to interact with a resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const createPostHttpAction = (resource) => {
    const { singular, plural } = normalizeResource(resource);

    const methodName = variableNameFor("post", singular);

    return {
        [methodName]: (payload) => {
            const endpoint = `/${plural}`;

            return post(endpoint, payload);
        },
    };
};

/**
 * @function
 * @name createPutHttpAction
 * @param {string} resource Api resource name
 * @returns {object} http actions to interact with a resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const createPutHttpAction = (resource) => {
    const { singular, plural } = normalizeResource(resource);

    const methodName = variableNameFor("put", singular);

    return {
        [methodName]: (payload) => {
            const endpoint = `/${plural}/${payload.id}`;

            return put(endpoint, payload);
        },
    };
};

/**
 * @function
 * @name createPatchHttpAction
 * @param {string} resource Api resource name
 * @returns {object} http actions to interact with a resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const createPatchHttpAction = (resource) => {
    const { singular, plural } = normalizeResource(resource);

    const methodName = variableNameFor("patch", singular);

    return {
        [methodName]: (payload) => {
            const endpoint = `/${plural}/${payload.id}`;

            return patch(endpoint, payload);
        },
    };
};

/**
 * @function
 * @name createDeleteHttpAction
 * @param {string} resource Api resource name
 * @returns {object} http actions to interact with a resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const createDeleteHttpAction = (resource) => {
    const { singular, plural } = normalizeResource(resource);

    const methodName = variableNameFor("delete", singular);

    return {
        [methodName]: (id) => {
            const endpoint = `/${plural}/${id}`;

            return del(endpoint);
        },
    };
};

/**
 * @function createHttpActionsFor
 * @name createHttpActionsFor
 * @description generate http actions to interact with resource
 * @param {string} resource valid http resource
 * @returns {object} http actions to interact with a resource
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { createHttpActionsFor } from './client';
 *
 * const { deleteUser } = createHttpActionsFor('user');
 * deleteUser('5c176624').then(user => { ... }).catch(error => { ... });
 */
export const createHttpActionsFor = (resource) => {
    const getResources = createGetListHttpAction(resource);
    const getResource = createGetSingleHttpAction(resource);
    const postResource = createPostHttpAction(resource);
    const putResource = createPutHttpAction(resource);
    const patchResource = createPatchHttpAction(resource);
    const deleteResource = createDeleteHttpAction(resource);

    return {
        ...getResources,
        ...getResource,
        ...postResource,
        ...putResource,
        ...patchResource,
        ...deleteResource,
    };
};

/**
 * @function
 * @name getUserId
 * @description retrieve userId from local storage 
 *
 * @returns {string |undefined} user id
 * @since 0.1.0
 * @version 0.1.0
 */
export const getUserId = () => {
    if (!userId) {
         const payload = getTokenPayload(token);
         const { id } = payload;
        console.log('if is not available on local',userId)
        localStorage.setItem("userId", id);
       return {'userId':id}  
    }
    return userId;
};