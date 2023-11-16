import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
interface IProps {
  children: JSX.Element;
}
import { Notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

export const AppProviders = ({ children }: IProps) => {
  return (
    <MantineProvider defaultColorScheme='dark'>
      <QueryClientProvider client={queryClient}>
        <Notifications position='top-right' />
        {children}
      </QueryClientProvider>
    </MantineProvider>
  );
};
