module.exports = controller => {

    if (controller === undefined)
        throw new Error ("Controller is undefined")

    return async ctx => {

        const params = { ...ctx.query, ...ctx.params, ...ctx.request.body }
            , idUser = ((ctx.state || {}).user || {}).id

        let res = await controller (ctx, params, idUser)

        if (Array.isArray (res) && res.length === 2 && Number.isInteger (res[0]) && ! Number.isInteger (res[1])) {
            ctx.status = res[0]
            res = res[1]
        }

        ctx.body
            = res === true            ? { status: "success" }
            : res === false           ? { error: "internal error" }
            : typeof res === "string" ? { error: res }
            : res
    }
}
