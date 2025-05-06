import { useEffect, useRef } from "react";

export default function useOutsideClick( handler, listenCaputre = true){
  const ref = useRef();
      useEffect(
        function () {
          function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
              handler();
            }
          }
    
          document.addEventListener('click', handleClick, listenCaputre);
    
          return () => document.removeEventListener('click', handleClick, listenCaputre);
        },
        [handler,listenCaputre],
      );

      return ref
}