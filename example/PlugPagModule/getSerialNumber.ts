import PagbankSmartposExpoModule from 'pagbank-smartpos-expo-module';

export function getSerialNumber(): string {
    return PagbankSmartposExpoModule.getSerialNumber();
}