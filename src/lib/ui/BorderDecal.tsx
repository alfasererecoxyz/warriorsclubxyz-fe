import { cx } from "class-variance-authority"

type BorderDecalProps = {
  children?: React.ReactNode,
  tl?: boolean,
  tr?: boolean,
  bl?: boolean,
  br?: boolean,
  className?: string
}

export function BorderDecal({
  children,
  tr, tl, bl, br,
  className
}: BorderDecalProps) {
  return (
    <div className="p-2 relative">
      {children}
      {
        br && (
          <>
            <div className={cx('absolute border-r border-b right-0.5 bottom-0.5 w-2/3 h-2/3', className)}/>
            <div className={cx('absolute border-r border-b right-0 bottom-0 w-1/2 h-1/2', className)}/>
          </>
        )
      }

      {
        bl && (
          <>
            <div className={cx('absolute border-l border-b left-0.5 bottom-0.5 w-2/3 h-2/3', className)}/>
            <div className={cx('absolute border-l border-b left-0 bottom-0 w-1/2 h-1/2', className)}/>
          </>
        )
      }

      {
        tl && (
          <>
            <div className={cx('absolute border-l border-t left-0.5 top-0.5 w-2/3 h-2/3', className)}/>
            <div className={cx('absolute border-l border-t left-0 top-0 w-1/2 h-1/2', className)}/>
          </>
        )
      }

      {
        tr && (
          <>
            <div className={cx('absolute border-r border-t right-0.5 top-0.5 w-2/3 h-2/3', className)}/>
            <div className={cx('absolute border-r border-t right-0 top-0 w-1/2 h-1/2', className)}/>
          </>
        )
      }
    </div>
  )
}