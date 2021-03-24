const user = async (parent, args, context) => {
    //console.log(await context.prisma.vote.findUnique({ where: { id: parent.id } }).user());
    return await context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
};

const link = async (parent, args, context) => {
    //console.log(await context.prisma.vote.findUnique({ where: { id: parent.id } }).link());
    return await context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
};

module.exports = { user, link };
