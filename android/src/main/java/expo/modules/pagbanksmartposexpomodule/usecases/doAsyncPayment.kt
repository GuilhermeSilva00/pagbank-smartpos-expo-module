package expo.modules.pagbanksmartposexpomodule.usecases

import br.com.uol.pagseguro.plugpagservice.wrapper.*
import br.com.uol.pagseguro.plugpagservice.wrapper.listeners.*
import expo.modules.kotlin.Promise

fun doAsyncPayment(
  plugPag: PlugPag,
  paymentData: PlugPagPaymentData,
  sendEvent: (String, Map<String, Any?>) -> Unit,
  promise: Promise
) {
  println("doAsyncPayment data: $paymentData")

  plugPag.asyncIsAuthenticated(object : PlugPagIsActivatedListener {
    override fun onIsActivated(isActivated: Boolean) {
      println("isActivated: $isActivated")
      if (!isActivated) {
        promise.reject("NOT_AUTHENTICATED", "Dispositivo não autenticado. Faça login antes de realizar o pagamento.", null)
        return
      }

      val paymentType = when (paymentData.type) {
        1 -> PlugPag.TYPE_CREDITO
        2 -> PlugPag.TYPE_DEBITO
        3 -> PlugPag.TYPE_VOUCHER
        else -> {
          promise.reject("INVALID_PAYMENT_TYPE", "Tipo de pagamento inválido: ${paymentData.type}", null)
          return
        }
      }

      val installmentType = when (paymentData.installmentType) {
        1 -> PlugPag.INSTALLMENT_TYPE_A_VISTA
        2 -> PlugPag.INSTALLMENT_TYPE_PARC_VENDEDOR
        3 -> PlugPag.INSTALLMENT_TYPE_PARC_COMPRADOR
        else -> {
          promise.reject("INVALID_INSTALLMENT_TYPE", "Tipo de parcelamento inválido: ${paymentData.installmentType}", null)
          return
        }
      }

      plugPag.doAsyncPayment(
        PlugPagPaymentData(
          paymentType,
          paymentData.amount,
          installmentType,
          paymentData.installments,
          paymentData.userReference,
          paymentData.printReceipt,
        ),
        object : PlugPagPaymentListener {
          override fun onSuccess(result: PlugPagTransactionResult) {
            println("onSuccess result: $result")
            val response = mapTransactionResult(result)
            promise.resolve(
              mapOf(
                "status" to "success",
                "data" to response,
                "isVoid" to false
              )
            )
          }

          override fun onError(result: PlugPagTransactionResult) {
            promise.reject("PAYMENT_ERROR", "Erro no pagamento: ${result.message}", null)
          }

          override fun onPaymentProgress(data: PlugPagEventData) {
            println("onPaymentProgress eventCode: ${data.eventCode}, customMessage: ${data.customMessage}")

            when (data.eventCode) {
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
                "data" to mapPrintResult(printerResult)
              )
            )
          }

          override fun onPrinterError(printerResult: PlugPagPrintResult) {
            sendEvent(
              "onChangePaymentPrint",
              mapOf(
                "status" to "error",
                "data" to mapPrintResult(printerResult)
              )
            )
          }
        }
      )
    }

    override fun onError(errorMessage: String) {
      promise.reject("AUTH_ERROR", "Erro ao verificar autenticação: $errorMessage", null)
    }
  })
}

private fun mapEventData(data: PlugPagEventData): Map<String, Any?> {
  return mapOf(
    "eventCode" to data.eventCode,
    "customMessage" to data.customMessage
  )
}

private fun mapPrintResult(result: PlugPagPrintResult): Map<String, Any?> {
  return mapOf(
    "result" to result.result,
    "errorCode" to result.errorCode,
    "message" to result.message
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
