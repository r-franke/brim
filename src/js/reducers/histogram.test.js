/* @flow */

import {createHistogramData} from "../charts/createHistogramData"
import {getHistogramData} from "./histogram"
import * as a from "../actions/histogram"
import initTestStore from "../test/initTestStore"

let store
beforeEach(() => {
  store = initTestStore()
})

test("receive data", () => {
  const data = {
    tuples: [["1"], ["2"]],
    descriptor: [{type: "integer", name: "count"}]
  }
  const state = store.dispatchAll([a.histogramSearchResult(data)])

  expect(getHistogramData(state)).toEqual(data)
})

test("receive data twice", () => {
  const data = {
    tuples: [["1"], ["2"]],
    descriptor: [{type: "integer", name: "count"}]
  }
  const state = store.dispatchAll([
    a.histogramSearchResult(data),
    a.histogramSearchResult(data)
  ])

  expect(getHistogramData(state)).toEqual({
    tuples: [["1"], ["2"]],
    descriptor: [{type: "integer", name: "count"}]
  })
})

test("#createHistogramData", () => {
  const timeWindow = [
    new Date("2017-09-18T03:29:23.074Z"),
    new Date("2018-05-18T14:47:15.016Z")
  ]
  const data = {
    descriptor: [
      {name: "_path", type: "string"},
      {name: "count", type: "count"}
    ],
    tuples: [["1510185600000000000", "conn", "37179"]]
  }
  const result = createHistogramData(data, timeWindow)
  const sum = result.data.reduce((sum, d) => (sum += d.count), 0)
  expect(sum).toBe(37179)
  expect(result.keys).toEqual(["conn"])
})

test("clearing the count by time data", () => {
  const data = {
    tuples: [["1"], ["2"]],
    descriptor: [{type: "integer", name: "count"}]
  }
  const state = store.dispatchAll([
    a.histogramSearchResult(data),
    a.clearHistogram()
  ])

  expect(getHistogramData(state)).toEqual({tuples: [], descriptor: []})
})