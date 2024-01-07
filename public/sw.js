const version = "v4"

log = msg => console.log(`${version}:${msg}`)

self.addEventListener('push', event => {
    const data = event.data.json()
    const options = {
        body: data.body
    }
    let promise = self.registration.showNotification(data.title, options)
    event.waitUntil(promise)
})