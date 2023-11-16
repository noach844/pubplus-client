import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { loginAPI } from '../../../api/authAPI';

export const SignIn = () => {
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
        onSubmit={form.onSubmit(async (values) => {
          loginAPI(values);
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
          >
            Sign In
          </Button>
        </Flex>
      </form>
    </>
  );
};
