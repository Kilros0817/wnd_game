import FontFaceObserver from 'fontfaceobserver';
import { useLayoutEffect, useState } from 'react';

const PressStart = new FontFaceObserver('Press Start 2P', {});

const timeout = 5000; // miliseconds

export function useFontObserver() {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    Promise.all([PressStart.load(null, timeout)])
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // even if font fail to load, we still need to allow render
        setLoaded(true);
      });
  }, []);

  return loaded;
}
