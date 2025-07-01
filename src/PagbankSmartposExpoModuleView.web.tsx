import * as React from 'react';

import { PagbankSmartposExpoModuleViewProps } from './PagbankSmartposExpoModule.types';

export default function PagbankSmartposExpoModuleView(props: PagbankSmartposExpoModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
