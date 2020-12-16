import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start the App

const mount = (el,{onNavigate, initialPath , onSignIn, defaultHistory}) => {

    const history = defaultHistory || createMemoryHistory({
        initialEntries : [initialPath]
    });  // When we get browserHistory we will use it that is in isolation otherwise use memoryHistory

    if(onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App history={history} onSignIn={onSignIn}/>, el);

    return {
        onParentNavigate(location){
            const { pathname } = history.location;
            const nextPathname = location.pathname;
            if(nextPathname !== pathname){
                history.push(nextPathname);
            }
        }
    }
}


// If we are in development and isolation i.e. without container, call mount immediately

if(process.env.NODE_ENV === 'development'){ // When we run this app in isolation

    const devRoot = document.querySelector('#_auth-dev-root');

    const browserHistory = createBrowserHistory();

    if(devRoot){
        mount(devRoot,{ defaultHistory : browserHistory });
    }
}


// else We are running through container and we should export the mount function i.e. in case of microfrontend

export { mount };