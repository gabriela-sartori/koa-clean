module.exports = controller => {

    if (controller === undefined)
        throw new Error ("Controller is undefined")

    return async ctx => {
        
        try {
            
            const params = { ...ctx.query, ...ctx.params, ...ctx.request.body }
                , auth   = (ctx.state || {}).user || {}

            let res = await controller (ctx, params, auth)

            if (Array.isArray (res) && res.length === 2 && Number.isInteger (res[0]) && ! Number.isInteger (res[1])) {
                ctx.status = res[0]
                res = res[1]
            }

            ctx.body = res
        }
        catch (e) {
            console.log (e)
            ctx.status = 500
            ctx.body = { error: "internal error" }
        }
    }
}