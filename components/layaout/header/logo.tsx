import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex items-center space-x-2 flex-shrink-0 cursor-pointer">
      <Image
        src="/images/logo.png"
        alt="Dosis de Marketing"
        width={120}
        height={40}
      />
    </div>
  );
};

export default Logo;
