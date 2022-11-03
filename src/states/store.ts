import reducers from "./reducer";
import Flex from "@twilio/flex-ui";
import { createStore, applyMiddleware, compose } from 'redux';

const middleware = applyMiddleware();

const typeWindow = window as unknown as { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose };

const composeEnhancers = typeWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(middleware, Flex.applyFlexMiddleware()));