/* @flow */

import React from "react"

import Log from "../models/Log"

type TableProps = {
  log: Log,
  only?: string[]
}

const FieldsTable = ({log, only}: TableProps) => {
  const rows = []
  const {tuple, descriptor} = log

  if (only) {
    only.forEach(name => {
      const field = log.getField(name)
      if (field) {
        const {value, type} = field
        rows.push(
          <FieldsTableRow key={name} name={name} value={value} type={type} />
        )
      }
    })
  } else {
    for (let index = 0; index < tuple.length; index++) {
      const value = tuple[index]
      const {name, type} = descriptor[index]
      if (name === "_td") continue
      rows.push(
        <FieldsTableRow key={name} name={name} value={value} type={type} />
      )
    }
  }

  return (
    <table className="fields-table">
      <tbody>{rows}</tbody>
    </table>
  )
}

type RowProps = {
  name: string,
  type: string,
  value: string
}

export const FieldsTableRow = ({value, type, name}: RowProps) => (
  <tr>
    <th>{name}</th>
    <td className={type}>{value}</td>
  </tr>
)

export default FieldsTable
