package expo.modules.pagbanksmartposexpomodule.domain

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagActivationData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagActivationListener
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagInitializationResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventData

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.doAsyncInitializeAndActivatePinpad


class Activation (private val plugPag: PlugPag) {

    /**
     * Perform an asynchronous activation of the smartPOS.
     *
     * @param data activation data (code)
     * @param onSuccess callback to be called on successful activation
     * @param onError callback to be called on error
     * @param onProgress callback to be called on progress events
     */
    fun handleActivationPos(
        data: PlugPagActivationData,
        onSuccess: (PlugPagInitializationResult) -> Unit,
        onError: (PlugPagInitializationResult) -> Unit,
        onProgress: (PlugPagEventData) -> Unit
    ) {
        plugPag.doAsyncInitializeAndActivatePinpad(data, object : PlugPagActivationListener {
            override fun onSuccess(result: PlugPagInitializationResult) {
                onSuccess(result)
            }

            override fun onError(result: PlugPagInitializationResult) {
                onError(result)
            }

            override fun onActivationProgress(data: PlugPagEventData) {
                onProgress(data)
            }
        })
    }
    
}