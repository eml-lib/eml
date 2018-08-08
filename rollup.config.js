// import path from 'path';
import json from 'rollup-plugin-json';
import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
// import inject from 'rollup-plugin-inject';

export default {
    input: 'src/index.js',
    output: {
        name: 'eml',
        file: 'build.js',
        format: 'umd'
    },
    plugins: [
		json({
			include: 'node_modules/**',
			preferConst: true
		}),
        // Changes package path to relative
        nodeResolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        commonJs({
            include: 'node_modules/**'
        }),
        babel()
    ],
    watch: {
        include: 'src/**/*.js',
        exclude: 'node_modules/**'
    }
}
