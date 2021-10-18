const { getUserId } = require('../utils');

function feed (parent, args, context) {
  return context.prisma.link.findMany();
}

function info(parent, args, context) {
  return 'The real hackernews website';
}

module.exports = {
  feed,
  info
}
