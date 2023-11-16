import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowRight } from '@tabler/icons-react';
import { useAuth } from '../../../hooks/useAtuh';
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

export const SignIn = ({
  toggleIsNewMember,
}: {
  toggleIsNewMember: (
    value?: React.SetStateAction<boolean> | undefined
  ) => void;
}) => {
  const { login } = useAuth();
  const [isLoading, toggleIsLoading] = useToggle();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <>
      <h1>Sign In</h1>
      <form
        onSubmit={form.onSubmit(async ({ username, password }) => {
          toggleIsLoading();
          try {
            await login(username, password);
            notifications.show({
              title: 'Welcome Back!',
              message: 'navigating to home page!',
            });
            navigate('/');
          } catch (err) {
            notifications.show({
              title: 'Error log in!',
              message: 'Please check your credentials or try again later',
              color: 'red',
            });
          } finally {
            toggleIsLoading();
          }
        })}
        style={{ width: '50%' }}
      >
        <Flex
          direction={'column'}
          justify={'space-between'}
          h='15rem'
          align={'end'}
        >
          <TextInput
            w={'100%'}
            required
            label='Username:'
            placeholder='Your Username here...'
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue('username', event.currentTarget.value)
            }
            disabled={isLoading}
          />
          <PasswordInput
            w='100%'
            required
            label='Password:'
            placeholder='Your Password here...'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            disabled={isLoading}
          />
          <a>
            Not a member yet?{' '}
            <a
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => toggleIsNewMember}
            >
              click here
            </a>
          </a>
          <Button
            type='submit'
            w='25%'
            gradient={{ from: 'blue', to: 'cyan' }}
            variant='gradient'
            rightSection={<IconArrowRight size={14} />}
            loading={isLoading}
          >
            Sign In
          </Button>
        </Flex>
      </form>
    </>
  );
};
