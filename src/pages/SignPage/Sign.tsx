import { Text, Flex, Space } from '@mantine/core';
import classes from './Sign.module.css';
import { SignIn } from './features/Signin.tsx';
import { useToggle } from '@mantine/hooks';
import { SignUp } from './features/Signup.tsx';
import EmployeePic from '../../assets/student.png';

export const Sign = () => {
  const [isNewMember, toggleIsNewMember] = useToggle();
  return (
    <Flex
      justify={'start'}
      align={'start'}
      h='100vh'
      p={'7rem'}
      direction={'row'}
      style={{ overflow: 'hidden' }}
    >
      <Flex direction={'column'}>
        <h1 className={classes.title}>
          Welcome To{' '}
          <Text
            component='span'
            variant='gradient'
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            PubPlus
          </Text>{' '}
          <br />
          Team-Availability System!
        </h1>
        <Space h='3rem' />
        {isNewMember ? (
          <SignUp toggleIsNewMember={toggleIsNewMember} />
        ) : (
          <SignIn toggleIsNewMember={toggleIsNewMember} />
        )}
      </Flex>
      <img src={EmployeePic} className={classes.studentImage} />
    </Flex>
  );
};
