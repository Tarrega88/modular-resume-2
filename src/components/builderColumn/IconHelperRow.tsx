type Props = {
  iconName: string;
  children: React.ReactNode;
  description: string;
};

function IconHelperRow({ iconName, children, description }: Props) {
  return (
    <div className="flex flex-col px-1 gap-3 border-b pt-2 pb-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{iconName}</div>
        <div className="text-2xl">{children}</div>
      </div>
      <div>{description}</div>
    </div>
  );
}

export default IconHelperRow;
