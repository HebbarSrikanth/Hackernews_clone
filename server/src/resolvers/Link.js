const postedBy = async (parent, args, context) => {
    console.log(await context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy());
    return await context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
};

module.exports = { postedBy };
