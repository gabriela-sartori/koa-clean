# Koa-Clean

Koa-Clean is a library to simplify koa controllers. It was heavy tested and works very well in production together with koa-router, koa-jwt and koa-mongo, but will probably work fine with other libraries. Feel free to open an issue on github if it doesn't work for your case.

## Install
    
    yarn add koa-clean
or

    npm install --save koa-clean

## Usage Example
    const bind = require ("koa-clean")
    
    // In your router, call bind with your controller as parameter
    const router = new Router ({ prefix: "/packages" }) 
        .get ("/:id", bind (Package.getById))
#

    // Then you have access to 3 parameters:
    // 1st: ctx default from koa
    // 2nd: params (union of ctx.request.body, ctx.params and ctx.query
    // 3rd: JWT decoded object if any
    const getPackage = async ({ db }, { id }) => {
        const pack = await Packages.getById (db, id)
        return pack || "Package not found"
    }

Returned values will be sent automatically to ctx.request.body.

There are some helper cases, if returned in any of formats below:

    // Strings always return as an error message
    // { error: "not implemented!" }
    const error = ({ db }, params) =>
        "not implemented!"

    // Returns { status: "success" }
    const ok = ({ db }, params) => {
        // ...
        return true
    }
    
    // Returns { error: "internal error" }
    const err = ({ db }, params) =>
        false

    // Set status 200 and body { id: 30, name: "Gabriel" }
    const withStatus = ({ db }, params) =>
        [200, { id: 30, name: "Gabriel" }]
    
