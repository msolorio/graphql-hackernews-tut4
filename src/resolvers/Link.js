function id(parent) {
  return parent.id;
}

function url(parent) {
  return parent.url;
}

function description(parent) {
  return parent.description;
}

function postedBy(parent, args, context) {
  // .postedBy() is a method built into the link object that will resolve the postedBy field
  // with the user object
  return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
}

module.exports = {
  id,
  url,
  description,
  postedBy
};
