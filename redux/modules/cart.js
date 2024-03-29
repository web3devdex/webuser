import _ from "lodash";
import Immutable from "seamless-immutable";
import { put, takeLatest, select } from "redux-saga/effects";
import utils from "../../utils"
import api from "../../api"

export const types = {
  INSERT_START: "CART/INSERT_START",
  INSERT_SUCCESS: "CART/INSERT_SUCCESS",
  INSERT_FAIL: "CART/INSERT_FAIL",

  REMOVE_START: "CART/REMOVE_START",
  REMOVE_SUCCESS: "CART/REMOVE_SUCCESS",
  REMOVE_FAIL: "CART/REMOVE_FAIL",

  ORDER_START: "CART/ORDER_START",
  ORDER_SUCCESS: "CART/ORDER_SUCCESS",
  ORDER_FAIL: "CART/ORDER_FAIL",
};

export const actions = {
  insertStart: (payload, meta) => ({
    type: types.INSERT_START,
    payload,
    meta,
  }),
  insertSuccess: (payload, meta) => ({
    type: types.INSERT_SUCCESS,
    payload,
    meta,
  }),
  insertFail: (error, meta) => ({
    type: types.INSERT_FAIL,
    error,
    meta,
  }),

  removeStart: (payload, meta) => ({
    type: types.REMOVE_START,
    payload,
    meta,
  }),
  removeSuccess: (payload, meta) => ({
    type: types.REMOVE_SUCCESS,
    payload,
    meta,
  }),
  removeFail: (error, meta) => ({
    type: types.REMOVE_FAIL,
    error,
    meta,
  }),

  orderStart: (payload, meta) => ({
    type: types.ORDER_START,
    payload,
    meta,
  }),
  orderSuccess: (payload, meta) => ({
    type: types.ORDER_SUCCESS,
    payload,
    meta,
  }),
  orderFail: (error, meta) => ({
    type: types.ORDER_FAIL,
    error,
    meta,
  }),
};

const getProducts = (state) => _.get(state, "cart.productDetails");
const getCart = (state) => _.get(state, "cart");
const getCountProduct = (state) => _.sum(_.map(getProducts(state), "productQuantity"));
const getUserInfoOrderFormData = state => {
  const { receivedDate, userInfoOrder } = getCart(state) || {};
  const { email, fullName, phone, sex, address } = userInfoOrder || {}
  const { addressDetail, addressType, provinceCode, districCode } = address || {}
  const formData = { receivedDate, addressDetail, addressType, provinceCode, districCode, email, fullName, phone, sex }
  return formData;
}

export const selectors = {
  getProducts,
  getCart,
  getCountProduct,
  getUserInfoOrderFormData,
};

export const initState = {};

export default function (state = initState, action) {
  const { payload, meta } = action;
  const { cart } = payload || {};
  if (_.isUndefined(cart) || _.isNull(cart)) return state;
  const { clear } = meta || {};
  if (clear) return Immutable.from(cart);
  return Immutable.merge(state, cart, { deep: true });
}

function* orderSaga() {
  yield takeLatest(types.ORDER_START, function* (
    action
  ) {
    const { payload, meta } = action;
    const { onSuccess } = meta || {}
    try {
      const state = yield select();
      const { cart } = state || {}
      const { productDetails, receivedDate, userInfoOrder } = cart || {}
      const cartBody = { productDetails, receivedDate, userInfoOrder }
      // const response = yield api.validateOrder(cartBody);
      const response = yield api.createOrder(cart);
      yield put(actions.orderSuccess({ cart }));
      onSuccess()
    } catch (error) {
      yield put(actions.orderFail(error));
    }
  });
}

function* insertSaga() {
  yield takeLatest(types.INSERT_START, function* (
    action
  ) {
    const { payload, meta } = action;
    const { product } = payload || {}
    const { onSuccess } = meta || {}
    if (_.isEmpty(product)) {
      yield put(actions.insertSuccess());
      return;
    }
    try {
      const state = yield select();
      const productState = getProducts(state);
      const productDetails = utils.addProduct(product, productState);
      const cart = { productDetails }
      yield put(actions.insertSuccess({ cart }));
      onSuccess();
    } catch (error) {
      yield put(actions.insertFail(error));
    }
  });
}


function* removeSaga() {
  yield takeLatest(types.REMOVE_START, function* (
    action
  ) {
    const { payload, meta } = action;
    const { product } = payload || {}
    const { onSuccess = () => { } } = meta || {}
    const { productId } = product || {}
    try {
      const state = yield select();
      const productState = getProducts(state) || [];
      const productDetails = _.filter(productState, i => i.productId !== productId) || [];
      const cart = { productDetails }
      yield put(actions.removeSuccess({ cart }));
      onSuccess();
    } catch (error) {
      yield put(actions.removeFail(error));
    }
  });
}

export const sagas = [orderSaga, insertSaga, removeSaga];
