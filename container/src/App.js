import React,{ lazy, Suspense, useState } from 'react';
import Header from './Components/Header';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from './Components/Progress';

const MarketingAppLazy = lazy(() => import('./Components/marketingApp'));
const AuthAppLazy = lazy(() => import('./Components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix : 'co'
})

export default () => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthAppLazy onSignIn={() => setIsSignedIn(true)}/>
                            </Route>
                            <Route path="/" component={MarketingAppLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}