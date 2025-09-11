package expo.modules.pagbanksmartposexpomodule.usecases

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.listeners.PlugPagAbortListener
import expo.modules.kotlin.Promise

fun doAsyncAbort(
  plugPag: PlugPag,
  promise: Promise
) {
  plugPag.asyncAbort(
      object : PlugPagAbortListener {
      override fun onAbortRequested(result: Boolean) {
        promise.resolve(mapOf(
          "data" to result,
        ))
      }

      override fun onError(errorMessage: String) {
        promise.reject("PAYMENT_ABORT_ERROR", "Erro no cancelamento: ${errorMessage}", null)
      }
    }
  )
}