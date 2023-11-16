import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '../../api/userApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Center, Flex, Loader, Paper, Title } from '@mantine/core';
import { UpdateStatus } from './features/UpdateStatus';
import { UsersTable } from './features/UsersTable';
import { IconLogout2 } from '@tabler/icons-react';
import { useAuth } from '../../hooks/useAtuh';

export const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserDetails,
  });

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <>
      <Flex h='100vh' justify={'center'} align={'center'}>
        <Paper
          radius='md'
          withBorder
          bg='var(--mantine-color-body)'
          w='80%'
          h='85%'
        >
          <ActionIcon
            pos='absolute'
            m='lg'
            size={'xl'}
            variant='subtle'
            radius={'xl'}
            onClick={logout}
          >
            <IconLogout2 size={'20px'} stroke={2} />
          </ActionIcon>
          <Center>
            <Title mt='lg'>MyWorkStatus</Title>
          </Center>
          <Flex
            align={'flex-start'}
            p='xl'
            direction={'row'}
            justify={'space-around'}
            h='100%'
          >
            <div>
              {isLoading ? (
                <Loader />
              ) : (
                <Flex direction={'column'} h='12rem'>
                  <Title order={3}>
                    Hello {data?.fullname}, you are {data?.status_name}.
                  </Title>
                  <UpdateStatus />
                </Flex>
              )}
            </div>
            <UsersTable />
          </Flex>
        </Paper>
      </Flex>
    </>
  );
};
