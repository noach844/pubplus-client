import { Button, Flex, Select, Title } from '@mantine/core';
import { getAllStatuses } from '../../../api/statusAPI';
import { updateUserStatus } from '../../../api/userApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

export const UpdateStatus = () => {
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
    <Flex direction={'column'} justify={'space-around'} align={'center'}>
      <Title order={3}>Update My Current Status:</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          await updateUserStatus(values.status);
          handleRefetch();
        })}
      >
        <Flex direction={'row'} align={'flex-end'} justify={'space-between'}>
          <Select
            disabled={isLoading}
            label='Status:'
            data={data}
            {...form.getInputProps('status')}
          />
          <Button type='submit'>update</Button>
        </Flex>
      </form>
    </Flex>
  );
};
