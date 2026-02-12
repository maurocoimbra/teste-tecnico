type ErrorAlertProps = {
  message: string;
};

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-md text-sm">
      {message}
    </div>
  );
}
