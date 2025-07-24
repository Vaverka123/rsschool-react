import { FC } from 'react';

interface FallbackProps {
  text: string;
}

const Fallback: FC<FallbackProps> = ({ text }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center justify-center p-8 text-center text-white bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
};

export default Fallback;
