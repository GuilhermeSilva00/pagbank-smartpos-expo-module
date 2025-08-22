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
};

export type ChangeEventPayload = {
  value: string;
};