package expo.modules.pagbanksmartposexpomodule

import android.content.Context
import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPaymentData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagVoidData

import expo.modules.pagbanksmartposexpomodule.usecases.doAsyncInitializeAndActivatePinpad
import expo.modules.pagbanksmartposexpomodule.usecases.doAsyncPayment
import expo.modules.pagbanksmartposexpomodule.usecases.doAsyncVoidPayment
import expo.modules.pagbanksmartposexpomodule.usecases.doAsyncAbort
import expo.modules.pagbanksmartposexpomodule.usecases.doAsyncPrintFile

class PagbankSmartposExpoModule : Module() {
  private val TAG = "PagbankSmartposExpoModule"
  private lateinit var plugPag: PlugPag

  override fun definition() = ModuleDefinition {
    OnCreate {
      val context: Context = appContext.reactContext?.applicationContext
        ?: throw IllegalStateException("Contexto não encontrado para inicializar o PlugPag")
      plugPag = PlugPag(context)
      Log.i(TAG, "PlugPag inicializado: $plugPag")
    }

    Name("PagbankSmartposExpoModule")

    Events(
      "onChangeActivation",
      "onChangePayment",
      "onChangePaymentPrint",
      "onChangePaymentPassword"
    )

    Function("getSerialNumber") {
      return@Function plugPag.getSerialNumber()
    }

    AsyncFunction("doAsyncInitializeAndActivatePinpad") { activationCode: String, promise: Promise ->
      doAsyncInitializeAndActivatePinpad(
        plugPag,
        activationCode,
        ::sendEvent,
        promise
      )
    }

    AsyncFunction("doAsyncPayment") { paymentDataMap: Map<String, Any>, promise: Promise ->
      val paymentData = PlugPagPaymentData(
        type = (paymentDataMap["type"] as Number).toInt(),
        amount = (paymentDataMap["amount"] as Number).toInt(),
        installmentType = (paymentDataMap["installmentType"] as Number).toInt(),
        installments = (paymentDataMap["installments"] as Number).toInt(),
        userReference = paymentDataMap["userReference"] as? String,
        printReceipt = paymentDataMap["printReceipt"] as? Boolean ?: false,
        partialPay = paymentDataMap["partialPay"] as? Boolean ?: false,
        isCarne = paymentDataMap["isCarne"] as? Boolean ?: false
      )
      doAsyncPayment(plugPag, paymentData, ::sendEvent, promise)
    }

    AsyncFunction("doAsyncVoidPayment") { paymentDataMap: Map<String, Any>, promise: Promise ->
      val paymentData = PlugPagVoidData(
        transactionCode = (paymentDataMap["transactionCode"] as String),
        transactionId = (paymentDataMap["transactionId"] as String),
        printReceipt = paymentDataMap["printReceipt"] as? Boolean ?: false
      )
      doAsyncVoidPayment(plugPag, paymentData, ::sendEvent, promise)
    }

    AsyncFunction("doAsyncAbort"){ promise: Promise ->
      doAsyncAbort(plugPag, promise)
    }

    AsyncFunction("doAsyncPrintFile"){ filePath: String, promise: Promise ->
      doAsyncPrintFile(plugPag, filePath, promise)
    }
  }
}
