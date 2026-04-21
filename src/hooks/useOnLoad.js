import React, { useEffect, useState } from "react";

function useOnLoad(delay = 0) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, [delay]);
    return () => clearTimeout(timer);
  });

  return show;
}

export default useOnLoad;
