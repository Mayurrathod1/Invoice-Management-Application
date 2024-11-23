import { XCircle } from 'lucide-react'
import React from 'react'

type Props = {
    errInfo: string
}

const ErrorState = ( {errInfo}: Props) => {
  return (
    <tr className='w-full'>
    <td colSpan={3} className="px-6 py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-red-500">{errInfo}</h3>
      </div>
    </td>
  </tr>
  )
}

export default ErrorState