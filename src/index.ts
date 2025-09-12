// Reexport the native module. On web, it will be resolved to PagbankSmartposExpoModule.web.ts
// and on native platforms to PagbankSmartposExpoModule.ts
export { default as PagbankSmartposExpoModule } from './PagbankSmartposExpoModule';
export * from './PagbankSmartposExpoModule.types';

//Wrappers
import PagbankSmartposExpoModule from "./PagbankSmartposExpoModule";
import {
  ActivationResult,
  TransactionPayload,
  VoidPaymentPayload,
  TransactionResult,
  AbortResult,
  PagbankSmartposExpoModuleEvents,
} from "./PagbankSmartposExpoModule.types";

export async function doAsyncInitializeAndActivatePinpad(
  value: string
): Promise<ActivationResult> {
  return PagbankSmartposExpoModule.doAsyncInitializeAndActivatePinpad(value);
}

export async function doAsyncPayment(
  paymentData: TransactionPayload
): Promise<TransactionResult> {
  return PagbankSmartposExpoModule.doAsyncPayment(paymentData);
}

export async function doAsyncVoidPayment(
  paymentData: VoidPaymentPayload
): Promise<TransactionResult> {
  return PagbankSmartposExpoModule.doAsyncVoidPayment(paymentData);
}

export async function doAsyncAbort(): Promise<AbortResult> {
  return PagbankSmartposExpoModule.doAsyncAbort();
}

export function getSerialNumber(): string {
  return PagbankSmartposExpoModule.getSerialNumber();
}

type EventKeys = keyof PagbankSmartposExpoModuleEvents;

export function PagbankListener<K extends EventKeys>(
  event: K,
  listener: PagbankSmartposExpoModuleEvents[K]
) {
  return PagbankSmartposExpoModule.addListener(event, listener);
}

