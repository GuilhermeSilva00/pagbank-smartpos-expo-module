import { NativeModule, requireNativeModule } from 'expo';

import { 
  PagbankSmartposExpoModuleEvents,
  PlugPagSuccess,
  PlugPagError,
  TransactionResult,
} from './PagbankSmartposExpoModule.types';

declare class PagbankSmartposExpoModule extends NativeModule<PagbankSmartposExpoModuleEvents> {
  doAsyncInitializeAndActivatePinpad(value: string): Promise<PlugPagSuccess | PlugPagError>;
  doAsyncPayment(paymentData: any): Promise<TransactionResult>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PagbankSmartposExpoModule>('PagbankSmartposExpoModule');
