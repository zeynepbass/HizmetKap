
"use client";

export function Button({
children,
onClick,
type,
className,

disabled,
}) {
return (



  <button

   type={type}
   onClick={onClick}
   disabled={disabled}
   className={className}
 > 
{children} </button>
);
}
