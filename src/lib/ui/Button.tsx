'use client';
import { useRef } from 'react';
import { useButton } from 'react-aria';
import { cva, VariantProps } from 'class-variance-authority'
import { BorderDecal } from './BorderDecal';

const buttonStyles = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg"
    },
  },
  defaultVariants: {
    size: 'md'
  }
})

type ButtonProps = 
& { children: React.ReactNode } 
& React.JSX.IntrinsicElements['button']
& VariantProps<typeof buttonStyles>

export function Button({
  children,
  className,
  onFocus,
  onBlur,
  size,
  ...rest
}: ButtonProps) {
  const ref = useRef<React.ElementRef<'button'>>(null)
  const { buttonProps } = useButton(rest, ref)

  const classes = buttonStyles({size, className});

  return (
    <button 
      {...buttonProps} 
      ref={ref}  
      onFocus={onFocus} 
      onBlur={onBlur} 
      className={classes}
    >
      {children}
    </button>
  )
}