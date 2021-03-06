/* @flow */

import {composeWithDevTools} from "redux-devtools-extension"
import {createStore, applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"

import type {Action, Dispatch, State} from "../state/types"
import getUrlSearchParams from "../lib/getUrlSearchParams"
import initBoom from "./initBoom"
import invoke from "../electron/ipc/invoke"
import ipc from "../electron/ipc"
import rootReducer from "../state/rootReducer"

function getInitialState(windowId) {
  return Promise.all([
    invoke(ipc.windows.initialState(windowId)),
    invoke(ipc.globalStore.init()).then(({initialState}) => initialState)
  ]).then(([winState, globalState]) => ({...winState, ...globalState}))
}

export default async () => {
  const windowId = getUrlSearchParams().id
  const initialState = await getInitialState(windowId)
  const boom = initBoom(undefined)

  return createStore<State, Action, Dispatch>(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk.withExtraArgument(boom)))
  )
}
