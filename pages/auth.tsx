import Input from '@/components/Input';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    console.log('toggleVariant');
    setVariant(currentVariant => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/profiles'
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
      console.error(error);
    };
  }, [email, name, password, login]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')]
    bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16
           py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (<Input
                label="Username"
                onChange={(ev: any) => setName(ev.target.value)}
                id="name"
                value={name}
              />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                type="email"
                id="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                type="password"
                id="password"
                value={password}
              />
            </div>
            <button className="
            bg-red-600
            py-3
            text-white
            rounded-md
            w-full
            mt-10
            hover:bg-red-700
            transition
            "
              onClick={variant === 'login' ? login : register}
            >{variant === 'login' ? 'Log in' : 'Sign up'}</button>
            <div className="flex flex-row gap-4 mt-8 justify-center items-center">
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-80 transition'>
                <FcGoogle />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-80 transition'>
                <FaGithub />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;