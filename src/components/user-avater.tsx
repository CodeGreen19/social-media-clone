import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvater({ src }: { src?: string }) {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
