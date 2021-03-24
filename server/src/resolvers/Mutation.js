const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const post = async (parent, args, context) => {
    const { userId } = context;

    const newLink = await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
        },
    });
    return newLink;
};

const signin = async (parent, args, context) => {
    //Encrypt the password that is being sent
    const password = await bcrypt.hash(args.password, 10);

    //Add the user
    const user = await context.prisma.user.create({ data: { ...args, password } });

    //Create a token for authentication
    const token = jwt.sign(user.id, process.env.APP_SECRET);

    //Return back the new user
    return { token, user };
};

const login = async (parent, args, context) => {
    //Check if the user is already signed  in
    const user = await context.prisma.user.findUnique({ where: { email: args.email } });

    //If user is not present then send out an error message saying user not found
    if (!user) throw new Error("User Details not found");

    //Check if the user password is correct and then genearte a token
    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) throw new Error("The user email/password is incorrect");

    const token = jwt.sign(user.id, process.env.APP_SECRET);

    return { token, user };
};

const update = async (parent, args, context) => {
    //Take the link id and then update it with the new values
    const updatedUser = await context.prisma.link.update({
        where: { id: user.id },
        data: { ...args },
    });
    return updatedUser;
};

const deleteLink = async (parent, args, context) => {
    //Get the link id from the argument and then delete it
    const deleteUser = await context.prisma.link.delete({
        where: {
            id: args.id,
        },
    });
    return deleteUser;
};

module.exports = { post, signin, login, deleteLink, update };
