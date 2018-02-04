// import path from 'path';
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
        // Changes package path to relative
        nodeResolve(),
        commonJs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**',
            presets: [
                ['env', {
                    modules: false
                }],
                'stage-3'
            ],
            plugins: [
                'external-helpers',
                ['transform-react-jsx', {
                    pragma: 'createElement'
                }]
            ]
        }),
        // inject({
        //     createElement: 'eml-core/create-element'
        // })
    ],
    watch: {
        include: 'src/**/*.js',
        exclude: 'node_modules/**'
    }
}
