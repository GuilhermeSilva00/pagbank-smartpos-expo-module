package expo.modules.pagbanksmartposexpomodule.usecases

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagActivationData
import br.com.uol.pagseguro.plugpagservice.wrapper.listeners.PlugPagActivationListener
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagInitializationResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventData
import expo.modules.kotlin.Promise

fun doAsyncInitializeAndActivatePinpad(
  plugPag: PlugPag,
  activationCode: String,
  sendEvent: (String, Map<String, Any?>) -> Unit,
  promise: Promise
) {
  plugPag.doAsyncInitializeAndActivatePinpad(
    PlugPagActivationData(activationCode),
    object : PlugPagActivationListener {
      override fun onSuccess(result: PlugPagInitializationResult) {
        val response = mapOf(
          "status" to "success",
          "result" to result.result,
          "errorCode" to result.errorCode,
          "errorMessage" to result.errorMessage
        )
        promise.resolve(response)
      }

      override fun onError(result: PlugPagInitializationResult) {
        promise.reject(
          "ACTIVATION_ERROR",
          "Erro na ativação: ${result.errorMessage}",
          null
        )
      }

      override fun onActivationProgress(data: PlugPagEventData) {
        sendEvent("onChangeActivation", mapOf(
          "status" to "progress",
          "data" to data
        ))
      }
    }
  )
}
