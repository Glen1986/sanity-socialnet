module.exports = {
  //...
    resolve: {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },    
    fallback: { "path": false },  
    fallback: { "zlib": false  },  
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify"),
      url: require.resolve("url"),

    },
    extensions: ['.jsx', '.js', '.tsx', '.ts'],      
    exportsFields: ['exports', 'myCompanyExports'],
    descriptionFiles: ['package.json'],
    enforceExtension: false,
        extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    },
  },
};
