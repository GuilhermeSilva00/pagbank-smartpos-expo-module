import { requireNativeView } from 'expo';
import * as React from 'react';

import { PagbankSmartposExpoModuleViewProps } from './PagbankSmartposExpoModule.types';

const NativeView: React.ComponentType<PagbankSmartposExpoModuleViewProps> =
  requireNativeView('PagbankSmartposExpoModule');

export default function PagbankSmartposExpoModuleView(props: PagbankSmartposExpoModuleViewProps) {
  return <NativeView {...props} />;
}
