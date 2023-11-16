import {
  ComboboxItem,
  Flex,
  Loader,
  MultiSelect,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllUsersStatuses } from '../../../api/userApi'; // Adjust the import based on your actual API file
import {} from '../../../api/userApi';
import { getAllStatuses } from '../../../api/statusAPI';
interface User {
  fullname: string;
  status_id: number;
  status_name: string;
  // Add other properties as needed
}

export const UsersTable: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const { isLoading, data } = useQuery<User[], Error>({
    queryKey: ['user-list'],
    queryFn: getAllUsersStatuses,
  });

  const { isLoading: isStatusLoading, data: statusList } = useQuery<
    ComboboxItem[],
    Error
  >({
    queryKey: ['status-list'],
    queryFn: getAllStatuses,
  });

  return (
    <Flex direction={'column'} w='50%' align={'center'}>
      <Title order={2} mb='lg'>
        Other Users
      </Title>
      {isLoading || isStatusLoading ? (
        <Loader />
      ) : (
        <>
          <Flex w='100%' justify={'space-between'}>
            <TextInput
              label='Search:'
              value={nameFilter}
              size='xs'
              w='45%'
              onChange={(e) => setNameFilter(e.currentTarget.value)}
              disabled={isLoading}
            />
            <MultiSelect
              size='xs'
              w='45%'
              disabled={isStatusLoading}
              label='Status:'
              data={statusList || []}
              onChange={setStatusFilter}
              value={statusFilter}
            />
          </Flex>

          <Table mt='lg' w='100%' striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th align='center'>Name</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data &&
                data
                  .filter(
                    (row) =>
                      row.fullname.includes(nameFilter) &&
                      (statusFilter.includes(row.status_id.toString()) ||
                        !statusFilter.length)
                  )
                  .map((row) => (
                    <Table.Tr key={row.status_id}>
                      <Table.Td>{row.fullname}</Table.Td>
                      <Table.Td>{row.status_name}</Table.Td>
                    </Table.Tr>
                  ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    </Flex>
  );
};
