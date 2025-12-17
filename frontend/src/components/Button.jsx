import React from 'react';

export default function Button({ children, variant='default', ...props }){
  const cls = `btn ${variant==='gold'?'gold':''}`;
  return <button className={cls} {...props}>{children}</button>;
}