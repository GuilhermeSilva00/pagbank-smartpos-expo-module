package expo.modules.pagbanksmartposexpomodule.usecases

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrintResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrinterData
import expo.modules.kotlin.Promise

fun doAsyncPrintFile(
  plugPag: PlugPag,
  filePath: String,
  promise: Promise,
) {
    try {
      val result: PlugPagPrintResult = plugPag.printFromFile(
        PlugPagPrinterData(
          filePath, 
          4, // <-- image quality
          0 // <-- steps
        )
      )
      promise.resolve(
        mapOf(
          "result" to result.result,
          "message" to result.message,
          "errorCode" to result.errorCode,
        )
      )
    } catch (e: Exception) {
      promise.reject("PRINT_ERROR", e.message ?: "Erro na impressão", null)
    }
}
