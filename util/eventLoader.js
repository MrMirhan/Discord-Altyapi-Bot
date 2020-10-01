const rEvent = (event) => require(`../events/${event}`);
module.exports = client => {
    client.on('ready', () => rEvent('ready')(client));
    client.on('disconnect', () => rEvent('disconnect')(client));
    client.on('reconnecting', () => rEvent('reconnecting')(client));
    client.on('warn', () => rEvent('warn')(client));
    client.on('error', () => rEvent('error')(client));
    client.on('guildMemberAdd', () => rEvent('guildMemberAdd')(client));
    client.on('message', rEvent('message'));
}