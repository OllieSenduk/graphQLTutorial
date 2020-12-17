function postedBy(parent, args, context) {
    return context.prisma.link.findUnique({ where: {id: parent.id} })
}

module.exports = {
    postedBy,
}