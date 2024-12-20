import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

const WorkspaceAvatar = ({ image, name, className }: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div className={cn("size-10 relative rounded-md overflow-hidden")}>
        <Image src={image} alt={name} width={48} height={48} className={"object-cover"} />
      </div>
    );
  }
  return (
    <Avatar className={cn("rounded-md size-10 ", className)}>
      <AvatarFallback className="text-white bg-blue-600 rounded-md font-semibold text-lg uppercase">
        {name?.charAt(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
