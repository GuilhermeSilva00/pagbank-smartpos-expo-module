import { NativeModule, requireNativeModule } from 'expo';

import { PagbankSmartposExpoModuleEvents } from './PagbankSmartposExpoModule.types';

declare class PagbankSmartposExpoModule extends NativeModule<PagbankSmartposExpoModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PagbankSmartposExpoModule>('PagbankSmartposExpoModule');
