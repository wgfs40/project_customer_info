"use client";

import { signOutUser } from "@/actions/service-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

const DropDownUser = ({ userSession }: { userSession: Session | null }) => {
  const { replace } = useRouter();
  const handleCloseSession = async () => {
    // Logic to close user session
    signOutUser().then(() => {
      replace("/");
    });
  };
  const handleAdmin = () => {
    replace("/admin");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-1 p-1 rounded-full bg-transparent hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{userSession?.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAdmin}>Administrator</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCloseSession}>
          Log out
          <LogOut className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownUser;
