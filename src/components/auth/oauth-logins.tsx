'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export default function OAuthLogins() {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <Button
        size="auth"
        variant="outline"
        onClick={() => {
          onClick('google');
        }}
      >
        <FcGoogle className="mr-2" size={18} />
        Continue with Google
      </Button>
      <Button
        size="auth"
        variant="outline"
        onClick={() => {
          onClick('github');
        }}
      >
        <FaGithub size={18} className="mr-2" />
        Continue with GitHub
      </Button>
    </>
  );
}
