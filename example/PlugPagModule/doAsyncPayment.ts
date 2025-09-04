import PagbankSmartposExpoModule, { TransactionResult } from 'pagbank-smartpos-expo-module';

export async function doAsyncPayment(paymentData: any): Promise<TransactionResult> {
    return await PagbankSmartposExpoModule.doAsyncPayment(paymentData);
}