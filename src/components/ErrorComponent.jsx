import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <div className='h-[620px]'>
    <Alert
      status="error"
      left={"50%"}
      margin={'10'}
      transform={"translateX(-50%)"}
      w={"container.lg"}
    >
      <AlertIcon />
      {message}
    </Alert>
    </div>
  )
}

export default ErrorComponent