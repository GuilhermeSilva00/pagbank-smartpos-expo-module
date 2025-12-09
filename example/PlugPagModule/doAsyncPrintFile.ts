import { PagbankSmartposExpoModule, PrintFileResult } from 'pagbank-smartpos-expo-module';

export async function doAsyncPrintFile(filePath: string): Promise<PrintFileResult> {
    return await PagbankSmartposExpoModule.doAsyncPrintFile(filePath);
}