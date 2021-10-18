function links(parent, args, context) {
  // .links() is a built in method that exists on the user object that
  // will resolve the links field with the array of link objects
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links()
}

module.exports = {
  links
}