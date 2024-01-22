interface childrenComponentsProps {
  children: React.ReactNode;
}

export default function Container({ children }: childrenComponentsProps) {
  return <div className="container mx-auto mt-8">{children}</div>;
}
