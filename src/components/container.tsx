interface childrenComponentsProps {
  children: React.ReactNode;
  size: string;
}

export default function Container({ children, size }: childrenComponentsProps) {
  return (
    <div className={`container max-w-screen-${size} mx-auto mt-8`}>
      {children}
    </div>
  );
}
