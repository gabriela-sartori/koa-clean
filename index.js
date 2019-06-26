module.exports = controller => {

    if (controller === undefined)
        throw new Error ("Controller is undefined")

    return async ctx => {

        const params = { ...ctx.query, ...ctx.params, ...ctx.request.body }
            , idUser = ((ctx.state || {}).user || {}).id
            , res    = await controller (ctx, params, idUser)

        ctx.body
            = res === true            ? { status: "success" }
            : res === false           ? { error: "internal error" }
            : typeof res === "string" ? { error: res }
            : res
    }
}
