import { registerWebModule, NativeModule } from 'expo';

import { PagbankSmartposExpoModuleEvents } from './PagbankSmartposExpoModule.types';

class PagbankSmartposExpoModule extends NativeModule<PagbankSmartposExpoModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(PagbankSmartposExpoModule, 'PagbankSmartposExpoModule');
