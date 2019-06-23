import React, { useRef, useEffect, useState } from "react";

export default (Component, style = {}, tag = "span") => props => {
  const container = useRef(null);
  const component = useRef(null);
  const [mounted, setMount] = useState(false);

  useEffect(() => {
    const eventRe = /on([A-Z]{1,}[a-zA-Z]*)/;

    component.current = new Component({ target: container.current, props });

    for (const key in props) {
      const match = key.match(eventRe);

      if (match && typeof props[key] === "function") {
        component.current.$on(
          `${match[1][0].toLowerCase()}${match[1].slice(1)}`,
          props[key]
        );
      }
    }

    return () => {
      component.current.$destroy();
    };
  }, []);

  useEffect(() => {
    if (!mounted) {
      setMount(true);
      return;
    }

    component.current.$set(props);
  }, [props]);

  return React.createElement(tag, { ref: container, style });
};
