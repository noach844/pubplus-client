import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '../../api/authAPI';

export const Home = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserDetails,
  });
  return <div>{JSON.stringify(data)}</div>;
};
