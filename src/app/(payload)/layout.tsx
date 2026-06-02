// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Module has no type declarations
import '@payloadcms/next/css';
import config from '@payload-config';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import type { ServerFunctionClient } from 'payload';
import React from 'react';
import { importMap } from './admin/importMap.js';
import './custom.scss';

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
