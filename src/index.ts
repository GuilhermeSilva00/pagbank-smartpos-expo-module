// Reexport the native module. On web, it will be resolved to PagbankSmartposExpoModule.web.ts
// and on native platforms to PagbankSmartposExpoModule.ts
export { default } from './PagbankSmartposExpoModule';
export { default as PagbankSmartposExpoModuleView } from './PagbankSmartposExpoModuleView';
export * from  './PagbankSmartposExpoModule.types';
