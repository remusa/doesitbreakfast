/*
    Source: https://upmostly.com/tutorials/build-a-react-switch-toggle-component
*/

import React from 'react'
import styled from 'styled-components'

const ToggleWrapper = styled.span`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  /* width: 50px; */

  .icon {
    padding-top: 28px;
  }

  .react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  .react-switch-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 50px;
    height: 25px;
    background: grey;
    border-radius: 100px;
    position: relative;
    transition: background-color 0.2s;
  }

  .react-switch-label .react-switch-button {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 23px;
    height: 23px;
    border-radius: 45px;
    transition: 0.3s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  }

  .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  .react-switch-label:active .react-switch-button {
    width: 60px;
  }
`

interface Props {
  isOn: boolean
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
  onColor?: string
  offColor?: string
}

const Toggle: React.FC<Props> = ({
  isOn,
  handleToggle,
  onColor = '#00d1b2',
  offColor = '#f14668',
}) => {
  const backgroundColor = isOn ? onColor : offColor

  return (
    <ToggleWrapper>
      <div className='icon'>☀️</div>
      <div>
        <input
          checked={isOn}
          // defaultChecked={false}
          onChange={handleToggle}
          className='react-switch-checkbox'
          id='react-switch-new'
          type='checkbox'
        />

        <label
          style={{ background: backgroundColor }}
          className='react-switch-label'
          htmlFor='react-switch-new'
        >
          <span className='react-switch-button' />
        </label>
      </div>
      <div className='icon'>🌙</div>
    </ToggleWrapper>
  )
}

export default Toggle
