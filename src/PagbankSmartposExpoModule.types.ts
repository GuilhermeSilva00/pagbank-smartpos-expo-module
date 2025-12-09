export type OnLoadEventPayload = {
  url: string;
};

export type onChangePayload = {
  data: {
    status: string;
    eventCode: number;
    customMessage: string;
  }
}

export type ActivationResult = {
  status: "success";
  result: number;
  errorCode: number;
  errorMessage: string;
};

export type ActivationError = {
  code: string;
  message: string;
};

export type PrintResult = {
  data: {
    result: number;
    errorCode?: string | null;
    message?: string | null;
  };
};

export type PagbankSmartposExpoModuleEvents = {
  onChangePayment: (params: onChangePayload) => void;
  onChangePaymentPassword: (params: onChangePayload) => void;
  onChangePaymentPrint: (params: PrintResult) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type TransactionPayload = {
  type: number
  amount: number
  installmentType: number
  installments: number
  userReference: string
  printReceipt: boolean
  partialPay: boolean
  isCarne: boolean
}

export type VoidPaymentPayload = {
  transactionCode: string
  transactionId: string
  printReceipt: boolean
}

export type TransactionResult = {
  data: {
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
}

export type AbortResult = {
  data: boolean;
}

export type PrintFileResult = {
  result: number;
  message?: string;
  errorCode?: string;
}