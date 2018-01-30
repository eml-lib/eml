import { parse } from 'eml-core';
import * as components from './components';

console.log(parse('<page>123</page>', components));