export default { 
  input: 'src/metadata.js',
  output: [
    {
      file: 'dist/metadata.js',
      exports: 'named',
      format: 'cjs'
    },
    {
      file: 'dist/metadata.esm.js',
      format: 'esm'
    }
  ]
}
