import PagbankSmartposExpoModule, { AbortResult } from 'pagbank-smartpos-expo-module';

export async function doAsyncAbort(): Promise<AbortResult> {
    return await PagbankSmartposExpoModule.doAsyncAbort();
}