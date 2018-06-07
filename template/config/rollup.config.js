/*eslint-env node */
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import { camel, param, pascal } from 'change-case'
import pkg from '../package.json'

const nameWithoutScope = pkg.name.split('/').reduce((_, curr) => curr)
const format = process.env.FORMAT
const minify = process.env.MINIFY

const globals = Object.keys(pkg.peerDependencies || {}).reduce((deps, dep) => {
  deps[dep] = pascal(dep)
  return deps
}, {})

const output = {
  name: camel(nameWithoutScope),
  file: `dist/${param(nameWithoutScope)}.${format}${minify ? '.min' : ''}.js`,
  format,
  globals,
}

export default {
  input: 'src/index.js',
  output,
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    nodeResolve({ preferBuiltins: false, jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            loose: true,
            targets: {
              browsers: ['ie 11', 'ios 7'],
            },
          },
        ],
        'react',
      ],
      plugins: ['external-helpers'],
    }),
    format === 'umd'
      ? replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      : null,
    minify ? uglify() : null,
  ].filter(Boolean),
}
