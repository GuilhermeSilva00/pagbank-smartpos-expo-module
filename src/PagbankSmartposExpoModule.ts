import { NativeModule, requireNativeModule } from 'expo';

import { PagbankSmartposExpoModuleEvents } from './PagbankSmartposExpoModule.types';

declare class PagbankSmartposExpoModule extends NativeModule<PagbankSmartposExpoModuleEvents> {
  doAsyncInitializeAndActivatePinpad(value: string): Promise<{
    message: string;
  }>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PagbankSmartposExpoModule>('PagbankSmartposExpoModule');
