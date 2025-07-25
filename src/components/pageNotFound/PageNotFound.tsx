import { FC } from 'react';
import { Link } from 'react-router';

const PageNotFound: FC = () => {
  return (
    <div className="m-20 p-6 border-2 border-gray-300 rounded-lg flex flex-col text-center">
      <Link
        to="/"
        className="mb-4 flex items-center justify-end gap-2 hover:underline"
      >
        <img className="size-6" src="/src/assets/house.svg" alt="home icon" />
        Go back to home page
      </Link>
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default PageNotFound;
