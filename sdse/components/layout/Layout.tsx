import * as React from 'react';
import Link from 'next/link';
import Navegation from '../Navegation';

export interface LayoutProps {
    
}
 
const Layout: React.FunctionComponent<LayoutProps> = (props: any) => {
    return ( 
        <React.Fragment>
            <Navegation />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}
 
export default Layout;
