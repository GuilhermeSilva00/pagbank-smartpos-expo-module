import { NativeModule, requireNativeModule } from 'expo';

import { 
  PagbankSmartposExpoModuleEvents,
  ActivationResult,
  TransactionResult,
  AbortResult,
  TransactionPayload,
  VoidPaymentPayload,
  onChangePayload,
  PrintResult
} from './PagbankSmartposExpoModule.types';

declare class PagbankSmartposExpoModule extends NativeModule<PagbankSmartposExpoModuleEvents> {
  doAsyncInitializeAndActivatePinpad(value: string): Promise<ActivationResult>;
  doAsyncPayment(paymentData: TransactionPayload): Promise<TransactionResult>;
  doAsyncVoidPayment(paymentData: VoidPaymentPayload): Promise<TransactionResult>;
  doAsyncAbort(): Promise<AbortResult>;
  getSerialNumber(): string;
  addListener(
    eventName: "onChangePayment",
    listener: (event: onChangePayload) => void
  ): { remove: () => void };
  addListener(
    eventName: "onChangePaymentPassword",
    listener: (event: onChangePayload) => void
  ): { remove: () => void };
  addListener(
    eventName: "onChangePaymentPrint",
    listener: (event: PrintResult) => void
  ): { remove: () => void };
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PagbankSmartposExpoModule>('PagbankSmartposExpoModule');
