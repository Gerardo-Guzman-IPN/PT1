import * as React from 'react';
import Link from 'next/link';
import Navegation from '../Navegation';
import Head from 'next/head';

export interface LayoutProps {
    
}
 
const Layout: React.FunctionComponent<LayoutProps> = (props: any) => {
    return ( 
        <React.Fragment>
            <Head>
                {/* METADATA VA AQUÍ */}
                <title>SDSE UPIITA</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet" />
                {/* font-family: 'Roboto', sans-serif; */}
            </Head>

            <Navegation />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}
 
export default Layout;
