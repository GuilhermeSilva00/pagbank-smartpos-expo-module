# 💳 pagbank-smartpos-expo-module

[Expo](https://expo.dev) module library to simplify integration with PagBank SmartPOS

## 🚀 Installation

```bash
npm i pagbank-smartpos-expo-module
```

## Usage

```typescript
import {
  doAsyncInitializeAndActivatePinpad,
  doAsyncPayment,
  doAsyncAbort,
  doAsyncVoidPayment,
  getSerialNumber,
  PagbankSmartposExpoModule,
} from "pagbank-smartpos-expo-module";
```

<div style="display: flex; gap: 10px;">
  <img src="./assets/smartpos1.jpeg" width="200" />
  <img src="./assets/smartpos2.jpeg" width="200" />
</div>

📁 You can check all function and listener examples in example/App.tsx

## 📚 API Reference

### 🔧 Functions

**doAsyncInitializeAndActivatePinpad:**
Initialize and activate the pinpad.

**doAsyncPayment:**
Starts a payment operation.

**doAsyncAbort:**
Aborts the current transaction.

**doAsyncVoidPayment:**
Performs a void (cancellation) of a previous payment.

**getSerialNumber:**
Returns the SmartPOS device serial number.

**PagbankSmartposExpoModule:**
Default exported module object (contains methods and listener registration helpers).

### 🎧 Listeners

**onChangePayment:**
Called on every change in the payment state/flow.

**onChangePaymentPassword:**
Called on every change during password input (e.g. when user types PIN).

**onChangePaymentPrint:**
Called on every change related to printing.

** 📘 All function and listener examples are available in example/App.tsx **

## Contributing

🤝 Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
