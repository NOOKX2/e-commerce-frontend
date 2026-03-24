import React from 'react'

interface StripeInputProps {
  children: React.ReactNode;
}

function StripeInput({children}: StripeInputProps) {

    return (
        <div className='border rounded-md py-2'>
            {children}
        </div>
    )
}

export default StripeInput
