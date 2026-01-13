import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <div className="w-10 h-10 bg-logo rounded-full flex items-center justify-center  font-bold text-xl">
        M
      </div>
      <span className="text-logo-secondary text-2xl font-bold tracking-tight">
        Dosis de <span className="text-logo">Marketing</span>
      </span>
      {/* <Image
        src="/images/logo.png"
        alt="Dosis de Marketing"
        width={120}
        height={40}
      /> */}
    </div>
  );
};

export default Logo;
