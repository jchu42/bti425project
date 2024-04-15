

import { useState, useEffect } from "react";
import { useRouter } from 'next/router'; 

// https://webprogrammingforappsandservices.sdds.ca/Authentication-In-Next/UI-considerations#creating-a-route-guard-component

const PUBLIC_PATHS = ['/', '/login', '/register', '/contactus'];


export default function RouteGuard(props) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      console.log(`trying to request a secure path: ${path}`);

      fetch('/api/authenticated', {
        method: 'POST',
        headers: {authorization: localStorage.getItem('token')},
      }).then(res=>{
        if (res.ok){
          setAuthorized(true);
        }
        else{
          setAuthorized(false);
          router.push('/login');
        }
      })
    }
    else
      setAuthorized(true);
  }

  return <>{authorized && props.children}</>
}