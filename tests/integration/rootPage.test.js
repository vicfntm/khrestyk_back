const request = require('supertest')
const productModel = require('../../models/product/productModel')
const winston = require('../../loggers/logging')
const passwords = require('../../config/testUsers.json')
let app
let id
let productId
let adminAuthToken
let regularUserToken
const {userSchema} = require('../../auth/models/users')
const bcrypt = require('bcrypt')

describe('PRODUCTS CRUD', () => {
    beforeEach(() => {
        app = require('../../server')
    })
    afterEach(() => {
        app.close()
    })
    describe('products', () => {
        it('should create product', async () => {
            await productModel.deleteMany({})
            const res = await request(app).post('/api/v1/product/store-form-data')
                .field('title', 'New product')
                .field('description', 'New description')
                .field('price', 2.04)
                .field('qty_available', 10)
            productId = res.body.data.product._id
            expect(res.status).toBe(201)
        })

        describe('edit product', () => {
            it('should edit product', async () => {
                console.log('PRODUCT', productId)
                const res = await request(app).patch('/api/v1/product/edit/' + productId)
                    .field('title', 'Changed Product')
                    .field('description', 'Changed Description')
                    .field('price', 1.10)
                    .field('qty_available', 235)
                console.log('res', res.body.data)
                expect(res.status).toBe(202)
                expect(res.body.data.product).toHaveProperty('price', 1.10)
                expect(res.body.data.product).toHaveProperty('qty_available', 235)
                expect(res.body.data.product).toHaveProperty('description', 'Changed Description')
            })
        })
        describe('show products', () => {
            it('should show single product', async () => {
                const res = await request(app).get('/api/v1/product/single/' + productId)
                expect(res.status).toBe(202)
            })
            it('should see products', async () => {
                const res = await request(app).get('/api/v1/product/all')

                expect(res.status).toBe(202)
            })
        })
    })
})

describe('CART CRUD ', () => {
    beforeEach(() => {
        app = require('../../server')
    })
    afterEach(() => {
        app.close()
    })

    it('should create cart', async () => {
        const product = await productModel.findOne({})
        winston.debug(JSON.stringify(product))
        const obj = {
            userInfo: {
                name: "John",
                email: "4044995@gmail.com",
                phone: "0503905234"
            },
            products: [
                product
            ],
            processing: [
                {
                    processingStatus: "started",
                    content: "initial"
                }
            ],
            orderStatus: "started"
        }
        const res = await request(app).post('/api/v1/cart/add-product',
            obj)
        expect(res.status).toBe(200)
    })
    it('should see all carts', async () => {
        const res = await request(app).get('/api/v1/cart/all')
        id = res.body.data[0]._id
        expect(res.status).toBe(202)
    })
    it('should see one cart element', async () => {
        const res = await request(app).get('/api/v1/cart/show/' + id)
        expect(res.status).toBe(202)
    })
})

describe('AUTHENTIFICATION', () => {
    beforeEach(() => {
        app = require('../../server')
    })
    afterEach(() => {
        app.close()
    })
    it('should create regular user', async() => {
        await userSchema.deleteMany({})
        const admin = new userSchema()
        admin.login = passwords.admin.login
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
        admin.password = await bcrypt.hash(passwords.admin.password, salt)
        admin.role = 'admin'
        const u = await admin.save()
        const user = new userSchema().generateAuthToken(u._id)
        console.log('TKN', user)
        const res = await request(app).post('/api/v1/auth/create-user')
            .set('token', user)
            .send({login: passwords.regular.login, password: passwords.regular.password})
        expect(res.status).toBe(201)
    })
})

describe('check is root page alive', () => {
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
})
