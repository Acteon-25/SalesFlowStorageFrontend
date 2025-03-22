import { Link, useRouteError } from 'react-router';

export const ErrorContainer = () => {
  const error = useRouteError();
  console.log(error)

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="bg-sky-500 rounded-full px-4 py-1 items-center text-center">
          <Link to="/" className="text-white text-lg">Volver al inicio</Link>
        </div>
      </div>
    </>
  );
};