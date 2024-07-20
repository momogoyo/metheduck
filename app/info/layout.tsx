type infoProps = {
  children: React.ReactNode
}

export default function layout({
  children
}: infoProps) {
  return (
    <div className="container py-6">
      {children}
    </div>
  )
}
