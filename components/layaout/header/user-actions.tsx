"use client";
import { Bell } from "lucide-react";
import { useState } from "react";
import DropDownUser from "./drop-down-user";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";

const UserActions = ({ userSession }: { userSession: Session | null }) => {
  const [notificationCount, setNotificationCount] = useState(3);

  // Simulación de marcar todas las notificaciones como leídas
  const handleClearNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Notificaciones */}
      <div className="relative">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={`${notificationCount} notificaciones`}
          onClick={handleClearNotifications}
        >
          <Bell className="w-5 h-5 text-accent-text" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
      {userSession ? (
        <>
          {/* Perfil de usuario */}
          <DropDownUser userSession={userSession} />
        </>
      ) : (
        <>
          <Link href="/auth/login" className="text-accent-text hover:underline">
            Iniciar sesión
          </Link>
        </>
      )}
    </div>
  );
};

export default UserActions;
