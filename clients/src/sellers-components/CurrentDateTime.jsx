import React from 'react'

export const CurrentDateTime = () => {
    const date = new Date();
  const formattedDate = date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  return (
    <div>{formattedDate}</div>
  )
}
