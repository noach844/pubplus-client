import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '../../api/userApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Flex, Paper, Title } from '@mantine/core';
import { UpdateStatus } from './features/UpdateStatus';
import { UsersTable } from './features/UsersTable';

export const Home = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserDetails,
  });

  useEffect(() => {
    isError && navigate('/login');
  }, [isError]);

  return (
    <>
      <Flex justify='center' align={'center'} h='100vh'>
        <Paper
          radius='md'
          withBorder
          bg='var(--mantine-color-body)'
          w='90%'
          h='85%'
        >
          <Flex align={'center'} p='lg' direction={'column'} h='100%'>
            <Title>MyWorkStatus</Title>
            <Title order={3}>
              Hello {data?.fullname}, you are {data?.status_name},
            </Title>
            <UpdateStatus />
            <Divider w='50%' />
            <UsersTable />
          </Flex>
        </Paper>
      </Flex>
    </>
  );
};
