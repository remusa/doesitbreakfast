import styled from '@emotion/styled'
import React from 'react'

const ErrorMessageStyles = styled.p`
  color: red;
  font-weight: bold;
`

interface Props {
  message: string
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <ErrorMessageStyles>{message}</ErrorMessageStyles>
}

export default ErrorMessage
