import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const Test: FC = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => console.log(params.get('page')), [params]);

  return (
    <div>
      <button onClick={() => setParams({ page: '2' })}>Click me</button>
    </div>
  );
};
