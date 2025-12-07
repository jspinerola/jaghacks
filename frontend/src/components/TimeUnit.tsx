import React from 'react'

interface TimeUnitProps {
  number: number;
  label: string;
}

function TimeUnit({ number, label }: TimeUnitProps) {
  return (
    <div className='flex flex-col gap-2 md:min-w-[100px] min-w-[75px]'>
      <div className="text-4xl md:text-6xl poppins-bold font-bold">{number}</div>
      <div className="text-md text-muted-foreground">{label}</div>
    </div>
  )
}

export default TimeUnit