import { NativeModule, requireNativeModule } from 'expo';

import { 
  PagbankSmartposExpoModuleEvents,
  ActivationResult,
  TransactionResult,
  AbortResult,
  TransactionPayload,
  VoidPaymentPayload,
} from './PagbankSmartposExpoModule.types';

declare class PagbankSmartposExpoModule extends NativeModule<PagbankSmartposExpoModuleEvents> {
  doAsyncInitializeAndActivatePinpad(value: string): Promise<ActivationResult>;
  doAsyncPayment(paymentData: TransactionPayload): Promise<TransactionResult>;
  doAsyncVoidPayment(paymentData: VoidPaymentPayload): Promise<TransactionResult>;
  doAsyncAbort(): Promise<AbortResult>;
  getSerialNumber(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PagbankSmartposExpoModule>('PagbankSmartposExpoModule');
