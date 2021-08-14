const MIKROTIK_LOG_PARSER = /^(?<topic>[a-z0-9-]+)(\,(?<severity>[a-z0-9-]+))?(?<extra_topics>(\,[a-z0-9-]+)*)(\s(?<prefix>.+):)?\s(?<message>.*)$/;

function parseMikroTikLog(log) {
    const result = log.match(MIKROTIK_LOG_PARSER);

    if(!result) {
        return {
            topic: '',
            severity: 'info',
            extra_topics: '',
            prefix: '',
            message: log,
        };
    }

    const { topic, severity, extra_topics, prefix, message } = result.groups;
    return {
        topic,
        severity: severity || 'info',
        extra_topics: extra_topics ? extra_topics.substring(1) : '',
        prefix: prefix || '',
        message,
    };
}

module.exports.parseMikroTikLog = parseMikroTikLog;
