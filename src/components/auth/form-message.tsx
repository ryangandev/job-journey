import { PiWarning, PiCheckCircle } from 'react-icons/pi';

export default function FormMessage({
  type,
  message,
}: {
  type: 'error' | 'success';
  message?: string;
}) {
  if (!message) return null;
  return (
    <>
      {type === 'error' ? (
        <FormError message={message} />
      ) : (
        <FormSuccess message={message} />
      )}
    </>
  );
}

const FormError = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center space-x-2 rounded-lg bg-red-500/15 px-3 py-1 text-sm font-medium text-red-500">
      <PiWarning size={18} />
      <span>{message}</span>
    </div>
  );
};

const FormSuccess = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center space-x-2 rounded-lg bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-500">
      <PiCheckCircle size={18} />
      <span>{message}</span>
    </div>
  );
};
