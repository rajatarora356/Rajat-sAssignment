import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './AuthProvider.android';

const Providers = () => {
    return(
    <AuthProvider>
        <Routes />
        </AuthProvider>
    );
}

export default Providers;