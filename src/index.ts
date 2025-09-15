// Reexport the native module. On web, it will be resolved to PagbankSmartposExpoModule.web.ts
// and on native platforms to PagbankSmartposExpoModule.ts
export { default as PagbankSmartposExpoModule } from './PagbankSmartposExpoModule';
export * from './PagbankSmartposExpoModule.types';

import { EventSubscription } from 'expo-modules-core';

//Wrappers
import PagbankSmartposExpoModule from "./PagbankSmartposExpoModule";
import {
  ActivationResult,
  TransactionPayload,
  VoidPaymentPayload,
  TransactionResult,
  AbortResult,
  onChangePayload,
  PrintResult,
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

export function PaymentListener(listener: (event: onChangePayload) => void): EventSubscription {
  return PagbankSmartposExpoModule.addListener('onChangePayment', listener);
}

export function PaymentPasswordListener(listener: (event: onChangePayload) => void): EventSubscription {
  return PagbankSmartposExpoModule.addListener('onChangePaymentPassword', listener);
}

export function PaymentPrintListener(listener: (event: PrintResult) => void): EventSubscription {
  return PagbankSmartposExpoModule.addListener('onChangePaymentPrint', listener);
}

