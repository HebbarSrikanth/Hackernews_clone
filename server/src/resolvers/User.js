const links = async (parent, args, context) => {
    //console.log(await context.prisma.user.findUnique({ where: { id: parent.id } }).links());
    return await context.prisma.user.findUnique({ where: { id: parent.id } }).links();
};

module.exports = { links };
