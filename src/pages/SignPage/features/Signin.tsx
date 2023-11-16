import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { loginAPI } from '../../../api/authAPI';
import { useAuth } from '../../../hooks/useAtuh';
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

export const SignIn = () => {
  const { login } = useAuth();
  const [isLoading, toggleIsLoading] = useToggle();

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
            placeholder='Your User Name here...'
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
            placeholder='Your User Name here...'
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
              //onClick={toggleIsMember}
            >
              click here
            </a>
          </a>
          <Button
            type='submit'
            w='25%'
            gradient={{ from: 'blue', to: 'cyan' }}
            variant='gradient'
            loading={isLoading}
          >
            Sign In
          </Button>
        </Flex>
      </form>
    </>
  );
};
