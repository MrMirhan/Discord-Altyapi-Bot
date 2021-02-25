const rEvent = (event) => require(`../events/${event}`);
module.exports = client => {
    client.on('ready', () => rEvent('ready')(client));
    client.on('disconnect', () => rEvent('disconnect'));
    client.on('reconnecting', () => rEvent('reconnecting'));
    client.on('warn', () => rEvent('warn'));
    client.on('error', () => rEvent('error'));
    client.on('guildMemberAdd', () => rEvent('guildMemberAdd'));
    client.on('guildMemberRemove', () => rEvent('guildMemberRemove'));
    client.on('message', rEvent('message'));
}