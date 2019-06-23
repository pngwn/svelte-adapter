exports.webpack = function(config, env) {
  let { production, webpack } = env;
  config.module.rules.push({
    test: /\.(svelte)$/,
    exclude: /node_modules/,
    use: "svelte-loader"
  });
};
