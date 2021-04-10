import restApi from '../modules/rest-api'

export const login = (code) => async (dispatch, getState) => {
  try {
    const user = getState().user.toJS()
    const res = await restApi('token', { code, ...user })
    dispatch(setUserOption('token', res.token))
    dispatch(setUserOption('mediaEndpoint', res.mediaEndpoint))
    return true
  } catch (err) {
    console.error('Error finalizing login', err)
    return false
  }
}

export const getAuthUrl = (domain) => async (dispatch, getState) => {
  try {
    const user = getState().user.toJS()
    let { state } = user
    if (!state) {
      state = new Date().getTime()
      dispatch(setUserOption('state', state))
    }
    dispatch(setUserOption('me', domain))
    const res = await restApi('authurl', { me: domain, state })
    if (res.tokenEndpoint) {
      dispatch(setUserOption('tokenEndpoint', res.tokenEndpoint))
    }
    if (res.micropubEndpoint) {
      dispatch(setUserOption('micropubEndpoint', res.micropubEndpoint))
    }
    if (res.url) {
      window.location.href = res.url
    } else {
      throw new Error('No auth url returned')
    }
    return true
  } catch (err) {
    console.error('Error getting auth url', err)
    return false
  }
}

export const setUserOption = (property, value) => {
  if (value === false) {
    localStorage.removeItem(property)
  } else {
    localStorage.setItem(property, value)
  }
  return {
    type: 'SET_USER_OPTION',
    property: property,
    value: value,
  }
}
