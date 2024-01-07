const version = "v5"

log = msg => console.log(`${version}:${msg}`)
console.log(1)

self.addEventListener('push', event => {
    сonsole.log(1)
    const data = event.data.json()
    const options = {
        body: data.body
    }
    let promise = self.registration.showNotification(data.title, options)
    event.waitUntil(promise)
})