import { Text, Flex, Space } from '@mantine/core';
import classes from './Sign.module.css';
import { SignIn } from './features/SignIn';
//import StudentPic from '../../assets/student.png';

export const Sign = () => {
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
        <SignIn />
      </Flex>
      {/* <img src={StudentPic} className={classes.studentImage} /> */}
    </Flex>
  );
};
