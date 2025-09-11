package expo.modules.pagbanksmartposexpomodule.usecases

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.listeners.PlugPagPaymentListener
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagTransactionResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrintResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagVoidData
import expo.modules.kotlin.Promise

fun doAsyncVoidPayment(
  plugPag: PlugPag,
  paymentData: PlugPagVoidData,
  sendEvent: (String, Map<String, Any?>) -> Unit,
  promise: Promise
) {
  println("doAsyncVoidPayment data: $paymentData")

  plugPag.doAsyncVoidPayment(
    PlugPagVoidData(
        paymentData.transactionCode,
        paymentData.transactionId,
        paymentData.printReceipt
    ),
    object : PlugPagPaymentListener {
      override fun onSuccess(result: PlugPagTransactionResult) {
        val response = mapTransactionResult(result)
        promise.resolve(mapOf(
          "status" to "success",
          "data" to response,
          "isVoid" to true
        ))
      }

      override fun onError(result: PlugPagTransactionResult) {
        promise.reject("VOID_PAYMENT_ERROR", "Erro no estorno: ${result.message}", null)
      }

      override fun onPaymentProgress(data: PlugPagEventData) {
        println("onPaymentProgress eventCode: ${data.eventCode}, customMessage: ${data.customMessage}")
        when(data.eventCode) {
          PlugPagEventData.EVENT_CODE_DIGIT_PASSWORD,
          PlugPagEventData.EVENT_CODE_NO_PASSWORD -> {
            sendEvent(
              "onChangePaymentPassword",
                mapOf(
                  "status" to "progress",
                  "eventCode" to data.eventCode,
                  "customMessage" to data.customMessage
                )
              )
          }
        }

        sendEvent(
          "onChangePayment",
          mapOf(
            "status" to "progress",
            "data" to mapEventData(data)
          )
        )
      }

      override fun onPrinterSuccess(printerResult: PlugPagPrintResult) {
        sendEvent(
          "onChangePaymentPrint",
          mapOf(
            "status" to "success",
            "data" to printerResult
          )
        )
      }

      override fun onPrinterError(printerResult: PlugPagPrintResult) {
        sendEvent(
          "onChangePaymentPrint",
          mapOf(
            "status" to "error",
            "data" to printerResult
          )
        )
      }
    }
  )
}

private fun mapEventData(data: PlugPagEventData): Map<String, Any?> {
  return mapOf(
    "eventCode" to data.eventCode,
    "customMessage" to data.customMessage
  )
}

private fun mapTransactionResult(result: PlugPagTransactionResult): Map<String, Any?> {
  return mapOf(
    "message" to result.message,
    "errorCode" to result.errorCode,
    "transactionCode" to result.transactionCode,
    "transactionId" to result.transactionId,
    "date" to result.date,
    "time" to result.time,
    "hostNsu" to result.hostNsu,
    "cardBrand" to result.cardBrand,
    "bin" to result.bin,
    "holder" to result.holder,
    "userReference" to result.userReference,
    "terminalSerialNumber" to result.terminalSerialNumber,
    "amount" to result.amount,
    "availableBalance" to result.availableBalance,
    "cardApplication" to result.cardApplication,
    "label" to result.label,
    "holderName" to result.holderName,
    "extendedHolderName" to result.extendedHolderName,
    "cardIssuerNationality" to result.cardIssuerNationality?.name,
    "result" to result.result,
    "readerModel" to result.readerModel,
    "nsu" to result.nsu,
    "autoCode" to result.autoCode,
    "installments" to result.installments?.toString(),
    "originalAmount" to result.originalAmount,
    "buyerName" to result.buyerName,
    "paymentType" to result.paymentType,
    "typeTransaction" to result.typeTransaction,
    "appIdentification" to result.appIdentification,
    "cardHash" to result.cardHash,
    "preAutoDueDate" to result.preAutoDueDate,
    "preAutoOriginalAmount" to result.preAutoOriginalAmount,
    "userRegistered" to result.userRegistered,
    "accumulatedValue" to result.accumulatedValue,
    "consumerIdentification" to result.consumerIdentification,
    "currentBalance" to result.currentBalance,
    "consumerPhoneNumber" to result.consumerPhoneNumber,
    "clubePagScreensIds" to result.clubePagScreensIds,
    "partialPayPartiallyAuthorizedAmount" to result.partialPayPartiallyAuthorizedAmount,
    "partialPayRemainingAmount" to result.partialPayRemainingAmount,
    "pixTxIdCode" to result.pixTxIdCode
  )
}