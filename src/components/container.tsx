interface childrenComponentsProps {
  children: React.ReactNode;
  size: string;
  display?: string;
  flexWrap?: string;
  itemsCenter?: string;
  justifyContent?: string;
}

export default function Container({
  children,
  size,
  display,
  flexWrap = "",
  itemsCenter = "",
  justifyContent = "",
}: childrenComponentsProps) {
  return (
    <div
      className={`container max-w-screen-${size} mx-auto mt-8 ${display} ${flexWrap} ${itemsCenter} ${justifyContent}`}
    >
      {children}
    </div>
  );
}
