// Find all .vue file
const importAll = (r) =>
  r.keys().map((key) =>
    key
      .slice(2)
      .replace(".vue", "")
      .split("/")
  );

// The second argument allows the function to check inner folders recursively.
// The third argument specify files extension.
const pages = importAll(require.context("../views", true, /\.vue$/));

const generateRoute = (path) => {
  const shortcut = path[0].toLowerCase();
  return shortcut.startsWith("map") ? "/" : path.map((p) => p.toLowerCase()).join("/");
};

export default pages.map(async (path) => {
  const { default: component } = await import(`../views/${path.join("/")}`);
  const { name } = component;
  const route = `/${generateRoute([...path])}`;
  return {
    path: route,
    name,
    component,
  };
});
