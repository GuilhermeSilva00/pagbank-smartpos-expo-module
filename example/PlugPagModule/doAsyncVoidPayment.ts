import PagbankSmartposExpoModule, { TransactionResult } from 'pagbank-smartpos-expo-module';

export async function doAsyncVoidPayment(paymentData: any): Promise<TransactionResult> {
    return await PagbankSmartposExpoModule.doAsyncVoidPayment(paymentData);
}