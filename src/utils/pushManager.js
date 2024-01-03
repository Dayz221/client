import axios from './axios.js'

const PUBLICKEY = "BO0ml9NA7N12Xr_I1fxxN1YkgrwCuT1eSSO-zpaZ4CUZaSyGJluTXYYY1BBn5Eb-FqgA_SsOX8MOhatEMcrx-d0"

export const startServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {scope: "/"}).then(
            (registration) => {
                console.log(registration.scope)
            },
            (err) => console.log(err)
        )

        navigator.serviceWorker.ready.then(async (registration) => {
            const subscription = registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: PUBLICKEY
            })

            await axios.post('/subscribe', subscription)
        })
    }
}