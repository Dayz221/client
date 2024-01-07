const version = "v5"

log = msg => console.log(`${version}:${msg}`)

self.addEventListener('push', event => {
    const data = event.data.json()
    const options = {
        body: data.body,
        vibrate: [100, 200, 100, 200, 100, 200]
    }
    let promise = self.registration.showNotification(data.title, options)
    event.waitUntil(promise)
})