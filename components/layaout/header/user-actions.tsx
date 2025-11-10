"use client";

import Link from "next/link";
import { User, Bell } from "lucide-react";
import { useState } from "react";

const UserActions = () => {
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

      {/* Perfil de usuario */}
      <Link
        href="/perfil"
        className="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <User className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-accent-text hidden sm:inline-block">
          Mi Perfil
        </span>
      </Link>
    </div>
  );
};

export default UserActions;
