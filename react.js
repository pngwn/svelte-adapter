import React, { useRef, useEffect, useState } from "react";

export default (Component, style = {}, tag = "span") => props => {
  const container = useRef(null);
  const component = useRef(null);
  const [mounted, setMount] = useState(false);

  useEffect(() => {
    const eventRe = /on([A-Z]{1,}[a-zA-Z]*)/;
    const watchRe = /watch([A-Z]{1,}[a-zA-Z]*)/;

    component.current = new Component({ target: container.current, props });

    let watchers = [];
    for (const key in props) {
      const eventMatch = key.match(eventRe);
      const watchMatch = key.match(watchRe);

      if (eventMatch && typeof props[key] === "function") {
        component.current.$on(
          `${eventMatch[1][0].toLowerCase()}${eventMatch[1].slice(1)}`,
          props[key]
        );
      }

      if (watchMatch && typeof props[key] === "function") {
        watchers.push([
          `${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`,
          props[key]
        ]);
      }
    }

    if (watchers.length) {
      const update = component.current.$$.update;
      component.current.$$.update = function() {
        watchers.forEach(([name, callback]) => {
          const index = component.current.$$.props[name];
          callback(component.current.$$.ctx[index]);
        });
        update.apply(null, arguments);
      };
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
