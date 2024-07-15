'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';

import { DEFAULT_LOGIN_REDIRECT } from '../../routes';

export default function OAuthLogins() {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full flex-col justify-center space-y-2">
      <Button
        variant="bordered"
        onPress={() => {
          onClick('google');
        }}
      >
        <FcGoogle size={24} />
        <span>Sign in with Google</span>
      </Button>
      <Button
        variant="bordered"
        onPress={() => {
          onClick('github');
        }}
      >
        <FaGithub size={24} />
        <span>Sign in with GitHub</span>
      </Button>
    </div>
  );
}
