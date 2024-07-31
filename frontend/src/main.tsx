import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter as Router} from 'react-router-dom';
import './assets/index.scss';
import {AuthProvider} from './context/AuthContext.tsx';
import {HelmetProvider} from "react-helmet-async";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import '../src/config/i18n';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <HelmetProvider>
                        <App/>
                    </HelmetProvider>
                </AuthProvider>
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
);
