
"use client";

export function Button({
children,
onClick,
type,
className,
key,
disabled,
}) {
return ( <button
    key={key}
   type={type}
   onClick={onClick}
   disabled={disabled}
   className={className}
 >
{children} </button>
);
}
