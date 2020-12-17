function feed(parent, args, context, info) {
    return context.prisma.link.findMany()
}

function info(parent, args, context, info) {
    return 'GraphQL query'
}

module.exports = {
    feed,
    info,
}