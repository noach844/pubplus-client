import { Button, Flex, Select, Title } from '@mantine/core';
import { getAllStatuses } from '../../../api/statusAPI';
import { updateUserStatus } from '../../../api/userApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useToggle } from '@mantine/hooks';

export const UpdateStatus = () => {
  const [loading, toggleLoading] = useToggle();
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['user-details'] });
  };

  const { isLoading, data } = useQuery({
    queryKey: ['status-list'],
    queryFn: getAllStatuses,
  });

  const form = useForm({
    initialValues: {
      status: '1',
    },
  });

  return (
    <Flex
      direction={'column'}
      justify={'space-evenly'}
      align={'flex-start'}
      h={'100%'}
    >
      <Title order={3}>Update My Current Status:</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            toggleLoading();
            notifications.show({
              id: '1',
              title: 'Updating your status',
              message: 'This my take some seconds...',
              loading: loading,
            });
            await updateUserStatus(values.status);
            handleRefetch();
            toggleLoading();
            notifications.update({
              id: '1',
              title: 'Updated status!',
              message: 'Have fun',
              loading: loading,
              color: 'green',
            });
          } catch (err) {
            notifications.update({
              id: '1',
              title: 'Error updating',
              message: 'Error while trying to update',
              loading: loading,
              color: 'red',
            });
          }
        })}
      >
        <Flex direction={'row'} align={'flex-end'} justify={'space-between'}>
          <Select
            disabled={isLoading}
            label='Status:'
            data={data}
            {...form.getInputProps('status')}
            mr='lg'
          />
          <Button type='submit' loading={loading}>
            update
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
