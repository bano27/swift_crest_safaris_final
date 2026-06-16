interface SkeletonProps { height?: string; width?: string; className?: string }

export function Skeleton({ height = '20px', width = '100%', className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={{ height, width }}></div>
}

export function CardSkeleton() {
  return (
    <div className="scs-card p-0">
      <Skeleton height="200px" />
      <div className="p-3">
        <Skeleton height="18px" className="mb-2" width="60%" />
        <Skeleton height="14px" className="mb-1" />
        <Skeleton height="14px" className="mb-1" width="80%" />
        <Skeleton height="14px" width="50%" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="d-flex gap-3 mb-2">
          <Skeleton height="14px" width="20%" />
          <Skeleton height="14px" width="30%" />
          <Skeleton height="14px" width="25%" />
          <Skeleton height="14px" width="15%" />
        </div>
      ))}
    </div>
  )
}
