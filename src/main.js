const logfmt = require("logfmt");
const SyslogServer = require("syslog-server");
const { parseMikroTikLog } = require("./parser");
const server = new SyslogServer();

server.on("message", ({host, date, message: log}) => {
    const message = parseMikroTikLog(log);

    logfmt.log({
        host,
        date: date.toISOString(),
        ...message
    });
});
 
server.start({
    port: process.env.SERVER_PORT || 514,
    address: process.env.SERVER_ADDRESS || '0.0.0.0',
});
