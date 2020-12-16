import { mount } from 'auth/AuthApp';
import React,{ useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory(); // History used in our container, so this is the copy of browser history object

    useEffect(() => {
        const {onParentNavigate} = mount(ref.current,{
            initialPath : history.location.pathname,
            onNavigate : (location) => {  // Using this listener for synchronization
                // Important, see location -> for state management can use listeners
                const nextPathname = location.pathname;
                const { pathname } = history.location;
                if(pathname !== nextPathname){ // In case of infinite loop
                    history.push(nextPathname);
                }
            },
            onSignIn
        });

        history.listen(onParentNavigate);
    },[])

    return  <div ref={ref}></div>
}