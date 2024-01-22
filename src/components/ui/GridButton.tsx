import Link from "next/link";
import { Card } from "./card";

type GridButtonProps = {
  href: string;
  title: string;
  icon: React.ReactElement;
  invert?: boolean;
};

const GridButton = ({ href, title, icon, invert = false }: GridButtonProps) => {
  return (
    <Card
      className={`col-span-1 row-span-1 flex items-center justify-center ${
        invert
          ? "bg-secondary text-secondary-foreground "
          : "bg-primary hover:border-secondary text-primary-foreground "
      } relative group overflow-hidden hover:cursor-pointer h-full min-h-[70px]`}
    >
      <Link
        href={href}
        className="w-full h-full flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold relative z-10 transition-transform flex items-center">
          <span>{title}</span>
        </h2>
        <div className="absolute right-1 top-0 h-full text-muted-foreground opacity-50 group-hover:scale-125 transition-transform">
          {icon}
        </div>
      </Link>
    </Card>
  );
};

export default GridButton;
