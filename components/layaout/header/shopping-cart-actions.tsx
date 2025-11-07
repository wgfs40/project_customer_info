import { ShoppingCart } from "lucide-react";

const ShoppingCartAction = () => {
  return (
    <div className="flex items-center p-2 bg-action-text text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition duration-200 transform hover:scale-105 flex-shrink-0">
      <ShoppingCart className="w-6 h-6" />
    </div>
  );
};

export default ShoppingCartAction;
