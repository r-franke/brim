/* @flow */

import React from "react"
import classNames from "classnames"

import X from "./icons/x-md.svg"

type Props = {
  light?: boolean
}

const CloseButton = ({light, ...rest}: Props) => (
  <button {...rest} className={classNames("close-button", {light})}>
    <X />
  </button>
)

export default CloseButton
