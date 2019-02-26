import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import { middlewares } from '../store';

/**
 * Create a testing store with imported reducers, middleware, and initial state
 * @param {object} initialState - Initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store 
 */
export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddleware(rootReducer, initialState);
}

/**
 * Returns ShallowWrapper containing node(s) with given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within 
 * @param {string} val - Value of data-test attribute for search 
 * @returns {ShallowRenderer}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}
/** Checks if prop types are valid for the component
 * @param  {} component
 * @param  {} conformingProps
 */
export const checkProps = (component, conformingProps) => {
  const propErrors = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );

  expect(propErrors).toBeUndefined();
}