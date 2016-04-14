'use strict';
let child_process = require('child_process');

process.env['PATH'] =
    process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

exports.handler = (event, context, callback) => {
    if (!event.regex) {
        callback('Please specify a regex.');
        return;
    }
    if (!event.sampleInput) {
        callback('Please specify sample input.');
        return;
    }
    let args = event.sampleInput.split('\n')
    args.splice(0, 0, event.regex)
    const child = child_process.execFile('regexer', args,
                                         (error, stdout, stderr) => {
        if (error) {
            callback(error, stderr);
        } else {
            callback(null, stdout.split('\n'));
        }
    });
};
