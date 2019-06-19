module.exports = middleware => async ctx => {
    const res = await middleware (ctx, { ...ctx.query, ...ctx.params, ...ctx.request.body }, ((ctx.state || {}).user || {}).id)
    ctx.body
        = res === true            ? { status: "success" }
        : res === false           ? { error: "internal error" }
        : typeof res === "string" ? { error: res }
        : res
}
