package expo.modules.pagbanksmartposexpomodule

import android.content.Context
import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagActivationData
import br.com.uol.pagseguro.plugpagservice.wrapper.listeners.PlugPagActivationListener
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagInitializationResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventData

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

    Events("onChange")

    AsyncFunction("doAsyncInitializeAndActivatePinpad") { activationCode: String, promise: Promise ->
    plugPag.doAsyncInitializeAndActivatePinpad(
        PlugPagActivationData(activationCode),
        object : PlugPagActivationListener {

					override fun onSuccess(result: PlugPagInitializationResult) {
						sendEvent("onChange", mapOf(
							"status" to "success",
							"result" to result.result,
							"errorCode" to result.errorCode,
							"errorMessage" to result.errorMessage
						))
						promise.resolve("Pinpad ativado com sucesso")
					}

            override fun onError(result: PlugPagInitializationResult) {
							sendEvent("onChange", mapOf(
								"status" to "error",
								"result" to result.result,
								"errorCode" to result.errorCode,
								"errorMessage" to result.errorMessage
							))
							promise.reject(
								"ACTIVATION_ERROR",
								"Erro na ativação: ${result.errorMessage}",
								null
							)
            }

            override fun onActivationProgress(data: PlugPagEventData) {
              sendEvent("onChange", mapOf("status" to "progress", "data" to data))
            }
        }
    )
}

  }
}
