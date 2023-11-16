import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowRight } from '@tabler/icons-react';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

export const SignUp = ({
  toggleIsNewMember,
}: {
  toggleIsNewMember: (
    value?: React.SetStateAction<boolean> | undefined
  ) => void;
}) => {
  const { register } = useAuth();
  const [isLoading, toggleIsLoading] = useToggle();
  const form = useForm({
    initialValues: {
      username: '',
      fullname: '',
      password: '',
    },
  });

  return (
    <>
      <h1>Sign Up</h1>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            toggleIsLoading();
            await register(values);
            notifications.show({
              title: 'Welcome to Our System',
              message: 'Navigating to sign in',
            });
            toggleIsNewMember();
          } catch (err) {
            notifications.show({
              title: 'Error in sign up',
              message: 'Please try again later',
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
          h='24rem'
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
          <TextInput
            w={'100%'}
            required
            label='Full Name:'
            placeholder='Your Full Name here...'
            value={form.values.fullname}
            onChange={(event) =>
              form.setFieldValue('fullname', event.currentTarget.value)
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
          <span>
            Not a member yet?{' '}
            <a
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => toggleIsNewMember()}
            >
              click here
            </a>
          </span>

          <Button
            style={{ alignSelf: 'flex-end' }}
            type='submit'
            w='30%'
            rightSection={<IconArrowRight size={14} />}
            gradient={{ from: 'blue', to: 'cyan' }}
            variant='gradient'
            loading={isLoading}
          >
            Sign Up
          </Button>
        </Flex>
      </form>
    </>
  );
};
