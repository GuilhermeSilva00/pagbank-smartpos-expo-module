import PagbankSmartposExpoModule, { PlugPagSuccess, PlugPagError } from 'pagbank-smartpos-expo-module';

export const ACTIVATION_TEST_CODE = '749879'; // Example activation code https://developer.pagbank.com.br/docs/providers-classes

export async function doAsyncInitializeAndActivatePinpad(activationCode: string): Promise<PlugPagSuccess | PlugPagError> {
    return await PagbankSmartposExpoModule.doAsyncInitializeAndActivatePinpad(activationCode);
}