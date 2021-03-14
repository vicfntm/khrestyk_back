const request = require('supertest')

let app
let id
describe('check is endpoints work', () => {
    beforeEach(() => {
        app = require('../../server')
    })
    afterEach(() => {
        app.close()
    })
    it('should return ok status', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    })
    it('should see products', async() => {
        const res = await request(app).get('/api/v1/product/all')

        expect(res.status).toBe(202)
    })
    it('should see all carts', async() => {
        const res = await request(app).get('/api/v1/cart/all')
        id = res.body.data[0]._id
        expect(res.status).toBe(202)
    })
    it('should see one cart element', async () => {
        const res = await request(app).get('/api/v1/cart/show/' + id)
        expect(res.status).toBe(202)
    })
})
