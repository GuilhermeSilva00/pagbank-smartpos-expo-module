import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type onChangeActivatePinpadPayload = {
  status: string;
  eventCode: number;
  customMessage: string;
}

export type PlugPagSuccess = {
  status: "success";
  result: number;
  errorCode: number;
  errorMessage: string;
};

export type PlugPagError = {
  code: string;
  message: string;
};

export type PagbankSmartposExpoModuleEvents = {
  onChangeActivatePinpad: (params: onChangeActivatePinpadPayload) => void;
  onChangePayment: (params: any) => void;
  onChangePaymentPassword: (params: any) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type TransactionResult = {
  message?: string | null;
  errorCode?: string | null;
  transactionCode?: string | null;
  transactionId?: string | null;
  date?: string | null;
  time?: string | null;
  hostNsu?: string | null;
  cardBrand?: string | null;
  bin?: string | null;
  holder?: string | null;
  userReference?: string | null;
  terminalSerialNumber?: string | null;
  amount?: string | null;
  availableBalance?: string | null;
  cardApplication?: string | null;
  label?: string | null;
  holderName?: string | null;
  extendedHolderName?: string | null;
  cardIssuerNationality?: string | null; // enum convertido para string
  result?: number | null;
  readerModel?: string | null;
  nsu?: string | null;
  autoCode?: string | null;
  installments?: string | null;
  originalAmount?: number | null;
  buyerName?: string | null;
  paymentType?: number | null;
  typeTransaction?: string | null;
  appIdentification?: string | null;
  cardHash?: string | null;
  preAutoDueDate?: string | null;
  preAutoOriginalAmount?: string | null;
  userRegistered?: number;
  accumulatedValue?: string | null;
  consumerIdentification?: string | null;
  currentBalance?: string | null;
  consumerPhoneNumber?: string | null;
  clubePagScreensIds?: string | null;
  partialPayPartiallyAuthorizedAmount?: string | null;
  partialPayRemainingAmount?: string | null;
  pixTxIdCode?: string | null;
}