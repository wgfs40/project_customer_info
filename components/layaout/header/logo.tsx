const Logo = ({ size = 32 }) => {
  // Colores del degradado
  const ORANGE_COLOR = "#FF7E5F";
  const TEAL_COLOR = "#4FD1C5";

  return (
    <div className="flex items-center space-x-2 flex-shrink-0 cursor-pointer">      
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Usamos currentColor para heredar el color del texto si es posible, pero forzamos el degradado */}
          <path
            d="M12 2C7.58172 2 4 5.58172 4 10V14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14V10C20 5.58172 16.4183 2 12 2Z"
            fill="url(#paint0_linear_1)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="4"
            y="10"
            width="16"
            height="4"
            rx="2"
            fill="url(#paint1_linear_1)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 4V20"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1"
              x1="12"
              y1="2"
              x2="12"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.5" stopColor={ORANGE_COLOR} />
              <stop offset="0.5" stopColor={TEAL_COLOR} />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1"
              x1="4"
              y1="10"
              x2="20"
              y2="14"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={TEAL_COLOR} />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-xl font-bold text-blue-600">
          Dosis de Marketing
        </span>
    </div>
  );
};

export default Logo;
