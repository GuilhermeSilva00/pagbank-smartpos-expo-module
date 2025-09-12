import { PagbankSmartposExpoModule, TransactionResult, TransactionPayload } from 'pagbank-smartpos-expo-module';

export async function doAsyncPayment(paymentData: TransactionPayload): Promise<TransactionResult> {
    return await PagbankSmartposExpoModule.doAsyncPayment(paymentData);
}