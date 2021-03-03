const checker = (role) => {
    return (req, res, next) => {
        if(res.locals.user.role !== role){
            throw new Error('not permitted')
        }
       next()
    }
}

module.exports = checker