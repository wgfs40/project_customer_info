const FormError = ({ error }: { error?: string[] }) => {
  if (!error || error.length === 0) return null;
  return error.map((errMsg, index) => (
    <p key={index} className="text-red-500 text-sm mt-1 py-2 italic">
      {errMsg}
    </p>
  ));
};

export default FormError;
