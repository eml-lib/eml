import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'build.js',
        format: 'cjs'
    },
    plugins: [
        commonJs({
            include: 'node_modules/**'
        }),
        nodeResolve({
            preferBuiltins: false
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
    ],
    watch: {
        include: ['index.js', 'src/**/*.js'],
        exclude: 'node_modules/**'
    }
}
