import BoomClient from "../"

let boom
beforeEach(() => {
  boom = new BoomClient({
    host: "boom.com",
    port: "123",
    searchSpan: [new Date(0), new Date(10)]
  })
})

test("#inspectSearch", () => {
  const info = boom.inspectSearch("* | count()", {enableCache: false})

  expect(info).toEqual({
    method: "POST",
    url: "http://boom.com:123/search?rewrite=f",
    body: {
      search: {op: "BooleanLiteral", value: true},
      proc: {op: "ReducerProc", reducers: [{op: "Count", var: "count"}]},
      space: "default",
      dir: -1,
      span: {ts: "0.000000", dur: "0.01"}
    }
  })
})