import Loader from '@/components/Loader';

export default function TestLoader() {
  const isLoading = true;

  return (
    <div>
      {isLoading ? <Loader /> : <p>Data loaded!</p>}
    </div>
  );
}
