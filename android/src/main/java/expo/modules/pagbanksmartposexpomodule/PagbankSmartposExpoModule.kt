import expo.modules.pagbanksmartposexpomodule.usecases.doAsyncInitializeAndActivatePinpad

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag

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
      doAsyncInitializeAndActivatePinpad(
        plugPag,
        activationCode,
        ::sendEvent,
        promise
      )
    }
  }
}
